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
      'Built-in ML triage detects failure patterns and root causes automatically, while AI agents connected via MCP extend automation across your pipeline — from test design to release decision.',
    bullets: [
      'Seamless connection of your AI tools via MCP',
      'Automatic analysis of failures to find patterns & root causes',
      'ML triage that lets you focus on fixes, not analysis',
      <>
        Integration with{' '}
        <Link className="link" to="https://test.io/ai-in-qa/agentic-qa">
          Agentic QA
        </Link>{' '}
        for fully autonomous testing
      </>,
    ],
    cta: [
      {
        text: 'Learn more',
        link: 'https://reportportal.io/docs/features/AIFailureReasonDetection/',
      },
    ],
  },
  {
    id: 'test-planning-design',
    title: 'Test planning & design',
    description:
      'A complete Test Case Management system is built-in. Organize test cases into folders and plan milestones.',
    bullets: [
      'Folder-based organization for test cases',
      'Rich text editor with attachments support',
      'Test Plans and Manual Launches management',
      <>
        Cloud testing on real devices via{' '}
        <Link className="link" to="https://mobitru.com/">
          Mobitru
        </Link>{' '}
        integration
      </>,
    ],
    cta: [{ text: 'Learn more', link: '/test-management/' }],
  },
  {
    id: 'unified-reporting',
    title: 'Unified test reporting & traceability',
    description: 'Bring manual, agentic and automated test results together in one place.',
    bullets: [
      'Traceability from test cases to runs and defects',
      'Real-time test execution tracking',
      'Historical trend analysis across releases',
    ],
    cta: [
      { text: 'Learn more', link: 'https://reportportal.io/docs/features/UnifiedTestReporting/' },
    ],
  },
  {
    id: 'ai-powered-analysis',
    title: 'AI-powered analysis & release readiness',
    description:
      'AI automatically classifies failures and surfaces root causes. Quality Gates turn analysis into go/no-go decisions — without manual review.',
    bullets: [
      'Automatic failure categorization with ML',
      'Pattern detection across test runs',
      'Configurable Quality Gates for release decisions',
    ],
    cta: [
      {
        text: 'AI-triage',
        link: 'https://reportportal.io/docs/features/AIFailureReasonDetection/',
      },
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
      'Real-time testing metrics and trend visualizations',
      'Shareable reports for stakeholders',
    ],
    cta: [
      {
        text: 'Learn more',
        link: 'https://reportportal.io/docs/features/VisualisationOfTestResults/',
      },
    ],
  },
  {
    id: 'enterprise-integrations',
    title: 'Enterprise controls & integrations',
    layout: 'full-width',
    description:
      'Connect ReportPortal to your enterprise ecosystem with flexible integrations, centralized governance, security, and compliance-ready capabilities.',
    linkedCards: [
      {
        icon: 'jira',
        title: 'Bug Tracking Systems',
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
    label: 'What is a Launch in ReportPortal?',
    children: (
      <>
        <p>
          A Launch is a test run in ReportPortal. It brings together tests, steps, logs,
          screenshots, and other results from a single testing session.
        </p>
        <p>
          Launches can contain results from automated tests, manual test execution, or agentic
          testing. You can review and analyze results, compare runs, merge launches, rerun tests,
          and track testing history over time.
        </p>
      </>
    ),
  },
  {
    key: 2,
    label: 'Can I use ReportPortal for manual testing, or is it automation-only?',
    children: (
      <>
        <p>
          Both. ReportPortal includes a built-in test case management system — a folder-based test
          case library with a rich text editor and attachments, plus Test Plans, Manual Launches and
          Milestones.
        </p>
        <p>
          Manual, agentic and automated results live in the same project and roll up into the same
          dashboards, so quality is one picture rather than several.
        </p>
      </>
    ),
  },
  {
    key: 3,
    label: 'Do I need to change my tests to start using ReportPortal?',
    children: (
      <>
        <p>
          No. ReportPortal connects to your existing test framework through an agent — you add it to
          your project and point it at your instance. Your tests, project structure and CI setup
          stay as they are: no migration, no rewriting.
        </p>
        <p>
          The same applies to AI: the MCP server exposes your test data to AI agents without moving
          it anywhere.
        </p>
      </>
    ),
  },
  {
    key: 4,
    label: 'How is ReportPortal different from TestRail, Xray or Zephyr?',
    children: (
      <>
        <p>
          Traditional test management tools are built around a manual test case repository, with
          automation results attached afterwards. ReportPortal starts from execution data: results
          stream in while a run is still going, ML triages failures automatically, and Quality Gates
          turn that analysis into a go/no-go verdict for your pipeline.
        </p>
        <p>
          Test case management is here too — but it sits alongside real-time analysis rather than
          replacing it.
        </p>
      </>
    ),
  },
  {
    key: 5,
    label: 'What is meant by "Premium feature"?',
    children: (
      <>
        <p>
          Premium features are advanced capabilities on top of the free open-source core. They come
          at no extra cost with SaaS subscriptions and with Managed Services packages — the exact
          set depends on your plan.
        </p>
        <p>
          Currently premium: Quality Gates, Test executions, Microsoft Teams notifications,
          Organizations, SSO, LDAP and SCIM provisioning.
        </p>
        <p>
          Test management, AI failure reason detection and the MCP server are part of the core and
          available on every plan.
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
    key: 6,
    label: 'Do you use my test data to train AI models?',
    children: (
      <>
        <p>
          No. Failure reason detection uses ML models trained on your own history of investigated
          failures, inside your own instance. Your data is never used to train shared or third-party
          models.
        </p>
        <p>
          The MCP server works the same way — it gives AI agents access to your data without copying
          it out of ReportPortal.
        </p>
      </>
    ),
  },
  {
    key: 7,
    label: 'Where is my data stored? Can I keep it on-premises?',
    children: (
      <>
        <p>
          Yes. ReportPortal can run entirely in your own infrastructure — on-premises or in your
          private cloud — so test data never leaves your perimeter. With Managed Services we operate
          that instance for you, still inside your environment.
        </p>
        <p>
          On{' '}
          <Link to="/pricing/saas/" className="link">
            SaaS
          </Link>
          , Business and Enterprise plans get a dedicated instance with a choice of deployment
          region and IP allowlisting.
        </p>
      </>
    ),
  },
];

export const FEATURES_FAQ_SCHEMA_ITEMS: FAQSchemaItem[] = FEATURES_FAQ_ITEMS.map(
  ({ label, children }) => ({
    question: label,
    answer: extractText(children),
  }),
);
