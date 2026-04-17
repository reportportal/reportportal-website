import React, { FC, useCallback, useMemo } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
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
  const isSearchActive = !isEmpty(searchQuery.trim());

  const updateParams = useCallback(
    (next: Partial<BlogParams>) => {
      navigate(buildBlogUrl({ ...params, ...next }), { replace: true });
    },
    [params],
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

    const query = searchQuery.replace(/\s+/g, ' ').trim().toLowerCase();
    if (query) {
      filtered = filtered.filter(post => post.searchIndex?.includes(query) ?? false);
    }

    return filtered;
  }, [allPosts, searchQuery, selectedCategories]);

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
