import React, { FC, useCallback, useMemo } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import { compact, isEmpty, isString } from 'lodash';
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

const normalizeCategoryToArray = (category: string | string[] | null | undefined) => {
  if (!category) {
    return [];
  }

  return Array.isArray(category) ? category : [category];
};

const normalizeCategoryString = (category: string | null | undefined) =>
  isString(category) ? category.trim() : '';

const BlogIndex: FC<PageProps<BlogPostsQueryDto>> = ({ data: { allContentfulBlogPost } }) => {
  const { nodes: allPosts } = allContentfulBlogPost;
  const location = useLocation();

  const params = useMemo(() => parseBlogParams(location.search), [location.search]);
  const { searchQuery, selectedCategories, page } = params;

  const searchTokens = useMemo(
    () => compact(normalizeSearchText(searchQuery.trim()).split(/\s+/)),
    [searchQuery],
  );
  const isSearchActive = !isEmpty(searchTokens);

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

    if (!isEmpty(searchTokens)) {
      filtered = filtered.filter(post => {
        const index = post.searchIndex;

        return isString(index) && searchTokens.every(token => index.includes(token));
      });
    }

    return filtered;
  }, [allPosts, selectedCategories, searchTokens]);

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

  const handleSearchChange = useCallback(
    (value: string) => {
      updateParams({ searchQuery: value, page: 1 });
    },
    [updateParams],
  );

  const handleCategoryToggle = useCallback(
    (category: string) => {
      const nextCategories = selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category];
      updateParams({ selectedCategories: nextCategories, page: 1 });
    },
    [selectedCategories, updateParams],
  );

  const handleAllArticlesClick = useCallback(() => {
    updateParams({ selectedCategories: [], page: 1 });
  }, [updateParams]);

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
