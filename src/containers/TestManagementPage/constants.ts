export const FAQ_ITEMS = [
  {
    key: '1',
    label: 'Can I use Test Management alongside my existing automation results?',
    children:
      'Yes. Test Management is integrated directly into ReportPortal, so manual test cases and automated test runs live side by side in the same project. You can link manual cases to automated tests and view both in a single dashboard — no context-switching between tools.',
  },
  {
    key: '2',
    label: 'How do AI agents interact with the test case library?',
    children:
      'AI testing agents connect to ReportPortal via MCP Server. They can read your test structure, analyse existing coverage, and suggest new scenarios or flag missing edge cases — all without modifying your organisation of folders, templates, or tags. Your library stays exactly as you left it.',
  },
  {
    key: '3',
    label: 'What is a Milestone and how is it different from a test run?',
    children:
      'A Milestone is a planning unit that groups test cases around a release goal, sprint, or regulatory checkpoint. A test run is the execution of those cases at a specific point in time. Milestones let you track progress toward a goal across multiple runs, while each run gives you a snapshot of what passed, failed, or was skipped on a given day.',
  },
  {
    key: '4',
    label: 'Can I run manual test sessions on real devices inside ReportPortal?',
    children:
      'Yes. Through the Mobitru integration you can launch manual test sessions on real iOS, Android, and desktop browsers directly from your test run in ReportPortal. All session results, screenshots, and evidence are automatically saved back to the run — no copy-pasting or manual exports needed.',
  },
  {
    key: '5',
    label: 'Can I import test cases from TestRail, Xray, or other tools?',
    children:
      'Import from popular formats such as CSV, TestRail XML, and Xray is on the roadmap. In the meantime, you can build and organize your test case library natively in ReportPortal using templates, folder hierarchies, and tags — or let AI agents generate an initial test suite based on your requirements.',
  },
];

export const BENEFITS = [
  {
    id: 'coverage',
    title: 'Coverage',
    description:
      'Track coverage across requirements and releases. Spot untested areas before they reach production.',
    icon: '/svg/benefits/benefit-coverage.svg',
    iconColor: '#5577FF',
  },
  {
    id: 'no-extra-cost',
    title: 'No extra cost',
    description:
      'Included in your ReportPortal instance — no extra licenses. Free in the OpenSource version.',
    icon: '/svg/benefits/benefit-no-extra-cost.svg',
    iconColor: '#00B884',
  },
  {
    id: 'traceability',
    title: 'Traceability',
    description:
      'Link failures directly to your Bug Tracking System and tie test cases to requirements and defects.',
    icon: '/svg/benefits/benefit-traceability.svg',
    iconColor: '#009DBB',
  },
  {
    id: 'ai-ready',
    title: 'AI-ready',
    description:
      'Connect AI agents via MCP to analyze test data, automate workflows, and surface actionable insights.',
    icon: '/svg/benefits/benefit-ai-ready.svg',
    iconColor: '#BB66E1',
  },
];
