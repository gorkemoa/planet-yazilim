import React, { useEffect, memo, useMemo, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import Container from '../components/common/Container';
import { theme } from '../styles/GlobalStyles';

const references = [
  {
    name: 'Referans 1',
    logo: '/references/1.png'
  },
  {
    name: 'Referans 2',
    logo: '/references/2.png'
  },
  {
    name: 'Referans 3',
    logo: '/references/3.png'
  },
  {
    name: 'Referans 4',
    logo: '/references/4.png'
  },
  {
    name: 'Referans 5',
    logo: '/references/5.png'
  },
  {
    name: 'Referans 6',
    logo: '/references/6.png'
  },
  {
    name: 'Referans 7',
    logo: '/references/7.png'
  },
  {
    name: 'Referans 8',
    logo: '/references/8.png'
  }
];

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
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: grayscale(100%) brightness(1.2) contrast(1);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: filter, transform;
    opacity: 0.7;
    padding: 0.5rem;
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
      width: 110%;
      height: 110%;
      filter: grayscale(0%) brightness(1.1) contrast(1.1);
      transform: scale(1.05);
      opacity: 1;
      padding: 0;
    }
  }

  @media (max-width: 768px) {
    min-width: 240px;
    width: 240px;
    height: 130px;
    padding: ${theme.spacing.md};
  }

  @media (max-width: 480px) {
    min-width: 220px;
    width: 220px;
    height: 120px;
    padding: ${theme.spacing.sm};
  }
`);

const ProductsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;
  will-change: transform;

  @media (max-width: 480px) {
    ${Title} {
      font-size: 1.8rem;
    }
    ${Subtitle} {
      font-size: 0.85rem;
    }
    ${LogoWrapper} {
      min-width: 260px;
      width: 260px;
      height: 140px;
    }
  }

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
  const positionRef = useRef(0);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const totalWidth = useRef(2000);

  const duplicatedReferences = useMemo(() => {
    return [...references, ...references, ...references];
  }, []);

  const animate = useCallback((currentTime) => {
    if (previousTimeRef.current !== undefined) {
      if (!isPaused) {
        const deltaTime = currentTime - previousTimeRef.current;
        positionRef.current = (positionRef.current + deltaTime * 0.03) % totalWidth.current;
        
        if (requestRef.current) {
          const track = document.querySelector('[data-logo-track]');
          if (track) {
            track.style.transform = `translateX(-${positionRef.current}px)`;
          }
        }
      }
    }
    previousTimeRef.current = currentTime;
    requestRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  return (
    <ProductsSection id="products">
      <Container>
        <Title
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          Güvenilir Markalar Bizi Tercih Ediyor
        </Title>
        <Subtitle
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          25 yılı aşkın süredir Türkiye'nin önde gelen kurumlarına hizmet vermenin gururunu yaşıyoruz
        </Subtitle>
      </Container>

      <LogoSlider 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
      >
        <LogoTrack
          data-logo-track
          style={{
            transform: `translateX(-${positionRef.current}px)`,
            willChange: 'transform'
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