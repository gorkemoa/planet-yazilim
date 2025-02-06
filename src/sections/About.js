import React, { memo, useMemo, useCallback } from 'react';
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

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/fikir.jpeg');
    background-size: cover;
    background-position: right center;
    opacity: 0.8;
    z-index: -2;
    will-change: transform;
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
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  max-width: 1800px;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(8, 252, 172, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
    animation: pulseGlow 8s ease-in-out infinite;
  }

  @keyframes pulseGlow {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.5); opacity: 0.2; }
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
  text-shadow: 0 0 30px rgba(8, 252, 172, 0.3);
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
`;

const FeatureGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 4rem;
  width: 100%;
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
    color: rgba(8, 252, 172, 0.4);
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
    box-shadow: 0 0 20px rgba(8, 252, 172, 0.6);
  }

  ${FeatureInfo}:hover & {
    text-shadow: 0 0 40px rgba(8, 252, 172, 0.6);
    transform: translateZ(30px);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
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
    font-size: 1rem;
    line-height: 1.5;
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
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  border: 1px solid rgba(8, 252, 172, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  isolation: isolate;
  width: 80vw;
  margin-left: calc(-40vw + 50%);
  margin-right: calc(-40vw + 50%);
  box-shadow: 
    0 0 40px rgba(8, 252, 172, 0.05),
    inset 0 0 0 1px rgba(8, 252, 172, 0.1);

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
    opacity: 1;
    transition: all 0.4s ease-in-out;
    z-index: -1;
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
    transition: all 0.4s ease-in-out;
  }

  &:hover {
    transform: translateX(-10px) translateY(-5px);
    border-color: rgba(8, 252, 172, 0.2);
    box-shadow: 
      0 10px 40px rgba(8, 252, 172, 0.1),
      inset 0 0 0 1px rgba(8, 252, 172, 0.15);

    &::before {
      opacity: 0.9;
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
    min-height: 300px;
  }
`;

const SubFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  width: 98vw;
  margin-left: calc(-49vw + 50%);
  margin-right: calc(-49vw + 50%);
  padding: 0 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 3rem;
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 2rem;
    width: 92vw;
    margin-left: calc(-46vw + 50%);
    margin-right: calc(-46vw + 50%);
    gap: 2rem;
  }
`;

const SubFeatureBox = styled(motion.div)`
  position: relative;
  padding: 2rem;
  background: transparent;
  border-radius: 40px;
  overflow: hidden;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(8, 252, 172, 0.3);
  isolation: isolate;
  transform-style: preserve-3d;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-shadow: 
    0 0 40px rgba(8, 252, 172, 0.15),
    inset 0 0 0 1px rgba(8, 252, 172, 0.2),
    0 10px 40px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(8, 252, 172, 0.2),
    inset 0 0 30px rgba(8, 252, 172, 0.1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${props => `url('/images/${props.bgImage}')`};
    background-size: cover;
    background-position: center;
    opacity: 0.95;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
    transform-origin: center;
    filter: saturate(1.1) contrast(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0.6) 35%,
      rgba(0, 0, 0, 0.8) 45%,
      rgba(0, 0, 0, 0.9) 55%,
      rgba(0, 0, 0, 0.95) 75%,
      rgba(0, 0, 0, 1) 100%
    );
    z-index: -1;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  }

  &:hover {
    transform: translateY(-15px);
    border-color: rgba(8, 252, 172, 0.6);
    box-shadow: 
      0 25px 70px rgba(8, 252, 172, 0.3),
      inset 0 0 0 1.5px rgba(8, 252, 172, 0.6),
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(8, 252, 172, 0.4),
      inset 0 0 50px rgba(8, 252, 172, 0.2);

    &::before {
      transform: scale(1.05);
      opacity: 1;
      filter: saturate(1.2) contrast(1.15) brightness(1.1);
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 320px;
  }
`;

const About = memo(() => {
  // Feature data'sını useMemo ile optimize ediyoruz
  const features = useMemo(() => [
    {
      id: 'main',
      title: 'Sektörün Öncü Yazılım Şirketi',
      description: 'Türkiye\'nin en büyük 500 şirketinin tercihi olan Planet Yazılım, yenilikçi çözümleri ve güçlü teknik altyapısı ile fark yaratıyor.',
      animation: animations.slideInLeft
    },
    {
      id: 'customer',
      title: '%99.9 Müşteri Memnuniyeti',
      description: 'Uzman ekibimiz ve 7/24 teknik destek hizmetimiz ile müşterilerimize kesintisiz çözümler sunuyoruz.',
      image: 'foto1.webp',
      animation: animations.slideInUp,
      delay: 0.3
    },
    {
      id: 'projects',
      title: '500+ Başarılı Proje',
      description: 'Farklı sektörlerde geliştirdiğimiz projeler ve başarı hikayelerimiz ile işletmenizin dijital dönüşümüne öncülük ediyoruz.',
      image: 'foto2.jpeg',
      animation: animations.slideInUp,
      delay: 0.4
    },
    {
      id: 'experience',
      title: '20 Yıllık Deneyim',
      description: 'Yazılım sektöründeki 20 yıllık deneyimimiz ve uzman kadromuz ile işletmenize özel, yenilikçi çözümler sunuyoruz.',
      image: 'foto3.webp',
      animation: animations.slideInUp,
      delay: 0.5
    }
  ], []);

  // Feature kartı render fonksiyonu
  const renderFeatureCard = useCallback(({ id, title, description, image, animation, delay }) => (
    <SubFeatureBox
      key={id}
      bgImage={image}
      initial="hidden"
      animate="visible"
      variants={animation}
      transition={{ duration: 0.6, delay }}
    >
      <FeatureInfo>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
      </FeatureInfo>
    </SubFeatureBox>
  ), []);

  return (
    <AboutSection>
      <Container>
        <ContentWrapper>
          <Title
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
          >
            Neden Planet?
          </Title>

          <Description
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
          >
            20 yıllık sektör deneyimi ve 500'den fazla başarılı proje ile
            işletmenizin dijital dönüşümünde güvenilir çözüm ortağınız.
          </Description>

          <FeatureGrid>
            <MainFeature
              initial="hidden"
              animate="visible"
              variants={features[0].animation}
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
      </Container>
    </AboutSection>
  );
});

About.displayName = 'About';

export default About; 