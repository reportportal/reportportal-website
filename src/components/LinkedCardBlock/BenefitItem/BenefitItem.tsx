import React, { FC } from 'react';
import { createBemBlockBuilder } from '@app/utils';
import { Link } from '@app/components/Link';

import { IconWithBackground } from '../../IconWithBackground';

import './BenefitItem.scss';

export interface CommonBenefitItemProps {
  itemTitle: string;
  description: string;
  link?: string;
  linkText?: string;
  icon?: string;
  iconColor: string;
}

export type BenefitItemProps =
  | ({
      icon: string;
      iconColor: string;
    } & CommonBenefitItemProps)
  | ({
      icon?: undefined;
      iconColor?: undefined;
    } & CommonBenefitItemProps);

const getBlocksWith = createBemBlockBuilder(['benefit-item']);

export const BenefitItem: FC<BenefitItemProps> = ({
  itemTitle,
  description,
  link,
  linkText = '',
  icon,
  iconColor,
}) => (
  <div className={getBlocksWith()}>
    {icon && <IconWithBackground icon={icon} iconColor={iconColor} />}
    <div className={getBlocksWith('__content')}>
      <h3 className={getBlocksWith('__title')}>{itemTitle}</h3>
      <p className={getBlocksWith('__description')}>{description}</p>
      {link && (
        <Link className="link" to={link}>
          {linkText}
          {' >'}
        </Link>
      )}
    </div>
  </div>
);
