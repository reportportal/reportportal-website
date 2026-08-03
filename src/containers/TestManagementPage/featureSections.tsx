import React from 'react';
import { Link } from '@app/components/Link';

export const FEATURE_SECTIONS = [
  {
    id: 'milestones',
    title: 'Stay on track with Milestones',
    description:
      'Group test cases into Test Plans. Assign them to specific Milestones to track progress against your release deadlines.',
    bullets: [
      'Create milestone-based test plans',
      'Track execution progress in real-time',
      'Visualize test coverage by release',
      'Get AI-suggested test scope per milestone',
    ],
    imagePosition: 'right' as const,
  },
  {
    id: 'manual-execution',
    title: 'Execute manual tests seamlessly',
    description:
      'Create manual launches to track test execution progress. Run tests manually using an intuitive flow.',
    bullets: [
      'Execute tests and attach evidence on completion',
      'Track manual test results alongside automation',
      <>
        Cloud testing on real devices via{' '}
        <Link className="feature-section__bullet-link" to="https://mobitru.com/">
          Mobitru
        </Link>{' '}
        integration
      </>,
      'Run AI checks in parallel with manual execution',
    ],
    imagePosition: 'left' as const,
  },
];
