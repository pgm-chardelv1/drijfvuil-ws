import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppTitle } from '..';

interface AppArticleProps {
  title?: string;
  titleColor?: string;
  text?: string;
  uri?: string;
}

const Paragraph = styled.p`
  margin: 1rem 0;
`;

const StyledArticle = styled.article`
  margin-bottom: 2rem;
`;

export default function AppArticle({
  title,
  titleColor,
  text,
  uri,
}: AppArticleProps): ReactElement {
  return (
    <StyledArticle>
      <AppTitle color={titleColor} size="1.25rem" mBottom="1rem">
        {title}
      </AppTitle>

      <Paragraph>{text}</Paragraph>

      {uri && <Link to={uri}>Lees meer</Link>}
    </StyledArticle>
  );
}
