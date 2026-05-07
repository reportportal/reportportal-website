import { compact, escapeRegExp } from 'lodash';

/** NFKD, strip diacritics, invariant lowercasing — keep in sync with blog search tokens. */
export const normalizeSearchText = (input: string): string =>
  input
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export interface HighlightRange {
  start: number;
  end: number;
}

/** Same whitespace collapsing as the search query (`phrase`) so matches align with multi-space source text. */
const collapseWhitespaceWithOrigIndexMap = (
  text: string,
): { collapsed: string; collapsedCharToOrigIndex: number[] } => {
  const collapsedCharToOrigIndex: number[] = [];
  let collapsed = '';
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (/\s/.test(ch)) {
      const runStart = i;

      while (i < text.length && /\s/.test(text[i])) {
        i += 1;
      }

      collapsed += ' ';
      collapsedCharToOrigIndex.push(runStart);
    } else {
      collapsed += ch;
      collapsedCharToOrigIndex.push(i);
      i += 1;
    }
  }

  return { collapsed, collapsedCharToOrigIndex };
};

/**
 * Per-code-unit normalized form (same token space as `normalizeSearchText`) plus index map back to `text`.
 */
const buildNormalizedTextAndIndexMap = (
  text: string,
): { normalizedText: string; indexMap: number[] } => {
  const indexMap: number[] = [];
  let normalizedText = '';

  for (let i = 0; i < text.length; i += 1) {
    const chunk = normalizeSearchText(text[i]);
    normalizedText += chunk;
    for (let j = 0; j < chunk.length; j += 1) {
      indexMap.push(i);
    }
  }

  return { normalizedText, indexMap };
};

/**
 * Ranges in `text` to highlight for UI when `query` matches per blog search normalization (diacritics, case).
 */
export const getHighlightRanges = (text: string, query: string | undefined): HighlightRange[] => {
  const phrase = query?.replace(/\s+/g, ' ').trim() ?? '';

  if (phrase.length === 0) {
    return [];
  }

  const normalizedPhrase = normalizeSearchText(phrase);

  if (normalizedPhrase.length === 0) {
    return [];
  }

  const { collapsed, collapsedCharToOrigIndex } = collapseWhitespaceWithOrigIndexMap(text);
  const { normalizedText, indexMap } = buildNormalizedTextAndIndexMap(collapsed);
  const matchRegex = new RegExp(escapeRegExp(normalizedPhrase), 'gi');
  const ranges: HighlightRange[] = [];

  let match = matchRegex.exec(normalizedText);
  while (match !== null) {
    const startNorm = match.index;
    const endNorm = startNorm + match[0].length;
    const startCollapsed = indexMap[startNorm];
    const endCollapsed = indexMap[endNorm - 1] + 1;
    const startOrig = collapsedCharToOrigIndex[startCollapsed];
    const endOrig = collapsedCharToOrigIndex[endCollapsed - 1] + 1;

    if (typeof startOrig === 'number' && typeof endOrig === 'number') {
      ranges.push({ start: startOrig, end: endOrig });
    }

    match = matchRegex.exec(normalizedText);
  }

  return ranges;
};

interface RichTextNode {
  nodeType?: string;
  value?: string;
  content?: RichTextNode[];
}

const collectText = (node: RichTextNode, out: string[]): void => {
  const stack: RichTextNode[] = [node];

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (typeof current.value === 'string') {
      out.push(current.value);
    }

    if (Array.isArray(current.content)) {
      for (let i = current.content.length - 1; i >= 0; i -= 1) {
        stack.push(current.content[i]);
      }
    }
  }
};

interface BlogPostSource {
  title?: { title?: string } | null;
  leadParagraph?: { leadParagraph?: string } | null;
  category?: string[] | null;
  articleBody?: { raw?: string } | null;
}

export const buildSearchIndex = (source: BlogPostSource): string => {
  const parts: string[] = [];

  if (source.title?.title) {
    parts.push(source.title.title);
  }

  if (source.leadParagraph?.leadParagraph) {
    parts.push(source.leadParagraph.leadParagraph);
  }

  if (Array.isArray(source.category)) {
    parts.push(compact(source.category).join(' '));
  }

  const raw = source.articleBody?.raw;
  if (typeof raw === 'string' && raw.length > 0) {
    try {
      const doc = JSON.parse(raw) as RichTextNode;
      const texts: string[] = [];
      collectText(doc, texts);
      parts.push(texts.join(' '));
    } catch (err) {
      // Malformed rich-text payload - skip body, keep other fields.
      // eslint-disable-next-line no-console
      console.warn('buildSearchIndex: failed to parse articleBody.raw', err);
    }
  }

  return normalizeSearchText(parts.join(' ').replace(/\s+/g, ' ').trim());
};
