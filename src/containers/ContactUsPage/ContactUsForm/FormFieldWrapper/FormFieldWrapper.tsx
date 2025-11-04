import { Children, cloneElement, FC, ReactElement } from 'react';
import { useField } from 'formik';

export interface BaseFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  value?: string;
  InputElement?: 'input' | 'textarea';
}

export const FormFieldWrapper: FC<{ name: string; children: ReactElement }> = ({
  children,
  name,
}) => {
  const [field, meta] = useField(name);

  return Children.map(children, child =>
    cloneElement(child, { ...field, error: meta.touched && meta.error }),
  );
};
