import React, { FC, ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import {
  createBemBlockBuilder,
  easeInOutOpacityScaleAnimationProps,
  OfferingPlansDto,
} from '@app/utils';
import { usePricingHeroProps } from '@app/hooks/usePricingHeroProps';
import { FooterContent } from '@app/components/Layout';
import { TrustedOrganizations } from '@app/components/TrustedOrganizations';
import { Banner } from '@app/components/Banner';
import { Link } from '@app/components/Link';
import { PricingHero } from '@app/components/PricingHero';
import { PricingCard } from '@app/components/PricingCard';
import { Faq } from '@app/components/Faq';
import { CertificationCard } from '@app/components/CertificationCard';
import { InfoCard } from '@app/components/InfoCard';
import { LinkedCardBlock, BenefitItem } from '@app/components/LinkedCardBlock';
import { CallToAction } from '@app/components/CallToAction';
import { useInView } from '@app/hooks/useInView';
import { useMotionEnterAnimation } from '@app/hooks/useMotionEnterAnimation';
import { useAnimationEnabledForSiblingRoutes } from '@app/hooks/useAnimationEnabledForSiblingRoutes';
import LinkArrow from '@app/svg/externalLinkArrow.inline.svg';

import openSourceIcon from './icons/opensource.svg';
import { BENEFITS_CARDS } from './constants';
import { TimeScale } from './TimeScale';

import './OfferPageWrapper.scss';

interface OfferPageWrapperProps {
  hero: {
    title: string;
    subtitle?: string;
    description: string;
    offerType: string;
  };
  page: string;
  pagePath: 'on-premises' | 'd4j' | 'qasp' | 'hlm';
  timeScaleData: {
    time: number | string;
    items: string[] | ReactNode[];
  }[];
  plans: OfferingPlansDto;
  faqData: {
    key: number;
    label: string;
    children: ReactNode;
  }[];
  contactUsLink: string;
  faqLink?: string;
  isScaleShifted?: boolean;
}

const getBlocksWith = createBemBlockBuilder(['offer-page-wrapper']);

export const OfferPageWrapper: FC<OfferPageWrapperProps> = ({
  hero: { title, subtitle, description, offerType },
  page,
  pagePath,
  timeScaleData,
  plans,
  faqData,
  contactUsLink,
  faqLink,
  isScaleShifted = false,
}) => {
  const { buttons } = usePricingHeroProps(page);
  const [cardsRef, areCardsInView] = useInView();
  const utilizationRef = useRef<HTMLDivElement>(null);
  const isAnimationEnabled = useAnimationEnabledForSiblingRoutes();
  const getCardsAnimation = useMotionEnterAnimation(
    easeInOutOpacityScaleAnimationProps,
    isAnimationEnabled,
  );

  const isPricingPage = page === 'pricing';
  const pricingCardsAnimation = getCardsAnimation({
    isInView: areCardsInView,
    delay: 0.6,
    additionalEffects: {
      hiddenAdditional: { y: 50 },
      enterAdditional: { y: 0 },
    },
  });
  const [openSourcePlan, ...paidPlans] = plans.items;

  return (
    <>
      <PricingHero
        title={title}
        subtitle={subtitle}
        buttons={buttons}
        activeButton={offerType}
        description={description}
        isAnimationEnabled={isAnimationEnabled}
        {...(!isPricingPage && { offerType })}
      />
      <motion.section
        className={classNames(getBlocksWith('__plans-container'), 'container')}
        ref={cardsRef}
        {...pricingCardsAnimation}
      >
        <h2>
          Get a <mark>full year</mark> of support with our Service Packages.
        </h2>
        <div className={getBlocksWith('__plans')}>
          {paidPlans.map(paidPlan => (
            <PricingCard key={paidPlan.title} plan={paidPlan} planType="yearly" />
          ))}
        </div>
        <div className={getBlocksWith('__plans-topology')}>
          <div className={getBlocksWith('__subscription-info')}>
            <div>
              * Support hours may involve various specialists to assist with your requests, such as
              technical consultations, integration setups, customizations, new feature
              implementation, etc.{' '}
              <Link
                to="#"
                className="link"
                onClick={event => {
                  event.preventDefault();

                  utilizationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
        {isPricingPage && (
          <LinkedCardBlock
            title="Benefits in all Service Packages:"
            cardsInfo={BENEFITS_CARDS}
            CardComponent={BenefitItem}
          />
        )}
        <InfoCard
          icon={openSourceIcon}
          title={openSourcePlan.title}
          description={openSourcePlan.description as string}
          link={{
            title: openSourcePlan.cta.link.title,
            url: openSourcePlan.cta.link.url,
          }}
        />
      </motion.section>
      <div ref={utilizationRef} className={getBlocksWith('__utilization')}>
        <h2>Indicative support hours utilization</h2>
        <TimeScale data={timeScaleData} isShifted={isScaleShifted} />
        {isPricingPage && (
          <div className={getBlocksWith('__subscription-info')}>
            <Link to="/legal/terms">
              Terms & Conditions <LinkArrow />
            </Link>
          </div>
        )}
      </div>
      {isPricingPage && (
        <div className={getBlocksWith('__gradient-container')}>
          <div className="container">
            <TrustedOrganizations />
            <CertificationCard
              subtitle="Ensuring the highest security standards"
              shouldDisplayLink
            />
          </div>
        </div>
      )}
      <CallToAction
        title={
          isPricingPage
            ? 'Interested in our Service Packages?'
            : `Interested in ${offerType} service packages?`
        }
        description="Start a conversation with us to discover the support experience that fits you perfectly."
        buttonText="Contact us now!"
        buttonLink={isPricingPage ? '/contact-us/on-premises' : contactUsLink}
      />
      <div className={getBlocksWith('__faq-container')}>
        <Faq
          items={faqData}
          titleId="faq"
          documentationLink={faqLink}
          showMoreInfoLink={pagePath !== 'qasp'}
        />
      </div>
      <FooterContent>
        <Banner title="Do you still have questions?" linkTitle="Contact us" link={contactUsLink} />
      </FooterContent>
    </>
  );
};
