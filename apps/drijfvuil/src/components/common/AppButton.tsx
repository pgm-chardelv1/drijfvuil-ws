import styled from 'styled-components';

import defaultStyles from '../../config/styles';

const AppButton = styled.button<{
  width?: string;
  fontSize?: string;
  fontFamily?: string;
}>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: ${(props) => props.width};
  background-color: ${defaultStyles.color.primary};
  border: none;
  border-radius: 8px;
  color: ${defaultStyles.color.white};
  text-transform: uppercase;
  font-size: ${(props) => (props.fontSize ? props.fontSize : defaultStyles.font.size.xs)};
  ${(props) => (props.fontFamily ? `font-family:` + props.fontFamily : '')}
`;

export default AppButton;
