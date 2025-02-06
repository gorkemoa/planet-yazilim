import styled, { css } from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

const StyledGrid = styled.div`
  display: grid;
  gap: ${({ gap }) => theme.spacing[gap || 'md']};
  
  ${({ columns }) => columns && css`
    grid-template-columns: repeat(${columns}, 1fr);
  `}
  
  ${({ autoFit }) => autoFit && css`
    grid-template-columns: repeat(auto-fit, minmax(${autoFit}px, 1fr));
  `}
  
  ${({ autoFill }) => autoFill && css`
    grid-template-columns: repeat(auto-fill, minmax(${autoFill}px, 1fr));
  `}
  
  @media (max-width: ${theme.breakpoints.lg}) {
    ${({ columnsLg }) => columnsLg && css`
      grid-template-columns: repeat(${columnsLg}, 1fr);
    `}
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    ${({ columnsMd }) => columnsMd && css`
      grid-template-columns: repeat(${columnsMd}, 1fr);
    `}
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    ${({ columnsSm }) => columnsSm && css`
      grid-template-columns: repeat(${columnsSm}, 1fr);
    `}
  }
`;



export default StyledGrid; 