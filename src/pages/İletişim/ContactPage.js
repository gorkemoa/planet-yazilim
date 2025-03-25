import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import Container from '../../components/common/Container';
import { theme } from '../../styles/GlobalStyles';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaLinkedin, FaTwitter, FaInstagram, FaUser, FaTag, FaPaperPlane, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(8, 252, 172, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.textLight};
  font-size: 1.75rem;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 5px 15px rgba(8, 252, 172, 0.05);

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  svg {
    transition: all 0.3s ease;
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
  padding: ${theme.spacing.xl} 0;
  padding-top: 100px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding-top: 80px;
    padding: ${theme.spacing.lg} 0;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: #fff;
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  font-weight: 700;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    margin-bottom: ${theme.spacing.md};
  }
`;

const Subtitle = styled(motion.p)`
  color: ${theme.colors.textLight};
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${theme.spacing.xl};
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.6;
  opacity: 0.9;

  @media (max-width: 768px) {
    margin-bottom: ${theme.spacing.lg};
  }
`;

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: ${theme.spacing.lg};
  width: 100%;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 2fr 1fr;
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FormWrapper = styled(motion.div)`
  grid-column: 2;
  position: relative;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.large};
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.primary}30;
  box-shadow: 0 0 30px rgba(8, 252, 172, 0.1);

  @media (max-width: 1200px) {
    grid-column: 2;
  }

  @media (max-width: 992px) {
    grid-column: 1;
    grid-row: 1;
    order: 1;
  }
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: ${theme.spacing.lg};
  grid-column: 1;

  @media (max-width: 1200px) {
    grid-column: 1;
  }

  @media (max-width: 992px) {
    grid-column: 1;
    grid-row: 2;
    order: 2;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CardsWrapperRight = styled(CardsWrapper)`
  grid-column: 3;

  @media (max-width: 1200px) {
    grid-column: 3;
  }

  @media (max-width: 992px) {
    grid-column: 1;
    grid-row: 3;
    order: 3;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CardTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: ${theme.spacing.sm};
  font-weight: 500;
`;

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: ${theme.colors.primary}60;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 20px rgba(8, 252, 172, 0.15);

    ${IconWrapper} {
      transform: scale(1.1);
      background: rgba(8, 252, 172, 0.15);

      svg {
        color: ${theme.colors.primary};
      }
    }
  }
`;

const ContactInfo = styled.p`
  color: ${theme.colors.textLight};
  line-height: 1.5;
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.8;
`;

const ContactLink = styled.a`
  color: ${theme.colors.textLight};
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.md};
  
  &.full-width {
    grid-column: 1 / -1;
  }

  svg {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.primary}80;
    font-size: 1.2rem;
  }

  &:focus-within svg {
    color: ${theme.colors.primary};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  padding-left: 45px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.medium};
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 15px ${theme.colors.primary}30;
    background: rgba(255, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
  padding-left: ${theme.spacing.lg};
`;

const FormTitle = styled.h3`
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: ${theme.spacing.xl};
  font-weight: 600;
  text-align: center;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: linear-gradient(to right, transparent, ${theme.colors.primary}, transparent);
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: linear-gradient(135deg, 
    rgba(8, 252, 172, 0.8),
    rgba(8, 252, 172, 0.6)
  );
  color: #fff;
  border: none;
  border-radius: ${theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    background: linear-gradient(135deg, 
      rgba(8, 252, 172, 0.9),
      rgba(8, 252, 172, 0.7)
    );
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};

  @media (max-width: 768px) {
    gap: ${theme.spacing.sm};
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textLight};
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-3px);
    background: ${theme.colors.primary}20;
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary}40;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 200px;
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  box-shadow: 0 5px 15px rgba(8, 252, 172, 0.08);

  iframe {
    width: 100%;
    height: 100%;
    min-height: 200px;
    border: 0;
  }
`;

const MapTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: ${theme.spacing.sm};
  font-weight: 500;
  text-align: center;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const fadeInVariants = {
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

const GlobalStyle = createGlobalStyle`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
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
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Bizimle İletişime Geçin
          </Title>
          <Subtitle
            variants={fadeInVariants}
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
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
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
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <FormTitle>Demo Talep</FormTitle>
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
                  <Input type="tel" placeholder="Telefon Numaranız" required />
                </FormGroup>
                <FormGroup>
                  <FaBuilding />
                  <Input type="text" placeholder="Şirket Adı" required />
                </FormGroup>
                <FormGroup>
                  <FaCalendarAlt />
                  <Input type="date" placeholder="Demo Tarihi" required />
                </FormGroup>
                <FormGroup>
                  <FaTag />
                  <Input type="text" placeholder="Konu" required />
                </FormGroup>
                <FormGroup className="full-width">
                  <TextArea placeholder="Talebiniz hakkında detaylar" required />
                </FormGroup>
                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPaperPlane />
                  Demo Talep Et
                </SubmitButton>
              </Form>
            </FormWrapper>

            <CardsWrapperRight>
              <ContactCard
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
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
              
              <MapContainer
                as={motion.div}
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <MapTitle>Konum</MapTitle>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.79327595377!2d28.85175887525192!3d41.005495605755875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1689871148409!5m2!1str!2str" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Konum Haritası"
                />
              </MapContainer>
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