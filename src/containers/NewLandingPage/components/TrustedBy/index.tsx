import React, { FC, useMemo } from 'react';
import Marquee from 'react-fast-marquee';
import classNames from 'classnames';
import { createBemBlockBuilder, COMMON_MARQUEE_PROPS } from '@app/utils';
import { useClientCarouselItems } from '@app/hooks/useClientCarouselItems';

import { STATS } from './constants';

import './TrustedBy.scss';

const getBlocksWith = createBemBlockBuilder(['trusted-by']);

// Repeat items 3× so total width always exceeds the viewport,
// preventing the gap react-fast-marquee shows when items don't fill the track.
const REPEAT_COUNT = 3;

export const TrustedBy: FC = () => {
  const { allSlidesItems } = useClientCarouselItems();

  const repeatedItems = useMemo(
    () => Array.from({ length: REPEAT_COUNT }, () => allSlidesItems).flat(),
    [allSlidesItems],
  );

  return (
    <section className={getBlocksWith()}>
      <div className={classNames(getBlocksWith('__header'), 'container')}>
        <p className={getBlocksWith('__label')}>Trusted by leading companies worldwide</p>
      </div>

      <div className={getBlocksWith('__marquee-wrapper')}>
        <Marquee {...COMMON_MARQUEE_PROPS} className={getBlocksWith('__marquee')}>
          {repeatedItems.map(({ id, primaryLogo }, index) => (
            <div className={getBlocksWith('__logo')} key={`${id}-${index}`}>
              <img src={primaryLogo?.url} alt={primaryLogo?.title} loading="lazy" />
            </div>
          ))}
        </Marquee>
      </div>

      <div className={classNames(getBlocksWith('__stats'), 'container')}>
        {STATS.map(({ digits, suffix, label }) => (
          <div className={getBlocksWith('__stat')} key={label}>
            <span className={getBlocksWith('__stat-value')}>
              <span className={getBlocksWith('__stat-digits')}>{digits}</span>
              <span className={getBlocksWith('__stat-suffix')}>{suffix}</span>
            </span>
            <span className={getBlocksWith('__stat-label')}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
