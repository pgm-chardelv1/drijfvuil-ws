import styled from 'styled-components';

import defaultStyles from '../../../config/styles';

const FormLabel = styled.label`
  margin-top: 0.875rem;
  margin-bottom: 0.5rem;
  display: block;
  font-size: ${defaultStyles.font.size.normal};
  font-family: ${defaultStyles.font.family.fira};
  text-transform: uppercase;
  font-weight: bold;

  :first-child {
    margin-top: 0;
  }
`;

export default FormLabel;
