import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import { 
  FaIndustry, 
  FaHospital, 
  FaBriefcase, 
  FaShoppingCart, 
  FaGraduationCap, 
  FaPlane,
  FaGlobe,
  FaChartLine,
  FaUsers,
  FaCubes,
  FaRocket,
  FaMicrochip,
  FaProjectDiagram,
  FaRegLightbulb,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

const SektorelReferanslarSection = styled.section`
  min-height: 100vh;
  position: relative;
  background: ${theme.colors.background};
  overflow: hidden;
  padding: ${theme.spacing.xxl} 0;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, ${theme.colors.primary}05 0%, transparent 70%);
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.3; }
    50% { opacity: 0.7; }
    100% { opacity: 0.3; }
  }
`;

const HexagonBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.05' fill='%2308fcac'/%3E%3C/svg%3E");
  background-size: 60px 60px;
  opacity: 0.1;
  z-index: 0;
  animation: floatHexagons 60s linear infinite;

  @keyframes floatHexagons {
    from { background-position: 0 0; }
    to { background-position: 60px 60px; }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px ${theme.colors.primary}40;
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
`;

const EcosystemGrid = styled.div`
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

const SectorSphere = styled(motion.div)`
  position: relative;
  background: rgba(10, 10, 10, 0.8);
  border-radius: 30px;
  padding: 3rem 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.primary}15;
  overflow: hidden;
  transition: all 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, ${theme.colors.primary}10, transparent 70%);
    opacity: 0.5;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: conic-gradient(
      from 0deg,
      transparent,
      ${theme.colors.primary}10,
      transparent 60%
    );
    animation: rotate 10s linear infinite;
    z-index: 0;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 50px ${theme.colors.primary}20;

    .sector-icon {
      transform: rotate(360deg) scale(1.2);
    }

    .reference-item {
      transform: translateX(10px);
    }
  }
`;

const SectorHeader = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SectorIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(8, 252, 172, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  box-shadow: 0 0 30px ${theme.colors.primary}20;

  svg {
    font-size: 2rem;
    color: ${theme.colors.primary};
  }

  &.sector-icon {
    transition: transform 0.5s ease;
  }
`;

const SectorInfo = styled.div`
  flex: 1;
`;

const SectorTitle = styled.h3`
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px ${theme.colors.primary}40;
`;

const SectorDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
`;

const ReferenceList = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 2rem;
`;

const ReferenceItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    border-color: ${theme.colors.primary}30;
    background: rgba(8, 252, 172, 0.05);
  }

  &.reference-item {
    transition: transform 0.3s ease;
  }
`;

const ReferenceIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(8, 252, 172, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.2rem;
    color: ${theme.colors.primary};
  }
`;

const ReferenceContent = styled.div`
  flex: 1;
`;

const ReferenceName = styled.h4`
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
`;

const ReferenceDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const sektorelReferanslar = [
  {
    sektor: "Üretim Sektörü",
    icon: FaIndustry,
    aciklama: "Endüstri 4.0 ve akıllı fabrika çözümleriyle üretimde dijital dönüşüm",
    referanslar: [
      {
        isim: "TechCorp Manufacturing",
        proje: "Akıllı Fabrika Dönüşümü",
        etki: "%40 verimlilik artışı",
        icon: FaMicrochip
      },
      {
        isim: "InnovateTR",
        proje: "ERP Entegrasyonu",
        etki: "%35 maliyet tasarrufu",
        icon: FaProjectDiagram
      },
      {
        isim: "SmartFactory",
        proje: "IoT Çözümleri",
        etki: "%50 enerji optimizasyonu",
        icon: FaCubes
      }
    ]
  },
  {
    sektor: "Sağlık Sektörü",
    icon: FaHospital,
    aciklama: "Yapay zeka destekli sağlık teknolojileri ve dijital hasta deneyimi",
    referanslar: [
      {
        isim: "MediTech Hospitals",
        proje: "Dijital Hasta Takibi",
        etki: "%90 hasta memnuniyeti",
        icon: FaUsers
      },
      {
        isim: "HealthCare Plus",
        proje: "Tele-Tıp Platformu",
        etki: "200K+ online konsültasyon",
        icon: FaGlobe
      },
      {
        isim: "DigiHealth",
        proje: "AI Tanı Sistemi",
        etki: "%95 doğruluk oranı",
        icon: FaBriefcase
      }
    ]
  },
  {
    sektor: "Finans Sektörü",
    icon: FaBriefcase,
    aciklama: "Blockchain ve yapay zeka ile geleceğin finans çözümleri",
    referanslar: [
      {
        isim: "FinBank Digital",
        proje: "Dijital Bankacılık",
        etki: "1M+ aktif kullanıcı",
        icon: FaRocket
      },
      {
        isim: "CryptoTR",
        proje: "Blockchain Altyapısı",
        etki: "%99.9 işlem güvenliği",
        icon: FaProjectDiagram
      },
      {
        isim: "PayTech Solutions",
        proje: "Ödeme Sistemleri",
        etki: "10M+ günlük işlem",
        icon: FaChartLine
      }
    ]
  },
  {
    sektor: "E-Ticaret",
    icon: FaShoppingCart,
    aciklama: "Yapay zeka destekli e-ticaret ve pazaryeri çözümleri",
    referanslar: [
      {
        isim: "ShopGlobal",
        proje: "AI Destekli Platform",
        etki: "%300 satış artışı",
        icon: FaGlobe
      },
      {
        isim: "FastCommerce",
        proje: "Omnichannel Sistem",
        etki: "5M+ aylık sipariş",
        icon: FaRocket
      },
      {
        isim: "DigitalBazaar",
        proje: "Pazar Analizi",
        etki: "%85 tahmin başarısı",
        icon: FaChartLine
      }
    ]
  }
];

function SektorelReferanslar() {
  return (
    <SektorelReferanslarSection>
      <HexagonBackground />
      <Container>
        <Content>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Dijital Ekosistemler
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Her sektörde dijital dönüşümün öncüsü olarak, müşterilerimizle birlikte yarattığımız 
            başarı hikayeleri ve sektöre özel çözümlerimiz
          </Subtitle>

          <EcosystemGrid>
            <AnimatePresence>
              {sektorelReferanslar.map((sektor, index) => (
                <SectorSphere
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 
                  }}
                >
                  <SectorHeader>
                    <SectorIcon className="sector-icon">
                      <sektor.icon />
                    </SectorIcon>
                    <SectorInfo>
                      <SectorTitle>{sektor.sektor}</SectorTitle>
                      <SectorDescription>{sektor.aciklama}</SectorDescription>
                    </SectorInfo>
                  </SectorHeader>

                  <ReferenceList>
                    {sektor.referanslar.map((referans, i) => (
                      <ReferenceItem 
                        key={i}
                        className="reference-item"
                        whileHover={{ x: 10 }}
                      >
                        <ReferenceIcon>
                          <referans.icon />
                        </ReferenceIcon>
                        <ReferenceContent>
                          <ReferenceName>{referans.isim}</ReferenceName>
                          <ReferenceDetails>
                            <span>
                              <FaRegLightbulb />
                              {referans.proje}
                            </span>
                            <span>
                              <FaCheckCircle />
                              {referans.etki}
                            </span>
                          </ReferenceDetails>
                        </ReferenceContent>
                        <FaArrowRight style={{ color: theme.colors.primary, opacity: 0.5 }} />
                      </ReferenceItem>
                    ))}
                  </ReferenceList>
                </SectorSphere>
              ))}
            </AnimatePresence>
          </EcosystemGrid>
        </Content>
      </Container>
    </SektorelReferanslarSection>
  );
}

export default SektorelReferanslar; 