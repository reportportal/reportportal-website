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
          return {
            url: path,
          };
        },
      },
    },
    {
      resolve: 'gatsby-plugin-csp',
      options: {
        disableOnDev: true,
        reportOnly: false,
        mergeStyleHashes: false,
        mergeScriptHashes: false,
        directives: {
          'script-src':
            "'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://www.bing.com https://www.google.com *.visualwebsiteoptimizer.com app.vwo.com https://www.youtube.com",
          'script-src-elem':
            "'self' data: 'unsafe-inline' *.googleapis.com *.visualwebsiteoptimizer.com https://*.clarity.ms https://www.googletagmanager.com https://www.youtube.com",
          'style-src': "'self' 'unsafe-inline'",
          'connect-src':
            "'self' https://status.reportportal.io https://www.google-analytics.com https://*.clarity.ms https://www.googletagmanager.com *.visualwebsiteoptimizer.com app.vwo.com https://*.salesforce-sites.com https://*.analytics.google.com https://stats.g.doubleclick.net",
          'img-src':
            "'self' https://www.google-analytics.com https://*.clarity.ms https://www.google.com *.visualwebsiteoptimizer.com app.vwo.com  data: blob: http: https:",
          'worker-src': "'self' blob:",
          'frame-src':
            "'self' https://www.youtube-nocookie.com  *.visualwebsiteoptimizer.com app.vwo.com https://www.googletagmanager.com https://www.google.com",
          'object-src': "'none'",
        },
      },
    },
    {
      resolve: 'gatsby-plugin-clarity',
      options: {
        clarity_project_id: process.env.CLARITY_PROJECT_ID,
        enable_on_dev_env: true,
      },
    },
  ],
  trailingSlash: 'never',
};

// eslint-disable-next-line import/no-default-export
export default config;
