import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Section from '../components/common/Section';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { theme } from '../styles/GlobalStyles';

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background: ${theme.colors.background};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.85) 0%,
      ${theme.colors.primary}15 100%
    );
    z-index: 1;
  }

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover;
    filter: brightness(0.5) contrast(1.2) saturate(1.2);
    will-change: transform;
    z-index: 0;
  }
`;

const HeroSection = styled(Section)`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0;
  background: ${theme.colors.background};
  overflow: hidden;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 20% 50%,
      ${theme.colors.primary}15 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 1;
  }
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 1;
  padding: 0 2rem;
`;

const Title = styled(motion.div)`
  h1 {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 800;
    color: #fff;
    margin-bottom: 1rem;
    line-height: 1.1;
    
    span {
      color: #fff;
      display: block;
      font-size: clamp(2rem, 4vw, 3.5rem);
    }
  }
`;

const Description = styled(motion.div)`
  max-width: 600px;
  margin: 2rem 0;

  p {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  .highlight {
    color: #fff;
    font-weight: 600;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    width: fit-content;
  }
`;

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function Hero() {
  return (
    <HeroSection>
      <VideoBackground>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          style={{ pointerEvents: 'none' }}
        >
          <source 
          src='https://media.istockphoto.com/id/1334389641/tr/video/top-down-footage-of-a-busy-corporate-office-with-tow-rows-off-businessmen-and-businesswomen.mp4?s=mp4-640x640-is&k=20&c=RFIjcPm1fPNI_OsKvLiMzzgEPcrSa1aIFDIWN47DUcs='
          type="video/mp4" 
          />
        </video>
      </VideoBackground>
      <HeroContent>
        <Title
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h1>
            AI destekli akıllı
            <span>sistemler</span> geliştirin.
          </h1>
        </Title>
        <Description
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <p>
            Planet ile minimal kod bilgisiyle mobil uygulamalar, web uygulamaları, 
            iş akışları ve çok daha fazlasını oluşturun. <span className="highlight">Kuikly.</span>
          </p>
          <p>Mobil uygulamalar, web uygulamaları, iş akışları...</p>
        </Description>
        <ButtonGroup
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button size="large">Demo talep et</Button>
          <Button variant="secondary" size="large">Ücretsiz dene</Button>
        </ButtonGroup>
      </HeroContent>
    </HeroSection>
  );
}

export default Hero; 