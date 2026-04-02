import { BenefitItemProps } from '@app/components/LinkedCardBlock';
import { DOCUMENTATION_URL } from '@app/utils';

import starSvg from '../../svg/star.svg';
import envelopeSvg from './icons/envelope.svg';
import handshakeSvg from './icons/handshake.svg';

export const BENEFITS_CARDS: BenefitItemProps[] = [
  {
    itemTitle: 'All Premium features',
    description: 'Quality Gates, SCIM Server, etc.',
    icon: starSvg,
    iconColor: 'var(--graphics-orchid)',
    link: `${DOCUMENTATION_URL}/terms-and-conditions/PremiumFeatures`,
    linkText: 'Learn more',
  },
  {
    itemTitle: 'Unlimited email support',
    description: 'Professional assistance whenever you need it.',
    icon: envelopeSvg,
    iconColor: 'var(--graphics-jade)',
  },
  {
    itemTitle: 'SLA for response',
    description: 'Max 24 hours for response to your submitted request.',
    icon: handshakeSvg,
    iconColor: 'var(--graphics-iris)',
  },
];
