import React from 'react';
import { FaCameraRetro } from 'react-icons/fa';
import styled from 'styled-components';

import defaultStyles from '../../../../config/styles';

const CameraIcon = styled.label`
  margin-bottom: 2rem;
  border-radius: 50%;
  border: 10px solid ${defaultStyles.color.primary};
  width: 10rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }
`;

interface FormImageInputProps {
  handleCapture: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormImageInput = ({ handleCapture }: FormImageInputProps) => {
  return (
    <CameraIcon htmlFor="image-picker">
      <FaCameraRetro size={100} color={defaultStyles.color.highLight} />
      <input
        id="image-picker"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleCapture(e)}
      />
    </CameraIcon>
  );
};

export default FormImageInput;
