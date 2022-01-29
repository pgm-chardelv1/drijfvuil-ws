import React, { ReactElement } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

import animationData from '../../assets/animations/check-animation.json';
import defaultStyles from '../../config/styles';

const AnimationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${defaultStyles.color.grey};
`;

interface DoneAnimationProps {
  size?: number;
}

const DoneAnimation = ({ size = 100 }: DoneAnimationProps): ReactElement => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <AnimationContainer>
      <Lottie options={defaultOptions} height={size} width={size} />
    </AnimationContainer>
  );
};

export default DoneAnimation;
