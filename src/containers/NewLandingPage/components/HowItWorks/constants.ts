export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  agenticNote: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: '01',
    title: 'Design',
    description:
      'Define your test strategy and structure test suites to align with product requirements and quality goals.',
    agenticNote: 'AI helps generate and structure test cases from your requirements.',
  },
  {
    step: '02',
    title: 'Plan',
    description:
      'Organise test cases, assign ownership, and set up quality gates so every sprint starts with clear objectives.',
    agenticNote: 'Agents assist in scoping and prioritizing what to test next.',
  },
  {
    step: '03',
    title: 'Execute',
    description:
      'Run automated and manual tests across any framework, environment, or CI/CD pipeline in real time.',
    agenticNote: 'Connects to your CI/CD — no migration needed.',
  },
  {
    step: '04',
    title: 'Analyze',
    description:
      'Use AI-powered root cause analysis and dashboards to understand failures and spot trends instantly.',
    agenticNote: 'AI agents auto-classify failures and surface root causes in seconds.',
  },
  {
    step: '05',
    title: 'Release',
    description:
      'Make confident, data-driven release decisions with automated quality gates and full traceability reports.',
    agenticNote: 'Quality Gates signal go/no-go automatically based on your thresholds.',
  },
];
