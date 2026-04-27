import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder } from '@app/utils';

import { INCREASED_BUTTON_NUMBER } from './constants';

import './ButtonSwitcher.scss';

interface Button {
  icon: ReactNode;
  text: string;
  linkTo?: string;
}

export interface ButtonSwitcherProps {
  buttons: Button[];
  activeBtnName: string;
  onSwitch?: (text: string) => void;
}

const getBlocksWith = createBemBlockBuilder(['switcher']);

export const ButtonSwitcher: FC<ButtonSwitcherProps> = ({
  buttons,
  activeBtnName,
  onSwitch = noop,
}) => {
  const hasAdditionalButton = buttons.length === INCREASED_BUTTON_NUMBER;

  const isActive = (btnName: string) => btnName === activeBtnName;

  const getWrappedButton = (btn: Button) => {
    const buttonText = (
      <>
        <div className={getBlocksWith('__icon')}>{btn.icon}</div>
        <span className={getBlocksWith('__text')}>{btn.text}</span>
      </>
    );

    return btn.linkTo ? (
      <Link
        to={btn.linkTo}
        key={btn.text}
        activeClassName={getBlocksWith('__active')}
        className={getBlocksWith('__btn')}
      >
        {buttonText}
      </Link>
    ) : (
      <div
        key={btn.text}
        className={classNames(getBlocksWith('__btn'), {
          [getBlocksWith('__active')]: isActive(btn.text),
        })}
        onClick={() => onSwitch(btn.text)}
      >
        {buttonText}
      </div>
    );
  };

  return (
    <div className={getBlocksWith()}>
      <div
        className={classNames(getBlocksWith('__inner'), {
          [getBlocksWith('__inner-increased')]: hasAdditionalButton,
        })}
      >
        {buttons.map(getWrappedButton)}
      </div>
    </div>
  );
};
