import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';

const variants = {
  primary: css`
    background: ${theme.colors.primary};
    color: ${theme.colors.secondary};
    
    &:hover {
      background: ${theme.colors.primaryDark};
    }
  `,
  secondary: css`
    background: transparent;
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.primary}20;
    }
  `,
  text: css`
    background: transparent;
    color: ${theme.colors.primary};
    padding: 0;
    
    &:hover {
      color: ${theme.colors.primaryDark};
    }
  `
};

const sizes = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `
};

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${theme.borderRadius.medium};
  font-weight: 500;
  transition: ${theme.transitions.default};
  cursor: pointer;
  
  ${({ $variant }) => variants[$variant || 'primary']}
  ${({ $size }) => sizes[$size || 'medium']}
  
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 1.25em;
    height: 1.25em;
  }
`;

const Button = ({ 
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  ...props 
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 