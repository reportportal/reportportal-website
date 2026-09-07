import React, { ElementType, FC } from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';

import { BaseFieldProps } from '../../FormFieldWrapper';

import './InputField.scss';

interface FormInputProps extends BaseFieldProps {
  type?: string;
  children?: React.ReactNode;
}

export const InputField: FC<Omit<FormInputProps, 'name'> & { error?: string }> = ({
  className,
  error,
  value,
  label,
  required,
  InputElement = 'input',
  children,
  ...props
}) => {
  const Element = InputElement as ElementType;
  const { showCharCount, maxLength, ...restProps } = props;

  return (
    <div className={classNames('input-field', className, { error, filled: value })}>
      <label>
        {label}
        {required && <span className="contact-us-form__required"> *</span>}
        <Element
          className={classNames('input', { 'input--select': InputElement === 'select' })}
          value={value}
          maxLength={maxLength}
          {...omit(restProps, ['touched', 'initialValue', 'initialTouched', 'initialError'])}
        >
          {children}
        </Element>
      </label>
      {showCharCount && maxLength && (
        <div className="char-count">
          {(value || '').length}/{maxLength}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
