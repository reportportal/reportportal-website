import React, { FC } from 'react';
import { useMediaQuerySafe } from '@app/hooks/useMediaQuerySafe';
import { createBemBlockBuilder, MEDIA_DESKTOP_SM } from '@app/utils';

import './RowSection.scss';

interface RowSectionProps {
  title?: string;
}

const getBlocksWith = createBemBlockBuilder(['row-section']);

export const RowSection: FC<RowSectionProps> = ({ title }) => {
  const isDesktop = useMediaQuerySafe(MEDIA_DESKTOP_SM);

  return title ? (
    <div className={getBlocksWith(isDesktop ? '__features' : '', '__title')}>{title}</div>
  ) : null;
};
