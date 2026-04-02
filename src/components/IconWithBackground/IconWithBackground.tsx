import React, { FC, CSSProperties } from 'react';
import { createBemBlockBuilder } from '@app/utils';

import './IconWithBackground.scss';

interface IconWithBackgroundProps {
  icon: string;
  iconColor: string;
}

const getBlocksWith = createBemBlockBuilder(['icon-with-background']);

export const IconWithBackground: FC<IconWithBackgroundProps> = ({ icon, iconColor }) => {
  return (
    <div
      className={getBlocksWith()}
      style={
        {
          '--icon-color': iconColor,
          '--icon-url': `url('${icon}')`,
        } as CSSProperties
      }
    >
      <div className={getBlocksWith('__icon')} />
    </div>
  );
};
