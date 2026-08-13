import React, { FC, useMemo } from 'react';
import { StatisticList } from '@app/components/StatisticList';
import { createBemBlockBuilder } from '@app/utils';
import { formatShortNumber } from '@app/utils/formatShortNumber';

import githubStats from '../../../../static/github.json';
import statsData from '../../../../static/stats.json';
import { STATISTICS } from './constants';

import './Hero.scss';

const getBlocksWith = createBemBlockBuilder(['hero']);

export const Hero: FC = () => {
  const statistics = useMemo(
    () =>
      STATISTICS.map(statistic => {
        if (statistic.entities === 'Stars on GitHub') {
          const raw = githubStats.repos.reportportal;
          const value = Number(raw);

          return {
            ...statistic,
            quantity: formatShortNumber(Number.isFinite(value) ? value : 0),
          };
        }

        if (statistic.entities === 'Downloads') {
          return {
            ...statistic,
            quantity: formatShortNumber(statsData.downloads),
          };
        }

        if (statistic.entities === 'Community members') {
          return {
            ...statistic,
            quantity: formatShortNumber(statsData.slackMembers),
          };
        }

        return statistic;
      }),
    [],
  );

  return (
    <div className={getBlocksWith()}>
      <div className="container">
        <h1 className={getBlocksWith('__title', '__title--width')}>
          Join the ReportPortal community
        </h1>
        <div className={getBlocksWith('__subtitle')}>
          Connect, learn, and collaborate with testing enthusiasts
        </div>
        <StatisticList statistics={statistics} />
      </div>
    </div>
  );
};
