import React, { FC } from 'react';

import { BaseFieldProps, FormFieldWrapper } from '../FormFieldWrapper';
import { InputField } from './InputField';

interface FormInputProps extends BaseFieldProps {
  type?: string;
}

export const FormInput: FC<FormInputProps> = ({ name, ...props }) => (
  <FormFieldWrapper name={name}>
    <InputField {...props} />
  </FormFieldWrapper>
);
