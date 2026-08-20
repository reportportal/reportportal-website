import React, { FC } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';
import { Link } from '@app/components/Link';
import SuccessIcon from '@app/svg/success.inline.svg';
import ExternalLinkIcon from '@app/svg/externalLinkArrow.inline.svg';

import './MobitruPromo.scss';

const getBlocksWith = createBemBlockBuilder(['mobitru-promo']);

const BULLETS = [
  'Real mobile and tablet devices on iOS & Android',
  'Cross-browser testing on Chrome, Firefox, Safari, and more',
  'Network emulation and performance metrics included',
];

export const MobitruPromo: FC = () => (
  <section className={getBlocksWith()}>
    <div className={classNames(getBlocksWith('__inner'), 'container')}>
      <div className={getBlocksWith('__text')}>
        <h2 className={getBlocksWith('__title')}>Cloud devices for your testing needs</h2>
        <p className={getBlocksWith('__subtitle')}>
          Access real iOS, Android, and desktop devices directly from your test session — no
          hardware, no setup.
        </p>
        <ul className={getBlocksWith('__bullets')}>
          {BULLETS.map(bullet => (
            <li key={bullet}>
              <SuccessIcon className={getBlocksWith('__bullet-icon')} />
              {bullet}
            </li>
          ))}
        </ul>
        <div className={getBlocksWith('__cta')}>
          <Link className="btn btn--primary btn--large" to="https://mobitru.com/">
            Learn more
          </Link>
          <span className={getBlocksWith('__powered')}>
            Powered by{' '}
            <Link className={getBlocksWith('__powered-link')} to="https://mobitru.com/">
              Mobitru
              <ExternalLinkIcon className={getBlocksWith('__powered-icon')} />
            </Link>
          </span>
        </div>
      </div>

      <div className={getBlocksWith('__image-wrap')}>
        <img
          src="/images/mobitru-devices.webp"
          alt="Real devices available through Mobitru integration"
          className={getBlocksWith('__image')}
          loading="lazy"
        />
      </div>
    </div>
  </section>
);
