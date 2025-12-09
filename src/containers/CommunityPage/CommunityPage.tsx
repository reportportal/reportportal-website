import React, { FC } from 'react';
import { StartTestingWithReportPortal } from '@app/components/StartTestingWithReportPortal';
import { Link } from '@app/components/Link';
import { InfoCard } from '@app//components/InfoCard';
import { LinkedCardBlock } from '@app/components/LinkedCardBlock';
import { SubscriptionBanner } from '@app/components/SubscriptionBanner';
import { DOCUMENTATION_URL } from '@app/utils';

import { Hero } from './Hero';
import { JoinOurCommunity } from './JoinOurCommunity';
import { Sponsors } from './Sponsors';
import { StyleMeets } from './StyleMeets';
import { YouTube } from './YouTube';
import { LatestFromOurBlog } from '../LandingPage/LatestFromOurBlog';
import { GITHUB_CONTRIBUTION_CARDS, DOCUMENTATION_CARDS } from './constants';
import codeOfConductSvg from './icons/code-of-conduct.svg';

import './CommunityPage.scss';

export const CommunityPage: FC = () => (
  <div className="community">
    <Hero />
    <LinkedCardBlock
      title="GitHub contribution"
      subtitle="Explore our GitHub activities and become a contributor to pull ReportPortal on a new level
          of test automation"
      cardsInfo={GITHUB_CONTRIBUTION_CARDS}
    >
      <InfoCard
        title="Code of conduct"
        description="Learn about our guidelines for fostering an inclusive and respectful environment within the
        ReportPortal community. "
        icon={codeOfConductSvg}
        link={{
          title: 'Open on GitHub',
          url: 'https://github.com/reportportal/reportportal/wiki/Contribution',
        }}
      />
    </LinkedCardBlock>
    <JoinOurCommunity />
    <Sponsors />
    <LinkedCardBlock
      title="Documentation and resources"
      subtitle="Explore our guides, tutorials and other materials"
      cardsInfo={DOCUMENTATION_CARDS}
      mode="large"
    >
      <Link
        className="btn btn--outline btn--small go-to-documentation-button"
        to={DOCUMENTATION_URL}
      >
        Go to Documentation
      </Link>
    </LinkedCardBlock>
    <StyleMeets />
    <YouTube />
    <StartTestingWithReportPortal startFreeTrialUrl="/contact-us/community" />
    <LatestFromOurBlog isViewAll />
    <SubscriptionBanner />
  </div>
);
