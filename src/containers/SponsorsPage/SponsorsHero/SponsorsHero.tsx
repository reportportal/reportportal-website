import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import Marquee from 'react-fast-marquee';
import { chunk } from 'lodash';
import { HeroSwitching } from '@app/components/HeroSwitching';
import { Carousel } from '@app/components/Carousel';
import { useInView } from '@app/hooks/useInView';
import { createBemBlockBuilder, MEDIA_PHONE_LG, COMMON_MARQUEE_PROPS } from '@app/utils';
import { useAnimationEnabledForSiblingRoutes } from '@app/hooks/useAnimationEnabledForSiblingRoutes';

import { PRICING_BUTTONS, SPONSOR_SLIDES } from './constants';

import './SponsorsHero.scss';

const getBlocksWith = createBemBlockBuilder(['sponsors-hero']);

export const SponsorsHero: FC = () => {
  const [heroRef, isHeroInView] = useInView();
  const isAnimationEnabled = useAnimationEnabledForSiblingRoutes();

  const isDesktop = useMediaQuery({ query: '(min-width: 1124px)' });
  const isPhoneLg = useMediaQuery({ query: MEDIA_PHONE_LG });
  const slidesLength = SPONSOR_SLIDES.length;
  // ToDo: verify if it works fine with real sponsors
  const isMarqueePlayable = (!isPhoneLg && slidesLength >= 3) || (isPhoneLg && slidesLength > 5);
  const isNavigationVisible = slidesLength > 7;

  return (
    <div className={getBlocksWith()} ref={heroRef}>
      <HeroSwitching
        activeButton="Business"
        buttons={PRICING_BUTTONS}
        title="Sponsorship program"
        subtitle="Support a product that powers thousands of software teams worldwide, fosters innovation and excellence in software quality"
        isHeroInView={isHeroInView}
        isAnimationEnabled={isAnimationEnabled}
      >
        <div className="temporary-hide">
          {isDesktop && (
            <>
              <div className={getBlocksWith('__carousel-title')}>Our sponsors</div>
              <Carousel autoplay={isNavigationVisible} isNavigationVisible={isNavigationVisible}>
                {chunk(SPONSOR_SLIDES, 7)?.map((sponsors, index) => (
                  <div className={getBlocksWith('__slide')} key={index}>
                    {sponsors.map(({ src, id }) => (
                      <div className={getBlocksWith('__logo')} key={id}>
                        <img src={src} alt={id} />
                      </div>
                    ))}
                  </div>
                ))}
              </Carousel>
            </>
          )}
          {!isDesktop && (
            <>
              <div className={getBlocksWith('__carousel-title')}>Our sponsors</div>
              <Marquee
                {...COMMON_MARQUEE_PROPS}
                className={getBlocksWith('__carousel-mobile')}
                play={isMarqueePlayable}
              >
                {SPONSOR_SLIDES.map(({ id, src }) => (
                  <div className={getBlocksWith('__carousel-logo')} key={id}>
                    <img src={src} alt={id} />
                  </div>
                ))}
              </Marquee>
            </>
          )}
        </div>
      </HeroSwitching>
    </div>
  );
};
