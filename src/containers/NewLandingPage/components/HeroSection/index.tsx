import React, { FC, useCallback } from 'react';
import { useAtom } from 'jotai';
import classNames from 'classnames';
import { createBemBlockBuilder, watchProductOverviewAtom } from '@app/utils';
import { Link } from '@app/components/Link';

import { ReleaseDecisionIllustration } from './components/ReleaseDecisionIllustration';

import './HeroSection.scss';

const getBlocksWith = createBemBlockBuilder(['hero-section']);

export const HeroSection: FC = () => {
  const [, setWatchProductOverviewState] = useAtom(watchProductOverviewAtom);

  const toggleVideoOpen = useCallback(
    () => setWatchProductOverviewState(({ isOpen }) => ({ isOpen: !isOpen })),
    [setWatchProductOverviewState],
  );

  return (
    <section className={getBlocksWith()}>
      <div className={getBlocksWith('__bg')} />

      <div className={classNames(getBlocksWith('__inner'), 'container')}>
        <div className={getBlocksWith('__content')}>
          <h1 className={getBlocksWith('__title')}>
            AI-powered test management & analytics
          </h1>

          <p className={getBlocksWith('__subtitle')}>
            Full-cycle test management powered by AI agents that work inside your existing
            pipeline. Connect your stack, and let ReportPortal handle failure analysis, triage,
            and release decisions — automatically.
          </p>

          <div className={getBlocksWith('__actions')}>
            <Link
              className="btn btn--secondary btn--large"
              to="https://demo.reportportal.io/"
              data-gtm="try_demo"
            >
              Try demo
            </Link>
            <Link
              className="btn btn--outline-2 btn--large"
              to="https://reportportal.io/contact-us/saas/startup-plan/yearly/"
              data-gtm="start_free_trial_hero"
            >
              Start free trial
            </Link>
            <button
              className={getBlocksWith('__watch-video')}
              onClick={toggleVideoOpen}
              type="button"
            >
              <span className={getBlocksWith('__play-icon')} aria-hidden="true" />
              <span>Watch video</span>
            </button>
          </div>
        </div>

        <div className={getBlocksWith('__dashboard')}>
          <ReleaseDecisionIllustration />
        </div>
      </div>
    </section>
  );
};
