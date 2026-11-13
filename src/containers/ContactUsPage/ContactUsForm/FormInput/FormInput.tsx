import React, { FC } from 'react';

import { BaseFieldProps, FormFieldWrapper } from '../FormFieldWrapper';
import { InputField } from './InputField';

interface FormInputProps extends BaseFieldProps {
  type?: string;
  children?: React.ReactNode;
}

export const FormInput: FC<FormInputProps> = ({ name, children, ...props }) => (
  <FormFieldWrapper name={name}>
    <InputField {...props}>{children}</InputField>
  </FormFieldWrapper>
);
