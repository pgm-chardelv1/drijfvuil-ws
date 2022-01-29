import styled from 'styled-components';

import defaultStyles from '../../../config/styles';

const FormTextArea = styled.textarea`
  padding: 0.4rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 6rem;
  border: none;
  border-radius: 10px;
  background-color: ${defaultStyles.color.lightGrey};
  font-family: ${defaultStyles.font.family.bebas};
  font-size: ${defaultStyles.font.size.medium};
  color: ${defaultStyles.color.black};
  outline: 2px solid ${defaultStyles.color.transparent};
  outline-offset: -4px;
  transition: ${defaultStyles.transition.default};

  :focus {
    outline: 2px solid ${defaultStyles.color.primary};
  }
  resize: none;
`;

export default FormTextArea;
