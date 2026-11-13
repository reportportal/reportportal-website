import feature1 from '@app/svg/featuresListItem1.svg';
import feature3 from '@app/svg/featuresListItem3.svg';
import feature5 from '@app/svg/featuresListItem5.svg';
import feature6 from '@app/svg/featuresListItem6.svg';
import feature8 from '@app/svg/featuresListItem8.svg';

export const FEATURES_ITEMS = [
  {
    title: 'Single-entry point & unified test reporting',
    description:
      'Centralize manual, automated and agentic test results for a unified view of your quality.',
    image: feature1,
    link: '/docs/getting-started/features/UnifiedTestReporting/',
  },
  {
    title: 'Real-time reporting',
    description:
      'See results as they happen — access executed test cases instantly to react faster and reduce time to triage.',
    image: feature5,
    link: '/docs/getting-started/features/RealTimeReporting/',
  },
  {
    title: 'AI agents for testing & ML triage',
    description:
      'Our MCP server acts as the central intelligence core, enabling AI-powered triage, root cause detection and autonomous testing — across your entire pipeline.',
    image: feature3,
    link: '/blog/dont-analyze-the-same-failure-twice-smarter-ai-defect-triage-with-reportportal/',
  },
  {
    title: 'Quality gates',
    description:
      'Automate go/no-go decisions in your CI/CD pipeline by setting pass/fail thresholds on test results.',
    image: feature8,
    link: '/docs/analysis/quality-gates/',
  },
  {
    title: 'Widgets and dashboards',
    description:
      'Build custom dashboards and widgets to track quality, spot trends and share insights with stakeholders.',
    image: feature6,
    link: '/docs/dashboards-and-visualization/',
  },
];
