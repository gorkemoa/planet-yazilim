import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaProjectDiagram,
  FaCogs,
  FaChartPie,
  FaClipboardCheck,
  FaUsers,
  FaRocket,
  FaChartLine,
  FaLightbulb
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  padding: 120px 0;
  color: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  background: linear-gradient(to right, #08FCA8, #4158D0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ProcessTimeline = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 100px auto;
  padding: 40px 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #08FCA8, transparent);
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.$isEven ? 'flex-start' : 'flex-end'};
  padding: 40px;
  width: 50%;
  position: relative;
  margin-left: ${props => props.$isEven ? '50%' : '0'};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.$isEven ? 'left: -6px' : 'right: -6px'};
    width: 12px;
    height: 12px;
    background: #08FCA8;
    border-radius: 50%;
    transform: translateY(-50%);
  }
`;

const TimelineContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  max-width: 450px;
  border: 1px solid rgba(8, 252, 172, 0.1);
  backdrop-filter: blur(10px);
  
  &:hover {
    border-color: #08FCA8;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(8, 252, 172, 0.1);
  }
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, rgba(8, 252, 172, 0.1), rgba(65, 88, 208, 0.1));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    font-size: 1.5rem;
    color: #08FCA8;
  }
`;

const ProcessTitle = styled.h3`
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 15px;
`;

const ProcessDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 20px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  &:before {
    content: "•";
    color: #08FCA8;
    margin-right: 10px;
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 80px;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(8, 252, 172, 0.1);

  &:hover {
    border-color: #08FCA8;
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #08FCA8;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
`;

const processes = [
  {
    icon: FaProjectDiagram,
    title: "Süreç Analizi",
    description: "Mevcut iş süreçlerinizi detaylı olarak analiz eder, verimliliği artıracak fırsatları belirleriz.",
    features: [
      "İş akışı haritalama",
      "Darboğaz analizi",
      "Performans ölçümü",
      "İyileştirme önerileri"
    ]
  },
  {
    icon: FaCogs,
    title: "Süreç Otomasyonu",
    description: "Manuel işlemleri otomatikleştirerek zaman ve kaynak tasarrufu sağlarız.",
    features: [
      "İş akışı otomasyonu",
      "Doküman yönetimi",
      "Onay süreçleri",
      "Entegrasyon çözümleri"
    ]
  },
  {
    icon: FaChartPie,
    title: "Süreç Optimizasyonu",
    description: "Verimliliği artırmak için süreçleri optimize eder, maliyetleri düşürürüz.",
    features: [
      "Süreç sadeleştirme",
      "Kaynak optimizasyonu",
      "Maliyet analizi",
      "Verimlilik artırma"
    ]
  },
  {
    icon: FaClipboardCheck,
    title: "Kalite Yönetimi",
    description: "Süreç kalitesini sürekli izler ve iyileştiririz.",
    features: [
      "Kalite kontrol",
      "Hata önleme",
      "Süreç standardizasyonu",
      "Sürekli iyileştirme"
    ]
  }
];

const stats = [
  {
    number: "40%",
    label: "Operasyonel Verimlilik Artışı"
  },
  {
    number: "60%",
    label: "Süreç Maliyetlerinde Azalma"
  },
  {
    number: "85%",
    label: "Müşteri Memnuniyeti"
  },
  {
    number: "50%",
    label: "Daha Hızlı Süreç Tamamlama"
  }
];

function IsSurecleri() {
  return (
    <PageContainer>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            İş Süreçleri Yönetimi
          </Title>
          <Description
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            İş süreçlerinizi optimize ederek verimliliği artırıyor, maliyetleri düşürüyor
            ve rekabet avantajı sağlıyoruz. Modern teknolojiler ile süreçlerinizi
            dijitalleştiriyoruz.
          </Description>
        </Header>

        <ProcessTimeline>
          {processes.map((process, index) => (
            <TimelineItem
              key={index}
              $isEven={index % 2 === 0}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <TimelineContent>
                <IconBox>
                  <process.icon />
                </IconBox>
                <ProcessTitle>{process.title}</ProcessTitle>
                <ProcessDescription>{process.description}</ProcessDescription>
                <FeatureList>
                  {process.features.map((feature, idx) => (
                    <FeatureItem key={idx}>{feature}</FeatureItem>
                  ))}
                </FeatureList>
              </TimelineContent>
            </TimelineItem>
          ))}
        </ProcessTimeline>

        <StatsSection>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsSection>
      </Container>
    </PageContainer>
  );
}

export default IsSurecleri; 