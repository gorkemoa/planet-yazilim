import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';

const variants = {
  default: css`
    background: transparent;
  `,
  primary: css`
    background: ${theme.colors.primary};
    color: ${theme.colors.secondary};
  `,
  secondary: css`
    background: ${theme.colors.secondary};
  `,
  gradient: css`
    background: ${theme.gradients.secondary};
  `,
  glass: css`
    background: ${theme.gradients.glass};
    backdrop-filter: blur(10px);
  `
};

const StyledSection = styled(motion.section)`
  position: relative;
  padding: ${({ $spacing }) => theme.spacing[$spacing || 'xl']} 0;
  overflow: hidden;
  
  ${({ $variant }) => variants[$variant || 'default']}
  
  ${({ $dark }) => $dark && css`
    background: ${theme.colors.backgroundDark};
  `}
  
  ${({ $light }) => $light && css`
    background: ${theme.colors.background};
  `}
  
  ${({ $fullHeight }) => $fullHeight && css`
    min-height: 100vh;
    display: flex;
    align-items: center;
  `}
  
  ${({ $centered }) => $centered && css`
    text-align: center;
  `}
`;

const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.h2.size};
  font-weight: ${theme.typography.h2.weight};
  line-height: ${theme.typography.h2.lineHeight};
  margin-bottom: ${theme.spacing.sm};
  
  ${({ $gradient }) => $gradient && css`
    background: ${theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`;

const SectionSubtitle = styled.p`
  color: ${theme.colors.textLight};
  font-size: 1.2rem;
  line-height: 1.6;
`;

const Section = ({
  children,
  variant = 'default',
  spacing = 'xl',
  dark = false,
  light = false,
  fullHeight = false,
  centered = false,
  ...props
}) => {
  return (
    <StyledSection
      $variant={variant}
      $spacing={spacing}
      $dark={dark}
      $light={light}
      $fullHeight={fullHeight}
      $centered={centered}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </StyledSection>
  );
};

Section.Header = SectionHeader;
Section.Title = SectionTitle;
Section.Subtitle = SectionSubtitle;

export default Section; 