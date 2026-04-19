/** NFKD, strip diacritics, locale-aware lowercasing — keep in sync with blog search tokens. */
export const normalizeSearchText = (input: string): string =>
  input
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase();

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
    parts.push(source.category.filter(Boolean).join(' '));
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
