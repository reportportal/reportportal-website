import React, { FC, Fragment } from 'react';
import { escapeRegExp } from 'lodash';

import './Highlight.scss';

interface HighlightProps {
  text: string;
  query?: string;
}

export const Highlight: FC<HighlightProps> = ({ text, query }) => {
  const tokens = query?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (tokens.length === 0) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(regex);
  const lowerTokens = new Set(tokens.map(token => token.toLowerCase()));

  return (
    <>
      {parts.map((part, index) => {
        const key = `${index}-${part}`;

        return lowerTokens.has(part.toLowerCase()) ? (
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
