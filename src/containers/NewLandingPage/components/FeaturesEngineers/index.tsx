import React, { FC } from 'react';
import { AnimatedList } from '@app/components/AnimatedList';
import { Link } from '@app/components/Link';

import { FEATURES_ITEMS } from './constants';
import { UnifiedReportingIllustration } from './UnifiedReportingIllustration';
import { RealTimeReportingIllustration } from './illustrations/RealTimeReportingIllustration';
import { AiAgentsIllustration } from './illustrations/AiAgentsIllustration';
import { QualityGatesIllustration } from '../BenefitsBusiness/illustrations/QualityGatesIllustration';
import { KeyMetricsIllustration } from '../BenefitsBusiness/illustrations/KeyMetricsIllustration';

import './FeaturesEngineers.scss';

const ILLUSTRATIONS: Record<number, React.ComponentType> = {
  0: UnifiedReportingIllustration,
  1: RealTimeReportingIllustration,
  2: AiAgentsIllustration,
  3: QualityGatesIllustration,
  4: KeyMetricsIllustration,
};

const FEATURES_DATA = FEATURES_ITEMS.map((item, index) => ({
  ...item,
  illustration: ILLUSTRATIONS[index],
}));

export const FeaturesEngineers: FC = () => (
  <AnimatedList
    title="Features for engineers"
    subtitle="Plan, manage, and analyze testing in one platform — with AI agents that help your team move from results to decisions faster, connected wherever you need them."
    listDesktopPosition="right"
    sectionClassName="features-engineers-section"
    data={FEATURES_DATA}
  >
    <Link className="btn btn--primary btn--large" to="/features/" data-gtm="explore_features">
      Explore all features
    </Link>
  </AnimatedList>
);
