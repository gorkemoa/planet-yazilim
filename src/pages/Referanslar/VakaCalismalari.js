import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import { 
  FaChartLine, 
  FaClock, 
  FaCheckCircle, 
  FaIndustry, 
  FaLightbulb, 
  FaRocket,
  FaCode,
  FaDatabase,
  FaCogs,
  FaServer,
  FaNetworkWired,
  FaBrain,
  FaRobot,
  FaChartBar,
  FaUserCog,
  FaShieldAlt
} from 'react-icons/fa';

const VakaCalismalariSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  min-height: 100vh;
  position: relative;
  background: ${theme.colors.background};
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.8)),
      url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    z-index: 0;
  }
`;

const DigitalGrid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(${theme.colors.primary}10 1px, transparent 1px),
    linear-gradient(90deg, ${theme.colors.primary}10 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.1;
  z-index: 1;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: center top;
  animation: gridMove 20s linear infinite;

  @keyframes gridMove {
    from { transform: perspective(500px) rotateX(60deg) translateY(0); }
    to { transform: perspective(500px) rotateX(60deg) translateY(50px); }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px ${theme.colors.primary}40;
`;

const Description = styled(motion.p)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
`;

const TimelineContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

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

const CaseStudyCard = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.$isEven ? 'flex-start' : 'flex-end'};
  padding: 2rem 0;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 60px;
  }
`;

const CaseContent = styled.div`
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

    .tech-icon {
      transform: rotate(360deg);
    }
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

const TechStack = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const TechIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(8, 252, 172, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  
  svg {
    font-size: 1.2rem;
    color: ${theme.colors.primary};
  }

  &.tech-icon {
    transition: transform 0.5s ease;
  }
`;

const CompanyName = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(8, 252, 172, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 20px;
  }
`;

const StageContainer = styled.div`
  margin: 2rem 0;
`;

const StageTitle = styled.h4`
  color: ${theme.colors.primary};
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StageContent = styled.div`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${theme.colors.primary}30;
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
  padding: 0.8rem 0;
  color: #fff;
  border-bottom: 1px solid ${theme.colors.primary}20;

  &:last-child {
    border-bottom: none;
  }

  svg {
    color: ${theme.colors.primary};
  }
`;

const caseStudies = [
  {
    company: "TechCorp Manufacturing",
    projectType: "Endüstri 4.0 Dönüşümü",
    icon: FaIndustry,
    duration: "8 ay",
    sector: "Üretim",
    techStack: [FaRobot, FaDatabase, FaNetworkWired, FaBrain],
    stages: {
      challenge: {
        title: "Zorluk",
        content: "Geleneksel üretim süreçleri verimsizdi ve gerçek zamanlı izleme yapılamıyordu. Kalite kontrol süreçleri manuel yürütülüyor, bu da hatalara ve gecikmelere neden oluyordu."
      },
      solution: {
        title: "Çözüm Yolculuğu",
        content: "IoT sensörleri, yapay zeka destekli analitik ve bulut tabanlı izleme sistemi entegrasyonu. Üretim hatlarına akıllı sensörler yerleştirildi, veri toplama ve analiz altyapısı kuruldu."
      },
      implementation: {
        title: "Uygulama Süreci",
        content: "Aşamalı geçiş stratejisi ile minimum kesinti hedeflendi. Pilot hat seçildi, başarı sonrası diğer hatlar dönüştürüldü. Çalışanlar için kapsamlı eğitim programı uygulandı."
      }
    },
    results: [
      "Üretim verimliliğinde %40 artış",
      "Enerji tüketiminde %25 azalma",
      "Bakım maliyetlerinde %35 tasarruf",
      "Kalite kontrol süreçlerinde %90 otomasyon"
    ]
  },
  {
    company: "FinTech Solutions",
    projectType: "Dijital Bankacılık Platformu",
    icon: FaRocket,
    duration: "12 ay",
    sector: "Finans",
    techStack: [FaShieldAlt, FaServer, FaCode, FaDatabase],
    stages: {
      challenge: {
        title: "Zorluk",
        content: "Geleneksel bankacılık sistemleri dijital çağın gereksinimlerini karşılayamıyordu. Müşteri deneyimi zayıftı ve işlem süreleri uzundu."
      },
      solution: {
        title: "Çözüm Yolculuğu",
        content: "Blockchain tabanlı, güvenli ve ölçeklenebilir dijital bankacılık platformu geliştirildi. Yapay zeka destekli müşteri hizmetleri entegre edildi."
      },
      implementation: {
        title: "Uygulama Süreci",
        content: "Güvenlik testleri ve sertifikasyon süreçleri tamamlandı. Beta kullanıcıları ile pilot uygulama yapıldı. Aşamalı geçiş stratejisi uygulandı."
      }
    },
    results: [
      "İşlem hacminde %300 artış",
      "Müşteri memnuniyetinde %85 iyileşme",
      "Operasyonel maliyetlerde %45 azalma",
      "Mobil bankacılık kullanımında %200 artış"
    ]
  },
  {
    company: "HealthCare Plus",
    projectType: "Tele-Tıp Sistemi",
    icon: FaLightbulb,
    duration: "6 ay",
    sector: "Sağlık",
    techStack: [FaBrain, FaUserCog, FaChartBar, FaServer],
    stages: {
      challenge: {
        title: "Zorluk",
        content: "Uzaktan hasta takibi ve konsültasyon süreçleri yetersizdi. Pandemi döneminde artan talebi karşılamak gerekiyordu."
      },
      solution: {
        title: "Çözüm Yolculuğu",
        content: "Yapay zeka destekli tele-tıp platformu ve hasta takip sistemi geliştirildi. Giyilebilir cihaz entegrasyonları tamamlandı."
      },
      implementation: {
        title: "Uygulama Süreci",
        content: "KVKK uyumluluğu sağlandı. Doktor ve hasta eğitimleri verildi. Pilot hastane uygulaması yapıldı."
      }
    },
    results: [
      "Hasta memnuniyetinde %90 artış",
      "Randevu süreçlerinde %70 hızlanma",
      "Uzaktan konsültasyon oranında %200 artış",
      "Hasta takip verimliliğinde %80 iyileşme"
    ]
  }
];

function VakaCalismalari() {
  return (
    <VakaCalismalariSection>
      <DigitalGrid />
      <Container>
        <Content>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Dijital Dönüşüm Hikayeleri
          </Title>
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Her başarı hikayesi, benzersiz zorluklar ve yenilikçi çözümlerle dolu bir yolculuktur. 
            İşte müşterilerimizin dijital dönüşüm yolculuklarından öne çıkan başarı hikayeleri.
          </Description>

          <TimelineContainer>
            {caseStudies.map((study, index) => {
              const isEven = index % 2 === 0;
              return (
                <CaseStudyCard
                  key={index}
                  $isEven={isEven}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <TimelineIcon>
                    <study.icon />
                  </TimelineIcon>
                  <CaseContent>
                    <CompanyName>
                      <study.icon />
                      {study.company}
                    </CompanyName>
                    <ProjectInfo>
                      <div>
                        <FaClock />
                        Süre: {study.duration}
                      </div>
                      <div>
                        <FaIndustry />
                        Sektör: {study.sector}
                      </div>
                    </ProjectInfo>

                    <TechStack>
                      {study.techStack.map((Icon, i) => (
                        <TechIcon key={i} className="tech-icon">
                          <Icon />
                        </TechIcon>
                      ))}
                    </TechStack>

                    {Object.entries(study.stages).map(([key, stage]) => (
                      <StageContainer key={key}>
                        <StageTitle>
                          <FaLightbulb />
                          {stage.title}
                        </StageTitle>
                        <StageContent>
                          {stage.content}
                        </StageContent>
                      </StageContainer>
                    ))}

                    <Results>
                      <StageTitle>
                        <FaChartLine />
                        Sonuçlar
                      </StageTitle>
                      {study.results.map((result, i) => (
                        <ResultItem key={i}>
                          <FaCheckCircle />
                          {result}
                        </ResultItem>
                      ))}
                    </Results>
                  </CaseContent>
                </CaseStudyCard>
              );
            })}
          </TimelineContainer>
        </Content>
      </Container>
    </VakaCalismalariSection>
  );
}

export default VakaCalismalari; 