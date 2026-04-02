import React, { FC } from 'react';
import { OfferPageWrapper } from '@app/components/OfferPageWrapper';
import { OfferingPlansQuery, formatOfferingPlans } from '@app/utils';
import { graphql, useStaticQuery } from 'gatsby';

import { FAQ_DATA } from '../D4jPage/constants';
import { TIME_SCALE_DATA } from './constants';

export const QaspPage: FC = () => {
  const { plans } = formatOfferingPlans(
    useStaticQuery<OfferingPlansQuery>(graphql`
      query {
        allContentfulSection(filter: { internalTitle: { eq: "[Offering Plan] QaSpace" } }) {
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
          'is a Jira plugin with an easy-to-use interface which specializes on QA activities, making testing as a seamless part of your Jira-based workflow.',
        offerType: 'QaSpace',
      }}
      page="accelerators"
      pagePath="qasp"
      timeScaleData={TIME_SCALE_DATA}
      contactUsLink="/contact-us/qasp"
      plans={plans}
      faqData={FAQ_DATA}
      isScaleShifted
    />
  );
};
