import React, { FC, Fragment } from 'react';
import { escapeRegExp } from 'lodash';

import './Highlight.scss';

interface HighlightProps {
  text: string;
  query?: string;
}

export const Highlight: FC<HighlightProps> = ({ text, query }) => {
  const phrase = query?.replace(/\s+/g, ' ').trim() ?? '';

  if (phrase.length === 0) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${escapeRegExp(phrase)})`, 'gi');
  const parts = text.split(regex);
  const lowerPhrase = phrase.toLowerCase();

  return (
    <>
      {parts.map((part, index) => {
        const key = `${index}-${part}`;

        return part.toLowerCase() === lowerPhrase ? (
          <span key={key} className="search-highlight">
            {part}
          </span>
        ) : (
          <Fragment key={key}>{part}</Fragment>
        );
      })}
    </>
  );
};
