import React, { FC, useCallback, useState } from 'react';
import { PageProps, graphql } from 'gatsby';
import { Layout, Seo } from '@app/components/Layout';
import { BREADCRUMBS } from '@app/components/StructuredData';
import { BlogPage } from '@app/containers/BlogPage';
import { BlogPostsQueryDto, BlogPostDto, SEO_DATA } from '@app/utils';

const PAGE_SIZE = 9;

const BlogIndex: FC<PageProps<BlogPostsQueryDto>> = ({ data: { allContentfulBlogPost } }) => {
  const { nodes: allPosts } = allContentfulBlogPost;

  const [visiblePosts, setVisiblePosts] = useState<BlogPostDto[]>(allPosts.slice(0, PAGE_SIZE));

  const loadMorePosts = useCallback(
    () => setVisiblePosts(prevState => allPosts.slice(0, prevState.length + PAGE_SIZE)),
    [allPosts],
  );

  return (
    <Layout>
      <BlogPage visiblePosts={visiblePosts} allPosts={allPosts} loadMorePosts={loadMorePosts} />
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
