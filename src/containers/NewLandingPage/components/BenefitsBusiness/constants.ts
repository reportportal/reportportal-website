import feature6 from '@app/svg/featuresListItem6.svg';
import feature8 from '@app/svg/featuresListItem8.svg';
import feature10 from '@app/svg/featuresListItem10.svg';
import feature11 from '@app/svg/featuresListItem11.svg';
import feature12 from '@app/svg/featuresListItem12.svg';

export const BENEFITS_ITEMS = [
  {
    title: 'Automated release readiness',
    description:
      'Track and evaluate automated test results to ensure release readiness and quality standards.',
    image: feature11,
    link: '/docs/analysis/quality-gates/',
  },
  {
    title: 'Test management system',
    description:
      'Plan, execute, and track manual tests alongside your automation runs — all inside ReportPortal.',
    image: feature8,
    link: '/test-management/',
  },
  {
    title: 'Token-free automatic ML triage',
    description:
      'Auto-Analyzer uses ML to match failures against historical runs and assign defect types automatically — no manual review, no external agents, no extra cost.',
    image: feature10,
    link: '/docs/getting-started/features/AIFailureReasonDetection/',
  },
  {
    title: 'Key metrics and KPI',
    description:
      'With widgets and dashboards, you can quickly overview the project or dive into details for faster decision-making.',
    image: feature6,
    link: '/docs/dashboards-and-visualization/ReportingAndMetricsInReportPortal/',
  },
  {
    title: 'Certified security',
    description:
      'Rely on SOC2-certified security with strong access controls, auditability, and secure deployment options.',
    image: feature12,
    link: '/blog/reportportal-renews-soc-2-type-ii-attestation-for-the-third-consecutive-year/',
  },
];
