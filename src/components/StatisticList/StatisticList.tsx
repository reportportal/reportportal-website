import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { useMotionEnterAnimation } from '@app/hooks/useMotionEnterAnimation';
import { getEaseInOutTransition, PropsWithAnimation } from '@app/utils';

import './StatisticList.scss';

export interface StatisticsEntry {
  quantity?: string;
  entities: string;
  achievement?: string;
}

interface StatisticListProps {
  statistics: StatisticsEntry[];
  isInView?: boolean;
}

export const StatisticList: FC<PropsWithAnimation<StatisticListProps>> = ({
  statistics,
  isInView = true,
  isAnimationEnabled = false,
}) => {
  const getAnimation = useMotionEnterAnimation(
    {
      hiddenState: {
        opacity: 0,
        x: -150,
      },
      enterState: {
        opacity: 1,
        x: 0,
      },
      ...getEaseInOutTransition(0.5),
    },
    isAnimationEnabled,
  );

  return (
    <ul className="statistic-list">
      {statistics.map(({ quantity, entities, achievement }, index) => (
        <motion.li
          key={entities}
          className="white-border"
          {...getAnimation({ isInView, delay: 0.5 + index * 0.1 })}
        >
          <strong>{quantity}</strong>
          <strong>{entities}</strong>
          {achievement && <span>{achievement}</span>}
        </motion.li>
      ))}
    </ul>
  );
};
