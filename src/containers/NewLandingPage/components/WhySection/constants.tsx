import React from 'react';

import { RealTimeAnalyticsIcon } from './icons/RealTimeAnalyticsIcon';
import { TestDesignAndPlanningIcon } from './icons/TestDesignAndPlanningIcon';
import { TestResultsIcon } from './icons/TestResultsIcon';
import { MachineLearningIcon } from './icons/MachineLearningIcon';

export interface WhyCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const WHY_CARDS: WhyCard[] = [
  {
    icon: <RealTimeAnalyticsIcon />,
    title: 'Unified Traceability',
    description:
      'Connect all types of test results to requirements, bugs, and releases for end-to-end visibility across your entire testing lifecycle.',
  },
  {
    icon: <TestDesignAndPlanningIcon />,
    title: 'Test Design & Planning',
    description:
      'Organize and prioritize test cases, track coverage, and keep your QA process aligned with business objectives.',
  },
  {
    icon: <TestResultsIcon />,
    title: 'Execution & Reporting',
    description:
      'Run tests on any framework, in any environment — cloud, on-premises, or hybrid — and aggregate results in one place.',
  },
  {
    icon: <MachineLearningIcon />,
    title: 'AI-Powered Analytics',
    description:
      'AI agents automatically group failures, detect patterns, and surface root causes — so your team acts on insights, not raw data.',
  },
];
