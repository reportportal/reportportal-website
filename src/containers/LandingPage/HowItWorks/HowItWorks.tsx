import React from 'react';
import Lottie from 'lottie-react';
import { StepProps, Steps } from 'antd';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Link } from '@app/components/Link';
import { useAnimationInterval } from '@app/hooks/useAnimationInterval';
import { useInView } from '@app/hooks/useInView';
import { useMotionEnterAnimation } from '@app/hooks/useMotionEnterAnimation';
import { AnimatedHeader } from '@app/components/AnimatedHeader';
import {
  createBemBlockBuilder,
  defaultSpringTransition,
  easeInOutTransition,
  LIST_ANIMATION_DELAY,
  opacityScaleAnimationProps,
  opacityScaleEnterState,
  opacityScaleHiddenState,
} from '@app/utils';

import './HowItWorks.scss';

import { SECTIONS_INFO } from './constants';

interface Sections extends StepProps {
  title: string;
  content: string;
  animation: unknown;
}

const getBlocksWith = createBemBlockBuilder(['how-it-works']);

const sections: Sections[] | undefined = SECTIONS_INFO.map(section => ({
  ...section,
  status: 'wait',
  description: (
    <>
      <span>{section.content}</span>
      <Lottie animationData={section.animation} loop />
    </>
  ),
}));

const stepContentAnimationProps = {
  hiddenState: {
    ...opacityScaleHiddenState,
    x: -50,
  },
  enterState: {
    ...opacityScaleEnterState,
    x: 0,
  },
  ...easeInOutTransition,
};

export const HowItWorks = () => {
  const { ref, delay, activeListIndex, setIndexAndResetInterval, inView } = useAnimationInterval({
    totalItemsLength: sections.length,
    interval: LIST_ANIMATION_DELAY,
  });
  const [stepsRef, areStepsInView] = useInView();
  const [buttonRef, isButtonInView] = useInView();

  const getStepsAnimation = useMotionEnterAnimation(stepContentAnimationProps);
  const getButtonAnimation = useMotionEnterAnimation({
    ...opacityScaleAnimationProps,
    ...defaultSpringTransition,
  });

  return (
    <section ref={ref} className={classNames(getBlocksWith(), 'container')}>
      <AnimatedHeader>How it works</AnimatedHeader>
      <div
        ref={stepsRef}
        className={classNames(getBlocksWith('__content'), {
          'has-interval': delay,
          [getBlocksWith('__content--in-view')]: areStepsInView,
        })}
      >
        <Steps
          direction="vertical"
          progressDot
          current={activeListIndex}
          items={sections}
          onChange={setIndexAndResetInterval}
        />
        {inView && (
          <div className={getBlocksWith('__step-content')}>
            <Lottie animationData={sections[activeListIndex].animation} loop />
            <div className={getBlocksWith('__step-content-text')}>
              <motion.div
                className={getBlocksWith('__step-content-text-title')}
                {...getStepsAnimation({ isInView: areStepsInView, delay: 0.3 })}
              >
                {sections[activeListIndex].title}
              </motion.div>
              <motion.div
                className={getBlocksWith('__step-content-text-description')}
                {...getStepsAnimation({ isInView: areStepsInView, delay: 0.35 })}
              >
                {sections[activeListIndex].content}
              </motion.div>
            </div>
          </div>
        )}
      </div>
      <div className={getBlocksWith('__button-group')} ref={buttonRef}>
        {isButtonInView && (
          <motion.div {...getButtonAnimation({ isInView: isButtonInView })}>
            <Link className="btn btn--primary btn--large" to="/installation/">
              Learn how to install
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
