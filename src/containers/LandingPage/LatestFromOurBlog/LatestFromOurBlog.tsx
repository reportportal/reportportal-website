import React, { FC } from 'react';
import classNames from 'classnames';
import { ArticlePreview } from '@app/components/ArticlePreview';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder, defaultSpringTransition, PropsWithAnimation } from '@app/utils';
import { useLatestFromOurBlog } from '@app/hooks/useLatestFromOurBlog';
import { AnimatedHeader } from '@app/components/AnimatedHeader';

import './LatestFromOurBlog.scss';

const getBlocksWith = createBemBlockBuilder(['latest-from-our-blog']);

interface LatestFromOurBlogProps {
  isViewAll?: boolean;
}

export const LatestFromOurBlog: FC<PropsWithAnimation<LatestFromOurBlogProps>> = ({
  isViewAll,
  isAnimationEnabled = false,
}) => {
  const posts = useLatestFromOurBlog();

  return (
    <section className={classNames(getBlocksWith(), 'container')}>
      <AnimatedHeader
        className={getBlocksWith('__title')}
        isAnimationEnabled={isAnimationEnabled}
        transition={defaultSpringTransition}
      >
        Latest from our blog
      </AnimatedHeader>
      <div className={getBlocksWith('__latest-post')}>
        <ArticlePreview posts={posts} isAnimationEnabled={isAnimationEnabled} hasFixedItemsPerRow />
      </div>
      {isViewAll && (
        <Link className="btn btn--outline btn--large latest-from-our-blog__button" to="/blog/">
          View all
        </Link>
      )}
    </section>
  );
};
