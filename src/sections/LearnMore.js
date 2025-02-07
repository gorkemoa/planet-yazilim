import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { theme } from '../styles/GlobalStyles';
import Container from '../components/common/Container';
import { FaGraduationCap, FaBook, FaVideo, FaUsers, FaRocket, FaCertificate } from 'react-icons/fa';

const LearnMoreSection = styled.section`
  min-height: 100vh;
  background: #000000;
  position: relative;
  overflow: hidden;
  padding: ${theme.spacing.xxl} 0;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(circle at 10% 0%, rgba(8, 252, 172, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 90% 90%, rgba(8, 252, 172, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(8, 252, 172, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
`;

const GridBackground = styled.div`
  position: fixed;
  inset: 0;
  background-image: 
    linear-gradient(to right, ${theme.colors.primary}08 1px, transparent 1px),
    linear-gradient(to bottom, ${theme.colors.primary}08 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.15;
  transform: perspective(1000px) rotateX(60deg) translateY(-100px);
  transform-origin: top;
  animation: gridMove 20s linear infinite;

  @keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: 50px 50px; }
  }
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(
    to right,
    transparent,
    ${theme.colors.primary}80,
    #fff,
    ${theme.colors.primary}80,
    transparent
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  letter-spacing: 4px;
  filter: drop-shadow(0 0 8px ${theme.colors.primary}40);
  
  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      ${theme.colors.primary},
      transparent
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.7;
    filter: blur(8px);
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 0.9; }
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.4rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  max-width: 900px;
  margin: 0 auto 8rem;
  line-height: 1.8;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const IconWrapper = styled.div`
  width: clamp(70px, 15vw, 90px);
  height: clamp(70px, 15vw, 90px);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(8, 252, 172, 0.08);
  border: 1.5px solid rgba(8, 252, 172, 0.3);
  transition: all 0.4s ease;
  position: relative;

  .icon-inner {
    position: absolute;
    inset: -8%;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      ${theme.colors.primary}20,
      transparent 70%
    );
    filter: blur(10px);
    opacity: 0.5;
    transition: all 0.4s ease;
  }

  svg {
    width: 45%;
    height: 45%;
    color: #fff;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 0 8px ${theme.colors.primary}60);
    transition: all 0.4s ease;
  }

  @keyframes rotateOuter {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes rotateInner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ServiceTitle = styled.h3`
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  color: #fff;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 0 10px ${theme.colors.primary}40;
  padding: 0 1rem;
  line-height: 1.3;
`;

const ServiceDescription = styled.p`
  font-size: clamp(1rem, 2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  line-height: 1.5;
  padding: 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: auto;
  max-width: 95%;
  margin: 0 auto;
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(320px, 380px));
  gap: clamp(2rem, 4vw, 3.5rem);
  justify-content: center;
  align-items: stretch;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(300px, 360px));
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(280px, 340px);
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(260px, 320px);
  }
`;

const ServiceCard = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 1.2;
  margin: 0 auto;
  padding: 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  cursor: pointer;
  border: 1px solid ${theme.colors.primary}30;
  overflow: visible;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: transparent;
    border: 2px solid ${theme.colors.primary}30;
    clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
    z-index: -1;
  }

  .hex-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    background: ${theme.colors.primary};
    border-radius: 50%;
    z-index: 2;
    box-shadow:
      0 0 15px ${theme.colors.primary},
      0 0 25px ${theme.colors.primary},
      0 0 35px ${theme.colors.primary}90,
      0 0 45px ${theme.colors.primary}60,
      inset 0 0 10px rgba(255, 255, 255, 0.9);
    animation: cornerGlow 3s ease-in-out infinite alternate;

    &::after {
      content: '';
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      background: radial-gradient(
        circle at center,
        ${theme.colors.primary}50 0%,
        ${theme.colors.primary}20 30%,
        transparent 70%
      );
      filter: blur(3px);
    }
  }

  .top-left { top: 0; left: 20%; transform: translate(-50%, -50%); }
  .top-right { top: 0; right: 20%; transform: translate(50%, -50%); }
  .right { top: 50%; right: 0; transform: translate(50%, -50%); }
  .bottom-right { bottom: 0; right: 20%; transform: translate(50%, 50%); }
  .bottom-left { bottom: 0; left: 20%; transform: translate(-50%, 50%); }
  .left { top: 50%; left: 0; transform: translate(-50%, -50%); }

  @keyframes cornerGlow {
    0%, 20%, 40%, 60%, 80% {
      opacity: 0.95;
      box-shadow:
        0 0 15px ${theme.colors.primary},
        0 0 25px ${theme.colors.primary},
        0 0 35px ${theme.colors.primary}90,
        0 0 45px ${theme.colors.primary}60,
        inset 0 0 10px rgba(255, 255, 255, 0.9);
    }
    10%, 30%, 50%, 70%, 90% {
      opacity: 0.7;
      box-shadow:
        0 0 10px ${theme.colors.primary},
        0 0 20px ${theme.colors.primary},
        0 0 30px ${theme.colors.primary}70,
        0 0 40px ${theme.colors.primary}40,
        inset 0 0 8px rgba(255, 255, 255, 0.7);
    }
  }

  &:hover {
    transform: translateY(-10px) rotateX(10deg);
    border-color: ${theme.colors.primary}60;
    
    .hex-corner {
      box-shadow:
        0 0 20px ${theme.colors.primary},
        0 0 35px ${theme.colors.primary},
        0 0 50px ${theme.colors.primary}90,
        0 0 65px ${theme.colors.primary}60,
        inset 0 0 15px rgba(255, 255, 255, 1);
      animation: cornerGlow 2s ease-in-out infinite alternate;

      &::after {
        inset: -10px;
        background: radial-gradient(
          circle at center,
          ${theme.colors.primary}60 0%,
          ${theme.colors.primary}30 30%,
          transparent 70%
        );
        filter: blur(4px);
      }
    }

    ${IconWrapper} {
      transform: translateY(-10px) scale(1.1);
      
      &::before,
      &::after {
        opacity: 0.8;
        filter: blur(2px);
      }

      .icon-inner {
        opacity: 1;
        transform: scale(1.2);
      }

      svg {
        color: ${theme.colors.primary};
        filter: drop-shadow(0 0 15px ${theme.colors.primary});
        transform: scale(1.1);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 2rem;
    aspect-ratio: 1.15;
  }
`;

const ServiceCardComponent = memo(({ resource, itemVariants }) => {
  return (
    <ServiceCard
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      initial="hidden"
      animate="visible"
    >
      <div className="hex-corner top-left" />
      <div className="hex-corner top-right" />
      <div className="hex-corner right" />
      <div className="hex-corner bottom-right" />
      <div className="hex-corner bottom-left" />
      <div className="hex-corner left" />

      <IconWrapper>
        <div className="icon-inner" />
        <resource.icon />
      </IconWrapper>
      <ServiceTitle>{resource.title}</ServiceTitle>
      <ServiceDescription>{resource.description}</ServiceDescription>
    </ServiceCard>
  );
});

const resources = [
  {
    icon: FaGraduationCap,
    title: 'Yazılım Geliştirme',
    description: 'Yapay zeka destekli özel yazılım çözümleri, blockchain entegrasyonları ve geleceğin teknolojileri.'
  },
  {
    icon: FaBook,
    title: 'ERP Çözümleri',
    description: 'Quantum computing destekli, yapay zeka tabanlı yeni nesil kurumsal kaynak planlama sistemleri.'
  },
  {
    icon: FaVideo,
    title: 'Endüstriyel Otomasyon',
    description: 'Metaverse entegrasyonlu, AR/VR destekli akıllı üretim ve otomasyon sistemleri.'
  },
  {
    icon: FaUsers,
    title: 'Dijital Dönüşüm',
    description: 'Web 3.0 ve blockchain teknolojileriyle işletmenizi geleceğe hazırlayan dönüşüm stratejileri.'
  },
  {
    icon: FaRocket,
    title: 'IoT Platformları',
    description: '5G ve yapay zeka destekli, edge computing tabanlı yeni nesil IoT ekosistemi.'
  },
  {
    icon: FaCertificate,
    title: 'AI Destekli Destek',
    description: 'Yapay zeka ve makine öğrenmesi ile güçlendirilmiş 7/24 proaktif teknik destek hizmeti.'
  }
];

const LearnMore = memo(() => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    return () => setIsReady(false);
  }, []);

  useEffect(() => {
    if (isInView && isReady) {
      const startAnimation = async () => {
        await controls.start('visible');
      };
      startAnimation();
    }
  }, [isInView, controls, isReady]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50,
      opacity: 0,
      rotateX: -30
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  return (
    <LearnMoreSection id="hizmetler" ref={ref}>
      <GridBackground />
      <Container>
        <ContentWrapper
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <Title 
            variants={itemVariants}
            data-text="Hizmetlerimiz"
          >
            Hizmetlerimiz
          </Title>
          <Subtitle variants={itemVariants}>
            Geleceğin teknolojilerini bugünden deneyimleyin. Yapay zeka, blockchain ve metaverse ile güçlendirilmiş çözümlerimizle tanışın.
          </Subtitle>

          <ServicesGrid variants={containerVariants}>
            {resources.map((resource) => (
              <ServiceCardComponent
                key={resource.title}
                resource={resource}
                itemVariants={itemVariants}
              />
            ))}
          </ServicesGrid>
        </ContentWrapper>
      </Container>
    </LearnMoreSection>
  );
});

LearnMore.displayName = 'LearnMore';

export default LearnMore; 