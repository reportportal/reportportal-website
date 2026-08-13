import React, { FC } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';
import { Link } from '@app/components/Link';
import { ArrowLink } from '@app/components/ArrowLink';
import { formatShortNumber } from '@app/utils/formatShortNumber';

import githubStats from '../../../../../static/github.json';
import statsData from '../../../../../static/stats.json';
import { FORKS_CARD, FEATURE_LIST, FeatureItem, StatCard } from './constants';
import OpenSourceIcon from './svg/open-source-icon.inline.svg';
import GitIcon from './svg/git-icon.inline.svg';
import FeatureOpensourceIcon from './svg/feature-opensource.inline.svg';
import FeatureCommunityIcon from './svg/feature-community.inline.svg';
import FeatureCoreIcon from './svg/feature-core.inline.svg';

import './OpenSource.scss';

const getBlocksWith = createBemBlockBuilder(['open-source']);

const FEATURE_ICONS: Record<FeatureItem['iconKey'], React.FC> = {
  opensource: FeatureOpensourceIcon,
  community: FeatureCommunityIcon,
  core: FeatureCoreIcon,
};

const STAT_CARDS: StatCard[] = [
  {
    iconKey: 'star',
    value: formatShortNumber(githubStats.repos.reportportal),
    label: 'GitHub stars',
  },
  FORKS_CARD,
  {
    iconKey: 'contributors',
    value: formatShortNumber(statsData.slackMembers),
    label: 'Community members',
  },
];

export const OpenSource: FC = () => (
  <section className={getBlocksWith()}>
    <span className={getBlocksWith('__deco-git')} aria-hidden="true">
      <GitIcon />
    </span>
    <span className={getBlocksWith('__deco-os')} aria-hidden="true">
      <OpenSourceIcon />
    </span>
    <div className={classNames(getBlocksWith('__inner'), 'container')}>
      <div className={getBlocksWith('__heading')}>
        <h2>Open source, built to scale</h2>
        <p className={getBlocksWith('__description')}>
          Deploy ReportPortal in your own environment, keep full control over your data, and scale
          on your terms with flexible customization and integration.
        </p>
      </div>

      <div className={getBlocksWith('__stats')}>
        {STAT_CARDS.map(({ value, label }) => (
          <div className={getBlocksWith('__stat')} key={label}>
            <strong className={getBlocksWith('__stat-value')}>{value}</strong>
            <span className={getBlocksWith('__stat-label')}>{label}</span>
          </div>
        ))}
      </div>

      <div className={getBlocksWith('__feature-card')}>
        {FEATURE_LIST.map(({ iconKey, title, description }) => {
          const Icon = FEATURE_ICONS[iconKey];

          return (
            <div className={getBlocksWith('__feature-item')} key={title}>
              <span className={getBlocksWith('__feature-icon')} aria-hidden="true">
                <Icon />
              </span>
              <span className={getBlocksWith('__feature-text')}>
                <strong className={getBlocksWith('__feature-title')}>{title}</strong>
                <p className={getBlocksWith('__feature-description')}>{description}</p>
              </span>
            </div>
          );
        })}
      </div>

      <div className={getBlocksWith('__actions')}>
        <div className={getBlocksWith('__actions-buttons')}>
          <Link
            className="btn btn--primary btn--large"
            to="/installation/"
            data-gtm="self_host_free"
          >
            Self-host for free
          </Link>
          <Link className="btn btn--outline btn--large" to="/pricing/" data-gtm="explore_premium">
            Explore premium
          </Link>
        </div>
        <ArrowLink
          text="Join our community"
          mode="primary"
          to="/community/"
          data-gtm="join_community"
          className={getBlocksWith('__community-link')}
        />
      </div>
    </div>
  </section>
);
