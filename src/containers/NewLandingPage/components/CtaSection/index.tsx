import React, { FC } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';
import { Link } from '@app/components/Link';
import { ArrowLink } from '@app/components/ArrowLink';

import './CtaSection.scss';

const getBlocksWith = createBemBlockBuilder(['cta-section']);

export const CtaSection: FC = () => (
  <section className={getBlocksWith()}>
    <div className={classNames(getBlocksWith('__inner'), 'container')}>
      <h2 className={getBlocksWith('__title')}>
        Faster releases. Smarter triage. One unified platform.
      </h2>
      <p className={getBlocksWith('__subtitle')}>
        Spend less time triaging failures and more time shipping releases. AI agents handle the
        analysis across every framework you use — automatically.
      </p>

      <div className={getBlocksWith('__actions')}>
        <Link
          className="btn btn--secondary btn--large"
          to="/contact-us/general/?reason=free_trial"
          data-gtm="get_started_cta"
        >
          Start free trial
        </Link>
        <Link
          className="btn btn--outline-2 btn--large"
          to="https://demo.reportportal.io/"
          data-gtm="try_demo_cta"
        >
          Try demo
        </Link>
      </div>

      <ArrowLink
        mode="primary"
        text="Or contact our team"
        to="/contact-us/general/"
        data-gtm="contact_us_cta"
        className={getBlocksWith('__secondary-link')}
      />
    </div>
  </section>
);
