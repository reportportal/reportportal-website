import React, { FC, Fragment } from 'react';
import escapeRegExp from 'lodash/escapeRegExp';

import './Highlight.scss';

interface HighlightProps {
  text: string;
  query?: string;
}

export const Highlight: FC<HighlightProps> = ({ text, query }) => {
  const trimmed = query?.trim();

  if (!trimmed) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${escapeRegExp(trimmed)})`, 'gi');
  const parts = text.split(regex);
  const lowerQuery = trimmed.toLowerCase();

  return (
    <>
      {parts.map((part, index) => {
        const key = `${index}-${part}`;

        return part.toLowerCase() === lowerQuery ? (
          <span key={key} className="highlight">
            {part}
          </span>
        ) : (
          <Fragment key={key}>{part}</Fragment>
        );
      })}
    </>
  );
};
