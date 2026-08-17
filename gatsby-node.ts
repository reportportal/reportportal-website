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
  repos: Record<string, number | string>;
}

interface SlackConversationInfoResponse {
  ok: boolean;
  channel?: {
    num_members: number;
  };
  error?: string;
}

/** Timeout in milliseconds for all statistics API calls (10 seconds) */
const STATS_API_TIMEOUT = 10000;

async function fetchGitHubStars(): Promise<Repos> {
  const token = process.env.RP_GITHUB_STATS;

  const fetchFallback = async (): Promise<Repos> => {
    console.info('[stats] Using status.reportportal.io/github/stars.');

    const response = await axios.get<Repos>('https://status.reportportal.io/github/stars', {
      timeout: STATS_API_TIMEOUT,
    });

    return response.data;
  };

  if (!token) {
    console.info('[stats] RP_GITHUB_STATS not set — using status.reportportal.io/github/stars.');

    return fetchFallback();
  }

  try {
    const response = await axios.get<{ stargazers_count: number }>(
      'https://api.github.com/repos/reportportal/reportportal',
      {
        timeout: STATS_API_TIMEOUT,
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${token}`,
        },
      },
    );

    const stars = response.data.stargazers_count;

    console.info(`[stats] GitHub stars fetched via api.github.com: ${stars}`);

    return {
      total: stars,
      repos: {
        reportportal: stars,
      },
    };
  } catch (err) {
    console.warn(
      '[stats] GitHub API call failed — falling back to status.reportportal.io/github/stars.',
    );

    try {
      return await fetchFallback();
    } catch {
      console.warn('[stats] Fallback GitHub source also failed.');
      throw err;
    }
  }
}

function readExistingDockerHubPulls(): number {
  try {
    const content = JSON.parse(fs.readFileSync('static/stats.json', 'utf8')) as {
      downloads?: number;
    };

    return content.downloads ?? 0;
  } catch {
    return 0;
  }
}

async function fetchDockerHubPulls(): Promise<number> {
  try {
    const response = await axios.get<{ pull_count: number }>(
      'https://hub.docker.com/v2/repositories/reportportal/service-api/',
      { timeout: STATS_API_TIMEOUT },
    );

    return response.data.pull_count || 0;
  } catch (err) {
    console.warn(
      '[stats] Docker Hub API call failed — keeping existing value from static/stats.json.',
    );

    return readExistingDockerHubPulls();
  }
}

function readExistingSlackMembers(): number {
  try {
    const content = JSON.parse(fs.readFileSync('static/stats.json', 'utf8')) as {
      slackMembers?: number;
    };

    return content.slackMembers ?? 0;
  } catch {
    return 0;
  }
}

async function fetchSlackMembers(): Promise<number | null> {
  const token = process.env.SLACK_BOT_TOKEN;
  const channelId = process.env.SLACK_CHANNEL_ID;

  if (!token || !channelId) {
    console.info('[stats] SLACK_BOT_TOKEN / SLACK_CHANNEL_ID not set — keeping existing value.');

    return null;
  }

  try {
    const response = await axios.get<SlackConversationInfoResponse>(
      `https://slack.com/api/conversations.info?channel=${channelId}&include_num_members=true`,
      {
        timeout: STATS_API_TIMEOUT,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data.ok) {
      console.warn(`[stats] Slack API error: "${response.data.error}" — keeping existing value.`);

      return null;
    }

    return response.data.channel?.num_members ?? null;
  } catch (err) {
    console.warn('[stats] Slack API request failed — keeping existing value.');

    return null;
  }
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

  await fetchGitHubStars()
    .then((data: Repos) => {
      fs.writeFileSync('static/github.json', JSON.stringify(data));
    })
    .catch(err => {
      console.warn('[stats] Failed to fetch GitHub stars — skipping github.json write.', err);
    });

  await axios
    .get('https://status.reportportal.io/youtube?count=12')
    .then((response: { data: YoutubeVideoDto[] }) => response.data)
    .then(data => {
      fs.writeFileSync('static/youtube.json', JSON.stringify(data || []));
    });

  try {
    const [downloads, liveSlackMembers] = await Promise.all([
      fetchDockerHubPulls(),
      fetchSlackMembers(),
    ]);

    const slackMembers = liveSlackMembers ?? readExistingSlackMembers();

    fs.writeFileSync('static/stats.json', JSON.stringify({ downloads, slackMembers }));
    console.info(
      `[stats] Written stats.json — downloads: ${downloads}, slackMembers: ${slackMembers}`,
    );
  } catch {
    console.warn(
      '[stats] Failed to fetch live community stats — falling back to values already in static/stats.json.',
    );
  }

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

    if (!contentfulConfig) {
      reporter.warn(
        `[contact-us] No Contentful data for id "${config.id}", skipping page at ${config.url}`,
      );
      return;
    }

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
