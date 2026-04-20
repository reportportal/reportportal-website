import React, { FC } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Typography } from 'antd';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BlogPostDto, createBemBlockBuilder } from '@app/utils';
import { Highlight } from '@app/components/Highlight';

import { ArticleAuthor } from './ArticleAuthor';

import './ArticlePreviewItem.scss';

const getBlocksWith = createBemBlockBuilder(['article-preview-item']);

interface ArticlePreviewItemProps {
  post: BlogPostDto;
  searchQuery?: string;
  // The first cards are above the fold - render them eagerly so the browser
  // doesn't treat them as lazy and delay the request.
  isEager?: boolean;
}

const getCategoryLabel = (category: BlogPostDto['category']): string =>
  Array.isArray(category) ? category.join(', ') : '';

export const ArticlePreviewItem: FC<ArticlePreviewItemProps> = ({
  post,
  searchQuery,
  isEager = false,
}) => {
  const featuredImage = getImage(post.featuredImage.gatsbyImageData);

  return (
    <li className={getBlocksWith()}>
      <Link to={`/blog/${post.slug}`} className={getBlocksWith('__link')}>
        <div className={getBlocksWith('__featured-image')}>
          {featuredImage && (
            <GatsbyImage
              image={featuredImage}
              alt={post.featuredImage.description ?? ''}
              loading={isEager ? 'eager' : 'lazy'}
            />
          )}
        </div>
        <div className={getBlocksWith('__content')}>
          <p className={getBlocksWith('__category')}>{getCategoryLabel(post.category)}</p>
          <h2 className={getBlocksWith('__title')}>
            <Highlight text={post.title.title} query={searchQuery} />
          </h2>
          {post.description?.raw && <div>{renderRichText(post.description)}</div>}
          <div className={getBlocksWith('__meta')}>
            <span className="meta">{post.publishDate}</span>
          </div>
          <Typography.Paragraph ellipsis={{ rows: 5 }} className={getBlocksWith('__excerpt')}>
            <Highlight text={post.leadParagraph.leadParagraph} query={searchQuery} />
          </Typography.Paragraph>
          <ArticleAuthor authorName={post.author} />
        </div>
      </Link>
    </li>
  );
};
