import React from 'react';
import { DOCUMENTATION_URL } from '@app/utils';

import {
  AiIcon,
  DefectTypeIcon,
  EnterpriseIcon,
  InstallIcon,
  PieChartIcon,
  QualityGatesIcon,
  ReleaseIcon,
  ReportingIcon,
} from './icons';

export const GENERAL_LIST = [
  {
    icon: <InstallIcon />,
    title: 'Installation',
    link: { title: 'Installation', url: '/installation' },
  },
  {
    icon: <ReleaseIcon />,
    title: 'Releases',
    link: { title: 'Releases', url: `${DOCUMENTATION_URL}/releases/` },
  },
];

export const FEATURES_LIST = [
  {
    icon: <AiIcon />,
    title: 'AI capabilities for testing',
    text: 'Automate testing workflows across all stages with AI-powered agents',
    link: { title: 'AI capabilities for testing', url: '/features/#ai-capabilities' },
    badge: 'new' as const,
  },
  {
    icon: <ReportingIcon />,
    title: 'Unified reporting & traceability',
    text: 'Capture and trace automated and manual test results in one place',
    link: { title: 'Unified reporting & traceability', url: '/features/#unified-reporting' },
  },
  {
    icon: <PieChartIcon />,
    title: 'Widgets & Dashboards',
    text: 'Visualize QA metrics with custom dashboards & executive-level views',
    link: { title: 'Widgets & Dashboards', url: '/features/#widgets-dashboards' },
  },
  {
    icon: <DefectTypeIcon />,
    title: 'Test management',
    text: 'Organize test cases, plans, milestones and execute manual launches',
    link: { title: 'Test management', url: '/test-management/' },
    badge: 'new' as const,
  },
  {
    icon: <QualityGatesIcon />,
    title: 'AI analysis & release readiness',
    text: 'Detect failures and automate release decisions with AI-driven insights',
    link: { title: 'AI analysis & release readiness', url: '/features/#ai-powered-analysis' },
  },
  {
    icon: <EnterpriseIcon />,
    title: 'Enterprise controls',
    text: 'Manage teams with SSO, SCIM provisioning and access controls',
    link: { title: 'Enterprise controls', url: '/features/#enterprise-integrations' },
  },
];
