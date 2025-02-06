import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import { 
  FaQuoteRight, 
  FaStar, 
  FaBuilding, 
  FaUser, 
  FaCalendar, 
  FaChevronLeft, 
  FaChevronRight,
  FaMagic,
  FaGem,
  FaCrown,
  FaCircle
} from 'react-icons/fa';

const FloatingImage = styled(motion.img)`
  position: absolute;
  border-radius: 20px;
  filter: brightness(0.8) saturate(1.2);
  opacity: 0.15;
  z-index: 1;
  
  &.img1 {
    top: 10%;
    left: 5%;
    width: 300px;
    transform: rotate(-15deg);
  }
  
  &.img2 {
    top: 40%;
    right: 5%;
    width: 250px;
    transform: rotate(10deg);
  }
  
  &.img3 {
    bottom: 10%;
    left: 15%;
    width: 280px;
    transform: rotate(5deg);
  }
`;

const MagicBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.gradients.dark};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.15;
    animation: drift 30s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${theme.gradients.secondary};
    opacity: 0.3;
  }

  @keyframes drift {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const GlowingOrb = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle at center, ${theme.colors.primary}20, transparent 70%);
  filter: blur(20px);
  z-index: 1;
`;

const MusteriYorumlariSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 0 0 30px ${theme.colors.primary}40;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 400;
  opacity: 0.9;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const CrystalCard = styled(motion.div)`
  position: relative;
  background: ${theme.gradients.glass};
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.gradients.secondary};
    opacity: 0.1;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      ${theme.colors.primary}10 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 50px ${theme.colors.primary}20;

    &::after {
      opacity: 1;
    }
  }
`;

const MagicGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(
      45deg,
      ${theme.colors.primary}40,
      transparent,
      ${theme.colors.primary}40
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2rem;
  color: ${theme.colors.primary};
  opacity: 0.3;
  transform: rotate(10deg);
  z-index: 2;
`;

const TestimonialText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin: 1.5rem 0;
  font-size: 1.1rem;
  font-style: italic;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ClientInfo = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: 50%;
    height: 1px;
    background: ${theme.colors.primary};
    animation: expandLine 2s ease-out forwards;
  }

  @keyframes expandLine {
    from { width: 0; }
    to { width: 50%; }
  }
`;

const ClientName = styled.h4`
  color: ${theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1rem;
  }
`;

const ClientDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Rating = styled.div`
  display: flex;
  gap: 0.3rem;
  margin: 1rem 0;
  
  svg {
    color: ${theme.colors.primary};
    filter: drop-shadow(0 0 5px ${theme.colors.primary}40);
  }
`;

const MagicSparkle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${theme.colors.primary};
  border-radius: 50%;
  pointer-events: none;
`;

const ParticleContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${theme.colors.primary};
  border-radius: 50%;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${theme.colors.primary}40;
  position: relative;
  z-index: 2;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ClientInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const testimonials = [
  {
    text: "Planet Yazılım'ın ERP çözümü sayesinde iş süreçlerimizi tamamen dijitalleştirdik. Verimlilik artışı ve maliyet tasarrufu beklentilerimizin üzerinde gerçekleşti.",
    name: "Ahmet Yılmaz",
    company: "TechCorp",
    position: "Teknoloji Direktörü",
    date: "Mart 2024",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
  },
  {
    text: "Müşteri hizmetleri ve teknik destek ekibi 7/24 yanımızda. Sorunlarımıza hızlı çözümler üretiyorlar. İş ortağımız olarak görüyoruz.",
    name: "Zeynep Kaya",
    company: "InnovateTR",
    position: "CEO",
    date: "Şubat 2024",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    text: "Yapay zeka destekli analiz araçları karar verme süreçlerimizi hızlandırdı. Veriye dayalı kararlar almamızı sağlayan harika bir platform.",
    name: "Mehmet Demir",
    company: "DataTech",
    position: "Veri Analisti",
    date: "Ocak 2024",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  },
  {
    text: "Blockchain entegrasyonu ile tedarik zinciri süreçlerimiz şeffaf ve güvenli hale geldi. Sektörde öncü bir konuma geldik.",
    name: "Ayşe Yıldız",
    company: "ChainLogistics",
    position: "Operasyon Müdürü",
    date: "Mart 2024",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
  },
  {
    text: "E-ticaret platformumuzun performansı ve kullanıcı deneyimi üst düzeyde. Satışlarımız %200 arttı.",
    name: "Can Özkan",
    company: "ShopGlobal",
    position: "E-ticaret Müdürü",
    date: "Şubat 2024",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
  },
  {
    text: "IoT sensörleri ve gerçek zamanlı izleme sistemleri ile üretim hatlarımızı optimize ettik. Kestirimci bakım sayesinde duruş sürelerimiz minimize oldu.",
    name: "Elif Yılmaz",
    company: "SmartFactory",
    position: "Üretim Müdürü",
    date: "Ocak 2024",
    rating: 5,
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=200&q=80"
  }
];

function MusteriYorumlari() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
    };

    setParticles(generateParticles());
  }, []);

  return (
    <MusteriYorumlariSection>
      <MagicBackground />
      
      {/* Floating Images */}
      <FloatingImage 
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" 
        className="img1"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ duration: 1 }}
      />
      <FloatingImage 
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" 
        className="img2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <FloatingImage 
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
        className="img3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      />

      {/* Glowing Orbs */}
      <GlowingOrb
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        style={{ top: '20%', left: '10%' }}
      />
      <GlowingOrb
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ top: '60%', right: '15%' }}
      />

      {/* Particles */}
      <ParticleContainer>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            initial={{ 
              x: particle.x,
              y: particle.y,
              opacity: Math.random()
            }}
            animate={{
              y: [particle.y, particle.y - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </ParticleContainer>

      <Container>
        <Content>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaCrown style={{ marginRight: '1rem', color: theme.colors.primary }} />
            Müşteri Deneyimleri
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FaMagic style={{ marginRight: '0.5rem' }} />
            Başarı Hikayeleri ve Değerli Geri Bildirimler
          </Subtitle>

          <TestimonialsGrid>
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <CrystalCard
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <MagicGlow />
                  <QuoteIcon>
                    <FaQuoteRight />
                  </QuoteIcon>
                  <TestimonialText>"{testimonial.text}"</TestimonialText>
                  <Rating>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </Rating>
                  <ClientInfo>
                    <ClientInfoWrapper>
                      <ProfileImage>
                        <img src={testimonial.image} alt={testimonial.name} />
                      </ProfileImage>
                      <div>
                        <ClientName>
                          <FaGem />
                          {testimonial.name}
                        </ClientName>
                        <ClientDetails>
                          <div>
                            <FaBuilding />
                            {testimonial.company} - {testimonial.position}
                          </div>
                          <div>
                            <FaCalendar />
                            {testimonial.date}
                          </div>
                        </ClientDetails>
                      </div>
                    </ClientInfoWrapper>
                  </ClientInfo>
                </CrystalCard>
              ))}
            </AnimatePresence>
          </TestimonialsGrid>
        </Content>
      </Container>
    </MusteriYorumlariSection>
  );
}

export default MusteriYorumlari; 