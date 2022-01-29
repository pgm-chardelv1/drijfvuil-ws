import styled from 'styled-components';
import defaultStyles from '../../config/styles';

const ImageContainer = styled.div<{
  width?: string;
  height?: string;
}>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '100%')};
  background-color: ${defaultStyles.color.grey};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export default ImageContainer;
