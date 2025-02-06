import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  position: relative;
  z-index: 2;
`;

export default SectionTitle; 