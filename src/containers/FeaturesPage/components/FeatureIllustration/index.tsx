import React, { FC } from 'react';
import { createBemBlockBuilder } from '@app/utils';

import { AiAgentsIllustration } from './AiAgentsIllustration';
import { AiPoweredAnalysisIllustration } from './AiPoweredAnalysisIllustration';
import { DashboardsReportingIllustration } from './DashboardsReportingIllustration';
import { TestPlanningIllustration } from './TestPlanningIllustration';
import { UnifiedReportingIllustration } from './UnifiedReportingIllustration';

import './FeatureIllustration.scss';

const getBlocksWith = createBemBlockBuilder(['feature-illustration']);

const ILLUSTRATION_COMPONENTS: Record<string, FC> = {
  'ai-capabilities': AiAgentsIllustration,
  'test-planning-design': TestPlanningIllustration,
  'unified-reporting': UnifiedReportingIllustration,
  'ai-powered-analysis': AiPoweredAnalysisIllustration,
  'widgets-dashboards': DashboardsReportingIllustration,
};

interface Props {
  name: string;
}

export const FeatureIllustration: FC<Props> = ({ name }) => {
  const NamedIllustration = ILLUSTRATION_COMPONENTS[name];

  return (
    <div
      className={getBlocksWith()}
      data-illustration={name}
      role="img"
      aria-label={`${name} feature illustration`}
    >
      {NamedIllustration ? (
        <NamedIllustration />
      ) : (
        <div className={getBlocksWith('__window')}>
          <div className={getBlocksWith('__window-header')}>
            <span className={getBlocksWith('__dot')} />
            <span className={getBlocksWith('__dot')} />
            <span className={getBlocksWith('__dot')} />
            <div className={getBlocksWith('__address-bar')} />
          </div>
          <div className={getBlocksWith('__content')}>
            <div className={getBlocksWith('__sidebar')}>
              <div className={getBlocksWith('__sidebar-item')} />
              <div className={getBlocksWith('__sidebar-item', '--active')} />
              <div className={getBlocksWith('__sidebar-item')} />
              <div className={getBlocksWith('__sidebar-item')} />
              <div className={getBlocksWith('__sidebar-item')} />
            </div>
            <div className={getBlocksWith('__main')}>
              <div className={getBlocksWith('__toolbar')}>
                <div className={getBlocksWith('__toolbar-title')} />
                <div className={getBlocksWith('__toolbar-actions')}>
                  <div className={getBlocksWith('__btn')} />
                  <div className={getBlocksWith('__btn', '--primary')} />
                </div>
              </div>
              <div className={getBlocksWith('__body')}>
                <div className={getBlocksWith('__row')} />
                <div className={getBlocksWith('__row', '--highlight')} />
                <div className={getBlocksWith('__row')} />
                <div className={getBlocksWith('__row')} />
                <div className={getBlocksWith('__row')} />
                <div className={getBlocksWith('__row')} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
