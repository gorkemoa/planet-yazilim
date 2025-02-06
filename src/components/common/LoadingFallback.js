import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(8, 252, 172, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(8, 252, 172, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(8, 252, 172, 0);
  }
`;

const LoadingWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(8, 15, 29, 0.97), rgba(17, 34, 64, 0.97));
  color: #fff;
  gap: 2rem;
`;

const LoadingDot = styled.div`
  width: 50px;
  height: 50px;
  background: ${theme.colors.primary};
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LoadingFallback = () => {
  return (
    <LoadingWrapper>
      <LoadingDot />
      <LoadingText>Yükleniyor...</LoadingText>
    </LoadingWrapper>
  );
};

export default LoadingFallback; 