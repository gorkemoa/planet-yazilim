import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';

const variants = {
  default: css`
    background: ${theme.gradients.glass};
  `,
  solid: css`
    background: ${theme.colors.secondary};
  `,
  gradient: css`
    background: ${theme.gradients.primary};
    color: ${theme.colors.secondary};
  `
};

const elevations = {
  flat: css`
    box-shadow: none;
  `,
  small: css`
    box-shadow: ${theme.shadows.small};
  `,
  medium: css`
    box-shadow: ${theme.shadows.medium};
  `,
  large: css`
    box-shadow: ${theme.shadows.large};
  `
};

const StyledCard = styled(motion.div)`
  position: relative;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: ${theme.transitions.default};
  background: ${theme.gradients.glass};
  box-shadow: ${theme.shadows.small};
  
  ${props => {
    if (props.$variant && variants[props.$variant]) {
      return variants[props.$variant];
    }
    return '';
  }}
  
  ${props => {
    if (props.$elevation && elevations[props.$elevation]) {
      return elevations[props.$elevation];
    }
    return '';
  }}
  
  ${props => props.$interactive && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${theme.shadows.large};
    }
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(100, 255, 218, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover:before {
      opacity: 1;
    }
  `}
  
  ${props => props.$bordered && css`
    border: 1px solid rgba(100, 255, 218, 0.1);
    
    &:hover {
      border-color: rgba(100, 255, 218, 0.3);
    }
  `}
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const Title = styled.h3`
  font-size: ${theme.typography.h3.size};
  font-weight: ${theme.typography.h3.weight};
  line-height: ${theme.typography.h3.lineHeight};
  margin-bottom: ${theme.spacing.xs};
  
  ${props => props.$gradient && css`
    background: ${theme.gradients.primary};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  `}
`;

const Subtitle = styled.p`
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
`;

const Body = styled.div`
  color: ${theme.colors.text};
`;

const Footer = styled.div`
  margin-top: ${theme.spacing.md};
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.sm};
`;

const Card = React.forwardRef(({
  children,
  variant = 'default',
  elevation = 'small',
  interactive = false,
  bordered = false,
  ...props
}, ref) => {
  return (
    <StyledCard
      ref={ref}
      $variant={variant}
      $elevation={elevation}
      $interactive={interactive}
      $bordered={bordered}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </StyledCard>
  );
});

Card.Header = Header;
Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Body = Body;
Card.Footer = Footer;

Card.displayName = 'Card';

export default Card; 