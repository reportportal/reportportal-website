import { GatsbyConfig } from 'gatsby';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title:
      'ReportPortal test automation analytics platform and real-time reporting, powered by Machine Learning',
    titlePS: 'ReportPortal',
    description:
      'Centralized test automation dashboard. Provides AI-based defects triage and real time test report dashboard.',
    keywords:
      'test automation dashboard, test automation reporting, qa automation dashboard, test automation results dashboard, test report dashboard, qa metrics dashboard, test execution report, end to end testing reporting tools, ReportPortal installation, ReportPortal integration, ReportPortal dashboard',
    siteUrl: 'https://reportportal.io',
    image: 'https://reportportal.io/favicon.ico',
    previewImage: 'https://reportportal.io/preview.png',
    siteName: 'ReportPortal | AI-powered Test Automaton Dashboard',
  },
  plugins: [
    'gatsby-plugin-svgr-svgo',
    'gatsby-plugin-sass',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        disable: process.env.ANALYSE_BUNDLE !== 'true',
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENV_ID,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GTM_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          '/contact-us/taas',
          '/contact-us/taaas',
          '/contact-us/qe-consulting',
          '/contact-us/saas/**',
          '/contact-us/on-premises/**',
          '/contact-us/qasp',
          '/contact-us/d4j',
          '/contact-us/hlm',
          '/contact-us/qasp/**',
          '/contact-us/d4j/**',
          '/contact-us/hlm/**',
        ],
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }`,
        serialize: ({ path }: { path: string }) => {
          const fileExtensions = ['.html', '.htm', '.xml', '.pdf', '.jpg', '.png', '.css', '.js'];
          const hasFileExtension = fileExtensions.some(ext => path.endsWith(ext));
          const pathWithSlashEnd = path.endsWith('/') || hasFileExtension ? path : `${path}/`;
          const url = path === '/' ? path : pathWithSlashEnd;

          let priority = 0.9;

          if (path === '/') {
            priority = 1.0;
          } else if (path === '/legal/terms') {
            priority = 0.4;
          }

          return {
            url,
            changefreq: 'weekly',
            priority,
          };
        },
      },
    },
    'gatsby-plugin-meta-redirect',
  ],
  trailingSlash: 'always',
};

// eslint-disable-next-line import/no-default-export
export default config;
