import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlug, FaExchangeAlt, FaCubes, FaTools, FaChartBar, FaShieldAlt } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyles';

const PageContainer = styled.div`
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.background} 0%, #0a1930 100%);
`;

const HeroSection = styled.div`
  position: relative;
  padding: 4rem 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/circuit-board.svg') center/cover;
    opacity: 0.05;
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  color: ${theme.colors.primary};
  margin-bottom: 1.5rem;
  font-weight: 800;
  text-align: center;
  background: linear-gradient(135deg, ${theme.colors.primary}, #00ff9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.8;
`;

const ServicesWrapper = styled.div`
  position: relative;
  margin: 6rem 0;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 30px;
  padding: 3rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(8, 252, 172, 0.1);
  transition: all 0.4s ease;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3rem;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    border-color: ${theme.colors.primary};
    box-shadow: 0 20px 40px rgba(8, 252, 172, 0.15);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(8, 252, 172, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ServiceIcon = styled.div`
  width: 120px;
  height: 120px;
  background: rgba(8, 252, 172, 0.1);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 33px;
    background: linear-gradient(135deg, ${theme.colors.primary}40, transparent);
    z-index: -1;
    transition: opacity 0.4s ease;
    opacity: 0;
  }

  svg {
    font-size: 3.5rem;
    color: ${theme.colors.primary};
    transition: all 0.4s ease;
  }

  ${ServiceCard}:hover & {
    transform: scale(1.1) rotate(-5deg);
    background: rgba(8, 252, 172, 0.2);

    &::after {
      opacity: 1;
    }

    svg {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const ServiceContent = styled.div`
  position: relative;
  z-index: 1;
`;

const ServiceTitle = styled.h3`
  font-size: 2.2rem;
  color: #fff;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FeatureItem = styled.li`
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;

  &::before {
    content: '→';
    color: ${theme.colors.primary};
    font-weight: bold;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const services = [
  {
    icon: <FaPlug />,
    title: 'API Entegrasyonları',
    description: "Modern ve güvenli API entegrasyonları ile sistemlerinizi birbirine bağlıyoruz. RESTful ve GraphQL API'leri ile sorunsuz veri akışı sağlıyoruz.",
    features: [
      'RESTful API Entegrasyonu',
      'GraphQL Implementasyonu',
      'Webhook Yönetimi',
      'API Gateway Çözümleri'
    ]
  },
  {
    icon: <FaExchangeAlt />,
    title: 'Sistem Entegrasyonları',
    description: 'Farklı sistemlerinizi tek bir ekosistemde birleştiriyoruz. Verimli ve kesintisiz iletişim sağlayan entegrasyon çözümleri sunuyoruz.',
    features: [
      'ERP Sistem Entegrasyonu',
      'CRM Entegrasyonu',
      'E-ticaret Entegrasyonları',
      'Ödeme Sistemleri Entegrasyonu'
    ]
  },
  {
    icon: <FaCubes />,
    title: 'Mikroservis Mimarisi',
    description: 'Ölçeklenebilir ve sürdürülebilir mikroservis mimarileri tasarlıyor ve uyguluyoruz. Modern teknolojilerle sistemlerinizi modüler hale getiriyoruz.',
    features: [
      'Mikroservis Tasarımı',
      'Container Orchestration',
      'Service Mesh',
      'Distributed Tracing'
    ]
  },
  {
    icon: <FaTools />,
    title: 'DevOps Entegrasyonu',
    description: "CI/CD pipeline'ları ve DevOps pratikleri ile geliştirme süreçlerinizi otomatikleştiriyoruz. Sürekli entegrasyon ve dağıtım sağlıyoruz.",
    features: [
      'CI/CD Pipeline Kurulumu',
      'Konteynerizasyon',
      'Infrastructure as Code',
      'Monitoring ve Logging'
    ]
  },
  {
    icon: <FaChartBar />,
    title: 'Veri Entegrasyonu',
    description: "Farklı kaynaklardan gelen verilerinizi tek bir noktada topluyoruz. ETL süreçleri ile veri akışınızı optimize ediyoruz.",
    features: [
      'ETL Süreçleri',
      'Data Warehouse Entegrasyonu',
      'Real-time Data Processing',
      'Business Intelligence Tools'
    ]
  },
  {
    icon: <FaShieldAlt />,
    title: 'Güvenlik Entegrasyonları',
    description: 'Sistemlerinizi güvenli bir şekilde entegre ediyoruz. Kimlik doğrulama ve yetkilendirme sistemleri ile güvenliği üst düzeye çıkarıyoruz.',
    features: [
      'SSO Implementasyonu',
      'OAuth/OIDC Entegrasyonu',
      'Security Gateway',
      'Encryption Solutions'
    ]
  }
];

function EntegrasyonHizmetleri() {
  return (
    <PageContainer>
      <HeroSection>
        <Container>
          <Title
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Entegrasyon Hizmetleri
          </Title>
          <Subtitle
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Sistemlerinizi sorunsuz bir şekilde entegre ediyor, iş süreçlerinizi optimize ediyoruz.
            Modern entegrasyon çözümlerimizle dijital dönüşümünüzü hızlandırın.
          </Subtitle>

          <ServicesWrapper>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceContent>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <FeaturesList>
                    {service.features.map((feature, i) => (
                      <FeatureItem key={i}>{feature}</FeatureItem>
                    ))}
                  </FeaturesList>
                </ServiceContent>
              </ServiceCard>
            ))}
          </ServicesWrapper>
        </Container>
      </HeroSection>
    </PageContainer>
  );
}

export default EntegrasyonHizmetleri; 