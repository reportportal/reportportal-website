import React, { FC } from 'react';
import { OfferPageWrapper } from '@app/components/OfferPageWrapper';
import { OfferingPlansQuery, formatOfferingPlans } from '@app/utils';
import { graphql, useStaticQuery } from 'gatsby';

import { TIME_SCALE_DATA, FAQ_DATA } from './constants';

export const D4jPage: FC = () => {
  const { plans } = formatOfferingPlans(
    useStaticQuery<OfferingPlansQuery>(graphql`
      query {
        allContentfulSection(filter: { internalTitle: { eq: "[Offering Plan] Drill4J" } }) {
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
          'is a tool to identify testing gaps and reduce time spent on regression testing. It provides a straight path to incorporate Test Gap Analysis and Test Impact Analysis into SDLC. It makes testing efforts observable, quantifiable and measurable.',
        offerType: 'Drill4J',
      }}
      page="accelerators"
      pagePath="d4j"
      timeScaleData={TIME_SCALE_DATA}
      plans={plans}
      faqData={FAQ_DATA}
      contactUsLink="/contact-us/d4j"
      faqLink="https://drill4j.github.io/docs/what-is-drill4j"
      isScaleShifted
    />
  );
};
