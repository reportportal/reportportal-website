import starSvg from '@app/svg/star.svg';
import communitySvg from '@app/svg/community.svg';

import supportInnovationSvg from './icons/support-innovation.svg';

export const INDIVIDUAL_CARDS = [
  {
    itemTitle: 'Support innovation',
    description:
      'Help us continue to develop and maintain ReportPortal, ensuring it remains free and accessible to everyone',
    icon: supportInnovationSvg,
    iconColor: 'var(--graphics-iris)',
  },
  {
    itemTitle: 'Join a Community',
    description:
      'Join the community of developers and testers, with opportunities to participate in discussions, events, and development sprints',
    icon: communitySvg,
    iconColor: 'var(--graphics-light-blue)',
  },
  {
    itemTitle: 'Gain recognition',
    description:
      'Get recognized for your contribution within the community through our website and social media channels',
    icon: starSvg,
    iconColor: 'var(--graphics-jade)',
  },
];

export const CONTACT_US_LINK = '/contact-us/sponsorship-program/individual';
