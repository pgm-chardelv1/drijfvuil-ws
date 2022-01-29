import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CgClose } from 'react-icons/cg';

import * as Paths from '../../routes';
import defaultStyles from '../../config/styles';

const BackButton = styled(Link)`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

function AppBackButton(): ReactElement {
  return (
    <BackButton to={Paths.HOME}>
      <CgClose size={50} color={defaultStyles.color.white} />
    </BackButton>
  );
}

export default AppBackButton;
