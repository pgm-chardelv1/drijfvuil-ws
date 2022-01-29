import React, { ReactElement } from 'react';
import styled from 'styled-components';

import defaultStyles from '../../config/styles';

const StyledFooter = styled.footer`
  padding: 2rem 0;
  background: ${defaultStyles.gradient.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;

  strong {
    display: block;

    :last-child {
      margin-top: 1.5rem;
    }
  }
`;

export default function Footer(): ReactElement {
  return (
    <StyledFooter>
      <strong>In samenwerking met</strong>

      <strong>Arteveldehogeschool</strong>

      <strong>© 2021 Drijfvuil | alle rechten voorbehouden</strong>
    </StyledFooter>
  );
}
