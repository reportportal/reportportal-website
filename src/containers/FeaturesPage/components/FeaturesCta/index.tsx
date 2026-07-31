import React, { FC } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';
import { Link } from '@app/components/Link';

import './FeaturesCta.scss';

const getBlocksWith = createBemBlockBuilder(['features-cta']);

export const FeaturesCta: FC = () => (
  <section className={getBlocksWith()}>
    <div className={classNames(getBlocksWith('__inner'), 'container')}>
      <h2 className={getBlocksWith('__title')}>Ready to transform your testing workflow?</h2>
      <p className={getBlocksWith('__subtitle')}>
        Join thousands of teams using ReportPortal to deliver quality software faster. Start your
        free trial or request a demo today.
      </p>
      <div className={getBlocksWith('__button-group')}>
        <Link
          className="btn btn--secondary btn--large"
          to="/contact-us/general/?reason=free_trial"
          data-gtm="features_cta_start_trial"
        >
          Start free trial
        </Link>
        <Link
          className="btn btn--outline-2 btn--large"
          to="/contact-us/general/?reason=demo"
          data-gtm="features_cta_request_demo"
        >
          Request demo
        </Link>
      </div>
    </div>
  </section>
);
