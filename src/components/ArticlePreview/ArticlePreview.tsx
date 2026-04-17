import React, { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import chunk from 'lodash/chunk';
import { useMediaQuery } from 'react-responsive';
import { BlogPostDto, MEDIA_DESKTOP_SM, MEDIA_TABLET_SM, PropsWithAnimation } from '@app/utils';

import { ArticlePreviewRow } from './ArticlePreviewRow';

import './ArticlePreview.scss';

interface ArticlePreviewProps {
  posts: BlogPostDto[];
  hasFixedItemsPerRow?: boolean;
  searchQuery?: string;
}

const getItemsPerRow = (isDesktop: boolean, isTablet: boolean) => {
  if (isDesktop) {
    return 3;
  }

  if (isTablet) {
    return 2;
  }

  return 1;
};

export const ArticlePreview: FC<PropsWithAnimation<ArticlePreviewProps>> = ({
  posts,
  hasFixedItemsPerRow = false,
  isAnimationEnabled = false,
  searchQuery,
}) => {
  const isDesktop = useMediaQuery({ query: MEDIA_DESKTOP_SM });
  const isTablet = useMediaQuery({ query: MEDIA_TABLET_SM });
  const rows = chunk(posts, hasFixedItemsPerRow ? 3 : getItemsPerRow(isDesktop, isTablet));

  return !isEmpty(posts) ? (
    <ul>
      {rows.map((row, rowIndex) => (
        <ArticlePreviewRow
          key={rowIndex}
          row={row}
          isAnimationEnabled={isAnimationEnabled}
          searchQuery={searchQuery}
        />
      ))}
    </ul>
  ) : null;
};
