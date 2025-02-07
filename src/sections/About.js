import React, { memo, useMemo, useCallback, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from '../components/common/Container';

// Tema renkleri için constants
const THEME = {
  primary: '#08fcac',
  primaryGlow: 'rgba(8, 252, 172, 0.8)',
  primaryLight: 'rgba(8, 252, 172, 0.1)',
  glassBackground: 'rgba(255, 255, 255, 0.03)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  dark: '#000000',
  lightBackground: 'rgba(20, 20, 20, 0.4)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)'
};

// Animasyon varyantları
const animations = {
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  },
  slideInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }
};

const AboutSection = styled.section`
  --primary-color: ${THEME.primary};
  --primary-glow: ${THEME.primaryGlow};
  --primary-light: ${THEME.primaryLight};
  --glass-bg: ${THEME.glassBackground};
  --glass-border: ${THEME.glassBorder};
  --background-dark: ${THEME.dark};
  --background-light: ${THEME.lightBackground};
  --text-primary: ${THEME.textPrimary};
  --text-secondary: ${THEME.textSecondary};
  
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 4rem 0;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/fikir.jpeg');
    background-size: cover;
    background-position: right center;
    opacity: 0.8;
    z-index: -2;
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform, opacity;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 30%,
      rgba(0, 0, 0, 0.8) 60%,
      rgba(0, 0, 0, 1) 100%
    );
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 3rem 0;
    min-height: auto;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 1400px;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 3.5vw, 2.2rem);
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.6rem, 3vw, 1.8rem);
    margin-bottom: 1rem;
  }
`;

const Description = styled(motion.p)`
  font-size: clamp(1.1rem, 1.3vw, 1.3rem);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-weight: 400;
  letter-spacing: 0.01em;

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 1.1vw, 1rem);
    margin-bottom: 2rem;
    padding: 0 1rem;
    max-width: 100%;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
  }
`;

const FeatureGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 4rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 2rem;
    margin-top: 2rem;
  }
`;

const FeatureInfo = styled.div`
  position: relative;
  z-index: 1;
  padding: 2.5rem;
  max-width: 600px;
  align-self: flex-start;
  margin-top: 0;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    background: linear-gradient(
      45deg,
      rgba(8, 252, 172, 0.1) 0%,
      rgba(8, 252, 172, 0) 100%
    );
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  &:hover {
    transform: translateZ(20px);
    
    &::before {
      opacity: 1;
    }
  }
`;

const FeatureTitle = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.8);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #fff 0%, rgba(8, 252, 172, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  position: relative;
  transform-style: preserve-3d;
  
  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transform: translateZ(-1px);
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, rgba(8, 252, 172, 0) 0%, rgba(8, 252, 172, 0.8) 50%, rgba(8, 252, 172, 0) 100%);
    transition: width 0.6s ease;
  }

  ${FeatureInfo}:hover & {
    transform: translateZ(30px);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.9);
  max-width: 500px;
  text-align: left;
  transition: all 0.4s ease;
  transform-style: preserve-3d;

  ${FeatureInfo}:hover & {
    color: rgba(255, 255, 255, 0.98);
    transform: translateX(5px) translateZ(20px);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.4;
    max-width: 100%;
    letter-spacing: 0;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.35;
  }
`;

const MainFeature = styled(motion.div)`
  position: relative;
  padding: 4rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 24px;
  overflow: hidden;
  min-height: 400px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid rgba(8, 252, 172, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  isolation: isolate;
  width: 80vw;
  margin-left: calc(-40vw + 50%);
  margin-right: calc(-40vw + 50%);
  box-shadow: 0 0 40px rgba(8, 252, 172, 0.05);
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;

  ${FeatureInfo} {
    padding: 2rem;
    margin: 0;
    max-width: 600px;
    align-self: flex-start;
    position: relative;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/fikir.jpeg');
    background-size: cover;
    background-position: center;
    opacity: 0.9;
    z-index: -1;
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform, opacity;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.8) 30%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.4) 70%,
      rgba(0, 0, 0, 0.2) 85%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 220px;
    width: 94vw;
    margin-left: calc(-47vw + 50%);
    margin-right: calc(-47vw + 50%);
    
    ${FeatureInfo} {
      padding: 1rem;
      max-width: 100%;
    }

    ${FeatureTitle} {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    ${FeatureDescription} {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
    min-height: 200px;
    width: 96vw;
    margin-left: calc(-48vw + 50%);
    margin-right: calc(-48vw + 50%);
    
    ${FeatureInfo} {
      padding: 0.8rem;
    }

    ${FeatureTitle} {
      font-size: 1.3rem;
      margin-bottom: 0.4rem;
    }

    ${FeatureDescription} {
      font-size: 0.85rem;
      line-height: 1.35;
    }
  }
`;

const SubFeatures = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: 0 4rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  
  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    scroll-snap-align: start;
  }

  @media (max-width: 1400px) {
    padding: 0 2rem;
    gap: 1.5rem;
    scroll-padding: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 1rem;
    gap: 1.5rem;
    overflow-x: visible;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    align-items: center;
  }
`;

const SubFeatureBox = styled(motion.div)`
  position: relative;
  padding: 2.5rem 3.5rem;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(8, 252, 172, 0.8) 100%
  );
  border-radius: 24px;
  overflow: hidden;
  min-height: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 3px solid rgba(8, 252, 172, 0.4);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.35);
  flex: 1;
  min-width: 320px;
  max-width: 520px;
  transition: all 0.3s ease;
  aspect-ratio: 16/9;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), inset 0 0 25px rgba(0, 0, 0, 0.4);
    border: 3px solid rgba(8, 252, 172, 0.5);
  }

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    aspect-ratio: 16/7;
    padding: 1.8rem;
    margin: 0;
    
    &:hover {
      transform: translateY(-3px) scale(1.02);
    }
  }

  @media (max-width: 480px) {
    aspect-ratio: 16/8;
    padding: 1.5rem;
    min-height: 160px;
  }
`;

const About = memo(() => {
  const sectionRef = useRef(null);
  const featuresRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const features = featuresRef.current;
    
    if (!section || !features) return;

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
    observer.observe(features);

    return () => {
      observer.disconnect();
    };
  }, []);

  const features = useMemo(() => [
    {
      id: 'main',
      title: 'Dijital Dönüşümün Güvenilir Adresi',
      description: 'Türkiye\'nin önde gelen şirketlerine 20 yıldır kesintisiz teknoloji ve danışmanlık hizmeti.',
      animation: animations.slideInLeft
    },
    {
      id: 'projects',
      title: 'Sektörde Kritik Başarı',
      description: 'Araştırmalara göre IT projelerinin %80\'i başarısız olurken, biz fark yaratıyoruz. *Gartner',
      animation: animations.slideInUp,
      delay: 0.2
    },
    {
      id: 'success',
      title: 'Kanıtlanmış Başarı',
      description: 'Her projemizde %100 müşteri memnuniyeti ve sürdürülebilir başarı.',
      animation: animations.slideInUp,
      delay: 0.3
    },
    {
      id: 'satisfaction',
      title: 'Güvenilir Çözüm Ortağı',
      description: '%99.9 müşteri memnuniyeti ile sektörün en güvenilir teknoloji partneri.',
      animation: animations.slideInUp,
      delay: 0.4
    }
  ], []);

  const renderFeatureCard = useCallback(({ id, title, description, animation, delay }) => (
    <SubFeatureBox
      key={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={animation}
      transition={{ 
        duration: 0.5,
        delay: isInView ? delay : 0,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <FeatureInfo>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
      </FeatureInfo>
    </SubFeatureBox>
  ), [isInView]);

  return (
    <AboutSection ref={sectionRef}>
      <ContentWrapper>
        <Title
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={animations.fadeInUp}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Neden Planet?
        </Title>

        <Description
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={animations.fadeInUp}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          İşletmenizin dijital dönüşüm yolculuğunda, yenilikçi çözümler ve 
          kanıtlanmış başarılarla yanınızdayız.
        </Description>

        <FeatureGrid ref={featuresRef}>
          <MainFeature
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={features[0].animation}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <FeatureInfo>
              <FeatureTitle>{features[0].title}</FeatureTitle>
              <FeatureDescription>{features[0].description}</FeatureDescription>
            </FeatureInfo>
          </MainFeature>

          <SubFeatures>
            {features.slice(1).map(renderFeatureCard)}
          </SubFeatures>
        </FeatureGrid>
      </ContentWrapper>
    </AboutSection>
  );
});

About.displayName = 'About';

export default About; 