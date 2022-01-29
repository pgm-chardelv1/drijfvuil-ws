import styled from 'styled-components';
import defaultStyles from '../../../config/styles';

const ToggleButton = styled.button<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-7.5rem);
  width: 15rem;
  height: 2.25rem;
  padding: 0.25rem;
  background: ${defaultStyles.gradient.primary};
  border: none;
  border-radius: 10px;
  outline: none;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    border-radius: 7px;
    text-transform: uppercase;
    font-family: 'Bebas Neue';
    color: ${defaultStyles.color.white};
    transition: ${defaultStyles.transition.default};

    :first-child {
      background-color: ${(props) =>
        props.active
          ? defaultStyles.color.transparent
          : defaultStyles.color.primary};
    }

    :last-child {
      background-color: ${(props) =>
        props.active
          ? defaultStyles.color.primary
          : defaultStyles.color.transparent};
    }
  }
`;

export default ToggleButton;
