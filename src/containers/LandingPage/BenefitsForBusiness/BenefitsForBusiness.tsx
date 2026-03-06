import React, { FC } from 'react';
import { Link } from '@app/components/Link';
import { AnimatedList } from '@app/components/AnimatedList';

import { BENEFITS_FOR_BUSINESS_LIST } from './constants';

export const BenefitsForBusiness: FC = () => (
  <AnimatedList
    title="Benefits for business"
    subtitle="Features full of benefits from business perspective"
    data={BENEFITS_FOR_BUSINESS_LIST}
  >
    <Link
      className="btn btn--primary btn--large temporary-hide"
      to="/contact-us/general/"
      data-gtm="start_free_trial"
    >
      Start free trial
    </Link>
    <Link className="btn btn--outline btn--large" to="/contact-us/general/" data-gtm="get_a_quote">
      Contact us
    </Link>
  </AnimatedList>
);
