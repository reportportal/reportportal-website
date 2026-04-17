import React, { FC, useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import isEmpty from 'lodash/isEmpty';
import { Layout, Seo } from '@app/components/Layout';
import { BREADCRUMBS } from '@app/components/StructuredData';
import { BlogPage } from '@app/containers/BlogPage';
import {
  BlogPostsQueryDto,
  SEO_DATA,
  BLOG_PAGE_SIZE,
  deserializeBlogStateFromQuery,
  serializeBlogStateToQuery,
  saveBlogStateToSession,
  getBlogStateFromSession,
  clearBlogStateFromSession,
  restoreScrollPosition,
} from '@app/utils';
import isString from 'lodash/isString';

const SEARCH_RESULTS_LIMIT = 50;

const normalizeCategoryToArray = (category: string | string[] | null | undefined) => {
  if (!category) {
    return [];
  }

  return Array.isArray(category) ? category : [category];
};

const normalizeCategoryString = (category: string | null | undefined) => {
  return isString(category) ? category.trim() : '';
};

// Helper function to get initial state from URL params or sessionStorage
const getInitialBlogState = () => {
  if (typeof window === 'undefined') {
    return {
      searchQuery: '',
      selectedCategories: [] as string[],
      visibleCount: BLOG_PAGE_SIZE,
    };
  }

  // Check sessionStorage first for visibleCount (internal state, not in URL)
  const sessionState = getBlogStateFromSession();
  const savedVisibleCount = sessionState?.visibleCount || BLOG_PAGE_SIZE;

  // Try URL query params for search and categories
  const queryString = window.location.search;
  if (queryString) {
    const state = deserializeBlogStateFromQuery(queryString);
    return {
      searchQuery: state.searchQuery || '',
      selectedCategories: state.selectedCategories || [],
      visibleCount: savedVisibleCount, // Always use sessionStorage for visibleCount
    };
  }

  // Fallback to sessionStorage for all state
  if (sessionState) {
    return {
      searchQuery: sessionState.searchQuery || '',
      selectedCategories: sessionState.selectedCategories || [],
      visibleCount: savedVisibleCount,
    };
  }

  return {
    searchQuery: '',
    selectedCategories: [] as string[],
    visibleCount: BLOG_PAGE_SIZE,
  };
};

const BlogIndex: FC<PageProps<BlogPostsQueryDto>> = ({ data: { allContentfulBlogPost } }) => {
  const { nodes: allPosts } = allContentfulBlogPost;
  const location = useLocation();
  const hasInitializedRef = useRef(false);
  const scrollRestoredRef = useRef(false);
  const articleSlugToRestoreRef = useRef<string | null>(null);
  const scrollYToRestoreRef = useRef<number | undefined>(undefined);
  const articleTopToRestoreRef = useRef<number | undefined>(undefined);
  const isLoadingMoreRef = useRef(false);
  const scrollPositionBeforeLoadMoreRef = useRef<number | null>(null);

  // Immediately check for scroll restoration data and restore if available
  // This runs synchronously during component initialization, before React renders
  if (typeof window !== 'undefined' && !hasInitializedRef.current) {
    try {
      const sessionState = getBlogStateFromSession();
      if (sessionState?.articleSlug && sessionState.scrollY !== undefined) {
        // Store for later verification after content is rendered
        articleSlugToRestoreRef.current = sessionState.articleSlug;
        scrollYToRestoreRef.current = sessionState.scrollY;
        articleTopToRestoreRef.current = sessionState.articleTop;
        // Restore scroll position immediately to prevent flash
        // We'll verify/adjust it after content is rendered
        window.scrollTo({
          top: sessionState.scrollY,
          behavior: 'instant',
        });
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }

  // Initialize state from URL params or sessionStorage synchronously
  const [searchQuery, setSearchQuery] = useState(() => getInitialBlogState().searchQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    () => getInitialBlogState().selectedCategories,
  );
  const [visibleCount, setVisibleCount] = useState(() => getInitialBlogState().visibleCount);

  const resetVisibleCount = useCallback(() => {
    setVisibleCount(BLOG_PAGE_SIZE);
  }, []);

  // Setup scroll restoration from sessionStorage
  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;

    // Check sessionStorage for scroll restoration data
    const sessionState = getBlogStateFromSession();
    if (sessionState?.articleSlug) {
      // Store article slug and scroll position for restoration
      articleSlugToRestoreRef.current = sessionState.articleSlug;
      scrollYToRestoreRef.current = sessionState.scrollY;
      articleTopToRestoreRef.current = sessionState.articleTop;
      scrollRestoredRef.current = false;
      // Don't clear sessionStorage yet - wait until scroll restoration completes
    }
    // If no articleSlug, preserve sessionStorage for blog browsing state
    // (searchQuery, selectedCategories, visibleCount)
  }, []);

  // Sync state changes to URL query params
  useEffect(() => {
    if (!hasInitializedRef.current) {
      return;
    }

    const queryString = serializeBlogStateToQuery(searchQuery, selectedCategories, visibleCount);
    const newUrl = queryString ? `/blog?${queryString}` : '/blog';

    if (location.pathname + location.search !== newUrl) {
      // When loading more posts, use history.replaceState to avoid scroll reset
      // For other state changes (search, categories), use navigate()
      if (isLoadingMoreRef.current) {
        window.history.replaceState(null, '', newUrl);
      } else {
        navigate(newUrl, { replace: true });
      }
    }
  }, [searchQuery, selectedCategories, visibleCount, location.pathname, location.search]);

  // Persist blog state to sessionStorage whenever it changes
  useEffect(() => {
    if (!hasInitializedRef.current) {
      return;
    }

    // Save blog state to sessionStorage to preserve pagination state
    // Scroll restoration logic reads sessionStorage into refs early, so this won't interfere
    saveBlogStateToSession(searchQuery, selectedCategories, visibleCount);
  }, [searchQuery, selectedCategories, visibleCount]);

  const categories = useMemo(() => {
    const categorySet = new Set<string>();

    allPosts.forEach(post => {
      const categoryArray = normalizeCategoryToArray(post.category);

      categoryArray.forEach(cat => {
        const normalizedCategory = normalizeCategoryString(cat);

        if (normalizedCategory) {
          categorySet.add(normalizedCategory);
        }
      });
    });

    return Array.from(categorySet).sort();
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    if (!isEmpty(selectedCategories)) {
      filtered = filtered.filter(post => {
        const categories = normalizeCategoryToArray(post.category);

        return categories.some(category =>
          selectedCategories.includes(normalizeCategoryString(category)),
        );
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => {
        const title = post.title?.title?.toLowerCase() || '';
        const leadParagraph = post.leadParagraph?.leadParagraph?.toLowerCase() || '';
        const categoryArray = normalizeCategoryToArray(post.category);
        const categoryMatches = categoryArray.some(cat => {
          const catStr = normalizeCategoryString(cat).toLowerCase();

          return catStr.includes(query);
        });

        return title.includes(query) || leadParagraph.includes(query) || categoryMatches;
      });
    }

    return filtered;
  }, [allPosts, searchQuery, selectedCategories]);

  const isSearchActive = !isEmpty(searchQuery.trim());

  const visiblePosts = useMemo(
    () => filteredPosts.slice(0, isSearchActive ? SEARCH_RESULTS_LIMIT : visibleCount),
    [filteredPosts, visibleCount, isSearchActive],
  );

  // Verify and finalize scroll restoration after posts are rendered
  useEffect(() => {
    if (scrollRestoredRef.current || !visiblePosts.length || !articleSlugToRestoreRef.current) {
      return;
    }

    // If we have exact scrollY, verify it's correct after content is rendered
    if (scrollYToRestoreRef.current !== undefined) {
      // Use requestAnimationFrame to ensure DOM is laid out, then verify scroll position
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (scrollYToRestoreRef.current !== undefined) {
            // Verify scroll position is correct (it might have been reset)
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (Math.abs(currentScroll - scrollYToRestoreRef.current) > 10) {
              // Scroll was reset, restore it
              window.scrollTo({
                top: scrollYToRestoreRef.current,
                behavior: 'instant',
              });
            }
            // Mark as restored and clear refs
            articleSlugToRestoreRef.current = null;
            scrollYToRestoreRef.current = undefined;
            articleTopToRestoreRef.current = undefined;
            scrollRestoredRef.current = true;
            // Clear sessionStorage after restoration
            clearBlogStateFromSession();
          }
        });
      });
      return;
    }

    // Fallback: element-based restoration if scrollY wasn't available
    // Retry mechanism to ensure DOM is ready
    let attempts = 0;
    const maxAttempts = 10;
    const attemptDelay = 50;

    const attemptRestore = () => {
      attempts += 1;

      if (!articleSlugToRestoreRef.current) {
        return;
      }

      const articleSlug = articleSlugToRestoreRef.current;
      const articleElement = document.querySelector(`[data-article-slug="${articleSlug}"]`);

      if (articleElement || attempts >= maxAttempts) {
        // Element found or max attempts reached, restore scroll position
        if (articleElement) {
          restoreScrollPosition(
            articleSlug,
            scrollYToRestoreRef.current,
            articleTopToRestoreRef.current,
          );
        }

        // Mark as restored and clear refs
        articleSlugToRestoreRef.current = null;
        scrollYToRestoreRef.current = undefined;
        articleTopToRestoreRef.current = undefined;
        scrollRestoredRef.current = true;

        // Clear sessionStorage only after restoration attempt
        clearBlogStateFromSession();
      } else if (attempts < maxAttempts) {
        // Element not found yet, retry after delay
        setTimeout(attemptRestore, attemptDelay);
      }
    };

    // Start restoration attempt after short delay to ensure DOM is ready
    setTimeout(attemptRestore, attemptDelay);
  }, [visiblePosts.length]);

  // Restore scroll position after loading more posts
  useEffect(() => {
    if (!isLoadingMoreRef.current || scrollPositionBeforeLoadMoreRef.current === null) {
      return;
    }

    // Wait for DOM to update with new posts
    const restoreScroll = () => {
      if (scrollPositionBeforeLoadMoreRef.current !== null) {
        window.scrollTo({
          top: scrollPositionBeforeLoadMoreRef.current,
          behavior: 'instant',
        });
        scrollPositionBeforeLoadMoreRef.current = null;
        isLoadingMoreRef.current = false;
      }
    };

    // Use multiple requestAnimationFrame calls to ensure DOM is fully updated
    // This ensures React has finished rendering and the browser has laid out the new content
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(restoreScroll, 0);
      });
    });
  }, [visibleCount, visiblePosts.length]);

  const loadMorePosts = useCallback(() => {
    if (!isSearchActive) {
      // Save current scroll position before loading more posts
      scrollPositionBeforeLoadMoreRef.current =
        window.pageYOffset || document.documentElement.scrollTop;
      isLoadingMoreRef.current = true;
      setVisibleCount(prev => Math.min(prev + BLOG_PAGE_SIZE, filteredPosts.length));
    }
  }, [filteredPosts.length, isSearchActive]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      if (!value.trim()) {
        resetVisibleCount();
      }
    },
    [resetVisibleCount],
  );

  const handleCategoryToggle = useCallback(
    (category: string) => {
      setSelectedCategories(prev => {
        if (prev.includes(category)) {
          return prev.filter(c => c !== category);
        }

        return [...prev, category];
      });
      resetVisibleCount();
    },
    [resetVisibleCount],
  );

  const handleAllArticlesClick = useCallback(() => {
    setSelectedCategories([]);
    resetVisibleCount();
  }, [resetVisibleCount]);

  const handleArticleClick = useCallback(
    (slug: string, scrollY: number, articleTop: number) => {
      saveBlogStateToSession(
        searchQuery,
        selectedCategories,
        visibleCount,
        slug,
        scrollY,
        articleTop,
      );
    },
    [searchQuery, selectedCategories, visibleCount],
  );

  return (
    <Layout>
      <BlogPage
        visiblePosts={visiblePosts}
        filteredPosts={filteredPosts}
        loadMorePosts={loadMorePosts}
        categories={categories}
        searchQuery={searchQuery}
        selectedCategories={selectedCategories}
        isSearchActive={isSearchActive}
        onSearchChange={handleSearchChange}
        onCategoryToggle={handleCategoryToggle}
        onAllArticlesClick={handleAllArticlesClick}
        onArticleClick={handleArticleClick}
      />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { date: DESC }) {
      nodes {
        id
        slug
        date(formatString: "MMMM Do, YYYY")
        author
        articleBody {
          raw
        }
        title {
          title
        }
        leadParagraph {
          leadParagraph
        }
        category
        featuredImage {
          file {
            url
          }
          description
        }
      }
    }
  }
`;

export const Head = () => {
  const { title, description } = SEO_DATA.blog;

  return (
    <Seo
      title={title}
      description={description}
      breadcrumbs={[BREADCRUMBS.home, BREADCRUMBS.blog]}
    />
  );
};
