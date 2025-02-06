import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import Container from '../../components/common/Container';
import { theme } from '../../styles/GlobalStyles';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaLinkedin, FaTwitter, FaInstagram, FaUser, FaTag, FaPaperPlane } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(8, 252, 172, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.textLight};
  font-size: 2rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  box-shadow: 
    0 5px 15px rgba(8, 252, 172, 0.05),
    inset 0 0 20px rgba(8, 252, 172, 0.05);

  &::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 2px solid ${theme.colors.primary}40;
    transition: all 0.3s ease;
  }

  svg {
    transition: all 0.4s ease;
    filter: drop-shadow(0 0 5px rgba(8, 252, 172, 0.3));
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      ${theme.colors.primary}10 0%,
      transparent 50%
    );
    animation: rotate 30s linear infinite;
    z-index: 0;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ContactSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  padding-top: 120px;
  position: relative;
  z-index: 1;
`;

const StyledContainer = styled(Container)`
  padding: 0;
  max-width: 100%;

  @media (max-width: 1200px) {
    padding: 0 ${theme.spacing.md};
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #fff;
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px ${theme.colors.primary}40;

  @media (max-width: 768px) {
    font-size: clamp(2rem, 4vw, 2.5rem);
    margin-bottom: ${theme.spacing.md};
  }
`;

const Subtitle = styled(motion.p)`
  color: ${theme.colors.textLight};
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${theme.spacing.xxl};
  font-size: clamp(1.1rem, 1.8vw, 1.3rem);
  line-height: 1.6;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    margin-bottom: ${theme.spacing.xl};
  }
`;

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 800px 300px;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};
  position: relative;
  width: 100%;
  padding-left: 100px;

  @media (max-width: 1400px) {
    grid-template-columns: 250px 600px 250px;
    padding-left: 50px;
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    padding: 0 ${theme.spacing.lg};
    gap: ${theme.spacing.xl};
  }
`;

const FormWrapper = styled(motion.div)`
  grid-column: 2;
  order: 2;
  position: relative;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.large};
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.primary}30;
  box-shadow: 
    0 0 30px rgba(8, 252, 172, 0.1),
    0 0 50px rgba(8, 252, 172, 0.05),
    inset 0 0 30px rgba(8, 252, 172, 0.05);

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: ${theme.borderRadius.large};
    padding: 1px;
    background: linear-gradient(
      45deg,
      ${theme.colors.primary}40,
      transparent,
      ${theme.colors.primary}40,
      transparent
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: ${theme.borderRadius.large};
    background: linear-gradient(
      45deg,
      ${theme.colors.primary}20,
      transparent 40%
    );
    filter: blur(10px);
    opacity: 0.5;
    z-index: -1;
  }

  @media (max-width: 1200px) {
    order: 1;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: ${theme.spacing.xl};
  grid-column: 1;
  justify-self: start;
  width: 300px;
  order: 1;

  @media (max-width: 1400px) {
    width: 250px;
  }

  @media (max-width: 1200px) {
    order: 2;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CardsWrapperRight = styled(CardsWrapper)`
  grid-column: 3;
  justify-self: start;
  order: 3;

  @media (max-width: 1200px) {
    order: 3;
    grid-column: 1;
    justify-self: stretch;
  }
`;

const CardTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: ${theme.spacing.md};
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 200px;
  width: 100%;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 
    0 5px 15px rgba(8, 252, 172, 0.08),
    0 0 30px rgba(8, 252, 172, 0.05),
    inset 0 0 20px rgba(8, 252, 172, 0.05);

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: ${theme.borderRadius.medium};
    padding: 1px;
    background: linear-gradient(
      45deg,
      transparent,
      ${theme.colors.primary}30,
      transparent,
      ${theme.colors.primary}30
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
    transition: opacity 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: ${theme.borderRadius.medium};
    background: linear-gradient(
      45deg,
      ${theme.colors.primary}10,
      transparent 60%
    );
    filter: blur(15px);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: ${theme.colors.primary}60;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 15px 30px rgba(8, 252, 172, 0.15),
      0 0 50px rgba(8, 252, 172, 0.1),
      inset 0 0 20px rgba(8, 252, 172, 0.15);

    &::before {
      opacity: 1;
      background: linear-gradient(
        45deg,
        transparent,
        ${theme.colors.primary}60,
        transparent,
        ${theme.colors.primary}60
      );
    }

    &::after {
      opacity: 0.8;
    }

    ${IconWrapper} {
      transform: scale(1.2);
      background: rgba(8, 252, 172, 0.15);
      box-shadow: 
        0 0 20px ${theme.colors.primary}50,
        0 0 60px ${theme.colors.primary}30,
        inset 0 0 15px rgba(8, 252, 172, 0.2);

      svg {
        color: ${theme.colors.primary};
        filter: drop-shadow(0 0 8px ${theme.colors.primary});
      }
    }

    ${props => props.$isPhone && css`
      ${IconWrapper} {
        animation: ring 1s ease-in-out infinite;
        transform-origin: center;

        svg {
          animation: vibrate 0.3s ease-in-out infinite;
        }
      }

      &::after {
        content: 'Hemen Arayın!';
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.9rem;
        color: ${theme.colors.primary};
        opacity: 0;
        animation: fadeInUp 0.5s ease forwards 0.2s;
      }
    `}

    ${props => props.$isAddress && css`
      ${IconWrapper} {
        animation: bounce 2s ease-in-out infinite;

        svg {
          animation: pulse 2s ease-in-out infinite;
        }
      }

      &::after {
        content: 'Bizi Ziyaret Edin!';
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.9rem;
        color: ${theme.colors.primary};
        opacity: 0;
        animation: fadeInUp 0.5s ease forwards 0.2s;
      }
    `}

    ${props => props.$isEmail && css`
      ${IconWrapper} {
        animation: flyMail 2s ease-in-out infinite;

        svg {
          animation: spin 4s linear infinite;
        }
      }

      &::after {
        content: 'Mail Gönderin!';
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.9rem;
        color: ${theme.colors.primary};
        opacity: 0;
        animation: fadeInUp 0.5s ease forwards 0.2s;
      }
    `}

    ${props => props.$isHours && css`
      ${IconWrapper} {
        animation: float 3s ease-in-out infinite;

        svg {
          animation: clockwise 8s linear infinite;
        }
      }

      &::after {
        content: 'Mesai Saatleri';
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.9rem;
        color: ${theme.colors.primary};
        opacity: 0;
        animation: fadeInUp 0.5s ease forwards 0.2s;
      }
    `}
  }
`;

const ContactInfo = styled.p`
  color: ${theme.colors.textLight};
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
  opacity: 0.8;
`;

const ContactLink = styled.a`
  color: ${theme.colors.textLight};
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: ${theme.colors.primary};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${theme.colors.primary};
    
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const FormGroup = styled.div`
  position: relative;
  
  &.full-width {
    grid-column: 1 / -1;
  }

  svg {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.primary}80;
    font-size: 1.4rem;
    transition: all 0.3s ease;
  }

  &:focus-within svg {
    color: ${theme.colors.primary};
    transform: translateY(-50%) scale(1.1);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  padding-left: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.medium};
  color: #fff;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: ${theme.borderRadius.medium};
    padding: 1px;
    background: linear-gradient(
      45deg,
      transparent,
      ${theme.colors.primary}20,
      transparent
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 
      0 0 30px ${theme.colors.primary}30,
      inset 0 0 10px rgba(8, 252, 172, 0.1);
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 150px;
  line-height: 1.6;
  padding-left: ${theme.spacing.lg};
`;

const FormTitle = styled.h3`
  color: #fff;
  font-size: 2.2rem;
  margin-bottom: ${theme.spacing.xxl};
  font-weight: 600;
  text-align: center;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px ${theme.colors.primary}40;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: linear-gradient(to right, transparent, ${theme.colors.primary}, transparent);
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: ${theme.spacing.xl};
  }
`;

const SubmitButton = styled(motion.button)`
  grid-column: 1 / -1;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  background: linear-gradient(135deg, 
    rgba(8, 252, 172, 0.8),
    rgba(8, 252, 172, 0.6)
  );
  color: #fff;
  border: none;
  border-radius: ${theme.borderRadius.large};
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-top: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  backdrop-filter: blur(5px);
  box-shadow: 
    0 5px 15px rgba(8, 252, 172, 0.1),
    inset 0 0 20px rgba(8, 252, 172, 0.1);

  svg {
    font-size: 1.2rem;
    transition: all 0.4s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: 0.6s;
  }

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, 
      rgba(8, 252, 172, 0.9),
      rgba(8, 252, 172, 0.7)
    );
    box-shadow: 
      0 10px 20px rgba(8, 252, 172, 0.15),
      0 0 20px rgba(8, 252, 172, 0.2),
      inset 0 0 15px rgba(8, 252, 172, 0.1);
    letter-spacing: 1px;

    &::before {
      left: 100%;
    }

    svg {
      transform: translateX(3px) scale(1.1);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xxl};

  @media (max-width: 768px) {
    gap: ${theme.spacing.sm};
  }
`;

const SocialLink = styled.a`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textLight};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-3px);
    background: ${theme.colors.primary}20;
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary}40;
    box-shadow: 0 5px 15px ${theme.colors.primary}30;
  }
`;

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const DecorativeCircle = styled.div`
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    ${theme.colors.primary}10,
    ${theme.colors.primary}20
  );
  filter: blur(80px);
  z-index: 0;
  opacity: 0.5;

  &.top-right {
    top: -200px;
    right: -200px;
  }

  &.bottom-left {
    bottom: -200px;
    left: -200px;
    background: linear-gradient(
      45deg,
      ${theme.colors.primary}20,
      ${theme.colors.primary}10
    );
  }
`;

const FloatingImage = styled(motion.img)`
  position: absolute;
  z-index: 0;
  opacity: 0.1;
  pointer-events: none;

  &.top-right {
    top: 100px;
    right: 5%;
    width: 300px;
    height: auto;
  }

  &.bottom-left {
    bottom: 100px;
    left: 5%;
    width: 250px;
    height: auto;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  position: relative;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const keyframes = css`
  @keyframes ring {
    0%, 100% { transform: rotate(0) scale(1.2); }
    25% { transform: rotate(-15deg) scale(1.3); }
    75% { transform: rotate(15deg) scale(1.3); }
  }

  @keyframes vibrate {
    0%, 100% { transform: translate(0); }
    25% { transform: translate(-2px, 2px); }
    75% { transform: translate(2px, -2px); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0) scale(1.2); }
    50% { transform: translateY(-15px) scale(1.3); }
  }

  @keyframes flyMail {
    0% { transform: translateX(0) rotate(0) scale(1.2); }
    25% { transform: translateX(10px) rotate(10deg) scale(1.3); }
    75% { transform: translateX(-10px) rotate(-10deg) scale(1.3); }
    100% { transform: translateX(0) rotate(0) scale(1.2); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1.2); }
    50% { transform: translateY(-10px) scale(1.3); }
  }

  @keyframes clockwise {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    75% { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(-50%, 10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${keyframes}
`;

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <PageWrapper>
      <GlobalStyle />
      <DecorativeCircle className="top-right" />
      <DecorativeCircle className="bottom-left" />
      
      <FloatingImage
        src="/images/contact/neyys.jpg"
        alt=""
        className="top-right"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <FloatingImage
        src="/images/contact/tech-wave.png"
        alt=""
        className="bottom-left"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Navbar />
      <ContactSection id="iletisim-bilgileri">
        <StyledContainer>
          <Title
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Bizimle İletişime Geçin
          </Title>
          <Subtitle
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Sorularınız için bize ulaşın, en kısa sürede size dönüş yapalım
          </Subtitle>

          <ContactLayout>
            <CardsWrapper>
              <ContactCard
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                $isAddress
                className="contact-card"
                onMouseMove={handleMouseMove}
              >
                <IconWrapper>
                  <FaMapMarkerAlt />
                </IconWrapper>
                <CardTitle>Adres</CardTitle>
                <ContactInfo>
                  İstanbul, Türkiye<br />
                  Merkez Ofis
                </ContactInfo>
              </ContactCard>

              <ContactCard
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                $isPhone
                className="contact-card"
                onMouseMove={handleMouseMove}
              >
                <IconWrapper>
                  <FaPhone />
                </IconWrapper>
                <CardTitle>Telefon</CardTitle>
                <ContactInfo>
                  <ContactLink href="tel:+902121234567">+90 (212) 123 45 67</ContactLink>
                </ContactInfo>
              </ContactCard>
            </CardsWrapper>

            <FormWrapper
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <FormTitle>Bize Ulaşın</FormTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FaUser />
                  <Input type="text" placeholder="Adınız" required />
                </FormGroup>
                <FormGroup>
                  <FaEnvelope />
                  <Input type="email" placeholder="E-posta Adresiniz" required />
                </FormGroup>
                <FormGroup>
                  <FaPhone />
                  <Input type="tel" placeholder="Telefon Numaranız" />
                </FormGroup>
                <FormGroup>
                  <FaTag />
                  <Input type="text" placeholder="Konu" required />
                </FormGroup>
                <FormGroup className="full-width">
                  <TextArea placeholder="Mesajınız" required />
                </FormGroup>
                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPaperPlane style={{ marginRight: '10px' }} />
                  Mesaj Gönder
                </SubmitButton>
              </Form>
            </FormWrapper>

            <CardsWrapperRight>
              <ContactCard
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                $isEmail
                className="contact-card"
                onMouseMove={handleMouseMove}
              >
                <IconWrapper>
                  <FaEnvelope />
                </IconWrapper>
                <CardTitle>E-posta</CardTitle>
                <ContactInfo>
                  <ContactLink href="mailto:info@example.com">info@example.com</ContactLink>
                </ContactInfo>
              </ContactCard>

              <ContactCard
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                $isHours
                className="contact-card"
                onMouseMove={handleMouseMove}
              >
                <IconWrapper>
                  <FaClock />
                </IconWrapper>
                <CardTitle>Çalışma Saatleri</CardTitle>
                <ContactInfo>
                  Pazartesi - Cuma<br />
                  09:00 - 18:00
                </ContactInfo>
              </ContactCard>
            </CardsWrapperRight>
          </ContactLayout>

          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
          </SocialLinks>
        </StyledContainer>
      </ContactSection>
    </PageWrapper>
  );
};

export default ContactPage; 