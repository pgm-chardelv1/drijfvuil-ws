import React, { ReactElement } from 'react';
import { ErrorMessage } from 'formik';
import styled from 'styled-components';

import defaultStyles from '../../../config/styles';

const ErrorMessageContainer = styled.div`
  margin-top: 0.5rem;
  color: ${defaultStyles.color.highLight};
`;

interface FormErrorMessageProps {
  name: string;
}

export default function FormErrorMessage({
  name,
}: FormErrorMessageProps): ReactElement {
  return (
    <ErrorMessageContainer>
      <ErrorMessage name={name} />
    </ErrorMessageContainer>
  );
}
