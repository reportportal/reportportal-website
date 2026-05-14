import React from 'react';
import { DOCUMENTATION_URL } from '@app/utils';

import {
  AiIcon,
  DefectTypeIcon,
  InstallIcon,
  PieChartIcon,
  QualityGatesIcon,
  ReleaseIcon,
  ReportingIcon,
  RtAnalyticsIcon,
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
    icon: <ReportingIcon />,
    title: 'Unified test reporting',
    text: 'Get persistent test reporting in a single entry point',
    link: { title: 'Unified test reporting', url: '/features/#single-entry' },
  },
  {
    icon: <DefectTypeIcon />,
    title: 'Categorisation of failures',
    text: 'Triage test failures by categorisation of root cause',
    link: { title: 'Categorisation of failures', url: '/features/#categorisation' },
  },
  {
    icon: <AiIcon />,
    title: 'AI failure reason detection',
    text: 'Reduce your manual efforts for failure triaging with Auto-Analyzer',
    link: { title: 'AI failure reason detection', url: '/features/#ai-based' },
  },
  {
    icon: <RtAnalyticsIcon />,
    title: 'Real-time analytics',
    text: 'Save time on early reaction by immediate results availability',
    link: { title: 'Real-time analytics', url: '/features/#real-time-reporting' },
  },
  {
    icon: <PieChartIcon />,
    title: 'Widgets and Dashboards',
    text: 'Get visibility in QA results and a birds-eye view on the project',
    link: { title: 'Widgets and Dashboards', url: '/features/#visualisation-of-tests' },
  },
  {
    icon: <QualityGatesIcon />,
    title: 'Quality gates',
    text: 'Automate release decisions with Quality Gates rules',
    link: { title: 'Quality gates', url: '/features/#quality-gates' },
  },
];
