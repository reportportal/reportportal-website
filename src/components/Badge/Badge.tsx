import React, { FC } from 'react';
import classNames from 'classnames';
import { createBemBlockBuilder } from '@app/utils';

import './Badge.scss';

export type BadgeVariant = 'new' | 'premium';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const getBlocksWith = createBemBlockBuilder(['badge']);

/**
 * The label a feature carries next to its name — in the navigation menu, in the
 * plan comparison table, and anywhere else the same idea comes up.
 *
 * The variant is the label: there is no free-text prop on purpose. A badge means
 * one of two things, and letting each call site pass its own string is how the
 * navigation ended up with a pale green chip while the pricing table had a solid
 * one. Spacing is left to the caller, since it depends on what sits beside it.
 */
export const Badge: FC<BadgeProps> = ({ variant, className }) => (
  <span className={classNames(getBlocksWith(), getBlocksWith(`--${variant}`), className)}>
    {variant}
  </span>
);
