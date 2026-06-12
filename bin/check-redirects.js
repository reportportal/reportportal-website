/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-restricted-syntax */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  pagesDir: 'src/pages',
  templatesDir: 'src/templates',
  redirectsFile: 'src/redirects.json',
  skipFlag: '[skip-redirect-check]',
};

function convertFilePathToUrl(filePath) {
  return (
    filePath
      .replace(/^src\/pages/, '')
      .replace(/^src\/templates/, '')
      .replace(/\.tsx?$/, '')
      .replace(/\/index$/, '')
      .replace(/^([^/])/, '/$1')
      .replace(/([^/])$/, '$1/') || '/'
  );
}

function isPageFile(filePath) {
  const isInPageDirectory =
    filePath.startsWith(CONFIG.pagesDir) || filePath.startsWith(CONFIG.templatesDir);

  const isTypeScriptFile = filePath.endsWith('.tsx') || filePath.endsWith('.ts');

  const isNotErrorPage = !filePath.includes('404');

  return isInPageDirectory && isTypeScriptFile && isNotErrorPage;
}

function getChangedPages() {
  const baseRef = process.env.BASE_REF || 'develop';

  try {
    execSync(`git fetch origin ${baseRef}`, { stdio: 'pipe' });
  } catch {
    console.log('Fetch failed, using fallback');
  }

  const diffCommand = `git diff --name-status origin/${baseRef}...HEAD`;
  const fallbackCommand = 'git diff --name-status HEAD~1...HEAD';

  let output;
  try {
    output = execSync(diffCommand, { encoding: 'utf-8' });
  } catch {
    try {
      output = execSync(fallbackCommand, { encoding: 'utf-8' });
    } catch {
      return { deleted: [], renamed: [] };
    }
  }

  const deleted = [];
  const renamed = [];

  for (const line of output.trim().split('\n').filter(Boolean)) {
    const [status, ...paths] = line.split('\t');

    if (status === 'D' && isPageFile(paths[0])) {
      deleted.push(paths[0]);
    }

    if (status.startsWith('R') && (isPageFile(paths[0]) || isPageFile(paths[1]))) {
      renamed.push({ from: paths[0], to: paths[1] });
    }
  }

  return { deleted, renamed };
}

function getRecordedRedirectSources() {
  const filePath = path.join(process.cwd(), CONFIG.redirectsFile);

  if (!fs.existsSync(filePath)) {
    return new Set();
  }

  const redirects = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return new Set(redirects.map(r => r.source));
}

function hasSkipFlag() {
  try {
    const message = execSync('git log -1 --pretty=%B', { encoding: 'utf-8' });
    return message.includes(CONFIG.skipFlag);
  } catch {
    return false;
  }
}

function main() {
  const { deleted, renamed } = getChangedPages();
  const recordedSources = getRecordedRedirectSources();
  const missing = [];

  for (const file of deleted) {
    const url = convertFilePathToUrl(file);
    if (!recordedSources.has(url)) {
      missing.push({ source: url, target: '/', status: '301', condition: null });
    }
  }

  for (const { from, to } of renamed) {
    const fromUrl = convertFilePathToUrl(from);
    const toUrl = convertFilePathToUrl(to);
    if (!recordedSources.has(fromUrl)) {
      missing.push({ source: fromUrl, target: toUrl, status: '301', condition: null });
    }
  }

  if (missing.length === 0) {
    console.log('Redirect check passed.');
    process.exit(0);
  }

  if (hasSkipFlag()) {
    console.log('Redirect check skipped.');
    process.exit(0);
  }

  console.error('\n⚠️  Missing redirects detected.\n');
  console.error(`Add the following entries to ${CONFIG.redirectsFile}:\n`);
  console.error(JSON.stringify(missing, null, 2));
  console.error(
    `\nTo apply: insert the entries above into ${CONFIG.redirectsFile} (set "target" to the correct destination), then commit the file.`,
  );
  console.error(`To skip this check: add ${CONFIG.skipFlag} to your commit message.\n`);

  process.exit(1);
}

main();
