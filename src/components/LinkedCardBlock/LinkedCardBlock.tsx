import React, { ReactNode, ComponentType } from 'react';
import classNames from 'classnames';
import { LinkedCard, LinkedCardProps } from '@app/components/LinkedCard';
import { createBemBlockBuilder } from '@app/utils';

import { TitleBlock } from '../TitleBlock';

import './LinkedCardBlock.scss';

interface LinkedCardBlockProps<T = LinkedCardProps> {
  title: string;
  cardsInfo: T[];
  children?: ReactNode;
  subtitle?: string;
  mode?: 'large';
  CardComponent?: ComponentType<T>;
}

const getBlocksWith = createBemBlockBuilder(['linked-card-block']);

export const LinkedCardBlock = <T extends LinkedCardProps = LinkedCardProps>({
  children,
  title,
  subtitle,
  cardsInfo,
  mode,
  CardComponent = LinkedCard as ComponentType<T>,
}: LinkedCardBlockProps<T>) => (
  <div
    className={classNames(getBlocksWith(), {
      [getBlocksWith(`--${mode}`)]: Boolean(mode),
    })}
  >
    <div className="container">
      <TitleBlock title={title} subtitle={subtitle} />
      <div className={getBlocksWith('__cards')}>
        {cardsInfo.map(cardInfo => (
          <CardComponent key={cardInfo.itemTitle} {...cardInfo} />
        ))}
      </div>
      {children}
    </div>
  </div>
);
