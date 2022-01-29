import React, { ReactElement } from 'react';
import styled from 'styled-components';

import defaultStyles from '../../../config/styles';

interface MenuButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonIcon = styled.div`
  display: block;
  width: 5rem;
  height: 3px;
  background: ${defaultStyles.color.white};
`;

const StyledButton = styled.button`
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  background: none;
  border: none;
`;

function MenuButton({ onClick }: MenuButtonProps): ReactElement {
  return (
    <StyledButton onClick={onClick}>
      <ButtonIcon />
    </StyledButton>
  );
}

export default MenuButton;
