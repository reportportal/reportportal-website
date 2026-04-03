import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { TrustedOrganizations } from '@app/components/TrustedOrganizations';
import { ComparePlans } from '@app/components/ComparePlans';
import { Faq } from '@app/components/Faq';
import { Banner } from '@app/components/Banner';
import { PricingHero } from '@app/components/PricingHero';
import { FooterContent } from '@app/components/Layout';
import { usePricingHeroProps } from '@app/hooks/usePricingHeroProps';
import { OfferingPlansQuery, createBemBlockBuilder, formatOfferingPlans } from '@app/utils';
import { CertificationCard } from '@app/components/CertificationCard';
import { useAnimationEnabledForSiblingRoutes } from '@app/hooks/useAnimationEnabledForSiblingRoutes';

import { PricingCards } from './PricingCards';
import { FAQ_ITEMS } from './constants';

import '@app/components/OfferPageWrapper/OfferPageWrapper.scss';

const getBlocksWith = createBemBlockBuilder(['offer-page-wrapper']);

export const SaasPage: FC = () => {
  const { buttons, isYearlyPlanType, togglePlanType } = usePricingHeroProps('pricing');
  const isAnimationEnabled = useAnimationEnabledForSiblingRoutes();
  const { plans, comparePlans } = formatOfferingPlans(
    useStaticQuery<OfferingPlansQuery>(graphql`
      query {
        allContentfulComparePlan(filter: { internalTitle: { eq: "SaaS Compare Plan" } }) {
          nodes {
            ...ComparePlanFields
          }
        }
        allContentfulSection(filter: { internalTitle: { eq: "[Offering Plan] SaaS" } }) {
          nodes {
            ...OfferingPlansFields
          }
        }
      }
    `),
  );

  return (
    <>
      <PricingHero
        title="ReportPortal services pricing"
        subtitle="Flexible options for small teams to global enterprises"
        buttons={buttons}
        activeButton="SaaS"
        description="Turn test results into decisions faster with a fully managed ReportPortal. We handle hosting, uptime, scaling, backups, monitoring, and upgrades, so you can focus on using the platform."
        switcherProps={{
          togglePlanType,
          isYearlyPlanType,
          messageInactive: 'Quarterly',
          messageActive: 'Yearly (Save 5%)',
        }}
        isAnimationEnabled={isAnimationEnabled}
      />
      <PricingCards
        plans={plans}
        isYearlyPlanType={isYearlyPlanType}
        isAnimationEnabled={isAnimationEnabled}
      />
      <ComparePlans plans={comparePlans} />
      <div className={getBlocksWith('__gradient-container')}>
        <div className="container">
          <TrustedOrganizations />
          <CertificationCard subtitle="Ensuring the highest security standards" shouldDisplayLink />
        </div>
      </div>
      <div className={getBlocksWith('__faq-container')}>
        <Faq items={FAQ_ITEMS} />
      </div>
      <FooterContent>
        <Banner
          title="Do you still have questions?"
          linkTitle="Contact us"
          link="/contact-us/general"
        />
      </FooterContent>
    </>
  );
};
