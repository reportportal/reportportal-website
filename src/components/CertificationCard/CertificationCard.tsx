import React, { FC } from 'react';
import cn from 'classnames';
import { ArrowLink } from '@app/components/ArrowLink';
import { createBemBlockBuilder } from '@app/utils';

import { Certificates } from './Certificates';

import './CertificateCard.scss';

const getBlocksWith = createBemBlockBuilder(['certification-card']);

interface CertificationCardProps {
  subtitle?: string;
  shouldDisplayLink?: boolean;
}

export const CertificationCard: FC<CertificationCardProps> = ({
  subtitle,
  shouldDisplayLink = false,
}) => {
  return (
    <div className={getBlocksWith()}>
      <h2>ReportPortal certifications</h2>
      {subtitle && <div className={getBlocksWith('__subtitle')}>{subtitle}</div>}
      <div
        className={cn(getBlocksWith('__certificates'), {
          [getBlocksWith('__certificates--desktop-start-aligned')]: !subtitle,
        })}
      >
        <Certificates />
      </div>
      {shouldDisplayLink && (
        <ArrowLink
          text="Learn more"
          to="/blog/reportportal-completes-soc-2-type-ii-audit/"
          className={cn('btn btn--outline btn--large', getBlocksWith('__link'))}
        />
      )}
    </div>
  );
};
