import React, { FC } from 'react';
import { CallToAction } from '@app/components/CallToAction';

import './Sponsors.scss';

export const Sponsors: FC = () => (
  <CallToAction
    title="Fuel innovation and open-source progress"
    description="Join us as a Sponsor on GitHub and support our quest for excellence in software testing"
    buttonText="Become Sponsor"
    buttonLink="/sponsorship-program/business"
    buttonClassName="sponsors__button-with-heart"
    buttonStyle="pink"
  />
);
