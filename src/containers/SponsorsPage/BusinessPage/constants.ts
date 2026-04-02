import { LinkedCardProps } from '@app/components/LinkedCard';
import starIcon from '@app/svg/star.svg';
import communityIcon from '@app/svg/community.svg';

import productImprovementIcon from './icons/product-improvement.svg';
import talentAttractionIcon from './icons/talent-attraction.svg';

export const BUSINESS_CARDS: LinkedCardProps[] = [
  {
    itemTitle: 'Brand visibility',
    description:
      "Boost your brand's visibility worldwide among developers and QA experts, showcasing your dedication to innovative software development practices",
    icon: starIcon,
    iconColor: 'var(--graphics-iris)',
  },
  {
    itemTitle: 'Talent attraction',
    description:
      'Attract top talent by prominently displaying your commitment to investing in tools and technologies that improve software quality and development efficiency',
    icon: talentAttractionIcon,
    iconColor: 'var(--graphics-orchid)',
  },
  {
    itemTitle: 'Community engagement',
    description:
      'Establish your company as a tech thought leader by engaging with the community via sponsored events, webinars, and content',
    icon: communityIcon,
    iconColor: 'var(--graphics-light-blue)',
  },
  {
    itemTitle: 'Product improvement',
    description:
      'Directly influence the future development of ReportPortal to better serve your business needs, ensuring the tool aligns with industry standards and practices',
    icon: productImprovementIcon,
    iconColor: 'var(--graphics-jade)',
  },
];

export const CONTACT_US_LINK = '/contact-us/sponsorship-program/business';
