import { Field } from 'formik';
import React, { ReactElement } from 'react';
import FormErrorMessage from './FormErrorMessage';
import FormLabel from './FormLabel';
import FormTextArea from './FormTextArea';

interface FormTextAreaSetProps {
  title: string;
  name: string;
  placeholder?: string;
  error: string | undefined;
  touched: boolean | undefined;
}

export default function FormTextAreaSet({
  title,
  name,
  placeholder = '',
  error,
  touched,
}: FormTextAreaSetProps): ReactElement {
  return (
    <>
      <FormLabel htmlFor={name}>{title}</FormLabel>

      <Field name={name} placeholder={placeholder} as={FormTextArea} />

      {error && touched ? <FormErrorMessage name={name} /> : null}
    </>
  );
}
