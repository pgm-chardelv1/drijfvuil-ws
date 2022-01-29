import { Link } from 'react-router-dom';
import styled from 'styled-components';

import defaultStyles from '../../config/styles';

const AppLink = styled(Link)<{
  bgColor?: string;
  color?: string;
  width?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: ${(props) => (props.width ? props.width : '100%')};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : defaultStyles.color.primary};
  border: none;
  border-radius: 8px;
  color: ${(props) => (props.color ? props.color : defaultStyles.color.white)};
  font-size: ${defaultStyles.font.size.large};
  text-decoration: none;
`;

export default AppLink;
