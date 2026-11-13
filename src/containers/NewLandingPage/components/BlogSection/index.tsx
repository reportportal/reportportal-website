import React, { FC } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';
import { ArticlePreview } from '@app/components/ArticlePreview';
import { Link } from '@app/components/Link';
import { useLatestFromOurBlog } from '@app/hooks/useLatestFromOurBlog';

import './BlogSection.scss';

const getBlocksWith = createBemBlockBuilder(['blog-section']);

export const BlogSection: FC = () => {
  const posts = useLatestFromOurBlog();

  return (
    <section className={classNames(getBlocksWith(), 'container')}>
      <h2 className={getBlocksWith('__title')}>Latest from our blog</h2>

      <div className={getBlocksWith('__posts')}>
        <ArticlePreview posts={posts} isAnimationEnabled={false} />
      </div>

      <div className={getBlocksWith('__cta')}>
        <Link className="btn btn--outline btn--large" to="/blog/" data-gtm="view_all_articles">
          View all articles
        </Link>
      </div>
    </section>
  );
};
