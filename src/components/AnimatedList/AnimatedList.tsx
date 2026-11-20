import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder, LIST_ANIMATION_DELAY } from '@app/utils';
import { useAnimationInterval } from '@app/hooks/useAnimationInterval';

import { LinkedCard } from '../LinkedCard';
import { MobileIllustrationWrapper } from './MobileIllustrationWrapper';

import './AnimatedList.scss';

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
  const { ref, delay, activeListIndex, setIndexAndResetInterval } = useAnimationInterval({
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
              {data.map(
                ({ title: itemTitle, description, link, illustration: ItemIllustration }, index) =>
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
                        <li
                          className={getBlocksWithList('__mobile-illustration')}
                          aria-hidden="true"
                        >
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
              <img src={image} key={image} alt="" loading="lazy" />
            )}
          </div>
          <div className={getBlocksWith('__leading')}>
            <div className={getBlocksWith('__leading-button-group')}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
