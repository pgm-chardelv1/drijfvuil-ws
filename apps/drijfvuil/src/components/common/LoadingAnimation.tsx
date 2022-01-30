import React, { ReactElement } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

import animationData from '../../assets/animations/loading-animation.json';
import defaultStyles from '../../config/styles';

const AnimationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${defaultStyles.color.grey};
`;

interface LoadingAnimationProps {
  size?: number;
}

const LoadingAnimation = ({
  size = 100,
}: LoadingAnimationProps): ReactElement => {
  const defaultOptions = {
    loop: true,
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

export default LoadingAnimation;
