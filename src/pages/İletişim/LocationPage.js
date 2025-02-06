import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import Container from '../../components/common/Container';
import { theme } from '../../styles/GlobalStyles';
import { FaMapMarkerAlt, FaBuilding, FaParking, FaSubway, FaBus, FaCar, FaPlane } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 30%, ${theme.colors.primary}15 0%, transparent 70%),
      radial-gradient(circle at 80% 70%, ${theme.colors.primary}10 0%, transparent 50%);
    pointer-events: none;
  }
`;

const LocationSection = styled.section`
  min-height: calc(100vh - 80px);
  padding: ${theme.spacing.xl} 0;
  padding-top: 100px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xxl};
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const InfoSide = styled(motion.div)`
  flex: 1;
  max-width: 500px;

  @media (max-width: 1024px) {
    max-width: 100%;
    text-align: center;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  background: linear-gradient(135deg, #fff 0%, ${theme.colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.2;
  font-weight: 800;
`;

const MapSide = styled(motion.div)`
  flex: 1.2;
  position: relative;
  height: 600px;
  
  @media (max-width: 1024px) {
    width: 100%;
    height: 400px;
  }
`;

const MapContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: ${theme.borderRadius.large};
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 50px ${theme.colors.primary}20;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(135deg, ${theme.colors.primary}50, transparent);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const InfoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
  
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${theme.colors.textLight};

  svg {
    color: ${theme.colors.primary};
    font-size: 1.5rem;
  }
`;

const LocationPage = memo(() => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <PageWrapper>
      <Navbar />
      <LocationSection>
        <Container>
          <ContentWrapper
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <InfoSide variants={itemVariants}>
              <Title variants={itemVariants}>
                Merkez Ofisimize Hoş Geldiniz
              </Title>
              <motion.p
                variants={itemVariants}
                style={{ color: theme.colors.textLight, marginBottom: theme.spacing.xl }}
              >
                Modern ve teknolojik altyapımız ile hizmetinizdeyiz. Bize kolayca ulaşabilirsiniz.
              </motion.p>

              <InfoCard variants={itemVariants}>
                <ContactItem variants={itemVariants}>
                  <FaBuilding />
                  <div>
                    <strong>Adres</strong>
                    <p>İstanbul, Şişli<br />19 Mayıs Mah. Büyükdere Cad.</p>
                  </div>
                </ContactItem>

                <ContactItem variants={itemVariants}>
                  <FaSubway />
                  <div>
                    <strong>Ulaşım</strong>
                    <p>Metro: 5 dk<br />Otobüs: 2 dk</p>
                  </div>
                </ContactItem>

                <ContactItem variants={itemVariants}>
                  <FaParking />
                  <div>
                    <strong>Otopark</strong>
                    <p>Ücretsiz kapalı otopark</p>
                  </div>
                </ContactItem>
              </InfoCard>
            </InfoSide>

            <MapSide variants={itemVariants}>
              <MapContainer
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.232738526323!2d28.97913611744384!3d41.04590900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a24975fe5d%3A0x4f76cf3d4e41c9a1!2sIstanbul%2C%20Turkey!5e0!3m2!1sen!2s!4v1631234567890!5m2!1sen!2s" 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Ofis Konumu"
                />
              </MapContainer>
            </MapSide>
          </ContentWrapper>
        </Container>
      </LocationSection>
    </PageWrapper>
  );
});

LocationPage.displayName = 'LocationPage';

export default LocationPage; 