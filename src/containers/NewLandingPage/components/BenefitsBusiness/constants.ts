import feature6 from '@app/svg/featuresListItem6.svg';
import feature8 from '@app/svg/featuresListItem8.svg';
import feature10 from '@app/svg/featuresListItem10.svg';
import feature11 from '@app/svg/featuresListItem11.svg';
import feature12 from '@app/svg/featuresListItem12.svg';

export const BENEFITS_ITEMS = [
  {
    title: 'Automated release readiness',
    description:
      'See unified coverage and status across manual, automated and agentic testing in one view.',
    image: feature11,
    link: '/features/',
  },
  {
    title: 'Test management system',
    description:
      'Plan, execute, and track manual tests alongside your automation runs — all inside ReportPortal.',
    image: feature8,
    link: '/features/',
  },
  {
    title: 'Token-free automatic ML triage',
    description:
      'Auto-Analyzer uses ML to match failures against historical runs and assign defect types automatically — no manual review, no external agents, no extra cost.',
    image: feature10,
    link: '/features/#ai-capabilities',
  },
  {
    title: 'Key metrics and KPI',
    description:
      'With widgets and dashboards, you can quickly overview the project or dive into details for faster decision-making.',
    image: feature6,
    link: '/features/#widgets-dashboards',
  },
  {
    title: 'Certified security',
    description:
      'Rely on SOC2-certified security with strong access controls, auditability, and secure deployment options.',
    image: feature12,
    link: 'https://reportportal.io/blog/reportportal-completes-soc-2-type-ii-audit',
  },
];
