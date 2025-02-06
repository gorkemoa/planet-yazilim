import React, { useEffect, memo, useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import Container from '../components/common/Container';
import { theme } from '../styles/GlobalStyles';
import { references } from '../data/references';

const ProductsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      ${theme.colors.primary}40,
      ${theme.colors.primary},
      ${theme.colors.primary}40,
      transparent
    );
    box-shadow: 0 0 15px ${theme.colors.primary}40;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      ${theme.colors.primary}40,
      ${theme.colors.primary},
      ${theme.colors.primary}40,
      transparent
    );
    box-shadow: 0 0 15px ${theme.colors.primary}40;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  color: #fff;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  color: ${theme.colors.textLight};
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${theme.spacing.xxl};
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.6;
  opacity: 0.8;
`;

const LogoSlider = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: ${theme.spacing.xl} 0;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
`;

const LogoTrack = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.xl};
  white-space: nowrap;
  will-change: transform;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
`;

const LogoWrapper = memo(styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
  background: rgba(255, 255, 255, 0.03);
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 0 30px rgba(255, 255, 255, 0.02);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  will-change: transform;
  min-width: 300px;
  width: 300px;
  height: 160px;
  cursor: pointer;

  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
    filter: grayscale(100%) brightness(150%) contrast(1.2);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: filter, transform;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    border-color: ${theme.colors.primary};
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 15px 45px rgba(0, 0, 0, 0.2),
      inset 0 0 60px rgba(255, 255, 255, 0.15),
      0 0 30px ${theme.colors.primary},
      0 0 60px ${theme.colors.primary}60,
      0 0 90px ${theme.colors.primary}40;
    z-index: 10;
    
    img {
      width: 95%;
      height: 95%;
      filter: grayscale(0%) brightness(100%) contrast(1) drop-shadow(0 0 8px ${theme.colors.primary});
      transform: scale(1.05);
    }
  }
`);

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const LogoItem = memo(({ logo, name }) => (
  <LogoWrapper
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <img src={logo} alt={name} loading="lazy" />
  </LogoWrapper>
));

LogoItem.displayName = 'LogoItem';

const Products = memo(() => {
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const totalWidth = 2000;

  const duplicatedReferences = useMemo(() => {
    return [...references, ...references, ...references];
  }, []);

  useEffect(() => {
    let animationId;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      if (!isPaused) {
        const deltaTime = currentTime - lastTime;
        setPosition(prev => (prev + deltaTime * 0.05) % totalWidth);
      }
      lastTime = currentTime;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  return (
    <ProductsSection id="products">
      <Container>
        <Title
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Güvenilir Markalar Bizi Tercih Ediyor
        </Title>
        <Subtitle
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          25 yılı aşkın süredir Türkiye'nin önde gelen kurumlarına hizmet vermenin gururunu yaşıyoruz
        </Subtitle>
      </Container>

      <LogoSlider 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <LogoTrack
          style={{
            transform: `translateX(-${position}px)`
          }}
        >
          {duplicatedReferences.map((ref, index) => (
            <LogoItem
              key={`${ref.name}-${index}`}
              logo={ref.logo}
              name={ref.name}
            />
          ))}
        </LogoTrack>
      </LogoSlider>
    </ProductsSection>
  );
});

Products.displayName = 'Products';

export default Products; 