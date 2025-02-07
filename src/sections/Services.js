import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/common/Container';
import { theme } from '../styles/GlobalStyles';
import { FaCar, FaIndustry, FaHospital, FaCogs, FaTshirt, FaTractor, FaBox, FaUtensils, FaPrint, FaGem, FaBolt, FaMicrochip, FaStore, FaPlane, FaBuilding, FaTools } from 'react-icons/fa';

const ServicesSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: linear-gradient(180deg, 
    #000000 0%,
    rgba(0, 0, 0, 0.98) 5%,
    rgba(10, 10, 10, 0.99) 50%,
    rgba(0, 0, 0, 0.98) 95%,
    #000000 100%
  );
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(8, 252, 172, 0.05) 0%, transparent 70%),
      radial-gradient(circle at 80% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 70%);
    z-index: 1;
    pointer-events: none;
    animation: pulseGradient 8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, transparent 5%),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 0%, transparent 5%),
      linear-gradient(45deg, rgba(8, 252, 172, 0.02) 0%, transparent 50%),
      linear-gradient(-45deg, rgba(255, 215, 0, 0.02) 50%, transparent 100%);
    z-index: 1;
    pointer-events: none;
    animation: shiftGradient 15s ease-in-out infinite alternate;
  }

  &::before, &::after {
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform, opacity;
  }

  @keyframes pulseGradient {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.5; }
  }

  @keyframes shiftGradient {
    0% { transform: translateX(-20%) translateY(-20%) rotate(0deg); opacity: 0.3; }
    100% { transform: translateX(20%) translateY(20%) rotate(180deg); opacity: 0.6; }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xl} 0;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to bottom, #000000 0%, transparent 100%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to top, #000000 0%, transparent 100%);
    pointer-events: none;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem 0;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: 1.5rem;
    padding: 0.5rem 0;
  }
`;

const ImageSection = styled.div`
  position: relative;
  height: 100%;
  min-height: 500px;
  border-radius: ${theme.borderRadius.large};
  overflow: hidden;
  box-shadow:
    0 0 20px ${theme.colors.primary}60,
    0 0 40px ${theme.colors.primary}40,
    0 0 60px ${theme.colors.primary}30,
    0 0 80px ${theme.colors.primary}20,
    0 0 100px ${theme.colors.primary}10;
  animation: neonPulse 2s ease-in-out infinite;
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    min-height: 250px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    min-height: 200px;
  }

  @keyframes neonPulse {
    0%, 100% {
      box-shadow:
        0 0 10px ${theme.colors.primary}40,
        0 0 20px ${theme.colors.primary}30,
        0 0 30px ${theme.colors.primary}20;
    }
    50% {
      box-shadow:
        0 0 15px ${theme.colors.primary}60,
        0 0 25px ${theme.colors.primary}40,
        0 0 35px ${theme.colors.primary}30;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 3px solid ${theme.colors.primary};
    border-radius: ${theme.borderRadius.large};
    z-index: 3;
    opacity: 0.7;
    animation: borderGlow 2s ease-in-out infinite;
    box-shadow:
      0 0 20px ${theme.colors.primary},
      inset 0 0 20px ${theme.colors.primary};
  }

  @keyframes borderGlow {
    0%, 100% {
      opacity: 0.7;
      border-color: ${theme.colors.primary};
      box-shadow:
        0 0 20px ${theme.colors.primary},
        inset 0 0 20px ${theme.colors.primary};
    }
    50% {
      opacity: 1;
      border-color: ${theme.colors.primary};
      box-shadow:
        0 0 30px ${theme.colors.primary},
        inset 0 0 30px ${theme.colors.primary};
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: radial-gradient(
      circle at center,
      ${theme.colors.primary}60 0%,
      ${theme.colors.primary}40 20%,
      ${theme.colors.primary}20 40%,
      ${theme.colors.primary}10 60%,
      transparent 80%
    );
    z-index: 1;
    filter: blur(60px);
    animation: rotateShadow 15s linear infinite;
  }

  @keyframes rotateShadow {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.2);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  filter: contrast(1.1) brightness(0.9);
  transform: scale(1.02);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    transform: scale(1.05);
    filter: contrast(1.2) brightness(0.85);
  }
`;

const ServicesContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  color: #fff;
  margin-bottom: ${theme.spacing.xl};
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(to right, #08FCA8, #06C285);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, #08FCA8, #06C285);
    margin: 1rem 0 0;
    border-radius: 2px;
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { opacity: 0.5; transform: scaleX(1); }
    50% { opacity: 1; transform: scaleX(1.2); }
    100% { opacity: 0.5; transform: scaleX(1); }
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  position: relative;

  @media (max-width: ${theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.7rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  border-radius: 50%;
  background: rgba(8, 252, 172, 0.05);
  transform: translateZ(0);
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      transparent,
      rgba(8, 252, 172, 0.3),
      transparent 60%
    );
    opacity: 0;
    transition: all 0.5s ease;
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  svg {
    width: 24px;
    height: 24px;
    color: rgba(8, 252, 172, 0.9);
    transition: all 0.5s ease;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 40px;
    height: 40px;
    margin-bottom: 0.5rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const ServiceName = styled.h3`
  font-size: 0.875rem;
  color: #fff;
  margin: 0;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.75rem;
  }
`;

const ServiceCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing.md};
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.95) 0%,
    rgba(20, 20, 20, 0.95) 100%
  );
  border-radius: ${theme.borderRadius.small};
  border: 1px solid rgba(8, 252, 172, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(8, 252, 172, 0.05);
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(8, 252, 172, 0.03) 25%,
      rgba(255, 215, 0, 0.03) 50%,
      rgba(8, 252, 172, 0.03) 75%,
      transparent 100%
    );
    transform: translateX(-100%) rotate(0deg);
    transition: transform 0.6s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    background: linear-gradient(135deg,
      transparent 0%,
      rgba(8, 252, 172, 0.02) 50%,
      transparent 100%
    );
    border-radius: calc(${theme.borderRadius.small} - 1px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    background: linear-gradient(135deg, 
      rgba(10, 10, 10, 0.98) 0%,
      rgba(20, 20, 20, 0.98) 100%
    );
    border-color: rgba(8, 252, 172, 0.3);
    box-shadow: 
      0 8px 25px rgba(8, 252, 172, 0.1),
      0 0 0 1px rgba(8, 252, 172, 0.1);

    &::before {
      transform: translateX(100%) rotate(180deg);
    }

    &::after {
      opacity: 1;
    }

    ${IconWrapper} {
      transform: translateY(-2px) scale(1.1) rotate(10deg);
      background: rgba(8, 252, 172, 0.1);
      
      &::before {
        opacity: 1;
        transform: scale(1.2) rotate(-10deg);
      }
      
      svg {
        color: rgba(8, 252, 172, 1);
        filter: drop-shadow(0 0 10px rgba(8, 252, 172, 0.5));
      }
    }

    ${ServiceName} {
      background: linear-gradient(to right, #08FCA8, #06C285);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transform: translateY(2px);
      text-shadow: 0 0 20px rgba(8, 252, 172, 0.3);
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm};

    &:hover {
      transform: translateY(-2px) scale(1.01);
      box-shadow: 
        0 4px 15px rgba(8, 252, 172, 0.08),
        0 0 0 1px rgba(8, 252, 172, 0.1);
    }
  }
`;

const sectors = [
  { name: 'Otomotiv', icon: FaCar },
  { name: 'Sağlık', icon: FaHospital },
  { name: 'Makine', icon: FaCogs },
  { name: 'Tekstil', icon: FaTshirt },
  { name: 'Tarım', icon: FaTractor },
  { name: 'Ambalaj', icon: FaBox },
  { name: 'Gıda', icon: FaUtensils },
  { name: 'Baskı', icon: FaPrint },
  { name: 'Maden', icon: FaGem },
  { name: 'Enerji', icon: FaBolt },
  { name: 'Elektronik', icon: FaMicrochip },
  { name: 'Perakende', icon: FaStore },
  { name: 'Havacılık ve Sanayi', icon: FaPlane },
  { name: 'Hizmet ve Üretim Sektörleri', icon: FaBuilding },
  { name: 'Metal Endüstrisi', icon: FaTools }
];

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const Services = memo(() => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    
    if (!section || !grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.willChange = 'transform, opacity';
            setIsInView(true);
          } else {
            entry.target.style.willChange = 'auto';
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(section);
    observer.observe(grid);

    return () => observer.disconnect();
  }, []);

  const handleHover = useCallback((index) => {
    if (window.innerWidth <= 768) return;
    setHoveredIndex(index);
  }, []);

  return (
    <ServicesSection id="sektorler" ref={sectionRef}>
      <Container>
        <ContentWrapper>
          <ImageSection>
            <BackgroundImage
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
              alt="Endüstriyel Teknoloji"
              loading="lazy"
            />
          </ImageSection>
          
          <ServicesContent>
            <Title
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              SEKTÖRLERİMİZ
            </Title>

            <ServicesGrid
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              ref={gridRef}
            >
              {sectors.map((sector, index) => (
                <ServiceCard
                  key={sector.name}
                  variants={fadeInUpVariants}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                    delay: isInView ? index * 0.05 : 0
                  }}
                  whileHover={{ scale: window.innerWidth > 768 ? 1.02 : 1 }}
                  onHoverStart={() => handleHover(index)}
                  onHoverEnd={() => handleHover(null)}
                >
                  <IconWrapper>
                    <sector.icon />
                  </IconWrapper>
                  <ServiceName>{sector.name}</ServiceName>
                </ServiceCard>
              ))}
            </ServicesGrid>
          </ServicesContent>
        </ContentWrapper>
      </Container>
    </ServicesSection>
  );
});

Services.displayName = 'Services';

export default Services; 