/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-restricted-syntax */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  pagesDir: 'src/pages',
  templatesDir: 'src/templates',
  redirectsFile: 'src/redirects.ts',
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

function getExistingRedirectSources() {
  const filePath = path.join(process.cwd(), CONFIG.redirectsFile);

  if (!fs.existsSync(filePath)) {
    return new Set();
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = content.matchAll(/fromPath:\s*['"]([^'"]+)['"]/g);

  return new Set(Array.from(matches, match => match[1]));
}

function hasSkipFlag() {
  try {
    const message = execSync('git log -1 --pretty=%B', { encoding: 'utf-8' });
    return message.includes(CONFIG.skipFlag);
  } catch {
    return false;
  }
}

function findMissingRedirects() {
  const { deleted, renamed } = getChangedPages();
  const existingRedirects = getExistingRedirectSources();
  const missing = [];

  for (const file of deleted) {
    const url = convertFilePathToUrl(file);
    if (!existingRedirects.has(url)) {
      missing.push({ type: 'deleted', file, url });
    }
  }

  for (const { from, to } of renamed) {
    const fromUrl = convertFilePathToUrl(from);
    const toUrl = convertFilePathToUrl(to);
    if (!existingRedirects.has(fromUrl)) {
      missing.push({ type: 'renamed', from, to, fromUrl, toUrl });
    }
  }

  return missing;
}

function main() {
  const missing = findMissingRedirects();

  if (missing.length === 0) {
    process.exit(0);
  }

  if (hasSkipFlag()) {
    process.exit(0);
  }

  console.error('Missing redirects:\n');

  for (const item of missing) {
    if (item.type === 'deleted') {
      console.error(`DELETED: ${item.file}`);
      console.error(`  URL: ${item.url}`);
      console.error(`  Add redirect to ${CONFIG.redirectsFile}\n`);
    } else {
      console.error(`RENAMED: ${item.from} -> ${item.to}`);
      console.error(`  Add to ${CONFIG.redirectsFile}:`);
      console.error(`  { fromPath: '${item.fromUrl}', toPath: '${item.toUrl}' }\n`);
    }
  }

  process.exit(1);
}

main();
