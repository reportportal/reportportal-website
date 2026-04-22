import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { useDebounceEffect } from 'ahooks';
import { isEmpty, isString } from 'lodash';
import { Layout, Seo } from '@app/components/Layout';
import { BREADCRUMBS } from '@app/components/StructuredData';
import { BlogPage } from '@app/containers/BlogPage';
import {
  BlogPostsQueryDto,
  SEO_DATA,
  BLOG_PAGE_SIZE,
  SEARCH_RESULTS_LIMIT,
  BlogParams,
  parseBlogParams,
  buildBlogUrl,
} from '@app/utils';
import { normalizeSearchText } from '@app/utils/buildSearchIndex';

const SEARCH_URL_DEBOUNCE_MS = 250;

const normalizeCategoryToArray = (category: string | string[] | null | undefined) => {
  if (!category) {
    return [];
  }

  return Array.isArray(category) ? category : [category];
};

const normalizeCategoryString = (category: string | null | undefined) =>
  isString(category) ? category.trim() : '';

const BlogIndex: FC<PageProps<BlogPostsQueryDto>> = ({
  data: { allContentfulBlogPost },
  location,
}) => {
  const { nodes: allPosts } = allContentfulBlogPost;

  const params = useMemo(() => parseBlogParams(location.search), [location.search]);
  const { selectedCategories, page } = params;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    () => parseBlogParams(location.search).searchQuery,
  );

  useEffect(() => {
    if (isSearchFocused) {
      return;
    }
    setSearchQuery(parseBlogParams(location.search).searchQuery);
  }, [isSearchFocused, location.search]);

  const searchPhrase = useMemo(
    () => normalizeSearchText(searchQuery).replace(/\s+/g, ' ').trim(),
    [searchQuery],
  );
  const isSearchActive = searchPhrase.length > 0;

  const updateParams = useCallback(
    (next: Partial<BlogParams>) => {
      const nextUrl = buildBlogUrl({ ...params, ...next });
      const currentUrl = `${location.pathname}${location.search}`;

      // Skip navigation when the URL wouldn't actually change (e.g. typing a
      // lone space which gets trimmed away in buildBlogUrl). A no-op navigate
      // still triggers Gatsby's scroll handling and can snap the page to top.
      if (nextUrl === currentUrl) {
        return;
      }

      navigate(nextUrl, { replace: true });
    },
    [params, location.pathname, location.search],
  );

  const categories = useMemo(() => {
    const categorySet = new Set<string>();

    allPosts.forEach(post => {
      normalizeCategoryToArray(post.category).forEach(cat => {
        const normalized = normalizeCategoryString(cat);

        if (normalized) {
          categorySet.add(normalized);
        }
      });
    });

    return Array.from(categorySet).sort();
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    if (!isEmpty(selectedCategories)) {
      filtered = filtered.filter(post => {
        const postCategories = normalizeCategoryToArray(post.category);

        return postCategories.some(category =>
          selectedCategories.includes(normalizeCategoryString(category)),
        );
      });
    }

    if (searchPhrase) {
      filtered = filtered.filter(
        post => isString(post.searchIndex) && post.searchIndex.includes(searchPhrase),
      );
    }

    return filtered;
  }, [allPosts, selectedCategories, searchPhrase]);

  const visibleCount = isSearchActive ? SEARCH_RESULTS_LIMIT : page * BLOG_PAGE_SIZE;
  const visiblePosts = useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount],
  );

  const loadMorePosts = useCallback(() => {
    if (!isSearchActive) {
      updateParams({ page: page + 1 });
    }
  }, [isSearchActive, page, updateParams]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  useDebounceEffect(
    () => {
      // Only reset pagination when the search query actually changes vs the URL
      if (searchQuery.trim() === params.searchQuery.trim()) {
        return;
      }

      updateParams({ searchQuery, page: 1 });
    },
    [searchQuery, params.searchQuery],
    { wait: SEARCH_URL_DEBOUNCE_MS },
  );

  const handleCategoryToggle = useCallback(
    (category: string) => {
      const nextCategories = selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category];
      updateParams({ selectedCategories: nextCategories, searchQuery, page: 1 });
    },
    [searchQuery, selectedCategories, updateParams],
  );

  const handleAllArticlesClick = useCallback(() => {
    updateParams({ selectedCategories: [], searchQuery, page: 1 });
  }, [searchQuery, updateParams]);

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
        onSearchFocusChange={setIsSearchFocused}
        onCategoryToggle={handleCategoryToggle}
        onAllArticlesClick={handleAllArticlesClick}
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
        searchIndex
        title {
          title
        }
        leadParagraph {
          leadParagraph
        }
        category
        featuredImage {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 760
            height: 420
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
          file {
            url
            contentType
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
