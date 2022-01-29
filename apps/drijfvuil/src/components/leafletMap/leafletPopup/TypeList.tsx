import React, { ReactElement } from 'react';
import styled from 'styled-components';

import defaultStyles from '../../../config/styles';

const StyledList = styled.ul`
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const StyledItem = styled.li`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: 1px solid ${defaultStyles.color.grey};
  border-radius: 8px;
  text-transform: uppercase;
`;

interface TypeListProps {
  types: string;
}

export default function TypeList({ types }: TypeListProps): ReactElement {
  return (
    <StyledList>
      <StyledItem>{types}</StyledItem>
    </StyledList>
  );
}
