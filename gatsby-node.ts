/* eslint-disable import/no-import-module-exports */

import fs from 'node:fs';
import path from 'node:path';

import { CreateWebpackConfigArgs, GatsbyNode } from 'gatsby';
import axios from 'axios';
import { keyBy } from 'lodash';
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';

import { ContactUsConfig, OfferingPlanDto, YoutubeVideoDto } from './src/utils/types';
import { contactUsBaseConfigs } from './src/utils/contactUsConfig';
import { buildSearchIndex } from './src/utils/buildSearchIndex';
// importing GraphQL fragments to be available in the app
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fragments from './src/fragments';

interface Slug {
  slug: string;
}

interface PostTypeDto {
  allContentfulBlogPost: {
    nodes: Slug[];
  };
}

interface CaseTypeDto {
  allContentfulCaseStudy: {
    nodes: Slug[];
  };
}

interface Repos {
  total: number;
  repos: Record<string, string>;
}

interface ContactUsDto {
  internalTitle: string;
  title: string;
  message: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  messagePosition: string;
  showBillingPeriod?: boolean;
  offeringPlan?: OfferingPlanDto;
}

interface ContactUsQuery {
  allContentfulContactUs: {
    nodes: ContactUsDto[];
  };
}

const acceleratorsTemplatesPath = './src/templates/accelerators';
const pricingTemplatesPath = './src/templates/pricing';
const sponsorsTemplatesPath = './src/templates/sponsorship-program';

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-lodash',
    options: {},
  });
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  await axios
    .get('https://status.reportportal.io/github/stars')
    .then((response: { data: Repos }) => response.data)
    .then((data: Repos) => {
      fs.writeFileSync('static/github.json', JSON.stringify(data));
    });

  await axios
    .get('https://status.reportportal.io/youtube?count=12')
    .then((response: { data: YoutubeVideoDto[] }) => response.data)
    .then(data => {
      fs.writeFileSync('static/youtube.json', JSON.stringify(data || []));
    });

  const blogPost = path.resolve('./src/templates/blog-post/blog-post.tsx');

  const blogsResponse = await graphql<PostTypeDto>(
    `
      {
        allContentfulBlogPost {
          nodes {
            slug
          }
        }
      }
    `,
  );

  if (blogsResponse.errors) {
    reporter.panicOnBuild('There was an error loading your Contentful posts', blogsResponse.errors);

    return;
  }

  const posts = blogsResponse.data?.allContentfulBlogPost.nodes;

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  posts?.forEach(post => {
    createPage({
      path: `/blog/${post.slug}/`,
      component: blogPost,
      context: {
        slug: post.slug,
      },
    });
  });

  const ContactUsPage = path.resolve('./src/templates/contact-us/contact-us.tsx');

  const contactUsResponse = await graphql<ContactUsQuery>(
    `
      {
        allContentfulContactUs {
          nodes {
            ... on ContentfulContactUs {
              internalTitle
              title
              messagePosition
              showBillingPeriod
              message {
                raw
              }
              offeringPlan {
                price {
                  currency
                  period
                  yearly
                  quarterly
                }
              }
            }
          }
        }
      }
    `,
  );

  if (contactUsResponse.errors) {
    reporter.panicOnBuild(
      'There was an error loading Contentful contact us configs',
      contactUsResponse.errors,
    );

    return;
  }

  const contactUsConfigs = keyBy(
    contactUsResponse.data?.allContentfulContactUs.nodes as ContactUsDto[],
    'internalTitle',
  );

  contactUsBaseConfigs.forEach(config => {
    const contentfulConfig = contactUsConfigs[config.id];
    const contactUsProps: ContactUsConfig = {
      ...config,
      title: contentfulConfig.title,
      message: contentfulConfig.message,
      messagePosition: contentfulConfig.messagePosition,
      showBillingPeriod: contentfulConfig.showBillingPeriod,
      price: contentfulConfig.offeringPlan?.price,
    };

    createPage({
      path: config.url,
      component: ContactUsPage,
      context: contactUsProps,
    });
  });

  const caseStudyTemplate = path.resolve('./src/templates/case-study/case-study.tsx');
  const caseStudiesResponse = await graphql<CaseTypeDto>(
    `
      {
        allContentfulCaseStudy {
          nodes {
            slug
          }
        }
      }
    `,
  );

  if (caseStudiesResponse.errors) {
    reporter.panicOnBuild(
      'There was an error loading your Contentful case studies',
      caseStudiesResponse.errors,
    );

    return;
  }

  const caseStudies = caseStudiesResponse.data?.allContentfulCaseStudy.nodes;

  caseStudies?.forEach(caseStudy => {
    createPage({
      path: `/case-studies/${caseStudy.slug}/`,
      component: caseStudyTemplate,
      context: {
        slug: caseStudy.slug,
      },
    });
  });

  fs.readdirSync(acceleratorsTemplatesPath).forEach(file => {
    const key = path.basename(file, '.tsx');

    createPage({
      path: `/accelerators/${key}/`,
      component: path.resolve(path.join(acceleratorsTemplatesPath, file)),
    });
  });

  fs.readdirSync(pricingTemplatesPath).forEach(file => {
    const key = path.basename(file, '.tsx');

    createPage({
      path: `/pricing/${key}/`,
      component: path.resolve(path.join(pricingTemplatesPath, file)),
    });
  });

  fs.readdirSync(sponsorsTemplatesPath).forEach(file => {
    const key = path.basename(file, '.tsx');

    createPage({
      path: `/sponsorship-program/${key}/`,
      component: path.resolve(path.join(sponsorsTemplatesPath, file)),
    });
  });
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  actions.createTypes(`
    type ContentfulBlogPost implements Node {
      searchIndex: String
    }
  `);
};

interface ContentfulBlogPostSource {
  id?: string;
  children?: string[];
  category?: string[] | null;
  articleBody?: { raw?: string } | null;
}

interface MaybeChildNode {
  internal?: { type?: string };
  [field: string]: unknown;
}

export const createResolvers: GatsbyNode['createResolvers'] = ({
  createResolvers: addResolvers,
}) => {
  const searchIndexCache = new Map<string, string>();

  addResolvers({
    ContentfulBlogPost: {
      searchIndex: {
        type: 'String',
        // gatsby-source-contentful v8 stores long-text fields (title,
        // leadParagraph) as separate child nodes linked from the parent's
        // `children` array, while rich-text (articleBody) and primitives
        // (category) live inline on the parent. So we resolve title/lead
        // by walking child nodes, and read articleBody/category directly.
        resolve: (
          source: ContentfulBlogPostSource,
          _args: unknown,
          context: {
            nodeModel: { getNodeById: (input: { id: string }) => MaybeChildNode | null };
          },
        ) => {
          const cacheKey = source.id;

          if (cacheKey && searchIndexCache.has(cacheKey)) {
            return searchIndexCache.get(cacheKey);
          }

          const childIds = Array.isArray(source.children) ? source.children : [];
          const childNodes = childIds
            .map(id => context.nodeModel.getNodeById({ id }))
            .filter((node): node is MaybeChildNode => node !== null);

          const findChildOfType = (type: string) =>
            childNodes.find(node => node.internal?.type === type);

          const titleNode = findChildOfType('contentfulBlogPostTitleTextNode');
          const leadNode = findChildOfType('contentfulBlogPostLeadParagraphTextNode');

          const value = buildSearchIndex({
            title: titleNode ? { title: titleNode.title as string } : null,
            leadParagraph: leadNode ? { leadParagraph: leadNode.leadParagraph as string } : null,
            category: source.category,
            articleBody: source.articleBody,
          });

          if (cacheKey) {
            searchIndexCache.set(cacheKey, value);
          }

          return value;
        },
      },
    },
  });
};

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, 'src'),
      },
    },
  });

  // Diagnostic build: when HYDRATION_DEBUG=true is set, force the React /
  // ReactDOM development bundles into the production browser build. Without
  // this, React 18 in `gatsby build` only emits minified error codes (#418,
  // #423, ...) with no component stack, making it impossible to identify
  // which subtree caused a hydration mismatch. We override Gatsby's existing
  // DefinePlugin so every `if (process.env.NODE_ENV !== 'production')`
  // warning branch inside react/react-dom is preserved and the unminified
  // dev bundle is loaded. This affects only `gatsby build && gatsby serve`
  // when the env flag is set; SSR continues unchanged.
  if (process.env.HYDRATION_DEBUG === 'true' && stage === 'build-javascript') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config = getConfig() as { plugins: any[] };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config.plugins = config.plugins.map((plugin: any) => {
      if (
        plugin?.constructor?.name === 'DefinePlugin' &&
        plugin.definitions?.['process.env.NODE_ENV']
      ) {
        plugin.definitions['process.env.NODE_ENV'] = JSON.stringify('development');
      }

      return plugin;
    });

    actions.replaceWebpackConfig(config);
  }
};

exports.onPostBuild = () => {
  // Remove autogenerated `sitemap-index.xml` in favor of the existing one (sitemap.xml)
  if (fs.existsSync('./public/sitemap-index.xml')) {
    fs.unlinkSync('./public/sitemap-index.xml');
  }
};
