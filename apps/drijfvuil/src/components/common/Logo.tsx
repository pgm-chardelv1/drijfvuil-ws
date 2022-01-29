import React, { ReactElement } from 'react';
import logo from '../../app/Middel@2x.png';
import styled from 'styled-components';

const StyledLogo = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledContainer = styled.div`
  width: 10rem;
  height: 10rem;
`;

function Logo(): ReactElement {
  return (
    <StyledContainer>
      <StyledLogo src={logo} />
    </StyledContainer>
  );
}

export default Logo;
