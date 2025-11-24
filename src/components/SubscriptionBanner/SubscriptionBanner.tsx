import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { FooterContent } from '@app/components/Layout';
import { SubscriptionForm } from '@app/components/SubscriptionForm';
import { Banner } from '@app/components/Banner';
import {
  createBemBlockBuilder,
  getEaseInOutTransition,
  opacityScaleAnimationProps,
  PropsWithAnimation,
} from '@app/utils';
import { useMotionEnterAnimation } from '@app/hooks/useMotionEnterAnimation';
import { useInView } from '@app/hooks/useInView';

import './SubscriptionBanner.scss';

const getBlocksWith = createBemBlockBuilder(['subscription-banner']);

export const SubscriptionBanner: FC<PropsWithAnimation> = ({ isAnimationEnabled = false }) => {
  const [ref, isInView] = useInView();

  const getAnimation = useMotionEnterAnimation(
    {
      ...opacityScaleAnimationProps,
      ...getEaseInOutTransition(0.7),
    },
    isAnimationEnabled,
  );

  return (
    <div ref={ref}>
      <FooterContent>
        <motion.div className={getBlocksWith()} {...getAnimation({ isInView })}>
          <Banner
            title="Stay in the know"
            subtitle="Get the latest ReportPortal news, product updates and articles via email"
          >
            <SubscriptionForm />
          </Banner>
        </motion.div>
      </FooterContent>
    </div>
  );
};
