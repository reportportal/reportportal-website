import React, { FC, useState } from 'react';
import { useMediaQuerySafe } from '@app/hooks/useMediaQuerySafe';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { Banner } from '@app/components/Banner';
import { FooterContent } from '@app/components/Layout';
import { HeroSwitching } from '@app/components/HeroSwitching';
import {
  createBemBlockBuilder,
  getEaseInOutTransition,
  MEDIA_DESKTOP_SM,
  opacityScaleAnimationProps,
} from '@app/utils';
import { useInView } from '@app/hooks/useInView';
import { useMotionEnterAnimation } from '@app/hooks/useMotionEnterAnimation';

import DockerIcon from './icons/docker.inline.svg';
import GoogleCloudIcon from './icons/googleCloud.inline.svg';
import KubernetesIcon from './icons/kubernetes.inline.svg';
import { KubernetesContent } from './KubernetesContent';
import { GoogleCloudContent, GoogleCloudLaunchPortal } from './GoogleCloudContent';
import { LaunchPortal } from './LaunchPortal';
import { DockerDeployingStep, DockerInstall } from './DockerContent';
import { IntegrationContent } from './IntegrationContent';
import { ScrollIndicator } from './ScrollIndicator';
import {
  KUBERNETES_SECTIONS,
  DOCKER_SECTIONS,
  GOOGLE_CLOUD_SECTIONS,
  DOCKER,
  GOOGLE_CLOUD,
  KUBERNETES,
} from './constants';

import './InstallationPage.scss';

const getBlocksWith = createBemBlockBuilder(['installation']);

const buttons = [
  {
    text: DOCKER,
    icon: <DockerIcon />,
    scrollPoints: DOCKER_SECTIONS,
  },
  {
    text: KUBERNETES,
    icon: <KubernetesIcon />,
    scrollPoints: KUBERNETES_SECTIONS,
  },
  {
    text: GOOGLE_CLOUD,
    icon: <GoogleCloudIcon />,
    scrollPoints: GOOGLE_CLOUD_SECTIONS,
  },
];

const ACTIVE_BUTTON = buttons[0].text;

const sectionsContent: Record<string, FC[]> = {
  [DOCKER]: [DockerInstall, DockerDeployingStep, LaunchPortal, IntegrationContent],
  [KUBERNETES]: [KubernetesContent, LaunchPortal, IntegrationContent],
  [GOOGLE_CLOUD]: [GoogleCloudContent, GoogleCloudLaunchPortal, IntegrationContent],
};

export const InstallationPage: FC = () => {
  const [activeButton, setActiveButton] = useState(ACTIVE_BUTTON);
  const [heroRef, isHeroInView] = useInView();
  const [contentRef, isContentInView] = useInView({ once: true, margin: '120%' });
  const isDesktop = useMediaQuerySafe(MEDIA_DESKTOP_SM);

  const sections = buttons.find(button => button.text === activeButton)?.scrollPoints ?? [];
  const getContentAnimation = useMotionEnterAnimation({
    ...opacityScaleAnimationProps,
    ...getEaseInOutTransition(0.7),
  });

  const switchActiveBtn = (btnName: string) => {
    if (btnName !== activeButton) {
      setActiveButton(btnName);
    }
  };

  return (
    <div>
      <div className={getBlocksWith()} ref={heroRef}>
        <div className="container">
          <HeroSwitching
            activeButton={activeButton}
            buttons={buttons}
            title="Installation guide"
            subtitle="Discover 3 pathways to install ReportPortal with"
            isHeroInView={isHeroInView}
            switchActiveBtn={switchActiveBtn}
          />
        </div>
      </div>
      <div className="container">
        <div className={getBlocksWith('__main')}>
          <div className={getBlocksWith('__main-indicator')}>
            {isDesktop && <ScrollIndicator sections={sections} isInView={isContentInView} />}
          </div>
          <motion.div
            className={getBlocksWith('__main-content')}
            ref={contentRef}
            {...getContentAnimation({
              isInView: isContentInView,
              additionalEffects: {
                hiddenAdditional: { y: 50 },
                enterAdditional: { y: 0 },
              },
            })}
          >
            <div className={classNames({ [getBlocksWith('__main-inner')]: !isDesktop })}>
              {sectionsContent[activeButton].map((SectionComponent, index) => (
                // @ts-expect-error name
                <div key={activeButton + index} name={`section-${index}`}>
                  <SectionComponent />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <FooterContent>
        <div className={getBlocksWith('__banner')}>
          <Banner
            title="Still have questions about installation?"
            subtitle="Chat with us in Slack channel"
            linkTitle="Go to Slack channel"
            link="https://slack.epmrpp.reportportal.io/"
          />
        </div>
      </FooterContent>
    </div>
  );
};
