import React, { ReactElement } from 'react';
import styled from 'styled-components';

import defaulStyles from '../../config/styles';
import { Logo } from '..';

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: ${defaulStyles.color.darkGrey};
  color: ${defaulStyles.color.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    margin-top: 2.5rem;
    text-align: center;

    strong {
      margin-bottom: 1.5rem;
      font-size: 2rem;
    }

    p {
      width: 25rem;
    }
  }
`;

interface Props {
  title: string;
  info: string;
}

export default function LoadingScreen({ title, info }: Props): ReactElement {
  return (
    <StyledContainer>
      <Logo />
      <div>
        <strong>{title}</strong>

        <p>{info}</p>
      </div>
    </StyledContainer>
  );
}
