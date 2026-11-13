import React, { FC } from 'react';
import { PricingCard } from '@app/components/PricingCard';
import { createBemBlockBuilder, OfferingPlansDto } from '@app/utils';

import './PricingCards.scss';

interface PricingCardsProps {
  plans: OfferingPlansDto;
  isYearlyPlanType: boolean;
}

const getBlocksWith = createBemBlockBuilder(['pricing-cards']);

/**
 * No framer-motion, for the same reason as PricingHero: the cards sit in the
 * first fold on a page whose whole purpose is the prices. Fading them in after
 * a 0.6s delay meant the one thing the visitor came for arrived last.
 */
export const PricingCards: FC<PricingCardsProps> = ({ plans, isYearlyPlanType }) => {
  const planType = isYearlyPlanType ? 'yearly' : 'quarterly';

  return (
    <div className={getBlocksWith()}>
      {plans.items.map(plan => (
        <PricingCard key={plan.title} plan={plan} planType={planType} />
      ))}
    </div>
  );
};
