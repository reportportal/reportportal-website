import React, { FC } from 'react';
import classNames from 'classnames';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder } from '@app/utils';

import './Sponsors.scss';

const getBlocksWith = createBemBlockBuilder(['sponsors']);

export const Sponsors: FC = () => (
  <div className={getBlocksWith()}>
    <div className={classNames(getBlocksWith('__content'), 'container')}>
      <div>
        <div className={getBlocksWith('__title')}>Fuel innovation and open-source progress</div>
        <div className={getBlocksWith('__description')}>
          Join us as a Sponsor on GitHub and support our quest for excellence in software testing
        </div>
      </div>
      <Link
        className={classNames(getBlocksWith('__button'), 'btn btn--pink btn--large')}
        to="/sponsorship-program/business/"
      >
        Become Sponsor
      </Link>
    </div>
  </div>
);
