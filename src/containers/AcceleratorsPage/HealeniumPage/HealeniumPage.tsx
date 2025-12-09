import React, { FC } from 'react';
import { OfferPageWrapper } from '@app/components/OfferPageWrapper';
import { formatOfferingPlans, OfferingPlansQuery } from '@app/utils';
import { graphql, useStaticQuery } from 'gatsby';

import { TIME_SCALE_DATA, FAQ_DATA } from './constants';

export const HealeniumPage: FC = () => {
  const { plans } = formatOfferingPlans(
    useStaticQuery<OfferingPlansQuery>(graphql`
      query {
        allContentfulSection(filter: { internalTitle: { eq: "[Offering Plan] Healenium" } }) {
          nodes {
            ...OfferingPlansFields
          }
        }
      }
    `),
  );

  return (
    <OfferPageWrapper
      hero={{
        title: 'Explore pricing packages for our accelerators',
        description:
          'is a language agnostic proxy solution which enables self-healing capabilities by means of ML for selenium-based test cases aimed at minimization of UI fluctuations.',
        offerType: 'Healenium',
      }}
      page="accelerators"
      pagePath="hlm"
      timeScaleData={TIME_SCALE_DATA}
      plans={plans}
      faqData={FAQ_DATA}
      contactUsLink="/contact-us/hlm"
      faqLink="https://healenium.io/#rec639241711"
      isScaleShifted
    />
  );
};
