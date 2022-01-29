import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

import defaultStyles from '../../../config/styles';
import * as Paths from '../../../routes';
import AppLink from '../../common/AppLink';

import MenuButton from './MenuButton';

const StyledNav = styled.nav<{ isOpen: boolean }>`
  width: 100%;
  padding: 0rem 2rem 1rem 2rem;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  border-radius: 15px 15px 0 0;
  background: ${defaultStyles.gradient.primary};
  transition: ${defaultStyles.transition.default};
  ${(props) => (props.isOpen ? '' : 'transform: translateY(calc(100% - 2.5rem));')}

  ul {
    width: 100%;
    list-style: none;

    li {
      margin-bottom: 1.5rem;
    }

    li:last-child {
      margin-bottom: 0;
    }
  }
`;

export default function MainNavigation(): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <StyledNav isOpen={isOpen}>
      <MenuButton onClick={handleOnClick} />

      <ul>
        <li>
          <AppLink to={Paths.REPORT}>Melden</AppLink>
        </li>

        <li>
          <AppLink to={Paths.REPORT}>Data</AppLink>
        </li>

        <li>
          <AppLink to={Paths.ABOUT}>About</AppLink>
        </li>
      </ul>
    </StyledNav>
  );
}
