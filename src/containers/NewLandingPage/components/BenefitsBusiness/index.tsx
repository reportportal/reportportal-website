import React, { FC } from 'react';
import { AnimatedList } from '@app/components/AnimatedList';
import { Link } from '@app/components/Link';

import { BENEFITS_ITEMS } from './constants';
import { QualityGatesIllustration } from './illustrations/QualityGatesIllustration';
import { TestManagementIllustration } from './illustrations/TestManagementIllustration';
import { AiTriageIllustration } from './illustrations/AiTriageIllustration';
import { KeyMetricsIllustration } from './illustrations/KeyMetricsIllustration';
import { SecurityIllustration } from './illustrations/SecurityIllustration';

const ILLUSTRATIONS: Record<number, React.ComponentType> = {
  0: QualityGatesIllustration,
  1: TestManagementIllustration,
  2: AiTriageIllustration,
  3: KeyMetricsIllustration,
  4: SecurityIllustration,
};

const BENEFITS_DATA = BENEFITS_ITEMS.map((item, index) => ({
  ...item,
  illustration: ILLUSTRATIONS[index],
}));

export const BenefitsBusiness: FC = () => (
  <AnimatedList
    title="Benefits for business"
    subtitle="Reduce testing costs, improve software quality, and accelerate releases — with AI agents that give QA Managers & Leads greater visibility, control, and confidence."
    data={BENEFITS_DATA}
  >
    <Link
      className="btn btn--primary btn--large"
      to="/contact-us/general/?reason=free_trial"
      data-gtm="start_free_trial_benefits"
    >
      Start free trial
    </Link>
    <Link
      className="btn btn--outline btn--large"
      to="/contact-us/general/"
      data-gtm="contact_us_benefits"
    >
      Contact us
    </Link>
  </AnimatedList>
);
