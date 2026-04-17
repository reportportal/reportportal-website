import React, { FC } from 'react';
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

import { ArticlePreviewItem } from '../ArticlePreviewItem';

interface ArticlePreviewRowProps {
  row: BlogPostDto[];
  onArticleClick?: (slug: string, scrollY: number, articleTop: number) => void;
}

const getBlocksWith = createBemBlockBuilder(['article-preview-list']);

export const ArticlePreviewRow: FC<PropsWithAnimation<ArticlePreviewRowProps>> = ({
  row,
  isAnimationEnabled = false,
  onArticleClick,
}) => {
  const [rowRef, isInView] = useInView();
  const getAnimation = useMotionEnterAnimation(
    {
      ...opacityScaleAnimationProps,
      ...getEaseInOutTransition(0.7),
    },
    isAnimationEnabled,
  );

  return (
    <motion.div
      ref={rowRef}
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
      {row.map(post => (
        <ArticlePreviewItem key={post.id} post={post} onArticleClick={onArticleClick} />
      ))}
    </motion.div>
  );
};
