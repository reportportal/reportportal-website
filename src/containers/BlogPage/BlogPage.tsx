import React, { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ArticlePreview } from '@app/components/ArticlePreview';
import { SubscriptionBanner } from '@app/components/SubscriptionBanner';
import { BlogSearch } from '@app/components/BlogSearch';
import { CategoryFilters } from '@app/components/BlogSearch/CategoryFilters';
import { createBemBlockBuilder, BlogPostDto, defaultSpringTransition } from '@app/utils';
import { AnimatedHeader } from '@app/components/AnimatedHeader';

import './BlogPage.scss';

interface BlogPageProps {
  visiblePosts: BlogPostDto[];
  filteredPosts: BlogPostDto[];
  loadMorePosts: () => void;
  categories: string[];
  searchQuery: string;
  selectedCategories: string[];
  isSearchActive: boolean;
  onSearchChange: (value: string) => void;
  onCategoryToggle: (category: string) => void;
  onAllArticlesClick: () => void;
  onArticleClick?: (slug: string, scrollY: number, articleTop: number) => void;
}

const maxResultsCount = 50;
const getBlocksWith = createBemBlockBuilder(['blog']);

export const BlogPage: FC<BlogPageProps> = ({
  visiblePosts,
  filteredPosts,
  loadMorePosts,
  categories,
  searchQuery,
  selectedCategories,
  isSearchActive,
  onSearchChange,
  onCategoryToggle,
  onAllArticlesClick,
  onArticleClick,
}) => {
  const getResultsCountText = () => {
    if (!isSearchActive) {
      return 'Start typing to search';
    }

    const count = filteredPosts.length;

    if (count >= maxResultsCount) {
      return `${maxResultsCount}+ matching results`;
    }

    return `${count} matching result${count !== 1 ? 's' : ''}`;
  };

  const showLoadMore = !isSearchActive && visiblePosts.length < filteredPosts.length;

  return (
    <>
      <div className={getBlocksWith()}>
        <div className="container">
          <AnimatedHeader
            isAnimationEnabled={false}
            headerLevel={1}
            transition={defaultSpringTransition}
            className={getBlocksWith('__title')}
          >
            Blog
          </AnimatedHeader>
          <AnimatedHeader
            isAnimationEnabled={false}
            transition={defaultSpringTransition}
            delay={0.1}
            className={getBlocksWith('__subtitle')}
          >
            Product updates, news and technology articles
          </AnimatedHeader>
          <div className={getBlocksWith('__search-section')}>
            <BlogSearch value={searchQuery} onChange={onSearchChange} />
            <CategoryFilters
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={onCategoryToggle}
              onAllArticlesClick={onAllArticlesClick}
            />
            <div className={getBlocksWith('__results-count')}>{getResultsCountText()}</div>
            {isSearchActive && isEmpty(filteredPosts) && (
              <div className={getBlocksWith('__no-results')}>
                No results found for your search. Try different keywords or check your filter.
              </div>
            )}
          </div>
          <ArticlePreview
            posts={visiblePosts}
            isAnimationEnabled={false}
            onArticleClick={onArticleClick}
          />
          {showLoadMore && (
            <div className={getBlocksWith('__footer')}>
              <button className="btn btn--outline btn--large" onClick={loadMorePosts}>
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
      <SubscriptionBanner />
    </>
  );
};
