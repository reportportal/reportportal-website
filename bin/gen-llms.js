/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://reportportal.io';
const SITE_TITLE = 'ReportPortal';
const SITE_DESCRIPTION =
  'Open-source TestOps platform for centralized test reporting, AI-powered failure analysis, and real-time quality analytics.';
const TITLE_SUFFIX = ' | ReportPortal';

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const STATIC_DIR = path.join(ROOT, 'static');

const EXCLUDE_PREFIXES = [
  '/404',
  '/dev-404-page',
  '/contact-us/',
  '/offline-plugin-app-shell-fallback',
];

const SECTION_ORDER_HINT = ['', 'blog', 'case-studies'];

function walkHtml(dir, acc = []) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(full, acc);
    } else if (entry.name === 'index.html') {
      acc.push(full);
    }
  });
  return acc;
}

function urlPathFromFile(file) {
  const rel = path.relative(PUBLIC_DIR, path.dirname(file)).split(path.sep).join('/');
  return rel === '' ? '/' : `/${rel}/`;
}

function isExcluded(urlPath) {
  return EXCLUDE_PREFIXES.some(prefix => urlPath.startsWith(prefix));
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function cleanTitle(raw) {
  let title = decodeEntities(raw).replace(/\s+/g, ' ').trim();
  if (title.endsWith(TITLE_SUFFIX)) {
    title = title.slice(0, -TITLE_SUFFIX.length).trim();
  }
  return title;
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? cleanTitle(match[1]) : '';
}

function extractDescription(html) {
  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  const descTag = metas.find(tag => /name=["']description["']/i.test(tag));
  if (descTag) {
    const content = descTag.match(/content=["']([^"']*)["']/i);
    if (content) return decodeEntities(content[1]).replace(/\s+/g, ' ').trim();
  }
  return '';
}

function prettifySegment(segment) {
  if (!segment) return SITE_TITLE;
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function loadPages() {
  const files = walkHtml(PUBLIC_DIR);
  const pages = [];
  files.forEach(file => {
    const urlPath = urlPathFromFile(file);
    if (isExcluded(urlPath)) return;
    const html = fs.readFileSync(file, 'utf8');
    const segments = urlPath.split('/').filter(Boolean);
    const title = extractTitle(html) || prettifySegment(segments[segments.length - 1] || '');
    pages.push({
      urlPath,
      url: `${SITE_ORIGIN}${urlPath}`,
      title: urlPath === '/' ? title || 'Home' : title,
      description: extractDescription(html),
      segment: segments[0] || '',
      depth: segments.length,
      isIndex: segments.length <= 1,
    });
  });
  return pages;
}

function buildSections(pages) {
  const rootPage = pages.find(p => p.depth === 0) || null;
  const rest = pages.filter(p => p !== rootPage);

  const groups = new Map();
  rest.forEach(page => {
    if (!groups.has(page.segment)) groups.set(page.segment, []);
    groups.get(page.segment).push(page);
  });

  const realSegments = new Set();
  groups.forEach((group, segment) => {
    if (group.length > 1 || group.some(p => p.depth > 1)) realSegments.add(segment);
  });

  const mainPages = [];
  if (rootPage) mainPages.push(rootPage);
  groups.forEach((group, segment) => {
    if (!realSegments.has(segment)) mainPages.push(...group);
  });
  mainPages.sort((a, b) => {
    if (a.depth !== b.depth) return a.depth - b.depth;
    return a.title.localeCompare(b.title);
  });

  const sections = [];
  if (mainPages.length) {
    sections.push({ title: 'Main Pages', segment: '', pages: mainPages });
  }

  const realSectionList = [...realSegments].map(segment => {
    const group = groups.get(segment);
    const indexPage = group.find(p => p.depth === 1);
    group.sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return a.title.localeCompare(b.title);
    });
    return {
      title: indexPage ? indexPage.title : prettifySegment(segment),
      segment,
      pages: group,
    };
  });

  realSectionList.sort((a, b) => {
    const ai = SECTION_ORDER_HINT.indexOf(a.segment);
    const bi = SECTION_ORDER_HINT.indexOf(b.segment);
    if (ai !== -1 || bi !== -1) {
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }
    return a.title.localeCompare(b.title);
  });

  return sections.concat(realSectionList);
}

function renderMarkdown(sections) {
  const lines = [];
  lines.push(`# ${SITE_TITLE}`);
  lines.push('');
  lines.push(`> ${SITE_DESCRIPTION}`);
  lines.push('');
  sections.forEach(section => {
    lines.push(`## ${section.title}`);
    lines.push('');
    section.pages.forEach(page => {
      const suffix = page.description ? `: ${page.description}` : '';
      lines.push(`- [${page.title}](${page.url})${suffix}`);
    });
    lines.push('');
  });
  lines.push('## Optional');
  lines.push('');
  lines.push(`- [AI Sitemap](${SITE_ORIGIN}/ai-sitemap.json): JSON content map of every page.`);
  lines.push(`- [Documentation](${SITE_ORIGIN}/docs/llms.txt): Full documentation manifest.`);
  lines.push('');
  return lines.join('\n');
}

function renderJson(sections) {
  return {
    name: SITE_TITLE,
    url: `${SITE_ORIGIN}/`,
    description: SITE_DESCRIPTION,
    sections: sections.map(section => ({
      title: section.title,
      pages: section.pages.map(page => ({
        title: page.title,
        url: page.url,
        description: page.description,
      })),
    })),
  };
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR) || walkHtml(PUBLIC_DIR).length === 0) {
    console.error(
      'No built pages found in public/. Run "npm run build" before "npm run gen-llms".',
    );
    process.exit(1);
  }

  const pages = loadPages();
  const sections = buildSections(pages);
  const md = renderMarkdown(sections);
  const json = `${JSON.stringify(renderJson(sections), null, 2)}\n`;

  const targets = [STATIC_DIR, PUBLIC_DIR];
  targets.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'llms.txt'), md);
    fs.writeFileSync(path.join(dir, 'ai-sitemap.json'), json);
  });

  const total = sections.reduce((sum, s) => sum + s.pages.length, 0);
  console.log(
    `Wrote llms.txt and ai-sitemap.json to ${targets
      .map(d => path.relative(ROOT, d))
      .join(', ')} (${sections.length} sections, ${total} pages).`,
  );
}

main();
