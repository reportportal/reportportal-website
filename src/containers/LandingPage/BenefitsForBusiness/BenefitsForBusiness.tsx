import React, { FC } from 'react';
import { Link } from '@app/components/Link';
import { AnimatedList } from '@app/components/AnimatedList';
import { buildContactUsGeneralPath } from '@app/utils';

import { BENEFITS_FOR_BUSINESS_LIST } from './constants';

export const BenefitsForBusiness: FC = () => (
  <AnimatedList
    title="Benefits for business"
    subtitle="Features full of benefits from business perspective"
    data={BENEFITS_FOR_BUSINESS_LIST}
  >
    <Link
      className="btn btn--primary btn--large temporary-hide"
      to={buildContactUsGeneralPath({ reason: 'free_trial' })}
      data-gtm="start_free_trial"
    >
      Start free trial
    </Link>
    <Link
      className="btn btn--outline btn--large"
      to={buildContactUsGeneralPath()}
      data-gtm="get_a_quote"
    >
      Contact us
    </Link>
  </AnimatedList>
);
