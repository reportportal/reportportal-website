import React, { FC } from 'react';
import { ButtonSwitcherProps } from '@app/components/ButtonSwitcher';
import { HeroSwitching } from '@app/components/HeroSwitching';
import { createBemBlockBuilder } from '@app/utils';

import { PlanTypeSwitcher, PlanTypeSwitcherProps } from './PlanTypeSwitcher';

import './PricingHero.scss';

interface PricingHeroProps {
  title: string;
  buttons: ButtonSwitcherProps['buttons'];
  activeButton: string;
  description: string;
  offerType?: string;
  switcherProps?: PlanTypeSwitcherProps;
  subtitle?: string;
}

const getBlocksWith = createBemBlockBuilder(['pricing-hero']);

/**
 * Deliberately free of framer-motion. Everything here is above the fold on
 * load, so an enter animation buys no reveal — it only holds the LCP element at
 * `opacity: 0` while the browser waits to count it as painted. `isAnimationEnabled`
 * is not accepted any more: there is nothing left to switch off.
 */
export const PricingHero: FC<PricingHeroProps> = ({
  title,
  subtitle,
  buttons,
  activeButton,
  switcherProps,
  offerType,
  description,
}) => (
  <div className={getBlocksWith()}>
    <HeroSwitching
      activeButton={activeButton}
      buttons={buttons}
      title={title}
      subtitle={subtitle}
      isAnimationEnabled={false}
    />
    <div className={getBlocksWith('__wrapper')}>
      {offerType && <div className={getBlocksWith('__wrapper-title')}>{offerType}</div>}
      <div className={getBlocksWith('__wrapper-subtitle')}>{description}</div>
    </div>
    {switcherProps && (
      <div className={getBlocksWith('__plan-type-switcher')}>
        <PlanTypeSwitcher {...switcherProps} />
      </div>
    )}
  </div>
);
