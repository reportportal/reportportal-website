import React, { FC } from 'react';
import { isEmpty } from 'lodash';
import { motion } from 'framer-motion';
import {
  BlogPostDto,
  createBemBlockBuilder,
  getEaseInOutTransition,
  opacityScaleAnimationProps,
  PropsWithAnimation,
} from '@app/utils';
import { useInView } from '@app/hooks/useInView';
import { useMotionEnterAnimation } from '@app/hooks/useMotionEnterAnimation';

import { ArticlePreviewItem } from './ArticlePreviewItem';

import './ArticlePreview.scss';

interface ArticlePreviewProps {
  posts: BlogPostDto[];
  searchQuery?: string;
}

const getBlocksWith = createBemBlockBuilder(['article-preview-list']);

export const ArticlePreview: FC<PropsWithAnimation<ArticlePreviewProps>> = ({
  posts,
  isAnimationEnabled = false,
  searchQuery,
}) => {
  const [listRef, isInView] = useInView();
  const getAnimation = useMotionEnterAnimation(
    {
      ...opacityScaleAnimationProps,
      ...getEaseInOutTransition(0.7),
    },
    isAnimationEnabled,
  );

  if (isEmpty(posts)) {
    return null;
  }

  return (
    <motion.ul
      ref={listRef}
      className={getBlocksWith()}
      {...getAnimation({
        isInView,
        additionalEffects: {
          hiddenAdditional: {
            y: 150,
          },
          enterAdditional: {
            y: 0,
          },
        },
      })}
    >
      {posts.map(post => (
        <ArticlePreviewItem key={post.id} post={post} searchQuery={searchQuery} />
      ))}
    </motion.ul>
  );
};
