import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { OfferPageWrapper } from '@app/components/OfferPageWrapper';
import { OfferingPlansQuery, formatOfferingPlans } from '@app/utils';

import { FAQ_DATA, TIME_SCALE_DATA } from './constants';

export const OnPremisesPage: FC = () => {
  const { plans } = formatOfferingPlans(
    useStaticQuery<OfferingPlansQuery>(graphql`
      query {
        allContentfulSection(filter: { internalTitle: { eq: "[Offering Plan] On Premises" } }) {
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
        title: 'ReportPortal services pricing',
        subtitle: 'Flexible options for small teams to global enterprises',
        description:
          'Need expert assistance or enterprise features for your self-hosted or SaaS ReportPortal? We offer support, integrations, migrations and custom features development',
        offerType: 'On-Premises',
      }}
      page="pricing"
      pagePath="on-premises"
      timeScaleData={TIME_SCALE_DATA}
      plans={plans}
      faqData={FAQ_DATA}
      contactUsLink="/contact-us/general"
    />
  );
};
