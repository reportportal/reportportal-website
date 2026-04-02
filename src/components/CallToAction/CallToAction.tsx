import React, { FC } from 'react';
import classNames from 'classnames';
import { Link } from '@app/components/Link';
import { createBemBlockBuilder } from '@app/utils';

import './CallToAction.scss';

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonClassName?: string;
  buttonStyle?: 'primary' | 'pink';
}

const getBlocksWith = createBemBlockBuilder(['call-to-action']);

export const CallToAction: FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  buttonClassName,
  buttonStyle = 'primary',
}) => (
  <div className={getBlocksWith()}>
    <div className={classNames(getBlocksWith('__content'), 'container')}>
      <div>
        <div className={getBlocksWith('__title')}>{title}</div>
        <div className={getBlocksWith('__description')}>{description}</div>
      </div>
      <Link
        className={classNames(
          getBlocksWith('__button'),
          'btn',
          `btn--${buttonStyle}`,
          'btn--large',
          buttonClassName,
        )}
        to={buttonLink}
      >
        {buttonText}
      </Link>
    </div>
  </div>
);
