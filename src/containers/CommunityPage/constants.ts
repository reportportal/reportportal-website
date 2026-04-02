import { DOCUMENTATION_URL } from '@app/utils';

import improveCoreSvg from './icons/improve-core.svg';
import boostAgentsSvg from './icons/boost-agents.svg';
import enhanceIntegrationsSvg from './icons/enhance-integrations.svg';
import installationGuideSvg from './icons/installation-guide.svg';
import developerGuideSvg from './icons/developer-guide.svg';
import releaseNotesSvg from './icons/release-notes.svg';

export const GITHUB_CONTRIBUTION_CARDS = [
  {
    itemTitle: 'Improve the core',
    description:
      'Enhance the ReportPortal application directly. Share your skills to make the platform better.',
    link: 'https://github.com/reportportal/reportportal/wiki/Contribution',
    linkText: 'Learn more',
    icon: improveCoreSvg,
    iconColor: 'var(--graphics-iris)',
  },
  {
    itemTitle: 'Boost agents',
    description:
      'Make testing smoother by improving agents. Help us maintain compatibility and add features.',
    link: 'https://github.com/reportportal/reportportal/wiki/Contribution',
    linkText: 'Learn more',
    icon: boostAgentsSvg,
    iconColor: 'var(--graphics-light-blue)',
  },
  {
    itemTitle: 'Enhance integrations',
    description:
      'Streamline workflows by enhancing integrations. Contribute to connect ReportPortal with other tools.',
    link: 'https://github.com/reportportal/reportportal/wiki/Contribution',
    linkText: 'Learn more',
    icon: enhanceIntegrationsSvg,
    iconColor: 'var(--graphics-jade)',
  },
];

export const DOCUMENTATION_CARDS = [
  {
    itemTitle: 'Installation guides',
    description:
      'Your roadmap to successfully setting up ReportPortal. Learn how to install, configure, and optimize our platform for your specific needs.',
    link: `${DOCUMENTATION_URL}/installation-steps`,
    linkText: 'Open in Documentation',
    icon: installationGuideSvg,
    iconColor: 'var(--graphics-blue)',
  },
  {
    itemTitle: 'Developer’s guide',
    description:
      "In-depth documentation tailored to developers, offering insights into ReportPortal's architecture, APIs, and customization options to maximize its potential.",
    link: `${DOCUMENTATION_URL}/developers-guides`,
    linkText: 'Open in Documentation',
    icon: developerGuideSvg,
    iconColor: 'var(--graphics-orange)',
  },
  {
    itemTitle: 'Release notes',
    description:
      'Stay informed about the latest updates with our detailed release notes. Discover the newest features and improvements in each ReportPortal version.',
    link: `${DOCUMENTATION_URL}/releases`,
    linkText: 'Open in Documentation',
    icon: releaseNotesSvg,
    iconColor: 'var(--graphics-orchid)',
  },
];
