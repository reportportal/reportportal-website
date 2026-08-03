import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';
import { Link } from '@app/components/Link';
import SuccessIcon from '@app/svg/success.inline.svg';

import './FeatureSection.scss';

const getBlocksWith = createBemBlockBuilder(['feature-section']);

interface FeatureSectionProps {
  title: string;
  description: string;
  bullets: ReactNode[];
  imagePosition: 'left' | 'right';
  illustration?: ReactNode;
}

export const FeatureSection: FC<FeatureSectionProps> = ({
  title,
  description,
  bullets,
  imagePosition,
  illustration,
}) => (
  <section className={getBlocksWith()}>
    <div
      className={classNames(getBlocksWith('__content'), 'container', {
        [getBlocksWith('__content--reversed')]: imagePosition === 'left',
      })}
    >
      <div className={getBlocksWith('__leading')}>
        <h2>{title}</h2>
        <p className={getBlocksWith('__description')}>{description}</p>
        <ul className={getBlocksWith('__bullets')}>
          {bullets.map((bullet, i) => (
            <li key={i}>
              <SuccessIcon className={getBlocksWith('__bullet-icon')} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <Link className="btn btn--outline btn--large" to="#">
          Learn more
        </Link>
      </div>
      <div
        className={classNames(getBlocksWith('__image'), {
          [getBlocksWith('__image--has-illustration')]: !!illustration,
        })}
      >
        {illustration}
      </div>
    </div>
  </section>
);
