import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';

import FormImageInput from './FormImageInput';
import defaultStyles from '../../../../config/styles';

const ModalContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${defaultStyles.color.lightGrey};
  transition: ${defaultStyles.transition.default};

  ${(props) => (props.visible ? '' : 'transform: translateX(-100%);')}
`;

interface FormImageInputModalProps {
  visible: boolean;
  setVisibility: () => void;
  handleCapture: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormImageInputModal = ({
  visible,
  setVisibility,
  handleCapture,
}: FormImageInputModalProps) => {
  return (
    <ModalContainer visible={visible}>
      <Field as={FormImageInput} handleCapture={handleCapture} />
    </ModalContainer>
  );
};

export default FormImageInputModal;
