import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import defaultStyles from '../../../config/styles';
import * as paths from '../../../routes';
import { AppButton, DoneAnimation, LoadingAnimation } from '../../common';

const ModalContainer = styled.div`
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
  background-color: ${defaultStyles.color.grey};
  transition: ${defaultStyles.transition.default};
`;

interface FormUploadingModalProps {
  isUploading: boolean;
  setIsUploading: (e: boolean | null) => void;
}

const FormUploadingModal = ({
  isUploading,
  setIsUploading,
}: FormUploadingModalProps) => {
  const navigator = useNavigate();
  const handleOnClick = () => {
    setIsUploading(null);
    navigator(paths.HOME);
  };

  return (
    <ModalContainer>
      {isUploading ? (
        <LoadingAnimation size={200} />
      ) : (
        <>
          <DoneAnimation size={200} />{' '}
          <AppButton
            onClick={handleOnClick}
            width="60%"
            fontSize={defaultStyles.font.size.large}
            fontFamily={defaultStyles.font.family.bebas}
          >
            terug
          </AppButton>
        </>
      )}
    </ModalContainer>
  );
};

export default FormUploadingModal;
