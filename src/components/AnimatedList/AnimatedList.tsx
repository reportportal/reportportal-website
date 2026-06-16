import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder, LIST_ANIMATION_DELAY } from '@app/utils';
import { useAnimationInterval } from '@app/hooks/useAnimationInterval';

import { LinkedCard } from '../LinkedCard';
import { IllustrationStaticProvider } from './IllustrationStaticContext';

import './AnimatedList.scss';

// Scales illustration proportionally to fit the mobile container width.
// Uses ResizeObserver so it reacts to viewport changes.
// Self-scaling illustrations (those with their own ResizeObserver) signal via
// the onSelfScaling callback so we skip adding an extra outer scale on top.
const MobileIllustrationWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const selfScalingRef = useRef(false);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    function applyScale() {
      if (!outer || !inner) return;
      if (selfScalingRef.current) {
        outer.style.height = `${inner.scrollHeight}px`;
        return;
      }
      const naturalW = inner.scrollWidth;
      if (!naturalW) return;
      const scale = Math.min(1, outer.clientWidth / naturalW);
      inner.style.transform = `scale(${scale})`;
      inner.style.transformOrigin = 'top left';
      outer.style.height = `${inner.scrollHeight * scale}px`;
    }

    const onSelfScaling = () => {
      selfScalingRef.current = true;
      // Remove the scale transform we may have set before self-scaling notified
      if (inner) inner.style.transform = '';
      applyScale();
    };

    // Store callback so provider can call it
    (outerRef.current as HTMLDivElement & { __onSelfScaling?: () => void }).__onSelfScaling =
      onSelfScaling;

    applyScale();
    const ro = new ResizeObserver(applyScale);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  const onSelfScalingCallback = useCallback(() => {
    const outer = outerRef.current as (HTMLDivElement & { __onSelfScaling?: () => void }) | null;
    outer?.__onSelfScaling?.();
  }, []);

  return (
    <div ref={outerRef} className="animated-list__mobile-illustration-outer">
      <div ref={innerRef} className="animated-list__mobile-illustration-inner">
        <IllustrationStaticProvider onSelfScaling={onSelfScalingCallback}>
          {children}
        </IllustrationStaticProvider>
      </div>
    </div>
  );
};

interface AnimatedListProps {
  data: {
    description: string;
    image: string;
    illustration?: React.ComponentType;
    link: string;
    title: string;
  }[];
  title: string;
  subtitle: string;
  children: ReactNode;
  listDesktopPosition?: string;
  sectionClassName?: string;
}

const getBlocksWith = createBemBlockBuilder(['animated-list-container']);
const getBlocksWithList = createBemBlockBuilder(['animated-list']);

export const AnimatedList: FC<AnimatedListProps> = ({
  data,
  title,
  subtitle,
  listDesktopPosition = 'left',
  sectionClassName,
  children,
}) => {
  const { ref, inView, delay, activeListIndex, setIndexAndResetInterval } = useAnimationInterval({
    totalItemsLength: data.length,
    interval: LIST_ANIMATION_DELAY,
  });
  const { image, illustration: Illustration } = data[activeListIndex];

  return (
    <section ref={ref} className={classNames(getBlocksWith(), sectionClassName)}>
      <div className={classNames(getBlocksWith('__inner'), 'container')}>
        <div>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
        </div>
        <div className={getBlocksWith('__content')}>
          <div
            className={classNames(getBlocksWithList(), {
              [getBlocksWithList('--reversed')]: listDesktopPosition !== 'left',
            })}
          >
            <ul>
              {data.map(({ title: itemTitle, description, link, illustration: ItemIllustration }, index) =>
                index !== activeListIndex ? (
                  <li
                    className={getBlocksWithList('__item')}
                    key={itemTitle}
                    onClick={() => setIndexAndResetInterval(index)}
                  >
                    <strong>{itemTitle}</strong>
                  </li>
                ) : (
                  <React.Fragment key={itemTitle}>
                    <li className={getBlocksWithList('__item', '__item--active')}>
                      {!Illustration && <img src={image} alt="" loading="lazy" />}
                      <LinkedCard
                        itemTitle={itemTitle}
                        description={description}
                        link={link}
                        linkText="Learn more"
                        delay={delay}
                      />
                    </li>
                    {ItemIllustration && (
                      <li className={getBlocksWithList('__mobile-illustration')} aria-hidden="true">
                        <MobileIllustrationWrapper>
                          <ItemIllustration />
                        </MobileIllustrationWrapper>
                      </li>
                    )}
                  </React.Fragment>
                ),
              )}
            </ul>
            {Illustration ? (
              <div className={getBlocksWithList('__illustration-panel')} key="illustration">
                <Illustration />
              </div>
            ) : (
              <img
                src={image}
                key={image}
                alt=""
                loading="lazy"
              />
            )}
          </div>
          <div className={getBlocksWith('__leading')}>
            <div className={getBlocksWith('__leading-button-group')}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
