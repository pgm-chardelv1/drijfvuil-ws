import { Field } from 'formik';
import React, { ReactElement } from 'react';
import FormErrorMessage from './FormErrorMessage';

import FormInputField from './FormInputField';
import FormLabel from './FormLabel';

interface FormInputSetProps {
  title: string;
  name: string;
  placeholder?: string;
  error?: string | string[] | undefined;
  touched?: boolean | undefined;
}

export default function FormInputSet({
  title,
  name,
  placeholder = '',
  error,
  touched,
}: FormInputSetProps): ReactElement {
  return (
    <>
      <FormLabel htmlFor={name}>{title}</FormLabel>

      <Field
        name={name}
        placeholder={placeholder}
        as={FormInputField}
        type="input"
      />

      {error && touched ? <FormErrorMessage name={name} /> : null}
    </>
  );
}
