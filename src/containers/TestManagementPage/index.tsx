import React, { FC } from 'react';
import { createBemBlockBuilder } from '@app/utils';
import { Link } from '@app/components/Link';
import { LinkedCard } from '@app/components/LinkedCard';
import { Faq } from '@app/components/Faq';

import {
  ManualLaunchIllustration,
  MilestonesIllustration,
  TestCaseLibrary,
} from '@app/components/Illustrations';

import { FeatureSection } from './components/FeatureSection';
import { MobitruPromo } from './components/MobitruPromo';
import { FEATURE_SECTIONS } from './featureSections';
import { BENEFITS, FAQ_ITEMS } from './constants';

import './TestManagementPage.scss';

const SECTION_ILLUSTRATIONS: Record<string, React.ReactNode> = {
  milestones: <MilestonesIllustration />,
  'manual-execution': <ManualLaunchIllustration />,
};

const getBlocksWith = createBemBlockBuilder(['test-management-page']);

export const TestManagementPage: FC = () => (
  <div className={getBlocksWith()}>
    {/* Hero */}
    <div className={getBlocksWith('__hero')}>
      <div className="container">
        <div className={getBlocksWith('__hero-heading')}>
          <h1>TEST MANAGEMENT</h1>
          <h2>
            Design. Plan. Execute.<br />All inside ReportPortal.
          </h2>
          <p className={getBlocksWith('__hero-description')}>
            Test Management System that integrates seamlessly with your automation results and
            connects with AI testing agents to enrich your test scope at every stage.
          </p>
        </div>
        <div className={getBlocksWith('__hero-cta')}>
          <Link
            className="btn btn--secondary btn--large"
            to="/demo/"
            data-gtm="test_management_try_demo"
          >
            Try demo
          </Link>
          <Link className="btn btn--outline-2 btn--large" to="/features/">
            View all features
          </Link>
        </div>
      </div>
    </div>

    {/* Organize with flexibility */}
    <section className={getBlocksWith('__organize')}>
      <div className="container">
        <div className={getBlocksWith('__organize-inner')}>
          <h2>Organize with flexibility</h2>
          <p className={getBlocksWith('__organize-subtitle')}>
            Create and organise test cases using templates, folders, and tags. Let AI agents connect via MCP Server to suggest coverage gaps or missing scenarios without touching your structure.
          </p>
          <div className={getBlocksWith('__organize-mockup')}>
            <TestCaseLibrary />
          </div>
          <Link className="btn btn--outline btn--large" to="/features/">
            Learn more
          </Link>
        </div>
      </div>
    </section>

    {/* Milestones + Manual Execution feature sections */}
    {FEATURE_SECTIONS.map(section => (
      <FeatureSection
        key={section.id}
        {...section}
        illustration={SECTION_ILLUSTRATIONS[section.id]}
      />
    ))}

    {/* Cloud devices for manual testing — Mobitru integration */}
    <MobitruPromo />

    {/* Why Switch to ReportPortal? */}
    <section className={getBlocksWith('__benefits')}>
      <div className="container">
        <div className={getBlocksWith('__benefits-heading')}>
          <h2>Why switch to ReportPortal?</h2>
        </div>
        <p className={getBlocksWith('__benefits-subtitle')}>
          Built for teams who need both manual and automated testing in one unified platform.
        </p>
      </div>
      <div className={`${getBlocksWith('__benefits-cards')} container`}>
        {BENEFITS.map(({ id, title, description, icon }) => (
          <LinkedCard key={id} itemTitle={title} description={description} icon={icon} />
        ))}
      </div>
    </section>

    {/* Ready to unify your testing? */}
    <section className={getBlocksWith('__cta')}>
<div className="container">
        <div className={getBlocksWith('__cta-inner')}>
          <h2 className={getBlocksWith('__cta-heading')}>
            Ready to unify your testing?
          </h2>
          <p className={getBlocksWith('__cta-subtitle')}>
            Join teams who manage their entire testing lifecycle in ReportPortal: from manual test
            cases to AI-generated test runs, all in one place.
          </p>
          <Link
            className="btn btn--secondary btn--large"
            to="/contact-us/general?reason=demo"
            data-gtm="test_management_request_demo"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <div className={getBlocksWith('__faq')}>
      <Faq items={FAQ_ITEMS} showMoreInfoLink={false} />
    </div>
  </div>
);
