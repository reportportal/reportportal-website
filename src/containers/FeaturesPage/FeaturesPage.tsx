import React, { useEffect, useRef, useState, FC } from 'react';
import { useLocation } from '@gatsbyjs/reach-router';
import { useScroll } from 'ahooks';
import classNames from 'classnames';
import { useScrollDirection } from '@app/hooks/useScrollDirection';
import { useMediaQuerySafe } from '@app/hooks/useMediaQuerySafe';
import { createBemBlockBuilder, MEDIA_DESKTOP_SM, iconsCommon } from '@app/utils';
import SuccessIcon from '@app/svg/success.inline.svg';
import { Link } from '@app/components/Link';
import { SupportedFrameworks } from '@app/components/SupportedFrameworks';
import { Banner } from '@app/components/Banner';
import { Faq } from '@app/components/Faq';
import { FooterContent } from '@app/components/Layout';
import { useScrollIntoViewHandler } from '@app/hooks/useScrollIntoViewHandler';

import { FeaturesCta } from './components/FeaturesCta';
import { EnterpriseIntegrationsSection } from './components/EnterpriseIntegrationsSection';
import { FeatureIllustration } from './components/FeatureIllustration';
import { FEATURES_FAQ_ITEMS, FEATURES_LIST, NAVIGATION_LIST } from './constants';

import './FeaturesPage.scss';

const getBlocksWith = createBemBlockBuilder(['features-page']);

export const FeaturesPage: FC = () => {
  const scrollIntoViewHandler = useScrollIntoViewHandler();
  const handleScroll = () => {
    const itemList = document.querySelectorAll(
      `.${getBlocksWith('__features-list-item-container')}, .${getBlocksWith(
        '__features-list-item-container--full-width',
      )}`,
    );

    let activeIndex: number | null = null;

    // eslint-disable-next-line no-plusplus
    for (let i = itemList.length - 1; i >= 0; i--) {
      const rect = itemList[i].getBoundingClientRect();

      const value = Math.abs(Math.round(rect.top));
      // Threshold must exceed header (76px) + sticky features nav (~50px) + scroll-margin-top (64px)
      // so the section activates correctly after anchor navigation lands.
      const scrollThreshold = 200;

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
  const featuresEndRef = useRef<null | HTMLDivElement>(null);
  const heroImageRef = useRef<null | HTMLImageElement>(null);
  const scrollDirection = useScrollDirection({ callbackFn: handleScroll, isMenuOpen: false });
  const scroll = useScroll();
  const isDesktop = useMediaQuerySafe(MEDIA_DESKTOP_SM);
  const scrollY = scroll?.top ?? 0;

  const featuresBlockStickyPosition = 126;
  const headerHeight = 76;
  const stickyScrollTopPosition = 1200;
  const featuresBlockStickyPositionWithHeader = featuresBlockStickyPosition - headerHeight;
  const menuItemActiveClassName = getBlocksWith('__features-navigation-item--active');
  const featureItemClassName = getBlocksWith('__features-navigation-item');

  let featuresExplorerTop: string | undefined;
  if (isDesktop) {
    if (scrollDirection === 'up') {
      featuresExplorerTop = `-${featuresBlockStickyPositionWithHeader}px`;
    } else {
      featuresExplorerTop = `-${featuresBlockStickyPosition}px`;
    }
  }

  const setHistoryValue = val => window.history.replaceState(null, '', `/features${val}`);

  useEffect(() => {
    const endTopPosition = featuresEndRef.current?.getBoundingClientRect().top;
    const offset = 100;

    if (endTopPosition == null) return;

    const effectiveDistance =
      scrollDirection === 'up' ? endTopPosition - headerHeight - offset : endTopPosition - offset;

    const shouldBeSticky = effectiveDistance > 0;

    if (isFeaturesMenuSticky !== shouldBeSticky) {
      setIsFeaturesMenuSticky(shouldBeSticky);
    }
  }, [scroll, scrollDirection, isFeaturesMenuSticky]);

  const handleNavClick = (event, anchor) => {
    event.preventDefault();

    scrollIntoViewHandler(anchor.slice(1));
  };

  // Smooth-scroll to the anchor the page was opened with (e.g. the nav menu
  // links to "/features/#ai-capabilities" from another page). `gatsby-browser`
  // lands us at the top first, so this scroll is what the user actually sees.
  //
  // The hero image defines the offset of everything below it — measuring the
  // anchor before it has loaded would give a stale position, so wait for it.
  // Its `onLoad` alone is not enough: a cached image can finish loading before
  // React attaches the handler, and the scroll would never fire.
  useEffect(() => {
    const hash = location.hash;

    if (!hash) {
      return undefined;
    }

    const image = heroImageRef.current;
    const scrollToAnchor = () => scrollIntoViewHandler(hash.slice(1));

    if (!image || image.complete) {
      const frame = requestAnimationFrame(scrollToAnchor);

      return () => cancelAnimationFrame(frame);
    }

    image.addEventListener('load', scrollToAnchor, { once: true });

    return () => image.removeEventListener('load', scrollToAnchor);
    // Runs once on mount for the hash the page was opened with. In-page nav
    // clicks are handled by handleNavClick, not by this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={getBlocksWith()}>
      <div className={getBlocksWith('__hero')}>
        <div className="container">
          <div className={getBlocksWith('__hero-heading')}>
            <h1>Features</h1>
            <h2>Empower your testing process with ReportPortal</h2>
          </div>
          <div className={getBlocksWith('__hero-dashboard')}>
            <img ref={heroImageRef} src={iconsCommon.dashboard} alt="" />
          </div>
        </div>
      </div>
      <div
        className={getBlocksWith('__features-explorer')}
        style={{
          position: isDesktop && isFeaturesMenuSticky ? 'sticky' : 'relative',
          top: featuresExplorerTop,
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
                <span>{id}.</span>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={getBlocksWith('__features-list')}>
        {FEATURES_LIST.filter(f => f.layout !== 'full-width').map(
          ({ id, link, title, description, isPremium, bullets, cta }) => (
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
                  {bullets && bullets.length > 0 && (
                    <ul className={getBlocksWith('__features-list-item-bullets')}>
                      {bullets.map((bullet, i) => (
                        <li key={i}>
                          <SuccessIcon
                            className={getBlocksWith('__features-list-item-bullet-icon')}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className={getBlocksWith('__features-list-item-cta')}>
                    {(cta || (link ? [{ text: 'Learn more', link }] : [])).map(c => (
                      <Link key={c.link} className="btn btn--outline btn--large" to={c.link}>
                        {c.text}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={getBlocksWith('__features-list-item-trailing')}>
                  <FeatureIllustration name={id} />
                </div>
              </div>
            </div>
          ),
        )}
      </div>
      {FEATURES_LIST.filter(f => f.layout === 'full-width').map(feature => (
        <div
          key={feature.id}
          id={feature.id}
          className={getBlocksWith('__features-list-item-container--full-width')}
        >
          <EnterpriseIntegrationsSection feature={feature} />
        </div>
      ))}
      <div className={getBlocksWith('__frameworks')} ref={featuresEndRef}>
        <h2>Supported frameworks</h2>
        <h3>Explore supported frameworks by language</h3>
        <SupportedFrameworks />
      </div>
      <FeaturesCta />
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
