interface RichTextNode {
  nodeType?: string;
  value?: string;
  content?: RichTextNode[];
}

const collectText = (node: RichTextNode, out: string[]): void => {
  if (typeof node.value === 'string') {
    out.push(node.value);
  }

  if (Array.isArray(node.content)) {
    node.content.forEach(child => collectText(child, out));
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
    } catch {
      // Malformed rich-text payload - skip body, keep other fields.
    }
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim().toLowerCase();
};
