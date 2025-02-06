import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#08fcac',
    secondary: '#000000',
    background: '#000000',
    backgroundDark: '#000000',
    text: '#ffffff',
    textLight: 'rgba(255, 255, 255, 0.8)',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    accent: '#08fcac',
  },
  container: {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #08fcac 0%, #06c285 100%)',
    secondary: 'linear-gradient(135deg, rgba(8, 252, 172, 0.1) 0%, rgba(6, 194, 133, 0.1) 100%)',
    dark: 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(17, 34, 64, 0.95) 100%)',
    glass: 'linear-gradient(135deg, rgba(17, 34, 64, 0.3) 0%, rgba(8, 15, 29, 0.3) 100%)'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
  borderRadius: {
    small: '5px',
    medium: '10px',
    large: '20px',
    round: '50%',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.2)',
    large: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
  transitions: {
    default: 'all 0.3s ease',
    slow: 'all 0.6s ease',
    fast: 'all 0.15s ease',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  zIndex: {
    navbar: 1000,
    modal: 2000,
    tooltip: 3000,
    content: 1,
  },
  typography: {
    h1: {
      size: '3.5rem',
      weight: 800,
      lineHeight: 1.2,
    },
    h2: {
      size: '2.5rem',
      weight: 700,
      lineHeight: 1.3,
    },
    h3: {
      size: '2rem',
      weight: 600,
      lineHeight: 1.4,
    },
  },
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${theme.colors.backgroundDark};
    color: ${theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(8, 15, 29, 0.95) 0%,
        rgba(17, 34, 64, 0.98) 50%,
        rgba(10, 25, 47, 0.95) 100%
      );
      backdrop-filter: blur(30px) saturate(150%);
      -webkit-backdrop-filter: blur(30px) saturate(150%);
      z-index: -1;
      animation: gradientShift 15s ease-in-out infinite;
    }

    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(
          circle at 20% 20%,
          rgba(0, 255, 170, 0.15) 0%,
          transparent 40%
        ),
        radial-gradient(
          circle at 80% 80%,
          rgba(0, 149, 255, 0.15) 0%,
          transparent 40%
        );
      pointer-events: none;
      z-index: -1;
      mix-blend-mode: soft-light;
      animation: ambientLight 8s ease-in-out infinite alternate;
    }

    @keyframes gradientShift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    @keyframes ambientLight {
      0% { 
        opacity: 0.3;
        transform: scale(1);
      }
      100% { 
        opacity: 0.6;
        transform: scale(1.1);
      }
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::selection {
    background: rgba(0, 255, 170, 0.2);
    color: ${theme.colors.text};
  }
`;

export default GlobalStyles; 