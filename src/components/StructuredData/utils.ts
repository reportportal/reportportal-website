import { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import striptags from 'striptags';

export const extractText = (node: ReactElement): string =>
  striptags(renderToStaticMarkup(node)).replace(/\s+/g, ' ').trim();
