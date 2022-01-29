import styled from 'styled-components';

import defaultStyles from '../../config/styles';

const AppTitle = styled.strong<{
  size?: string;
  color?: string;
  mTop?: string;
  mBottom?: string;
}>`
  font-family: 'Fira Sans', sans-serif;
  font-size: ${(props) =>
    props.size ? props.size : defaultStyles.font.size.normal};
  color: ${(props) => (props.color ? props.color : defaultStyles.color.white)};
  margin-top: ${(props) => (props.mTop ? props.mTop : '1rem')};
  margin-bottom: ${(props) => (props.mBottom ? props.mBottom : '.25rem')};
`;

export default AppTitle;
