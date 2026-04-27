import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';
import { createBemBlockBuilder } from '@app/utils';

import './CustomCheckbox.scss';

const getBlocksWith = createBemBlockBuilder(['custom-checkbox']);

interface CustomCheckboxProps {
  label: ReactNode;
  name?: string;
  value?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
  label,
  value = false,
  name = '',
  disabled = false,
  onChange = noop,
}) => (
  <label className={classNames(getBlocksWith(), { checked: value, disabled })}>
    <input
      id={name}
      type="checkbox"
      name={name}
      value={`${value}`}
      disabled={disabled}
      checked={value}
      onChange={onChange}
    />
    <div className={getBlocksWith('__checkmark')} />
    {label}
  </label>
);
