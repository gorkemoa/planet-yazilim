import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FaShoppingCart, FaChartLine, FaMobile, FaGlobe, 
  FaUserFriends, FaCreditCard, FaTruck, FaHeadset,
  FaShoppingBag, FaStore, FaBox, FaRegCreditCard,
  FaRegChartBar, FaMobileAlt, FaRegBell, FaRegLifeRing
} from 'react-icons/fa';

const PageWrapper = styled.div`
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  overflow: hidden;
`;

const HeroSection = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(8, 252, 172, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const FloatingShapes = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Shape = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: linear-gradient(135deg, rgba(8, 252, 172, 0.1), rgba(65, 88, 208, 0.1));
  border-radius: 50%;
  filter: blur(5px);
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const MainTitle = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 30px;
  background: linear-gradient(to right, #08FCA8, #4158D0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(8, 252, 172, 0.3);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SubTitle = styled(motion.p)`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 50px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(8, 252, 172, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: #08FCA8;
    box-shadow: 0 10px 30px rgba(8, 252, 172, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #08FCA8;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
`;

const FeaturesSection = styled.section`
  padding: 100px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, #08FCA8, transparent);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const IconBox = styled.div`
  width: 70px;
  height: 70px;
  background: rgba(8, 252, 172, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  transition: all 0.5s ease;

  svg {
    font-size: 2rem;
    color: #08FCA8;
  }
`;

const FeatureCard = styled(motion.div)`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  padding: 40px 30px;
  overflow: hidden;
  border: 1px solid rgba(8, 252, 172, 0.1);
  transition: all 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(8, 252, 172, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: #08FCA8;
    box-shadow: 0 20px 40px rgba(8, 252, 172, 0.1);

    &::before {
      opacity: 1;
    }

    ${IconBox} {
      transform: scale(1.1) rotate(10deg);
      background: rgba(8, 252, 172, 0.2);
    }
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 1rem;
`;

const ShowcaseSection = styled.section`
  padding: 100px 0;
  position: relative;
  background: rgba(0, 0, 0, 0.3);
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;

const Tab = styled(motion.button)`
  background: ${props => props.active ? 'rgba(8, 252, 172, 0.1)' : 'transparent'};
  border: 2px solid ${props => props.active ? '#08FCA8' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#08FCA8' : 'rgba(255, 255, 255, 0.7)'};
  padding: 15px 30px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: #08FCA8;
    color: #08FCA8;
    transform: translateY(-2px);
  }
`;

const ShowcaseContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 30px;
  padding: 50px;
  border: 1px solid rgba(8, 252, 172, 0.1);
  backdrop-filter: blur(10px);
`;

const ShowcaseTitle = styled.h2`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 20px;
  background: linear-gradient(to right, #08FCA8, #4158D0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ShowcaseDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 30px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const FeatureItem = styled.li`
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;

  &::before {
    content: "→";
    color: #08FCA8;
  }
`;

const stats = [
  { number: "10K+", label: "Aktif E-Ticaret Mağazası" },
  { number: "₺500M+", label: "Aylık İşlem Hacmi" },
  { number: "99.9%", label: "Uptime Garantisi" },
  { number: "24/7", label: "Teknik Destek" }
];

const features = [
  {
    icon: FaStore,
    title: "Hazır E-Ticaret Paketleri",
    description: "Hızlıca online mağazanızı açın, satışa başlayın. Tüm ödeme sistemleri entegre, mobil uyumlu."
  },
  {
    icon: FaShoppingBag,
    title: "Çoklu Mağaza Yönetimi",
    description: "Birden fazla mağazayı tek panelden yönetin. Stok, sipariş ve müşteri yönetimi tek noktada."
  },
  {
    icon: FaBox,
    title: "Entegre Depo Yönetimi",
    description: "Stok takibi, barkod sistemi ve otomatik sipariş yönetimi ile depo süreçlerinizi optimize edin."
  },
  {
    icon: FaRegCreditCard,
    title: "Güvenli Ödeme Sistemleri",
    description: "3D Secure, SSL ve en son güvenlik standartları ile güvenli ödeme altyapısı."
  },
  {
    icon: FaRegChartBar,
    title: "Gelişmiş Raporlama",
    description: "Satış, müşteri, ürün ve kampanya analizleri ile veriye dayalı kararlar alın."
  },
  {
    icon: FaMobileAlt,
    title: "Mobil Uygulama",
    description: "iOS ve Android uygulamaları ile müşterilerinize native mobil deneyimi sunun."
  },
  {
    icon: FaRegBell,
    title: "Pazarlama Araçları",
    description: "E-posta pazarlama, SMS, push bildirim ve sosyal medya entegrasyonları."
  },
  {
    icon: FaRegLifeRing,
    title: "7/24 Destek",
    description: "Canlı destek, ticket sistemi ve uzman ekibimiz ile kesintisiz teknik destek."
  }
];

const showcaseTabs = [
  {
    id: 'dashboard',
    title: 'Yönetim Paneli',
    content: {
      title: 'Güçlü Yönetim Paneli',
      description: 'Tüm e-ticaret operasyonlarınızı tek bir noktadan yönetin. Sezgisel arayüz ve gelişmiş özellikler ile işinizi kolaylaştırın.',
      features: [
        'Drag & Drop sayfa düzenleyici',
        'Gelişmiş ürün varyant yönetimi',
        'Toplu ürün düzenleme',
        'Dinamik fiyatlandırma',
        'Stok ve depo yönetimi',
        'Müşteri segmentasyonu'
      ]
    }
  },
  {
    id: 'mobile',
    title: 'Mobil Deneyim',
    content: {
      title: 'Mobil Öncelikli Tasarım',
      description: 'Mobil kullanıcılar için optimize edilmiş arayüz ve PWA desteği ile native uygulama deneyimi sunun.',
      features: [
        'Progressive Web App (PWA)',
        'Native mobil uygulamalar',
        'Hızlı sayfa yükleme',
        'Offline çalışabilme',
        'Push bildirimler',
        'Mobil ödeme entegrasyonu'
      ]
    }
  },
  {
    id: 'marketing',
    title: 'Pazarlama Araçları',
    content: {
      title: 'Entegre Pazarlama Çözümleri',
      description: 'Müşterilerinize ulaşın, satışlarınızı artırın. Tüm pazarlama kanallarını tek noktadan yönetin.',
      features: [
        'E-posta pazarlama otomasyonu',
        'SMS kampanyaları',
        'Sosyal medya entegrasyonu',
        'Google Shopping entegrasyonu',
        'Affiliate marketing sistemi',
        'Kupon ve indirim yönetimi'
      ]
    }
  }
];

function ETicaret() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <PageWrapper>
      <HeroSection>
        <FloatingShapes>
          {[...Array(20)].map((_, i) => (
            <Shape
              key={i}
              size={Math.random() * 100 + 50}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </FloatingShapes>
        
        <HeroContent style={{ opacity, scale }}>
          <MainTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            E-Ticaret Çözümleri
          </MainTitle>
          <SubTitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Modern ve güvenilir e-ticaret altyapısı ile işletmenizi dijital dünyada büyütün.
            Gelişmiş özellikler ve kullanıcı dostu arayüz ile satışlarınızı artırın.
          </SubTitle>

          <StatsContainer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <StatBox
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatBox>
            ))}
          </StatsContainer>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <IconBox>
                  <feature.icon />
                </IconBox>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </Container>
      </FeaturesSection>

      <ShowcaseSection>
        <Container>
          <TabsContainer>
            {showcaseTabs.map((tab) => (
              <Tab
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.title}
              </Tab>
            ))}
          </TabsContainer>

          <AnimatePresence mode="wait">
            <ShowcaseContent
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ShowcaseTitle>{showcaseTabs.find(t => t.id === activeTab).content.title}</ShowcaseTitle>
              <ShowcaseDescription>
                {showcaseTabs.find(t => t.id === activeTab).content.description}
              </ShowcaseDescription>
              <FeatureList>
                {showcaseTabs.find(t => t.id === activeTab).content.features.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeatureList>
            </ShowcaseContent>
          </AnimatePresence>
        </Container>
      </ShowcaseSection>
    </PageWrapper>
  );
}

export default ETicaret; 