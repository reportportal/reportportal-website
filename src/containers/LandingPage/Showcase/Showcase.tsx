import React, { FC, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import Marquee from 'react-fast-marquee';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion';
import { Link } from '@app/components/Link';
import { useClientCarouselItems } from '@app/hooks/useClientCarouselItems';
import {
  COMMON_MARQUEE_PROPS,
  createBemBlockBuilder,
  defaultSpringTransition,
  opacityScaleAnimationProps,
  watchProductOverviewAtom,
} from '@app/utils';
import { useMotionEnterAnimation } from '@app/hooks/useMotionEnterAnimation';
import { useInView } from '@app/hooks/useInView';

import { OrganizationsCarousel } from './OrganizationsCarousel';

import './Showcase.scss';

const getBlocksWith = createBemBlockBuilder(['showcase']);

const commonAnimationProps = {
  ...opacityScaleAnimationProps,
  ...defaultSpringTransition,
};

export const Showcase: FC = () => {
  const [, setWatchProductOverviewState] = useAtom(watchProductOverviewAtom);
  const isDesktop = useMediaQuery({ query: '(min-width: 1124px)' });
  const { slides, allSlidesItems } = useClientCarouselItems();
  const [titleBlockRef, isTitleBlockInView] = useInView();
  const [carouselRef, isCarouselInView] = useInView();
  const getAnimation = useMotionEnterAnimation(commonAnimationProps);

  const toggleEmbedVideoOpen = useCallback(
    () => setWatchProductOverviewState(({ isOpen }) => ({ isOpen: !isOpen })),
    [setWatchProductOverviewState],
  );

  return (
    <div className={getBlocksWith()}>
      <div className={getBlocksWith('__bg-video-container')}>
        <video
          className={getBlocksWith('__bg-video')}
          preload="auto"
          autoPlay
          loop
          muted
          controlsList="nodownload"
          playsInline
          poster="/PR_promo_video_poster.png"
        >
          <source src="/RP_promo_video.webm" type="video/webm" />
          <source src="/RP_promo_video.mp4" type="video/mp4" />
          Your browser does not support the video tag
        </video>
      </div>
      <div ref={titleBlockRef}>
        <motion.h1
          className={getBlocksWith('__title')}
          {...getAnimation({ isInView: isTitleBlockInView })}
        >
          AI-powered <br />
          Test Automation Dashboard
        </motion.h1>
        <motion.p
          className={getBlocksWith('__subtitle')}
          {...getAnimation({ isInView: isTitleBlockInView, delay: 0.1 })}
        >
          Aggregate and analyze test reports to ascertain release health
        </motion.p>
        <motion.div
          className={getBlocksWith('__btn-row')}
          {...getAnimation({ isInView: isTitleBlockInView, delay: 0.2 })}
        >
          <div className={getBlocksWith('__btn-group')}>
            <Link
              className="btn btn--secondary btn--large"
              to="https://demo.reportportal.io/"
              data-gtm="start_free_trial"
            >
              Try Demo
            </Link>
            <Link
              className="btn btn--outline-2 btn--large"
              to="/contact-us/general/"
              data-gtm="get_a_quote"
            >
              Contact us
            </Link>
          </div>
        </motion.div>
        <motion.div
          className={getBlocksWith('__watch-video-container')}
          {...getAnimation({ isInView: isTitleBlockInView, delay: 0.3 })}
        >
          <button className={getBlocksWith('__btn-watch-video')} onClick={toggleEmbedVideoOpen}>
            <span className={getBlocksWith('__btn-watch-video-icon')} />
            <span>Watch video</span>
          </button>
        </motion.div>
      </div>
      {isDesktop && (
        <motion.div
          ref={carouselRef}
          {...getAnimation({
            isInView: isCarouselInView,
            additionalEffects: { hiddenAdditional: { y: 50 }, enterAdditional: { y: 0 } },
          })}
        >
          <OrganizationsCarousel slides={slides} logoKey="primaryLogo" />
        </motion.div>
      )}
      {!isDesktop && (
        <Marquee {...COMMON_MARQUEE_PROPS} className={getBlocksWith('__carousel-mobile')}>
          {allSlidesItems.map(({ id, primaryLogo }) => (
            <div className={getBlocksWith('__carousel-logo')} key={id}>
              <img src={primaryLogo?.url} alt={primaryLogo?.title} />
            </div>
          ))}
        </Marquee>
      )}
    </div>
  );
};
