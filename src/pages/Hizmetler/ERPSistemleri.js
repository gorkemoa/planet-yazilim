import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaIndustry, FaClipboardCheck, FaChartPie, FaServer, FaNetworkWired, FaShieldAlt, FaArrowRight, FaPlay, FaCheck } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyles';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 0;
  background: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80') center/cover fixed;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroLeft = styled.div``;

const Title = styled(motion.h1)`
  font-size: 5.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: #fff;

  span {
    display: block;
    color: ${theme.colors.primary};
    font-size: 7rem;
    text-shadow: 4px 4px 0px rgba(8, 252, 172, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 4rem;
    span {
      font-size: 5rem;
    }
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.4rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.8);
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: #000;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(8, 252, 172, 0.3);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.primary};

  &:hover {
    background: ${theme.colors.primary}20;
  }
`;

const HeroRight = styled(motion.div)`
  position: relative;
  height: 600px;
`;

const HeroImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ModulesSection = styled.div`
  position: relative;
  padding: 8rem 0;
  background: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') center/cover fixed;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 4rem;
  color: #fff;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2.5rem;
  margin: 4rem 0;
`;

const ModuleCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 30px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(8, 252, 172, 0.2);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${props => props.bgImage}) center/cover;
    opacity: 0.1;
    transition: all 0.4s ease;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: ${theme.colors.primary};
    
    &::before {
      opacity: 0.2;
      transform: scale(1.1);
    }
  }
`;

const ModuleIcon = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(8, 252, 172, 0.1);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  svg {
    font-size: 3rem;
    color: ${theme.colors.primary};
  }

  ${ModuleCard}:hover & {
    transform: scale(1.1) rotate(-5deg);
    background: rgba(8, 252, 172, 0.2);
  }
`;

const ModuleTitle = styled.h3`
  font-size: 2.2rem;
  color: #fff;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const ModuleDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  position: relative;
  z-index: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-size: 1.1rem;

  svg {
    color: ${theme.colors.primary};
  }
`;

const BenefitsSection = styled.div`
  padding: 8rem 0;
  background: url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') center/cover fixed;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  position: relative;
`;

const BenefitCard = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 30px;
  border: 1px solid rgba(8, 252, 172, 0.1);
  backdrop-filter: blur(10px);

  h3 {
    font-size: 4rem;
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.2rem;
    line-height: 1.6;
  }
`;

const CTASection = styled.div`
  padding: 8rem 0;
  background: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80') center/cover fixed;
  position: relative;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
  }
`;

const CTAContent = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled(motion.h2)`
  font-size: 4rem;
  color: #fff;
  margin-bottom: 2rem;
`;

const modules = [
  {
    icon: <FaIndustry />,
    title: 'Üretim Yönetimi',
    description: 'Üretim süreçlerinizi optimize edin, maliyetleri düşürün ve verimliliği artırın.',
    features: [
      'Üretim Planlama',
      'Kapasite Yönetimi',
      'Kalite Kontrol',
      'Maliyet Takibi'
    ],
    bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
  },
  {
    icon: <FaClipboardCheck />,
    title: 'Stok ve Depo',
    description: 'Stok seviyelerinizi optimize edin, depo operasyonlarınızı otomatikleştirin.',
    features: [
      'Gerçek Zamanlı Stok Takibi',
      'Otomatik Sipariş Yönetimi',
      'Barkod Sistemi',
      'Depo Optimizasyonu'
    ],
    bgImage: 'https://images.unsplash.com/photo-1553413077-190dd305871c'
  },
  {
    icon: <FaChartPie />,
    title: 'Finans Yönetimi',
    description: 'Finansal süreçlerinizi dijitalleştirin, nakit akışınızı optimize edin.',
    features: [
      'Gelir-Gider Takibi',
      'Bütçe Yönetimi',
      'Finansal Raporlama',
      'Maliyet Analizi'
    ],
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
  },
  {
    icon: <FaServer />,
    title: 'İnsan Kaynakları',
    description: 'Çalışan yönetimi, bordro ve performans süreçlerinizi tek platformda yönetin.',
    features: [
      'Personel Yönetimi',
      'Performans Takibi',
      'İzin Yönetimi',
      'Bordro İşlemleri'
    ],
    bgImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d'
  },
  {
    icon: <FaNetworkWired />,
    title: 'Tedarik Zinciri',
    description: 'Tedarik süreçlerinizi optimize edin, maliyetleri düşürün.',
    features: [
      'Tedarikçi Yönetimi',
      'Satın Alma Süreçleri',
      'Lojistik Yönetimi',
      'Tedarik Planlaması'
    ],
    bgImage: 'https://images.unsplash.com/photo-1494961104209-3c223057bd26'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Kalite Yönetimi',
    description: 'Kalite standartlarınızı yükseltin, süreçlerinizi iyileştirin.',
    features: [
      'Kalite Kontrol',
      'Süreç İyileştirme',
      'Denetim Yönetimi',
      'Uygunluk Takibi'
    ],
    bgImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'
  }
];

const benefits = [
  { number: '%35', label: 'Operasyonel Verimlilik Artışı' },
  { number: '%45', label: 'Maliyet Tasarrufu' },
  { number: '%60', label: 'Süreç Otomasyonu' },
];

function ERPSistemleri() {
  return (
    <PageContainer>
      <HeroSection>
        <Container>
          <HeroContent>
            <HeroLeft>
              <Title
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Kurumsal
                <span>ERP</span>
                Sistemleri
              </Title>
              <Subtitle
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                İşletmenizin tüm süreçlerini entegre eden, verimliliği artıran ve
                maliyetleri düşüren kapsamlı ERP çözümlerimizle geleceğe hazır olun.
              </Subtitle>
              <HeroButtons>
                <PrimaryButton
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hemen Başlayın <FaArrowRight />
                </PrimaryButton>
                <SecondaryButton
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay /> Demo İzleyin
                </SecondaryButton>
              </HeroButtons>
            </HeroLeft>
            <HeroRight
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroImage
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3"
                alt="ERP Sistemleri"
              />
            </HeroRight>
          </HeroContent>
        </Container>
      </HeroSection>

      <ModulesSection>
        <Container>
          <SectionTitle
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ERP Modülleri
          </SectionTitle>
          <ModulesGrid>
            {modules.map((module, index) => (
              <ModuleCard
                key={index}
                bgImage={module.bgImage}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ModuleIcon>{module.icon}</ModuleIcon>
                <ModuleTitle>{module.title}</ModuleTitle>
                <ModuleDescription>{module.description}</ModuleDescription>
                <FeaturesList>
                  {module.features.map((feature, i) => (
                    <FeatureItem key={i}>
                      <FaCheck /> {feature}
                    </FeatureItem>
                  ))}
                </FeaturesList>
              </ModuleCard>
            ))}
          </ModulesGrid>
        </Container>
      </ModulesSection>

      <BenefitsSection>
        <Container>
          <SectionTitle
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ERP'nin Faydaları
          </SectionTitle>
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{benefit.number}</h3>
                <p>{benefit.label}</p>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </Container>
      </BenefitsSection>

      <CTASection>
        <Container>
          <CTAContent>
            <CTATitle
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              İşletmenizi Dönüştürmeye Hazır Mısınız?
            </CTATitle>
            <PrimaryButton
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ücretsiz Danışmanlık Alın <FaArrowRight />
            </PrimaryButton>
          </CTAContent>
        </Container>
      </CTASection>
    </PageContainer>
  );
}

export default ERPSistemleri; 