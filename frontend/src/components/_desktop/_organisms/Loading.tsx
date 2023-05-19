import { rgba } from 'polished';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fonts } from 'src/constants/fonts';

const LoadingWrapper = styled.div`
  position: absolute;
  z-index: 100;
  display: flex;
  width: 100%;
  height: 100svh;
  background-color: ${(props) => rgba(props.theme.window, 0.5)};
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.span`
  ${fonts.h2};
  color: ${(props) => props.theme.text};
  opacity: 0.6;
`;

const dotsAnimation = keyframes`
  0% {
    transform: translateY(0px)
  }
  50% {
    transform: translateY(-5px)
  }
  100% {
    transform: translateY(0px)
  }
`;

const LoadingDot1 = styled(LoadingText)`
  animation: ${dotsAnimation} 1s infinite;
`;
const LoadingDot2 = styled(LoadingDot1)`
  animation-delay: 0.2s;
`;
const LoadingDot3 = styled(LoadingDot1)`
  animation-delay: 0.4s;
`;

export const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingText>{"Wait, I'm loading"}</LoadingText>
      <LoadingDot1>.</LoadingDot1>
      <LoadingDot2>.</LoadingDot2>
      <LoadingDot3>.</LoadingDot3>
    </LoadingWrapper>
  );
};
