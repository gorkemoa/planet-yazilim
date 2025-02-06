import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import { FaChartLine, FaRocket, FaUsers, FaIndustry, FaLightbulb, FaStar, FaTrophy, FaQuoteLeft } from 'react-icons/fa';

const BasariHikayeleriSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: linear-gradient(180deg, #000000 0%, #000000 100%);
  min-height: 100vh;
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
      radial-gradient(circle at 20% 30%, ${theme.colors.primary}08 0%, transparent 70%),
      radial-gradient(circle at 80% 70%, ${theme.colors.primary}05 0%, transparent 70%);
    z-index: 1;
    animation: pulse 8s ease-in-out infinite alternate;
  }

  @keyframes pulse {
    0% { opacity: 0.3; }
    100% { opacity: 0.7; }
  }
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

const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent,
      ${theme.colors.primary}40,
      ${theme.colors.primary}40,
      transparent
    );
    transform: translateX(-50%);
  }

  @media (max-width: 768px) {
    &::before {
      left: 30px;
    }
  }
`;

const StoryCard = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.$isEven ? 'flex-start' : 'flex-end'};
  padding: 2rem 0;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 80px;
  }
`;

const StoryContent = styled.div`
  width: 45%;
  background: rgba(10, 10, 10, 0.8);
  border-radius: 24px;
  padding: 2rem;
  position: relative;
  border: 1px solid ${theme.colors.primary}15;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 0 30px ${theme.colors.primary}10;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 15px 40px rgba(0, 0, 0, 0.3),
      0 0 50px ${theme.colors.primary}20;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TimelineIcon = styled.div`
  position: absolute;
  left: 50%;
  width: 60px;
  height: 60px;
  background: ${theme.colors.background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${theme.colors.primary}40;
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: 0 0 20px ${theme.colors.primary}30;

  svg {
    font-size: 1.5rem;
    color: ${theme.colors.primary};
  }

  @media (max-width: 768px) {
    left: 30px;
  }
`;

const CompanyName = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1.2rem;
  }
`;

const Quote = styled.div`
  position: relative;
  padding: 1rem 0;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  margin-bottom: 1.5rem;

  svg {
    position: absolute;
    top: 0;
    left: -10px;
    color: ${theme.colors.primary}30;
    font-size: 1.5rem;
  }
`;

const Results = styled.div`
  background: rgba(8, 252, 172, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1.5rem;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.8rem 0;
  color: #fff;

  svg {
    color: ${theme.colors.primary};
  }
`;

const Year = styled.div`
  position: absolute;
  top: -30px;
  ${props => props.$isEven ? 'right: 0;' : 'left: 0;'}
  background: ${theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #000;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 0 20px ${theme.colors.primary}40;
`;

const basariHikayeleri = [
  {
    company: "TechCorp",
    year: "2024",
    icon: FaIndustry,
    quote: "Planet Yazılım'ın yapay zeka destekli çözümleri ile dijital dönüşüm sürecimizi başarıyla tamamladık. Müşteri memnuniyetimiz %95'e yükseldi.",
    results: [
      { icon: FaChartLine, text: "Verimlilik artışı: %60" },
      { icon: FaUsers, text: "Müşteri memnuniyeti: %95" },
      { icon: FaRocket, text: "İşlem hızı: 3 kat artış" }
    ]
  },
  {
    company: "InnovateTR",
    year: "2023",
    icon: FaRocket,
    quote: "Bulut tabanlı ERP sistemleri sayesinde iş süreçlerimizi optimize ettik. Karar verme süreçlerimiz hızlandı ve maliyetlerimiz azaldı.",
    results: [
      { icon: FaChartLine, text: "Maliyet tasarrufu: %40" },
      { icon: FaRocket, text: "Süreç optimizasyonu: %70" },
      { icon: FaIndustry, text: "Üretim verimliliği: %50 artış" }
    ]
  },
  {
    company: "SmartFactory",
    year: "2023",
    icon: FaLightbulb,
    quote: "IoT çözümleri ile üretim süreçlerimizi dijitalleştirdik. Gerçek zamanlı veri analizi sayesinde daha akıllı kararlar alıyoruz.",
    results: [
      { icon: FaIndustry, text: "Üretim maliyeti: %40 düşüş" },
      { icon: FaChartLine, text: "Enerji verimliliği: %35 artış" },
      { icon: FaRocket, text: "Bakım maliyetleri: %45 azalma" }
    ]
  },
  {
    company: "DigitalHealth",
    year: "2022",
    icon: FaTrophy,
    quote: "Yapay zeka destekli sağlık platformumuz ile hasta takip süreçlerimiz tamamen otomatikleşti. Hizmet kalitemiz zirveye ulaştı.",
    results: [
      { icon: FaUsers, text: "Hasta memnuniyeti: %92" },
      { icon: FaRocket, text: "Randevu verimliliği: %80 artış" },
      { icon: FaChartLine, text: "Operasyonel verimlilik: %65 artış" }
    ]
  }
];

function BasariHikayeleri() {
  return (
    <BasariHikayeleriSection>
      <Container>
        <Content>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Başarı Hikayeleri
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dijital Dönüşüm Yolculuğunda Müşterilerimizin Başarı Öyküleri
          </Subtitle>

          <Timeline>
            {basariHikayeleri.map((story, index) => {
              const isEven = index % 2 === 0;
              return (
                <StoryCard
                  key={index}
                  $isEven={isEven}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <TimelineIcon>
                    <story.icon />
                  </TimelineIcon>
                  <StoryContent>
                    <Year $isEven={isEven}>{story.year}</Year>
                    <CompanyName>
                      <FaStar />
                      {story.company}
                    </CompanyName>
                    <Quote>
                      <FaQuoteLeft />
                      <p>{story.quote}</p>
                    </Quote>
                    <Results>
                      {story.results.map((result, i) => (
                        <ResultItem key={i}>
                          <result.icon />
                          <span>{result.text}</span>
                        </ResultItem>
                      ))}
                    </Results>
                  </StoryContent>
                </StoryCard>
              );
            })}
          </Timeline>
        </Content>
      </Container>
    </BasariHikayeleriSection>
  );
}

export default BasariHikayeleri; 