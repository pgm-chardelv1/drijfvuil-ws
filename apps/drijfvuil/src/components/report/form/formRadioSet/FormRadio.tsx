import React, { ReactElement } from 'react';
import { Field, FieldAttributes, useField } from 'formik';
import styled from 'styled-components';

import defaultStyles from '../../../../config/styles';

type FormRadioProps = {
  label: string;
  value: string;
} & FieldAttributes<unknown>;

const HiddenRadioInput = styled.input`
  display: none;

  :checked + label {
    background-color: ${defaultStyles.color.primary};
  }
`;

const RadioLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(50% - 0.25rem);
  height: 100%;
  font-size: ${defaultStyles.font.size.medium};
  font-family: ${defaultStyles.font.family.bebas};
  background-color: ${defaultStyles.color.transparent};
  border-radius: 10px;
  transition: ${defaultStyles.transition.default};
`;

export function FormRadio({
  label,
  value,
  ...props
}: FormRadioProps): ReactElement {
  const [field] = useField<unknown>(props);

  return (
    <>
      <Field
        as={HiddenRadioInput}
        {...field}
        id={label}
        value={value}
        type="radio"
      />

      <RadioLabel htmlFor={label}>{label}</RadioLabel>
    </>
  );
}

export default FormRadio;
