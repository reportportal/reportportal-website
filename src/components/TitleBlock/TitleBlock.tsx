import React, { FC } from 'react';
import { createBemBlockBuilder } from '@app/utils';

import './TitleBlock.scss';

interface TitleBlockProps {
  title: string;
  subtitle?: string;
}

const getBlocksWith = createBemBlockBuilder(['title-block']);

export const TitleBlock: FC<TitleBlockProps> = ({ title, subtitle }) => (
  <>
    <div className={getBlocksWith('__title')}>{title}</div>
    {subtitle && <div className={getBlocksWith('__subtitle')}>{subtitle}</div>}
  </>
);
