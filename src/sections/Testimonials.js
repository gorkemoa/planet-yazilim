import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/GlobalStyles';
import Container from '../components/common/Container';
import { FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  }
`;

const ContentWrapper = styled.div`
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
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const LeftContent = styled.div`
  padding-right: 2rem;
  width: 100%;
  max-width: 600px;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.5rem, 6vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: clamp(1rem, 3vw, 2rem);
  text-shadow: 0 0 30px rgba(8, 252, 172, 0.3);
  line-height: 1.2;
  padding: 0;
  max-width: 100%;
  word-wrap: break-word;
  hyphens: auto;
  overflow-wrap: break-word;
  display: block;
  width: 100%;

  @media (max-width: 1024px) {
    font-size: min(max(1.6rem, 4.5vw), 2.8rem);
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    font-size: min(max(1.4rem, 4vw), 2.2rem);
    margin-bottom: 1.5rem;
    line-height: 1.3;
    padding: 0;
  }

  @media (max-width: 480px) {
    font-size: min(max(1.2rem, 3.5vw), 1.8rem);
    margin-bottom: 1rem;
    line-height: 1.4;
  }
`;

const Description = styled(motion.p)`
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
  }

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, calc(0.75rem + 0.3vw), 1rem);
    line-height: clamp(1.3, calc(1.2 + 0.2vw), 1.6);
    margin-bottom: clamp(1rem, calc(0.8rem + 1vw), 2rem);
    padding: clamp(0.3rem, calc(0.2rem + 0.5vw), 0.8rem) 0;
    letter-spacing: 0.3px;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.75rem, calc(0.7rem + 0.2vw), 0.9rem);
    line-height: clamp(1.2, calc(1.1 + 0.2vw), 1.5);
    margin-bottom: clamp(0.8rem, calc(0.6rem + 0.8vw), 1.5rem);
    padding: clamp(0.2rem, calc(0.15rem + 0.3vw), 0.6rem) 0;
    letter-spacing: 0.2px;
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
  }
`;

const TestimonialContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  perspective: 2000px;
  transform-style: preserve-3d;

  @media (max-width: 768px) {
    height: auto;
    perspective: none;
    transform-style: flat;
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
    padding: 1rem;
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
      const scrollAmount = direction === 'left' ? 400 : -400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <TestimonialsSection id="testimonials">
      <Container>
        <ContentWrapper>
          <LeftContent>
            <Title
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Müşteri Memnuniyeti Bizim İçin Öncelik
            </Title>
            <Description
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Planet Yazılım olarak, müşterilerimizin başarısı için çalışıyoruz. Modern teknolojiler ve yenilikçi çözümlerle işletmelerin dijital dönüşümüne öncülük ediyoruz. Uzman ekibimiz ve 7/24 teknik desteğimiz ile her zaman yanınızdayız.
            </Description>
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
        </ContentWrapper>
      </Container>
    </TestimonialsSection>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials; 