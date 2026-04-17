import React, { FC, useMemo } from 'react';
import {
  ContentfulRichTextGatsbyReference,
  renderRichText,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import { Link } from '@app/components/Link';
import { SubscriptionBanner } from '@app/components/SubscriptionBanner';
import { useHighlight } from '@app/hooks/useHighlight';
import { BLOG_PAGE_SIZE, getBlogStateFromSession, serializeBlogStateToQuery } from '@app/utils';

import 'highlight.js/styles/base16/atelier-cave-light.css';

import ArrowLeft from './icons/arrow-left.svg';
import User from './icons/user.svg';
import Calendar from './icons/calendar.svg';
import { OPTIONS } from './constants';

import './BlogPostPage.scss';

interface BlogPostPageProps {
  author: string;
  articleBody: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  date: string;
  industry: string;
  title?: {
    title: string;
  };
}

export const BlogPostPage: FC<BlogPostPageProps> = ({
  industry,
  title,
  author,
  date,
  articleBody,
}) => {
  useHighlight();

  const backToBlogUrl = useMemo(() => {
    const blogPath = '/blog';
    const sessionState = getBlogStateFromSession();

    if (sessionState) {
      const queryString = serializeBlogStateToQuery(
        sessionState.searchQuery || '',
        sessionState.selectedCategories || [],
        sessionState.visibleCount || BLOG_PAGE_SIZE,
      );
      return queryString ? `${blogPath}?${queryString}` : blogPath;
    }

    return blogPath;
  }, []);

  return (
    <>
      <div className="blog-post-page">
        <div className="blog-post-page__head">
          <p className="blog-post-page__industry">{industry}</p>
          <h1 className="blog-post-page__title">{title?.title}</h1>
          <div className="blog-post-page__info">
            <Link className="btn btn--white btn--large back-to-blog" to={backToBlogUrl}>
              <img src={ArrowLeft} alt="arrow left" />
              Back to blog
            </Link>
            <div className="blog-post-page__info-aside">
              <div className="button-with-icon">
                <img className="button-with-icon__image" src={User} alt="user" />
                <span className="button-with-icon__text">{author}</span>
              </div>
              <div className="button-with-icon">
                <img className="button-with-icon__image" src={Calendar} alt="calendar" />
                <span className="button-with-icon__text">{date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-post-page__container container">
        {articleBody?.raw && renderRichText(articleBody, OPTIONS)}
      </div>
      <SubscriptionBanner />
    </>
  );
};
