import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

const getContainerWidth = (size) => {
  const containerSizes = {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px'
  };
  return containerSizes[size] || containerSizes.xl;
};

const StyledContainer = styled.div`
  width: 100%;
  max-width: ${({ $size }) => getContainerWidth($size)};
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  
  ${({ $fluid }) => $fluid && css`
    max-width: none;
  `}
  
  ${({ $noPadding }) => $noPadding && css`
    padding: 0;
  `}
`;

const Container = ({ 
  children,
  size = 'xl',
  fluid = false,
  noPadding = false,
  ...props 
}) => {
  return (
    <StyledContainer
      $size={size}
      $fluid={fluid}
      $noPadding={noPadding}
      {...props}
    >
      {children}
    </StyledContainer>
  );
};

export default Container; 