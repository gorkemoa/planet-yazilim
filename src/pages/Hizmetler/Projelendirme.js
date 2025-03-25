import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaChartLine, FaRocket, FaCog, FaHeadset, FaChartBar, FaCheck, FaArrowRight, FaPlay } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyles';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  perspective: 1000px;
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 0;
  background: url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80') center/cover;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
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
  font-size: 6rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  color: #fff;

  span {
    display: block;
    color: ${theme.colors.primary};
    font-size: 8rem;
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

const HeroRight = styled(motion.div)`
  position: relative;
  height: 600px;
  perspective: 1000px;
`;

const FloatingCard = styled(motion.div)`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(8, 252, 172, 0.2);
  border-radius: 20px;
  padding: 2rem;
  width: 300px;
  box-shadow: 0 20px 40px rgba(8, 252, 172, 0.1);

  h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
  }

  &:nth-child(1) {
    top: 0;
    left: 0;
    transform: rotate(-15deg);
  }

  &:nth-child(2) {
    top: 50%;
    right: 0;
    transform: rotate(15deg);
  }

  &:nth-child(3) {
    bottom: 0;
    left: 20%;
    transform: rotate(5deg);
  }
`;

const VideoButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: transparent;
  border: 2px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background: ${theme.colors.primary};
    color: #000;
  }
`;

const FeaturesSection = styled.div`
  position: relative;
  padding: 8rem 0;
  background: ${theme.colors.background};
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, ${theme.colors.background});
  }
`;

const FeaturesTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
`;

const TabButton = styled(motion.button)`
  background: ${({ active }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active }) => active ? '#000' : '#fff'};
  border: 1px solid ${({ active }) => active ? 'transparent' : theme.colors.primary};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) => !active && 'rgba(8, 252, 172, 0.1)'};
  }
`;

const FeatureContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const featureImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
];

const FeatureImage = styled(motion.div)`
  position: relative;
  height: 500px;
  background: url(${props => featureImages[props.index]}) center/cover;
  border-radius: 30px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(8, 252, 172, 0.2), transparent);
  }
`;

const FeatureInfo = styled.div`
  h2 {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    color: #fff;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;

  svg {
    color: ${theme.colors.primary};
  }
`;

const StatsSection = styled.div`
  padding: 8rem 0;
  background: url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80') center/cover;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 30px;
  border: 1px solid rgba(8, 252, 172, 0.1);
  position: relative;
  overflow: hidden;

  h3 {
    font-size: 4rem;
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(8, 252, 172, 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CTASection = styled.div`
  padding: 8rem 0;
  text-align: center;
  background: url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') center/cover;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
  }
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled(motion.h2)`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: #fff;
  font-weight: bold;
`;

const CTAButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: #000;
  border: none;
  padding: 1.5rem 4rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const features = [
  {
    title: "Müşteri İlişkileri",
    description: "Müşterilerinizle olan ilişkilerinizi güçlendirin ve müşteri deneyimini en üst seviyeye çıkarın.",
    items: [
      "360° Müşteri Görünümü",
      "Otomatik Müşteri Segmentasyonu",
      "Kişiselleştirilmiş İletişim",
      "Müşteri Yolculuğu Takibi"
    ]
  },
  {
    title: "Satış Yönetimi",
    description: "Satış süreçlerinizi otomatikleştirin ve satış ekibinizin performansını artırın.",
    items: [
      "Akıllı Lead Skorlama",
      "Satış Tahminleme",
      "Fırsat Yönetimi",
      "Satış Otomasyonu"
    ]
  },
  {
    title: "Pazarlama Araçları",
    description: "Pazarlama kampanyalarınızı optimize edin ve dönüşüm oranlarınızı yükseltin.",
    items: [
      "Çok Kanallı Pazarlama",
      "Kampanya Otomasyonu",
      "A/B Testleri",
      "ROI Analizi"
    ]
  }
];

const stats = [
  { number: "500+", label: "Aktif Müşteri" },
  { number: "%40", label: "Verimlilik Artışı" },
  { number: "%99", label: "Müşteri Memnuniyeti" },
  { number: "24/7", label: "Teknik Destek" }
];

function Projelendirme() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PageContainer>
      <HeroSection>
        <Container>
          <HeroContent>
            <HeroLeft>
              <Title
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Akıllı
                <span>CRM</span>
                Çözümleri
              </Title>
              <Subtitle
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Yapay zeka destekli CRM çözümlerimizle müşterilerinizi daha iyi tanıyın,
                satışlarınızı artırın ve işletmenizi geleceğe taşıyın.
              </Subtitle>
              <VideoButton
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay /> Tanıtım Videosunu İzle
              </VideoButton>
            </HeroLeft>
            <HeroRight
              initial={{ opacity: 0, rotateY: -30 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1 }}
            >
              <FloatingCard
                animate={{
                  y: [0, -20, 0],
                  rotateZ: [-15, -10, -15],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <h3>Müşteri Analizi</h3>
                <p>Müşteri davranışlarını analiz edin</p>
              </FloatingCard>
              <FloatingCard
                animate={{
                  y: [0, 20, 0],
                  rotateZ: [15, 10, 15],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <h3>Satış Takibi</h3>
                <p>Satış performansınızı artırın</p>
              </FloatingCard>
              <FloatingCard
                animate={{
                  y: [0, -15, 0],
                  rotateZ: [5, 0, 5],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <h3>Otomasyon</h3>
                <p>İş süreçlerinizi otomatikleştirin</p>
              </FloatingCard>
            </HeroRight>
          </HeroContent>
        </Container>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <FeaturesTabs>
            {features.map((feature, index) => (
              <TabButton
                key={index}
                active={activeTab === index}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {feature.title}
              </TabButton>
            ))}
          </FeaturesTabs>

          <AnimatePresence mode="wait">
            <FeatureContent
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FeatureInfo>
                <h2>{features[activeTab].title}</h2>
                <p>{features[activeTab].description}</p>
                <FeatureList>
                  {features[activeTab].items.map((item, index) => (
                    <FeatureItem key={index}>
                      <FaCheck /> {item}
                    </FeatureItem>
                  ))}
                </FeatureList>
              </FeatureInfo>
              <FeatureImage index={activeTab} />
            </FeatureContent>
          </AnimatePresence>
        </Container>
      </FeaturesSection>

      <StatsSection>
        <Container>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </StatCard>
            ))}
          </StatsGrid>
        </Container>
      </StatsSection>

      <CTASection>
        <Container>
          <CTAContent>
            <CTATitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Geleceğe Hazır Mısınız?
            </CTATitle>
            <CTAButton
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ücretsiz Demo İste <FaArrowRight />
            </CTAButton>
          </CTAContent>
        </Container>
      </CTASection>
    </PageContainer>
  );
}

export default Projelendirme; 