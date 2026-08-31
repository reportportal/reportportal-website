import React, { FC } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Link } from '@app/components/Link';
import {
  createBemBlockBuilder,
  getEaseInOutTransition,
  iconsCommon,
  opacityScaleAnimationProps,
  PropsWithAnimation,
} from '@app/utils';
import { useInView } from '@app/hooks/useInView';
import { useMotionEnterAnimation } from '@app/hooks/useMotionEnterAnimation';

import './StartTestingWithReportPortal.scss';

interface StartTestingWithReportPortalProps {
  startFreeTrialUrl?: string;
}

const getBlocksWith = createBemBlockBuilder(['start-testing-with-report-portal']);

export const StartTestingWithReportPortal: FC<
  PropsWithAnimation<StartTestingWithReportPortalProps>
> = ({
  startFreeTrialUrl = '/contact-us/general/?reason=free_trial',
  isAnimationEnabled = false,
}) => {
  const [ref, isInView] = useInView();

  const getContentAnimation = useMotionEnterAnimation(
    {
      hiddenState: {
        opacity: 0,
        x: -50,
      },
      enterState: {
        opacity: 1,
        x: 0,
      },
      ...getEaseInOutTransition(0.7),
    },
    isAnimationEnabled,
  );
  const getImageAnimation = useMotionEnterAnimation(
    {
      ...opacityScaleAnimationProps,
      ...getEaseInOutTransition(1),
    },
    isAnimationEnabled,
  );

  return (
    <section className={classNames(getBlocksWith(), 'container')} ref={ref}>
      <div className={getBlocksWith('__leading')}>
        <div className={getBlocksWith('__leading-heading')}>
          <motion.h2 {...getContentAnimation({ isInView, delay: 0.5 })}>
            Start testing with ReportPortal
          </motion.h2>
          <motion.h3 {...getContentAnimation({ isInView, delay: 0.5 })}>
            Ready to get the most of ReportPortal features? Start your <b>30-day free trial</b> or
            get in touch with us to learn more about our offer.
          </motion.h3>
        </div>
        <motion.div
          className={getBlocksWith('__leading-button-group')}
          {...getContentAnimation({ isInView, delay: 0.5 })}
        >
          <Link
            className="btn btn--primary btn--large"
            to={startFreeTrialUrl}
            data-gtm="start_free_trial"
          >
            Start free trial
          </Link>
        </motion.div>
      </div>
      <div className={getBlocksWith('__trailing')}>
        <motion.img src={iconsCommon.subscription} alt="" {...getImageAnimation({ isInView })} />
      </div>
    </section>
  );
};
