import React, { FC } from 'react';
import { ProcessIntegration } from '@app/components/ProcessIntegration';

import { HeroSection } from './components/HeroSection';
import { TrustedBy } from './components/TrustedBy';
import { WhySection } from './components/WhySection';
import { HowItWorks } from './components/HowItWorks';
import { BenefitsBusiness } from './components/BenefitsBusiness';
import { FeaturesEngineers } from './components/FeaturesEngineers';
import { OpenSource } from './components/OpenSource';
import { Enterprise } from './components/Enterprise';
import { CtaSection } from './components/CtaSection';
import { BlogSection } from './components/BlogSection';

import './NewLandingPage.scss';

export const NewLandingPage: FC = () => (
  <>
    <div className="new-landing-page__hero-trusted">
      <HeroSection />
      <TrustedBy />
      <WhySection />
    </div>
    <HowItWorks />
    <BenefitsBusiness />
    <FeaturesEngineers />
    <OpenSource />
    <Enterprise />
    <ProcessIntegration isAnimationEnabled />
    <CtaSection />
    <BlogSection />
  </>
);
