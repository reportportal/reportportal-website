import React, { ReactNode } from 'react';
import { Link } from '@app/components/Link';
import { DOCUMENTATION_URL } from '@app/utils';
import { FAQSchemaItem, extractText } from '@app/components/StructuredData';

export interface FeatureLinkedCard {
  icon?: string;
  title: string;
  description: string;
  link?: string;
}

export interface FeatureCta {
  text: string;
  link: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  isPremium?: boolean;
  badge?: string;
  bullets?: ReactNode[];
  cta?: FeatureCta[];
  layout?: 'full-width';
  linkedCards?: FeatureLinkedCard[];
  integrationsStrip?: boolean;
}

export const NAVIGATION_LIST = [
  { id: 1, name: 'AI capabilities for testing', link: '#ai-capabilities' },
  { id: 2, name: 'Test Planning & Design', link: '#test-planning-design' },
  { id: 3, name: 'Unified Reporting & Traceability', link: '#unified-reporting' },
  { id: 4, name: 'AI-Powered Analysis', link: '#ai-powered-analysis' },
  { id: 5, name: 'Widgets & Dashboards', link: '#widgets-dashboards' },
  { id: 6, name: 'Enterprise Integrations', link: '#enterprise-integrations' },
];

export const FEATURES_LIST: Feature[] = [
  {
    id: 'ai-capabilities',
    title: 'AI capabilities for the full testing lifecycle',
    description:
      'Our MCP server acts as the central intelligence core, enabling powerful AI capabilities across your entire testing pipeline — from test design to release decision.',
    bullets: 
    [
      'Seamless connection to your stack without migration',
      'Automatic analysis of failures to find patterns & root causes',
      'ML triage that lets you focus on fixes, not analysis',
      <>Integration with <Link className="link" to="https://test.io/ai-in-qa/agentic-qa">Agentic QA</Link> for fully autonomous testing</>,
    ],
    cta: [{ text: 'Learn more', link: 'https://reportportal.io/docs/features/AIFailureReasonDetection/' }],
  },
  {
    id: 'test-planning-design',
    title: 'Test planning & design',
    description:
      'A complete Test Case Management system built-in. Organize test cases in folders and plan milestones.',
    bullets: [
      'Folder-based organization for test cases',
      'Rich text editor with attachments support',
      'Test Plans and Manual Launches management',
      <>Cloud testing on real devices via <Link className="link" to="https://mobitru.com/">Mobitru</Link> integration</>,
    ],
    cta: [{ text: 'Learn more', link: '/test-management/' }],
  },
  {
    id: 'unified-reporting',
    title: 'Unified reporting & traceability',
    description:
      'Centralize results from both Manual and Automated runs. See the full picture of your quality in real-time.',
    bullets: [
      'Combined view of manual and automated test results',
      'Real-time test execution tracking',
      'Historical trend analysis across releases',
    ],
    cta: [{ text: 'Learn more', link: 'https://reportportal.io/docs/features/UnifiedTestReporting/' }],
  },
  {
    id: 'ai-powered-analysis',
    title: 'AI-powered analysis & release readiness',
    description:
      'AI agents automatically classify failures and surface root causes. Quality Gates turn analysis into go/no-go decisions — without manual review.',
    bullets: [
      'Automatic failure categorization with ML',
      'Pattern detection across test runs',
      'Configurable Quality Gates for release decisions',
    ],
    cta: [
      { text: 'AI-triage', link: 'https://reportportal.io/docs/features/AIFailureReasonDetection/' },
      { text: 'Quality Gates', link: 'https://reportportal.io/docs/features/QualityGates/' },
    ],
  },
  {
    id: 'widgets-dashboards',
    title: 'Widgets & dashboards',
    description:
      'Visualize your data with custom widgets. Share insights with stakeholders via live dashboards.',
    bullets: [
      'Customizable dashboard widgets and layouts',
      'Real-time metrics and trend visualizations',
      'Shareable reports for stakeholders',
    ],
    cta: [{ text: 'Learn more', link: 'https://reportportal.io/docs/features/VisualisationOfTestResults/' }],
  },
  {
    id: 'enterprise-integrations',
    title: 'Enterprise controls & integrations',
    layout: 'full-width',
    description:
      'Connect ReportPortal to your existing stack — AI agents work inside your pipeline from day one.',
    linkedCards: [
      {
        icon: 'jira',
        title: 'BTS Integrations',
        description: 'Sync test failures to BTS tickets automatically',
      },
      {
        icon: 'cicd',
        title: 'CI/CD Pipelines',
        description: 'Works with Jenkins, GitLab CI, GitHub Actions, and more',
      },
      {
        icon: 'sso',
        title: 'SSO',
        description: 'Sign in with your existing identity provider',
      },
      {
        icon: 'scim',
        title: 'SCIM Provisioning',
        description: 'Keep user access in sync with your directory',
      },
    ],
    cta: [{ text: 'View all integrations', link: 'https://reportportal.io/docs/plugins/' }],
    integrationsStrip: true,
  },
];

export const FEATURES_FAQ_ITEMS = [
  {
    key: 1,
    label: 'What is meant by "Premium feature"?',
    children: (
      <>
        <p>
          Premium feature is an advanced feature which comes on top of Free Open Source edition. It
          comes at no cost with SaaS offering and included into the &quot;160&quot; Managed Services
          package.
        </p>
        <p>
          See the{' '}
          <Link to={`${DOCUMENTATION_URL}/terms-and-conditions/PremiumFeatures/`} className="link">
            List of features
          </Link>{' '}
          and their description.
        </p>
      </>
    ),
  },
  {
    key: 2,
    label: 'What capabilities does Rest API provide?',
    children: (
      <p>
        REST API enables users to easily integrate any testing framework or third-party tool with
        ReportPortal so as to report data into ReportPortal, call analyze action, add attributes,
        merge/update/finish launches. Besides, you can pull the data from ReportPortal in order to
        update the statuses in the pipeline, generate custom reports and many more.
      </p>
    ),
  },
];

export const FEATURES_FAQ_SCHEMA_ITEMS: FAQSchemaItem[] = FEATURES_FAQ_ITEMS.map(
  ({ label, children }) => ({
    question: label,
    answer: extractText(children),
  }),
);
