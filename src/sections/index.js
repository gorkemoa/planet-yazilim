import React, { useState, useRef, useMemo, useEffect, useCallback, memo } from 'react';
import styled from 'styled-components';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import Section from '../components/common/Section';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { theme } from '../styles/GlobalStyles';
import './Partners.css';
import { BiNetworkChart , BiCodeAlt, BiGitBranch, BiBookReader } from 'react-icons/bi';
import { FaCar, FaHospital, FaCogs, FaTshirt, FaTractor, FaBox, FaUtensils, FaPrint, FaFlask, FaBolt, FaMicrochip, FaStore, FaIndustry, FaBuilding, FaTools, FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight, FaArrowRight, FaClock, FaUser, FaTag } from 'react-icons/fa';

// Hero Bileşeni
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
    filter: brightness(0.6) contrast(1.1) saturate(1.1);
    will-change: transform;
    z-index: 0;
    loading: 'lazy';
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

  @media (max-width: 480px) {
    h1 {
      font-size: 2rem;
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

  @media (max-width: 480px) {
    p {
      font-size: 0.9rem;
    }
    .highlight {
      font-size: 1rem;
    }
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

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Hero() {
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

// Partners Bileşeni
const PartnersSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(8, 252, 172, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(6, 194, 133, 0.05) 0%, transparent 50%);
    z-index: 1;
  }
`;

const partners = [
  {
    logo: '🏢',
    name: 'Logo',
    description: "Türkiye'nin önde gelen kurumsal yazılım şirketi."
  },
  {
    logo: '⚡',
    name: 'Netoloji',
    description: 'İş süreçleri yönetimi ve dijital dönüşüm çözümleri.'
  },
  {
    logo: '📱',
    name: 'Kuika',
    description: 'Low-code mobil uygulama geliştirme platformu.'
  },
  {
    logo: '💻',
    name: 'Gmb',
    description: 'Yazılım geliştirme ve danışmanlık hizmetleri.'
  },
  {
    logo: '📦',
    name: 'FsSoftware',
    description: 'Depo yönetim sistemleri ve lojistik çözümleri.'
  },
  {
    logo: '🔄',
    name: 'Contact',
    description: 'PLM ve ürün yaşam döngüsü yönetimi çözümleri.'
  },
  {
    logo: '⚖️',
    name: 'Eriş Avukatlık',
    description: 'Hukuki danışmanlık ve yasal süreç yönetimi.'
  }
];

export function Partners() {
  return (
    <section className="partners-section" id="cozum-ortaklari">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Çözüm Ortaklarımız
          </h2>
        </motion.div>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="partner-card">
                <div className="partner-logo">{partner.logo}</div>
                <h3 className="partner-name">{partner.name}</h3>
                <p className="partner-description">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Products Bileşeni
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

const ProductsTitle = styled(motion.h2)`
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

const LogoWrapper = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 0 30px rgba(255, 255, 255, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  will-change: transform;
  min-width: 240px;
  width: 240px;
  height: 130px;
  cursor: pointer;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  
  img {
    width: 150%;
    height: 150%;
    object-fit: contain;
    filter: grayscale(80%) brightness(1.3) contrast(1.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: filter, transform;
    opacity: 0.8;
    padding: 0.5rem;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: ${theme.colors.primary};
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 
      0 12px 30px rgba(0, 0, 0, 0.15),
      inset 0 0 40px rgba(255, 255, 255, 0.1),
      0 0 20px ${theme.colors.primary}80,
      0 0 40px ${theme.colors.primary}40;
    z-index: 10;
    
    img {
      width: 170%;
      height: 170%;
      filter: grayscale(0%) brightness(1.1) contrast(1.1);
      transform: scale(1.1);
      opacity: 1;
      padding: 0;
    }
  }

  @media (max-width: 768px) {
    min-width: 200px;
    width: 200px;
    height: 110px;
    padding: ${theme.spacing.sm};
  }

  @media (max-width: 480px) {
    min-width: 180px;
    width: 180px;
    height: 100px;
    padding: ${theme.spacing.xs};
  }
`;

const ProductsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;
  will-change: transform;

  @media (max-width: 480px) {
    ${ProductsTitle} {
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
  gap: ${theme.spacing.md};
  white-space: nowrap;
  will-change: transform;
  padding: ${theme.spacing.md} ${theme.spacing.sm};
`;

const LogoItem = ({ logo, name }) => (
  <LogoWrapper
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <img src={logo} alt={name} loading="lazy" />
  </LogoWrapper>
);

export function Products() {
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
        positionRef.current = (positionRef.current + deltaTime * 0.02) % totalWidth.current;
        
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
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  return (
    <ProductsSection id="products">
      <Container>
        <ProductsTitle
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Müşteri Referanslarımız
        </ProductsTitle>
        <Subtitle
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Çözümlerimiz farklı sektörlerdeki şirketler tarafından tercih edilmektedir.
        </Subtitle>
      </Container>

      <LogoSlider>
        <LogoTrack
          data-logo-track
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {duplicatedReferences.map((ref, index) => (
            <LogoItem key={index} name={ref.name} logo={ref.logo} />
          ))}
        </LogoTrack>
      </LogoSlider>
    </ProductsSection>
  );
}

// Services Bileşeni
const ServicesSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: ${theme.borderRadius.large};
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  transform: translateZ(0);
  isolation: isolate;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    height: 400px;
    display: none;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 350px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    height: 300px;
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px solid ${theme.colors.primary}60;
    border-radius: ${theme.borderRadius.large};
    z-index: 2;
    box-shadow: 
      0 0 15px ${theme.colors.primary}60,
      0 0 25px ${theme.colors.primary}40,
      0 0 35px ${theme.colors.primary}30;
      
    @media (hover: hover) {
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

const ServicesTitle = styled(motion.h2)`
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
  { name: 'Kimya', icon: FaFlask },
  { name: 'Enerji', icon: FaBolt },
  { name: 'Elektronik', icon: FaMicrochip },
  { name: 'Perakende', icon: FaStore },
  { name: 'Plastik', icon: FaIndustry },
  { name: 'Hizmet ve Üretim Sektörleri', icon: FaBuilding },
  { name: 'Metal Endüstrisi', icon: FaTools }
];

const servicesVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const servicesContainerVariants = {
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
          <ServicesTitle
              variants={servicesVariants}
              initial="hidden"
              whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
              SEKTÖRLERİMİZ
          </ServicesTitle>

            <ServicesGrid
              as={motion.div}
              variants={servicesContainerVariants}
              initial="hidden"
              whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
              ref={gridRef}
            >
              {sectors.map((sector, index) => (
                <ServiceCard
                  key={sector.name}
                  variants={servicesVariants}
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

// Tekrarlanan importları kaldırıyorum ve Solutions bileşenini burada tanımlıyorum
// import React, { memo, useCallback, useRef, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { motion, LazyMotion, domAnimation } from 'framer-motion';
// import Container from '../components/common/Container';

const SolutionsSection = styled.section`
  padding: clamp(3rem, 5vw, ${theme.spacing.xxl}) 0;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 2rem 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(8, 252, 172, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(6, 194, 133, 0.03) 0%, transparent 50%);
    z-index: 1;
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform, opacity;
  }
`;

const SolutionsTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 4vw, 3.5rem);
  text-align: center;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 2;
  padding: 0 1rem;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: clamp(1.6rem, 3.5vw, 2rem);
    margin-bottom: 0.8rem;
    padding: 0 0.5rem;
  }
`;

const SolutionsSubtitle = styled(motion.div)`
  width: 60px;
  height: 4px;
  background: ${theme.colors.primary};
  margin: 0 auto 4rem;
  position: relative;
  border-radius: 2px;
  box-shadow: 0 0 20px ${theme.colors.primary}40;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 4px;
    background: ${theme.colors.primary};
    border-radius: 2px;
    box-shadow: 0 0 15px ${theme.colors.primary};
  }

  &::before {
    left: -30px;
  }

  &::after {
    right: -30px;
  }
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SolutionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: ${theme.borderRadius.medium};
  padding: clamp(1.5rem, 4vw, 2.5rem);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, background-color 0.3s ease;
  isolation: isolate;
  z-index: 1;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-8px);
      background: rgba(255, 255, 255, 0.05);

      ${props => props.$SolutionIconWrapper} {
        transform: scale(1.1);
        background: rgba(8, 252, 172, 0.15);
        
        svg {
          color: ${theme.colors.primary};
        }
      }
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1.2rem;
    min-height: 180px;
    
    &:active {
      transform: translateY(-4px);
    }
  }
`;

const SolutionIconWrapper = styled.div`
  width: clamp(50px, 8vw, 65px);
  height: clamp(50px, 8vw, 65px);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(8, 252, 172, 0.08);
  border: 1.5px solid rgba(8, 252, 172, 0.3);
  transition: all 0.3s ease;
  position: relative;
  transform: translateZ(0);
  will-change: transform;

  svg {
    width: clamp(24px, 4vw, 32px);
    height: clamp(24px, 4vw, 32px);
    color: rgba(255, 255, 255, 0.9);
    transition: color 0.3s ease;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: clamp(45px, 7vw, 55px);
    height: clamp(45px, 7vw, 55px);
    margin-bottom: 1rem;

    svg {
      width: clamp(20px, 3.5vw, 28px);
      height: clamp(20px, 3.5vw, 28px);
    }
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: #fff;
  margin-bottom: 0.8rem;
  font-weight: 600;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    margin-bottom: 0.6rem;
  }
`;

const CardText = styled.p`
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: clamp(0.85rem, 1.8vw, 0.95rem);
    line-height: 1.5;
  }
`;

const solutions = [
  {
    icon: BiNetworkChart,
    title: 'Son Teknoloji',
    description: 'İhtiyaçlarınıza göre kolayca uyarlanabilen, esnek modüler çözümlerimizden yararlanın.'
  },
  {
    icon: BiBookReader,
    title: 'Destek',
    description: 'Sorularınıza hızlıca yanıt vermek ve sorunlarınızı çözmek için anında destek sunuyoruz.'
  },
  {
    icon: BiCodeAlt,
    title: 'Yazılım Geliştirme',
    description: 'Sürekli gelişerek ve geliştirerek, her zaman en son teknolojiyi kullanmanızı sağlıyoruz.'
  },
  {
    icon: BiGitBranch,
    title: 'Rehberlik',
    description: 'Kapsamlı proje desteğimiz; ihtiyaçlarınıza özel, optimum şekilde uyarlanmış çözümler üretir.'
  },
];

const Solutions = memo(() => {
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

  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth <= 768) return; // Mobilde devre dışı bırak
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    requestAnimationFrame(() => {
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <SolutionsSection id="cozumler" ref={sectionRef}>
        <Container>
          <SolutionsTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            Yenilikçi ve Esnek Teknoloji Çözümleri
          </SolutionsTitle>
          <SolutionsSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          />
          <SolutionsGrid ref={gridRef}>
            {solutions.map((solution, index) => (
              <SolutionCard
                key={solution.title}
                data-card
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.4, 
                  delay: isInView ? index * 0.1 : 0,
                  ease: [0.4, 0, 0.2, 1]
                }}
                $SolutionIconWrapper={SolutionIconWrapper}
              >
                <SolutionIconWrapper>
                  <solution.icon />
                </SolutionIconWrapper>
                <CardTitle>{solution.title}</CardTitle>
                <CardText>{solution.description}</CardText>
              </SolutionCard>
            ))}
          </SolutionsGrid>
        </Container>
      </SolutionsSection>
    </LazyMotion>
  );
});

Solutions.displayName = 'Solutions';

// export default Solutions yorumlamayın, sadece Sections içinde kullanılacak

// Testimonials Bileşeni
const TestimonialsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: linear-gradient(180deg, #000000 0%, #000000 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
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
      radial-gradient(circle at 20% 50%, ${theme.colors.primary}08 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, ${theme.colors.primary}05 0%, transparent 50%);
    z-index: 1;
    animation: pulse 8s ease-in-out infinite alternate;
  }

  @keyframes pulse {
    0% { opacity: 0.2; }
    100% { opacity: 0.6; }
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: ${theme.spacing.xl} 0;
    width: 100%;
    overflow-x: hidden;
  }
`;

const TestimonialsContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 90%;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    max-width: 100%;
    padding: 0 1rem;
    margin: 0;
    width: 100%;
  }
`;

const LeftContent = styled.div`
  padding-right: 2rem;
  width: 100%;
  max-width: 600px;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 0;
    margin: 0 auto;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 0;
    text-align: left;
    margin: 0;
  }
`;

const TestimonialsTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #fff;
  text-align: left;
  margin-bottom: ${theme.spacing.md};
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.2;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(8, 252, 172, 0.3);
  
  @media (max-width: 1024px) {
    font-size: clamp(2rem, 4vw, 3rem);
    text-align: center;
    width: 100%;
    margin: 0 auto;
    margin-bottom: ${theme.spacing.md};
    padding: 0;
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 3.5vw, 2.5rem);
    margin-bottom: ${theme.spacing.sm};
    white-space: normal;
    word-wrap: break-word;
    text-align: left;
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.6rem, 3vw, 2rem);
    line-height: 1.3;
    width: 100%;
  }
`;

const TestimonialsDescription = styled(motion.p)`
  font-size: clamp(0.875rem, calc(0.8rem + 0.5vw), 1.2rem);
  color: rgba(255, 255, 255, 0.85);
  line-height: clamp(1.5, calc(1.4 + 0.2vw), 1.8);
  margin-bottom: clamp(1.5rem, calc(1rem + 2vw), 3rem);
  text-shadow: 0 0 20px rgba(8, 252, 172, 0.1);
  max-width: 100%;
  word-wrap: break-word;
  hyphens: auto;
  overflow-wrap: break-word;
  letter-spacing: clamp(0.2px, calc(0.1px + 0.1vw), 0.4px);
  opacity: 0.95;
  transform: translateZ(0);
  will-change: transform;
  padding: clamp(0.5rem, calc(0.3rem + 1vw), 1rem) 0;

  @media (max-width: 1024px) {
    font-size: clamp(0.85rem, calc(0.8rem + 0.4vw), 1.1rem);
    line-height: clamp(1.4, calc(1.3 + 0.2vw), 1.7);
    margin-bottom: clamp(1.2rem, calc(1rem + 1.5vw), 2.5rem);
    text-align: center;
    padding: 0;
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, calc(0.75rem + 0.3vw), 1rem);
    line-height: clamp(1.3, calc(1.2 + 0.2vw), 1.6);
    margin-bottom: clamp(1rem, calc(0.8rem + 1vw), 2rem);
    letter-spacing: 0.3px;
    text-align: left;
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.75rem, calc(0.7rem + 0.2vw), 0.9rem);
    line-height: clamp(1.2, calc(1.1 + 0.2vw), 1.5);
    margin-bottom: clamp(0.8rem, calc(0.6rem + 0.8vw), 1.5rem);
    letter-spacing: 0.2px;
    width: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: clamp(40px, 10vw, 60px);
    height: 2px;
    background: linear-gradient(to right, ${theme.colors.primary}, transparent);
    opacity: 0.5;
    
    @media (max-width: 1024px) {
      left: 50%;
      transform: translateX(-50%);
    }
    
    @media (max-width: 768px) {
      left: 0;
      transform: none;
    }
  }
`;

const TestimonialContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  perspective: 2000px;
  transform-style: preserve-3d;

  @media (max-width: 1024px) {
    height: 500px;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    height: auto;
    perspective: none;
    transform-style: flat;
    min-height: 450px;
    width: calc(100% - 0px);
    margin: 0 auto;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  border: 1px solid ${theme.colors.primary}30;
  transition: all 0.3s ease;
  box-shadow: 
    0 0 20px ${theme.colors.primary}20,
    inset 0 0 10px ${theme.colors.primary}10;

  svg {
    color: ${theme.colors.primary};
    font-size: 1.2rem;
    filter: drop-shadow(0 0 5px ${theme.colors.primary});
  }

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 
      0 0 30px ${theme.colors.primary}30,
      inset 0 0 15px ${theme.colors.primary}20;
    
    svg {
      filter: drop-shadow(0 0 8px ${theme.colors.primary});
    }
  }

  &.left {
    left: -25px;
  }

  &.right {
    right: -25px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TestimonialSlider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 2rem;
  transform: rotateY(-20deg) translateZ(0);
  cursor: grab;
  padding: 2rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    transform: none;
    padding: 1rem 0;
    gap: 1rem;
    height: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 1rem;
  }
`;

const TestimonialCard = styled(motion.div)`
  flex: 0 0 clamp(280px, 50vw, 400px);
  scroll-snap-align: center;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: clamp(1.2rem, 3vw, 2rem);
  position: relative;
  overflow: hidden;
  border: 1px solid ${theme.colors.primary}15;
  box-shadow: 
    0 0 30px ${theme.colors.primary}10,
    inset 0 0 20px ${theme.colors.primary}05;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(
        circle at 50% -20%,
        ${theme.colors.primary}20,
        transparent 70%
      ),
      linear-gradient(
        45deg,
        transparent,
        ${theme.colors.primary}08,
        transparent
      );
    opacity: 0.7;
    animation: spotlightPulse 4s ease-in-out infinite alternate;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 24px;
    background: linear-gradient(
      45deg,
      transparent,
      ${theme.colors.primary}30,
      transparent
    );
    opacity: 0.3;
    filter: blur(4px);
    animation: borderGlow 4s ease-in-out infinite alternate;
  }

  @media (max-width: 768px) {
    flex: 0 0 85vw;
    max-width: 300px;
    padding: 1.5rem;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: none;
    border: 1px solid ${theme.colors.primary}10;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transform: none;
    margin-right: 10px;

    &::before, &::after {
      display: none;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(8, 252, 172, 0.1);
    }
  }

  @keyframes borderGlow {
    0% {
      opacity: 0.2;
      filter: blur(4px);
    }
    100% {
      opacity: 0.4;
      filter: blur(6px);
    }
  }

  @keyframes spotlightPulse {
    0% {
      opacity: 0.5;
      background-position: center -20%;
    }
    100% {
      opacity: 0.8;
      background-position: center -22%;
    }
  }

  @keyframes spotlightGlow {
    0% {
      opacity: 0.3;
      filter: blur(20px);
    }
    100% {
      opacity: 0.5;
      filter: blur(25px);
    }
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
      0 20px 40px ${theme.colors.primary}15,
      inset 0 0 20px ${theme.colors.primary}10;
    background: rgba(15, 15, 15, 0.9);

    &::after {
      opacity: 0.6;
      filter: blur(6px);
    }
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: clamp(1rem, 3vw, 2rem);
  right: clamp(1rem, 3vw, 2rem);
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: ${theme.colors.primary}30;
  filter: drop-shadow(0 0 10px ${theme.colors.primary}40);
`;

const TestimonialText = styled.p`
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.9);
  line-height: clamp(1.5, 2vw, 1.8);
  margin: clamp(1rem, 3vw, 2rem) 0;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 1.5rem 0;
    text-shadow: none;
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  position: relative;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(10, 10, 10, 0.8)
  );
  padding-top: 1rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding-top: 0.8rem;
    background: none;
    border-top: 1px solid ${theme.colors.primary}10;
  }
`;

const ClientImage = styled.div`
  width: clamp(40px, 8vw, 60px);
  height: clamp(40px, 8vw, 60px);
  border-radius: 50%;
  overflow: hidden;
  border: clamp(1px, 0.3vw, 2px) solid ${theme.colors.primary};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    border-width: 1px;
  }
`;

const ClientDetails = styled.div`
  flex: 1;
`;

const ClientName = styled.h4`
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: #fff;
  margin-bottom: clamp(0.1rem, 0.5vw, 0.2rem);
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ClientRole = styled.p`
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  color: ${theme.colors.primary};
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Rating = styled.div`
  display: flex;
  gap: clamp(0.2rem, 0.5vw, 0.3rem);
  margin-top: clamp(0.3rem, 1vw, 0.5rem);
  
  svg {
    font-size: clamp(0.8rem, 1.5vw, 1rem);
    color: ${theme.colors.primary};
    filter: drop-shadow(0 0 5px ${theme.colors.primary});
  }

  @media (max-width: 768px) {
    svg {
      font-size: 0.9rem;
      filter: none;
    }
  }
`;

const testimonials = [
  {
    text: "Planet Yazılım'ın çözümleri işimizi tamamen dönüştürdü. Yapay zeka destekli sistemleri sayesinde verimliliğimiz %60 arttı. Müşteri hizmetleri ekibi her zaman yanımızda!",
    name: "Ahmet Yılmaz",
    role: "Teknoloji Direktörü, TechCorp",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5
  },
  {
    text: "Bulut tabanlı ERP sistemleri ile iş süreçlerimizi optimize ettik. Özelleştirilebilir raporlama araçları karar verme süreçlerimizi hızlandırdı.",
    name: "Zeynep Kaya",
    role: "CEO, InnovateTR",
    image: "https://i.pravatar.cc/150?img=2",
    rating: 5
  },
  {
    text: "7/24 teknik destek ve profesyonel yaklaşımları ile fark yaratıyorlar. Blockchain çözümleri ile dijital dönüşümümüzü tamamladık.",
    name: "Mehmet Demir",
    role: "CTO, BlockchainTech",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5
  },
  {
    text: "IoT çözümleri sayesinde üretim maliyetlerimiz %40 düştü. Gerçek zamanlı veri analizi ile daha akıllı kararlar alıyoruz.",
    name: "Ayşe Yıldız",
    role: "Üretim Müdürü, SmartFactory",
    image: "https://i.pravatar.cc/150?img=4",
    rating: 5
  }
];

const Testimonials = memo(() => {
  const sliderRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <TestimonialsSection id="testimonials">
      <Container style={{ maxWidth: '100%', padding: '0 1rem' }}>
        <TestimonialsContentWrapper>
          <LeftContent>
            <TestimonialsTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Müşterilerimizin<br />
              Başarı Hikayeleri
            </TestimonialsTitle>
            <TestimonialsDescription
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Planet Yazılım olarak, müşterilerimizin başarısı için çalışıyoruz. Modern teknolojiler ve yenilikçi çözümlerle işletmelerin dijital dönüşümüne öncülük ediyoruz. Uzman ekibimiz ve 7/24 teknik desteğimiz ile her zaman yanınızdayız.
            </TestimonialsDescription>
          </LeftContent>

          <TestimonialContainer>
            <ScrollIndicator className="left" onClick={() => handleScroll('left')}>
              <FaChevronLeft />
            </ScrollIndicator>
            <ScrollIndicator className="right" onClick={() => handleScroll('right')}>
              <FaChevronRight />
            </ScrollIndicator>
            <TestimonialSlider
              ref={sliderRef}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <QuoteIcon>
                    <FaQuoteRight />
                  </QuoteIcon>
                  <TestimonialText>{testimonial.text}</TestimonialText>
                  <ClientInfo>
                    <ClientImage>
                      <img src={testimonial.image} alt={testimonial.name} />
                    </ClientImage>
                    <ClientDetails>
                      <ClientName>{testimonial.name}</ClientName>
                      <ClientRole>{testimonial.role}</ClientRole>
                      <Rating>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </Rating>
                    </ClientDetails>
                  </ClientInfo>
                </TestimonialCard>
              ))}
            </TestimonialSlider>
          </TestimonialContainer>
        </TestimonialsContentWrapper>
      </Container>
    </TestimonialsSection>
  );
});

Testimonials.displayName = 'Testimonials';

// LatestArticles Bileşeni
// Tekrarlanan importları kaldırıyorum çünkü zaten dosyanın başında tanımlanmışlar
// import React from 'react';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { theme } from '../styles/GlobalStyles';
// import Container from '../components/common/Container';
// import { FaArrowRight, FaClock, FaUser, FaTag } from 'react-icons/fa';

// Örnek makale verileri
export const articles = [
  {
    id: 1,
    title: 'Yapay Zeka ile İş Süreçlerini Otomatikleştirme',
    excerpt: 'Modern işletmelerde yapay zeka kullanarak iş süreçlerini nasıl otomatikleştirebileceğinizi öğrenin.',
    image: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8',
    category: 'Yapay Zeka',
    date: '15 Mart 2023',
    author: 'Ahmet Yılmaz',
    readTime: '8 dk'
  },
  {
    id: 2,
    title: 'Web Uygulaması Geliştirme: En İyi Pratikler',
    excerpt: 'Modern web uygulamaları geliştirirken dikkat edilmesi gereken temel konular ve en iyi pratikler.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
    category: 'Web Geliştirme',
    date: '2 Şubat 2023',
    author: 'Ayşe Kaya',
    readTime: '10 dk'
  },
  {
    id: 3,
    title: 'Mobil Uygulama Tasarımında Kullanıcı Deneyimi',
    excerpt: 'Kullanıcı odaklı mobil uygulama tasarımı için temel ilkeler ve dikkat edilmesi gerekenler.',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6',
    category: 'UI/UX',
    date: '20 Ocak 2023',
    author: 'Mehmet Demir',
    readTime: '6 dk'
  },
  {
    id: 4,
    title: 'Veri Analizi ve Görselleştirme Teknikleri',
    excerpt: 'Büyük veri setlerini analiz etme ve etkili görselleştirme teknikleriyle daha iyi kararlar alın.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    category: 'Veri Bilimi',
    date: '5 Nisan 2023',
    author: 'Zeynep Türk',
    readTime: '12 dk'
  },
  {
    id: 5,
    title: 'Bulut Teknolojileri ve Sanal Altyapı Çözümleri',
    excerpt: 'Modern işletmelerde bulut teknolojilerinin kullanımı ve sağladığı avantajlar hakkında bilgiler.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    category: 'Bulut Bilişim',
    date: '18 Mayıs 2023',
    author: 'Can Yıldız',
    readTime: '9 dk'
  },
  {
    id: 6,
    title: 'Siber Güvenlik: Tehditler ve Korunma Yöntemleri',
    excerpt: 'Güncel siber güvenlik tehditleri ve işletmenizi bu tehditlerden koruma stratejileri.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
    category: 'Siber Güvenlik',
    date: '7 Haziran 2023',
    author: 'Ece Güven',
    readTime: '11 dk'
  }
];

// Styled Components
const ArticlesSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.background};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 700;
  
  span {
    background: linear-gradient(to right, #fff, ${theme.colors.primary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SectionDescription = styled(motion.p)`
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  border: 1px solid rgba(8, 252, 172, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(8, 252, 172, 0.3);
    box-shadow: 
      0 0 30px rgba(8, 252, 172, 0.1),
      inset 0 0 20px rgba(8, 252, 172, 0.05);

    img {
      transform: scale(1.1);
    }

    .read-more {
      gap: 1rem;
      color: ${theme.colors.primary};
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const Category = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(8, 252, 172, 0.9);
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
`;

const Content = styled.div`
  padding: 2rem;
`;

const ArticleTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ArticleExcerpt = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;

  svg {
    color: ${theme.colors.primary};
  }
`;

const ReadMore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  transition: all 0.3s ease;
`;

// Tekrarlanan fadeInUpVariants yerine articlesVariants kullanıyorum
const articlesVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const LatestArticles = () => {
  const displayedArticles = articles.slice(0, 3);
  
  return (
    <ArticlesSection id="articles">
      <Container>
        <SectionHeader>
          <SectionTitle
            variants={articlesVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span>Blog</span> Yazılarımız
          </SectionTitle>
          <SectionDescription
            variants={articlesVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Teknoloji dünyasından en son haberler, makaleler ve bilgi kaynakları
          </SectionDescription>
        </SectionHeader>

        <Grid>
          {displayedArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ImageWrapper>
                <img src={article.image} alt={article.title} />
                <Category>{article.category}</Category>
              </ImageWrapper>
              <Content>
                <Meta>
                  <MetaItem>
                    <FaUser />
                    {article.author}
                  </MetaItem>
                  <MetaItem>
                    <FaClock />
                    {article.readTime}
                  </MetaItem>
                </Meta>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleExcerpt>{article.excerpt}</ArticleExcerpt>
                <ReadMore className="read-more">
                  Devamını Oku <FaArrowRight />
                </ReadMore>
              </Content>
            </ArticleCard>
          ))}
        </Grid>
      </Container>
    </ArticlesSection>
  );
};

// export default LatestArticles; - Çoklu default export hatası - bunu kaldırıyorum

// Tüm bileşenleri içeren bir obje oluşturuyoruz
const Sections = {
  Hero,
  Partners,
  Products,
  Services,
  Solutions,
  Testimonials, 
  LatestArticles
};

// Sections objesini export ediyoruz
export default Sections;
