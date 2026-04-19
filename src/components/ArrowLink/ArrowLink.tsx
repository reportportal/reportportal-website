import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';

import { Link, LinkProps } from '../Link';
import ArrowIcon from './icons/arrow-icon.inline.svg';

interface ArrowLinkProps extends Omit<LinkProps, 'children'> {
  text: string;
  mode?: 'primary';
  className?: string;
  srOnlySuffix?: ReactNode;
}

const getBlocksWith = createBemBlockBuilder(['arrow-link']);

import './ArrowLink.scss';

export const ArrowLink: FC<ArrowLinkProps> = ({ text, mode, className, srOnlySuffix, ...rest }) => (
  <Link
    {...rest}
    className={classNames(getBlocksWith(), className, {
      [getBlocksWith(`--${mode}`)]: Boolean(mode),
    })}
  >
    {text}
    {srOnlySuffix && <span className="visually-hidden">{srOnlySuffix}</span>}
    <ArrowIcon />
  </Link>
);
