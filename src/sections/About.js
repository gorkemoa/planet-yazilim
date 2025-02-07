import React, { memo, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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

const StyledAboutSection = styled.section`
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

const StyledContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  margin: 0 auto;
  padding: 0 4rem;
  max-width: 1400px;
  
  @media (max-width: 768px) {
    padding: 0 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const StyledTitle = styled.h1`
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

const StyledMainFeature = styled.div`
  position: relative;
  padding: 4rem;
  background: 
    radial-gradient(circle at top left, rgba(0, 0, 0, 0.2) 0%, transparent 80%),
    linear-gradient(159deg, rgba(0, 0, 0, 0.6) -10%, rgba(68, 252, 172, 0.8) 94%);
  border-radius: 32px;
  overflow: hidden;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: none;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  isolation: isolate;
  width: 90vw;
  margin-left: calc(-45vw + 50%);
  margin-right: calc(-45vw + 50%);
  box-shadow: 
    inset -6px -6px 16px rgba(68, 252, 172, 0.06),
    inset 6px 6px 16px rgba(0, 0, 0, 0.25);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 
      inset -8px -8px 24px rgba(68, 252, 172, 0.08),
      inset 8px 8px 24px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);

    &::before {
      opacity: 0.95;
      filter: brightness(0.85) contrast(1.15) saturate(1.1);
    }

    &::after {
      opacity: 0.9;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('https://cdn.prod.website-files.com/605b149a3d84a15fe241e8d3/66f1648bac3162900a8ce6cc_weba-and-mobile-apps.png');
    background-size: cover;
    background-position: center;
    opacity: 0.9;
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    filter: brightness(0.8) contrast(1.1) saturate(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(
        135deg,
        rgba(8, 252, 172, 0.15) 0%,
        rgba(0, 0, 0, 0.95) 100%
      ),
      linear-gradient(
        to right,
        rgba(0, 0, 0, 0.98) 0%,
        rgba(0, 0, 0, 0.85) 25%,
        rgba(0, 0, 0, 0.65) 50%,
        rgba(0, 0, 0, 0.45) 75%,
        rgba(0, 0, 0, 0.1) 100%
      );
    z-index: -1;
    opacity: 0.85;
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    min-height: 400px;
    width: 94vw;
    margin-left: calc(-47vw + 50%);
    margin-right: calc(-47vw + 50%);
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    min-height: 300px;
    width: 96vw;
    margin-left: calc(-48vw + 50%);
    margin-right: calc(-48vw + 50%);
  }
`;

const StyledFeatureTitle = styled.h3`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #fff;
  text-align: left;
  font-family: Ubuntu, sans-serif;
  max-width: 70%;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 30px rgba(8, 252, 172, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  ${StyledMainFeature}:hover & {
    text-shadow: 0 0 35px rgba(8, 252, 172, 0.15);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 3vw, 2.2rem);
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  }
`;

const StyledFeatureDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${THEME.primary};
  margin: 0;
  font-weight: 500;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 20px rgba(8, 252, 172, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  ${StyledMainFeature}:hover & {
    text-shadow: 0 0 25px rgba(8, 252, 172, 0.15);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledStatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 90vw;
  margin: 2rem calc(-45vw + 50%);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: 94vw;
    margin: 2rem calc(-47vw + 50%);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 96vw;
    margin: 2rem calc(-48vw + 50%);
  }
`;

const StyledStatFeature = styled.div`
  position: relative;
  padding: 2.5rem;
  cursor: default;
  background: 
    radial-gradient(circle at top left, #000000 0%, transparent 45%),
    linear-gradient(159deg, #000000 -10%, #44fcaccc 94%);
  border-radius: 16px;
  overflow: hidden;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: none;
  box-shadow: 
    0 8px 32px rgba(8, 252, 172, 0.12),
    inset -6px -6px 16px rgba(68, 252, 172, 0.06),
    inset 6px 6px 16px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  isolation: isolate;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 
      0 12px 40px rgba(8, 252, 172, 0.15),
      inset -8px -8px 24px rgba(68, 252, 172, 0.08),
      inset 8px 8px 24px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    min-height: 160px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    min-height: 140px;
  }
`;

const StyledStatTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  color: #fff;
  text-align: left;
  font-family: Ubuntu, sans-serif;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const StyledDetailIcon = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  z-index: 3;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &::before {
    content: '+';
    font-size: 1.5rem;
    color: ${THEME.primary};
  }
`;

const StyledPopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const StyledPopupContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 600px;
  background: #1a1a1a;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    width: 95%;
    padding: 1.5rem;
  }
`;

const StyledDetailContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 1rem;
  opacity: 0.9;
  font-family: 'Ubuntu', sans-serif;
  letter-spacing: 0.02em;

  p {
    margin-top: 1.5rem;
    margin-bottom: 0;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
  }

  br {
    content: '';
    display: block;
    margin: 0.5rem 0;
  }
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
  z-index: 2;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 2px;
    background: white;
    transform-origin: center;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover::before,
  &:hover::after {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const About = memo(() => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const renderPopupContent = (index) => {
    const contents = {
      0: {
        title: "IT Projelerinin %80'i Beklentileri Karşılamıyor",
        content: "Kuika'nın düşük kodlu platformu, işletmelerin daha hızlı, daha kolay ve daha uygun maliyetli uygulama geliştirme imkanı sunar. Bu sayede, karmaşık yazılım geliştirme süreçlerinizin üstesinden gelmenize yardımcı olur. Girişimlerden büyük işletmelere kadar, Kuika, geleneksel geliştirme karmaşıklıkları olmadan başarılı projeler sunmanızı sağlar."
      },
      1: {
        title: "İş Süreçlerinde Devrim",
        content: "Düşük kodlu/kodsuz platformlar, iş süreçlerini tamamen değiştiriyor. Artık işletmeler:\n• Uygulamalarını 10 kat daha hızlı geliştirebiliyor\n• IT departmanlarının iş yükünü %60'a kadar azaltabiliyor\n• İnovasyon süreçlerini hızlandırabiliyor\n• Müşteri ihtiyaçlarına daha hızlı yanıt verebiliyor"
      },
      2: {
        title: "Geleceğin İş Gücü",
        content: "2025'e kadar iş gücünün %75'i dijital yerlilerden oluşacak. Bu nesil:\n• Daha çevik ve adaptif çalışma yöntemlerini tercih ediyor\n• Düşük kodlu/kodsuz platformları doğal olarak benimsiyor\n• İnovatif çözümler üretmekte daha yetenekli"
      }
    };

    return (
      <StyledPopupContent>
        <StyledCloseButton onClick={() => setActivePopup(null)} />
        <StyledStatTitle style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
          {contents[index].title}
        </StyledStatTitle>
        <StyledDetailContent>
          {contents[index].content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        
        </StyledDetailContent>
      </StyledPopupContent>
    );
  };

  return (
    <StyledAboutSection ref={sectionRef}>
      <StyledContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
        >
          <StyledTitle>Neden Planet?</StyledTitle>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.slideInLeft}
        >
          <StyledMainFeature>
            <StyledFeatureTitle>
              2025 yılı itibariyle geliştirilen uygulamaların %70'i düşük kodlu/kodsuz olacak.
            </StyledFeatureTitle>
          </StyledMainFeature>
        </motion.div>

        <StyledStatGrid>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
            initial="hidden"
            whileInView="visible"
              viewport={{ once: true }}
            variants={animations.slideInUp}
              transition={{ delay: index * 0.2 }}
            >
              <StyledStatFeature>
                <StyledStatTitle>
                  2025 yılı itibariyle geliştirilen uygulamaların %70'i düşük kodlu/kodsuz olacak.
                </StyledStatTitle>
                <StyledDetailIcon onClick={() => setActivePopup(index)} />
              </StyledStatFeature>
                  </motion.div>
          ))}
        </StyledStatGrid>

            <AnimatePresence>
          {activePopup !== null && (
            <StyledPopupOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePopup(null)}
            >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                {renderPopupContent(activePopup)}
                  </motion.div>
            </StyledPopupOverlay>
              )}
            </AnimatePresence>
      </StyledContentWrapper>
    </StyledAboutSection>
  );
});

About.displayName = 'About';

export default About; 