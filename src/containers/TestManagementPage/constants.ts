export const FAQ_ITEMS = [
  {
    key: '1',
    label: 'Can I use Test Management alongside my existing automation results?',
    children:
      'Yes. Test Management is integrated directly into ReportPortal, so manual test cases and automated test runs live side by side in the same project — one place to manage both. Linking manual cases to automated tests and viewing them in a unified dashboard is on the roadmap.',
  },
  {
    key: '2',
    label: 'How do I migrate my existing test cases into ReportPortal?',
    children:
      'CSV import is available starting with release 26.1, so you can bring your existing test case library into ReportPortal right away. Native import from TestRail and Xray is on the roadmap. In the meantime, you can build and organise your library natively using folders, priorities, and tags — or use AI agents via the MCP Server to help draft an initial suite.',
  },
  {
    key: '3',
    label: 'Can the whole team work in Test Management together?',
    children:
      'Yes. Test Management is built for shared project work: the team uses the same library, plans, milestones, and Manual Launches. Editors create and update cases, run manual tests, add evidence, and link defects. Viewers can follow the same progress without changing data — so collaboration stays open, and control stays clear.',
  },
  {
    key: '4',
    label: 'How do AI agents interact with the Test Case Library?',
    children:
      'AI agents connect to ReportPortal through the MCP Server, which exposes your test case library for both reading and writing. Depending on how the connected agent is configured, it can review your test structure and help suggest new scenarios or coverage gaps. Because MCP also supports write access, an agent can create or update test cases directly — we recommend reviewing AI-suggested changes before relying on them.',
  },
  {
    key: '5',
    label: 'Can I link failed manual tests to my bug tracker?',
    children:
      'Yes. During a Manual Launch you can link failures directly to your configured bug tracking system (BTS) from the execution flow, so evidence and investigation stay connected to the defect without leaving ReportPortal.',
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
