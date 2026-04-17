import React, { FC, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ArticlePreview } from '@app/components/ArticlePreview';
import { SubscriptionBanner } from '@app/components/SubscriptionBanner';
import { BlogSearch } from '@app/components/BlogSearch';
import { CategoryFilters } from '@app/components/BlogSearch/CategoryFilters';
import {
  createBemBlockBuilder,
  BlogPostDto,
  defaultSpringTransition,
  SEARCH_RESULTS_LIMIT,
} from '@app/utils';
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
}

const getBlocksWith = createBemBlockBuilder(['blog']);

const getResultsCountText = (count: number) => {
  if (count > SEARCH_RESULTS_LIMIT) {
    return `${SEARCH_RESULTS_LIMIT}+ matching results`;
  }

  return `${count} matching result${count === 1 ? '' : 's'}`;
};

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
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const showLoadMore = !isSearchActive && visiblePosts.length < filteredPosts.length;
  const hasNoResults = isSearchActive && isEmpty(filteredPosts);

  let statusText: string | null = null;
  if (isSearchActive && !hasNoResults) {
    statusText = getResultsCountText(filteredPosts.length);
  } else if (!isSearchActive && isSearchFocused) {
    statusText = 'Start typing to search';
  }

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
            <BlogSearch
              value={searchQuery}
              onChange={onSearchChange}
              onFocusChange={setIsSearchFocused}
            />
            <CategoryFilters
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={onCategoryToggle}
              onAllArticlesClick={onAllArticlesClick}
            />
            {statusText && <div className={getBlocksWith('__results-count')}>{statusText}</div>}
            {hasNoResults && (
              <div className={getBlocksWith('__no-results')}>
                No results found for your search. Try different keywords or check your filter.
              </div>
            )}
          </div>
          <ArticlePreview
            posts={visiblePosts}
            isAnimationEnabled={false}
            searchQuery={searchQuery}
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
