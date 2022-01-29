import React, { ReactElement } from 'react';
import styled from 'styled-components';

import defaultStyles from '../../../../config/styles';
import FormLabel from '../FormLabel';
import FormRadio from './FormRadio';

const LabelsContainer = styled.div`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  width: 100%;
  height: 3rem;
  background-color: ${defaultStyles.color.lightGrey};
`;

interface FormRadioSetProps {
  title: string;
  name: string;
  labels: string[];
  values: string[];
}

export default function FormRadioSet({
  title,
  name,
  labels,
  values,
}: FormRadioSetProps): ReactElement {
  return (
    <>
      <FormLabel>{title}</FormLabel>

      <LabelsContainer>
        {labels.map((label, i) => (
          <FormRadio name={name} label={label} value={values[i]} key={i} />
        ))}
      </LabelsContainer>
    </>
  );
}
