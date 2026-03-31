import React, { useEffect, useRef, useState, FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from '@gatsbyjs/reach-router';
import { useScroll } from 'ahooks';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useScrollDirection } from '@app/hooks/useScrollDirection';
import {
  createBemBlockBuilder,
  MEDIA_DESKTOP_SM,
  iconsCommon,
  easeInOutOpacityScaleAnimationProps,
  heroBackgroundAnimationProps,
  getEaseInOutTransition,
} from '@app/utils';
import { Link } from '@app/components/Link';
import { ProcessIntegration } from '@app/components/ProcessIntegration';
import { SupportedFrameworks } from '@app/components/SupportedFrameworks';
import { ArrowLink } from '@app/components/ArrowLink';
import { Banner } from '@app/components/Banner';
import { StartTestingWithReportPortal } from '@app/components/StartTestingWithReportPortal';
import { Faq } from '@app/components/Faq';
import { FooterContent } from '@app/components/Layout';
import { useScrollIntoViewHandler } from '@app/hooks/useScrollIntoViewHandler';
import { AnimatedHeader } from '@app/components/AnimatedHeader';
import { useMotionEnterAnimation } from '@app/hooks/useMotionEnterAnimation';
import { useInView } from '@app/hooks/useInView';

import { FEATURES_LIST, FEATURES_FAQ_ITEMS, NAVIGATION_LIST } from './constants';

import './FeaturesPage.scss';

const getBlocksWith = createBemBlockBuilder(['features-page']);

export const FeaturesPage: FC = () => {
  const scrollIntoViewHandler = useScrollIntoViewHandler();
  const [heroImageRef, isHeroImageInView] = useInView();

  const getHeroImageAnimation = useMotionEnterAnimation(easeInOutOpacityScaleAnimationProps);
  const getBackgroundAnimation = useMotionEnterAnimation(heroBackgroundAnimationProps);

  const handleScroll = () => {
    const itemList = document.querySelectorAll(
      `.${getBlocksWith('__features-list-item-container')}`,
    );

    let activeIndex: number | null = null;

    // eslint-disable-next-line no-plusplus
    for (let i = itemList.length - 1; i >= 0; i--) {
      const rect = itemList[i].getBoundingClientRect();

      const value = Math.abs(Math.round(rect.top));
      const scrollThreshold = 50;

      if (value <= scrollThreshold) {
        activeIndex = i;
        break;
      }
    }

    if (activeIndex !== null) {
      const anchor = NAVIGATION_LIST[activeIndex].link;

      if (anchor !== activeElement) {
        setActiveElement(anchor);
        setHistoryValue(anchor);
      }
    }
  };

  const location = useLocation();
  const [isFeaturesMenuSticky, setIsFeaturesMenuSticky] = useState(false);
  const [activeElement, setActiveElement] = useState(location.hash);
  const processIntegrationRef = useRef<null | HTMLDivElement>(null);
  const scrollDirection = useScrollDirection({ callbackFn: handleScroll, isMenuOpen: false });
  const scroll = useScroll();
  const isDesktop = useMediaQuery({ query: MEDIA_DESKTOP_SM });
  const scrollY = scroll?.top ?? 0;

  const featuresBlockStickyPosition = 126;
  const headerHeight = 76;
  const stickyScrollTopPosition = 1200;
  const featuresBlockStickyPositionWithHeader = featuresBlockStickyPosition - headerHeight;
  const menuItemActiveClassName = getBlocksWith('__features-navigation-item--active');
  const featureItemClassName = getBlocksWith('__features-navigation-item');

  const setHistoryValue = val => window.history.replaceState(null, '', `/features${val}`);

  useEffect(() => {
    const processIntegrationTopPosition =
      processIntegrationRef.current?.getBoundingClientRect().top;
    const offset = 100;

    let isStickyPositionReached: boolean = false;

    if (processIntegrationTopPosition) {
      isStickyPositionReached =
        (scrollDirection === 'up'
          ? processIntegrationTopPosition - headerHeight - offset
          : processIntegrationTopPosition - offset) > 0;
    }

    if (isStickyPositionReached && isFeaturesMenuSticky !== isStickyPositionReached) {
      setIsFeaturesMenuSticky(!isFeaturesMenuSticky);
    }
  }, [scroll, scrollDirection, isFeaturesMenuSticky]);

  const handleNavClick = (event, anchor) => {
    event.preventDefault();

    scrollIntoViewHandler(anchor.slice(1));
  };

  return (
    <div className={getBlocksWith()}>
      <motion.div
        className={getBlocksWith('__hero')}
        {...getBackgroundAnimation({ isInView: isHeroImageInView })}
      >
        <div className="container">
          <div className={getBlocksWith('__hero-heading')}>
            <AnimatedHeader headerLevel={1} delay={0.3}>
              Features
            </AnimatedHeader>
            <AnimatedHeader
              delay={0.3}
              transition={{
                ...getEaseInOutTransition(0.7),
              }}
            >
              Empower your testing process with ReportPortal
            </AnimatedHeader>
          </div>
          <div className={getBlocksWith('__hero-dashboard')}>
            <motion.img
              src={iconsCommon.dashboard}
              ref={heroImageRef}
              alt=""
              {...getHeroImageAnimation({
                delay: 0.3,
                isInView: isHeroImageInView,
              })}
              onLoad={() => {
                if (activeElement) {
                  scrollIntoViewHandler(activeElement.slice(1));
                }
              }}
            />
          </div>
        </div>
      </motion.div>
      <div
        className={getBlocksWith('__features-explorer')}
        style={{
          position: isDesktop && isFeaturesMenuSticky ? 'sticky' : 'relative',
          top:
            scrollDirection === 'up'
              ? `-${featuresBlockStickyPositionWithHeader}px`
              : `-${featuresBlockStickyPosition}px`,
        }}
      >
        <h2
          className={getBlocksWith('__features-heading')}
          style={{
            visibility: `${scrollY > stickyScrollTopPosition ? 'hidden' : 'visible'}`,
          }}
        >
          Explore ReportPortal features
        </h2>
        <div className={getBlocksWith('__features-navigation')}>
          <div className={getBlocksWith('__features-navigation-container')}>
            {NAVIGATION_LIST.map(({ id, name, link }) => (
              <Link
                className={classNames(featureItemClassName, {
                  [menuItemActiveClassName]: link === activeElement,
                })}
                to={link}
                key={name}
                onClick={event => handleNavClick(event, link)}
              >
                <span>{id}</span>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={getBlocksWith('__features-list')}>
        {FEATURES_LIST.map(({ id, link, title, description, image, isPremium }) => (
          <div className={getBlocksWith('__features-list-item-container')} key={id} id={id}>
            <div
              className={classNames(getBlocksWith('__features-list-item'), 'container')}
              key={title}
            >
              <div className={getBlocksWith('__features-list-item-leading')}>
                {isPremium && (
                  <span className={getBlocksWith('__features-list-item-premium')}>
                    Premium feature
                  </span>
                )}
                <h3>{title}</h3>
                <p>{description}</p>
                <ArrowLink mode="primary" to={link} text="Learn more" />
              </div>

              <div className={getBlocksWith('__features-list-item-trailing')}>
                <img src={image} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <ProcessIntegration ref={processIntegrationRef} />
      <div className={getBlocksWith('__frameworks')}>
        <h2>Supported frameworks</h2>
        <h3>Explore supported frameworks by language</h3>
        <SupportedFrameworks />
      </div>
      <StartTestingWithReportPortal />
      <div className={classNames(getBlocksWith('__faq'), 'container')}>
        <Faq items={FEATURES_FAQ_ITEMS} showMoreInfoLink={false} />
      </div>
      <FooterContent>
        <div className={getBlocksWith('__banner')}>
          <Banner
            title="Still have questions about our features?"
            linkTitle="Contact us"
            link="/contact-us/general"
          />
        </div>
      </FooterContent>
    </div>
  );
};
