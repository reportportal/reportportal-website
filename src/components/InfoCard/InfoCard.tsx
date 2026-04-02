import React, { FC } from 'react';
import classNames from 'classnames';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder, LinkDto } from '@app/utils';

import './InfoCard.scss';

interface InfoCardProps {
  title: string;
  description: string;
  link: LinkDto;
  icon: string;
}

const getBlocksWith = createBemBlockBuilder(['info-card']);

export const InfoCard: FC<InfoCardProps> = ({ title, description, icon, link }) => (
  <div className={getBlocksWith()}>
    <img className={getBlocksWith('__image')} src={icon} alt="" />
    <div>
      <strong className={getBlocksWith('__title')}>{title}</strong>
      <p className={getBlocksWith('__description')}>{description}</p>
    </div>
    <Link
      className={classNames(getBlocksWith('__button'), 'btn btn--outline btn--small')}
      to={link.url}
    >
      {link.title}
    </Link>
  </div>
);
