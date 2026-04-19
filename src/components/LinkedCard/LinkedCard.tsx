import React, { FC, useId } from 'react';
import { createBemBlockBuilder } from '@app/utils';

import { ArrowLink } from '../ArrowLink';
import { IconWithBackground } from '../IconWithBackground';

import './LinkedCard.scss';

type CommonLinkedCardProps = {
  itemTitle: string;
  description: string;
  link?: string;
  linkText?: string;
  delay?: number;
};

export type LinkedCardProps =
  | ({
      icon: string;
      iconColor: string;
    } & CommonLinkedCardProps)
  | ({
      icon?: undefined;
      iconColor?: undefined;
    } & CommonLinkedCardProps);

const getBlocksWith = createBemBlockBuilder(['linked-card']);

export const LinkedCard: FC<LinkedCardProps> = ({
  itemTitle,
  description,
  link,
  linkText = '',
  icon,
  iconColor,
  delay = 0,
}) => {
  const titleId = useId();

  return (
    <div className={getBlocksWith()}>
      {icon && <IconWithBackground icon={icon} iconColor={iconColor} />}
      <strong id={titleId} className={getBlocksWith('__title')}>
        {itemTitle}
      </strong>
      <p className={getBlocksWith('__description')}>{description}</p>
      {link && <ArrowLink mode="primary" to={link} text={linkText} aria-labelledby={titleId} />}
      {Boolean(delay) && <div className={getBlocksWith('__progress')} />}
    </div>
  );
};
