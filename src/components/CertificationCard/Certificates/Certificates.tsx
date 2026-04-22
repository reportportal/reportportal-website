import React, { FC } from 'react';
import cn from 'classnames';
import { createBemBlockBuilder } from '@app/utils';

import soc2Url from './svg/soc2.svg';
import isae3402Url from './svg/isae3402.svg';
import iso9001Url from './svg/iso9001.svg';
import iso27001Url from './svg/iso27001.svg';

import './Certificates.scss';

const getBlocksWith = createBemBlockBuilder(['certificates']);

const certificates: { src: string; alt: string }[] = [
  { src: soc2Url, alt: 'SOC 2' },
  { src: isae3402Url, alt: 'ISAE 3402' },
  { src: iso9001Url, alt: 'ISO 9001' },
  { src: iso27001Url, alt: 'ISO 27001' },
];

interface CertificatesProps {
  className?: string;
}

export const Certificates: FC<CertificatesProps> = ({ className }) => (
  <div className={cn(getBlocksWith(), className)}>
    {certificates.map(({ src, alt }) => (
      <img key={src} src={src} alt={alt} loading="lazy" decoding="async" />
    ))}
  </div>
);
