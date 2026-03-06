import React, { FC } from 'react';
import { Link } from '@app/components/Link';
import { AnimatedList } from '@app/components/AnimatedList';

import { FEATURES_FOR_ENGINEERS_LIST } from './constants';

export const FeaturesForEngineers: FC = () => (
  <AnimatedList
    title="Features for engineers"
    subtitle="Reducing team efforts. Bringing more value"
    listDesktopPosition="right"
    data={FEATURES_FOR_ENGINEERS_LIST}
  >
    <Link className="btn btn--primary btn--large" to="/features/">
      Explore all features
    </Link>
  </AnimatedList>
);
