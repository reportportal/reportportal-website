/* eslint-disable import/no-import-module-exports */

import fs from 'node:fs';
import path from 'node:path';

import { GatsbyNode, NodePluginArgs } from 'gatsby';
import axios from 'axios';
import keyBy from 'lodash/keyBy';
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';

import { ContactUsConfig, OfferingPlanDto, YoutubeVideoDto } from './src/utils/types';
import { contactUsBaseConfigs } from './src/utils/contactUsConfig';
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
      fs.writeFileSync('static/youtube.json', JSON.stringify(data));
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

exports.onCreateWebpackConfig = ({ actions }: NodePluginArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, 'src'),
      },
    },
  });
};

exports.onPostBuild = () => {
  // Remove autogenerated `sitemap-index.xml` in favor of the existing one (sitemap.xml)
  if (fs.existsSync('./public/sitemap-index.xml')) {
    fs.unlinkSync('./public/sitemap-index.xml');
  }
};
