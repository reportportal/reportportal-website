import React, { FC, Fragment } from 'react';
import { getHighlightRanges, type HighlightRange } from '@app/utils/buildSearchIndex';

import './Highlight.scss';

interface HighlightProps {
  text: string;
  query?: string;
}

const renderRanges = (text: string, ranges: HighlightRange[]): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  ranges.forEach(({ start, end }, index) => {
    const before = text.slice(cursor, start);
    const hit = text.slice(start, end);

    if (before) {
      parts.push(<Fragment key={`b-${index}`}>{before}</Fragment>);
    }
    if (hit) {
      parts.push(
        <span key={`h-${index}`} className="search-highlight">
          {hit}
        </span>,
      );
    }
    cursor = end;
  });

  const tail = text.slice(cursor);
  if (tail) {
    parts.push(<Fragment key="tail">{tail}</Fragment>);
  }

  return <>{parts}</>;
};

export const Highlight: FC<HighlightProps> = ({ text, query }) => {
  const ranges = getHighlightRanges(text, query);

  if (ranges.length === 0) {
    return <>{text}</>;
  }

  return <>{renderRanges(text, ranges)}</>;
};
