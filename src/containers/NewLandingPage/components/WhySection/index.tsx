import React, { FC } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';

import { WHY_CARDS } from './constants';

import './WhySection.scss';

const getBlocksWith = createBemBlockBuilder(['why-section']);

export const WhySection: FC = () => (
  <section className={getBlocksWith()}>
    <div className={classNames(getBlocksWith('__inner'), 'container')}>
      <h2 className={getBlocksWith('__title')}>Why ReportPortal?</h2>
      <p className={getBlocksWith('__subtitle')}>
        The only platform that unifies Automation, Manual and Agentic testing — with AI Agents that analyze, triage and report at every stage.
      </p>

      <div className={getBlocksWith('__grid')}>
        {WHY_CARDS.map(({ icon, title, description }) => (
          <div className={getBlocksWith('__card')} key={title}>
            <div className={getBlocksWith('__card-icon')}>{icon}</div>
            <h3 className={getBlocksWith('__card-title')}>{title}</h3>
            <p className={getBlocksWith('__card-description')}>{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
