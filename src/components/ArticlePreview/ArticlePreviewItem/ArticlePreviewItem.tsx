import React, { FC, useRef } from 'react';
import { Link } from 'gatsby';
import { Typography } from 'antd';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BlogPostDto, createBemBlockBuilder } from '@app/utils';

import { ArticleAuthor } from './ArticleAuthor';

import './ArticlePreviewItem.scss';

const getBlocksWith = createBemBlockBuilder(['article-preview-item']);

interface ArticlePreviewItemProps {
  post: BlogPostDto;
  onArticleClick?: (slug: string, scrollY: number, articleTop: number) => void;
}

export const ArticlePreviewItem: FC<ArticlePreviewItemProps> = ({ post, onArticleClick }) => {
  const articleRef = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    if (onArticleClick && articleRef.current) {
      const rect = articleRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const articleTop = rect.top + scrollY;

      onArticleClick(post.slug, scrollY, articleTop);
    }
  };

  return (
    <li ref={articleRef} className={getBlocksWith()} data-article-slug={post.slug}>
      <Link to={`/blog/${post.slug}`} className={getBlocksWith('__link')} onClick={handleClick}>
        <div className={getBlocksWith('__featured-image')}>
          <img alt={post.featuredImage.description} src={post.featuredImage.file.url} />
        </div>
        <div className={getBlocksWith('__content')}>
          <p className={getBlocksWith('__category')}>{post.category.join(', ')}</p>
          <h2 className={getBlocksWith('__title')}>{post.title.title}</h2>
          {post.description?.raw && <div>{renderRichText(post.description)}</div>}
          <div className={getBlocksWith('__meta')}>
            <span className="meta">{post.publishDate}</span>
          </div>
          <Typography.Paragraph ellipsis={{ rows: 5 }} className={getBlocksWith('__excerpt')}>
            {post.leadParagraph.leadParagraph}
          </Typography.Paragraph>
          <ArticleAuthor authorName={post.author} />
        </div>
      </Link>
    </li>
  );
};
