import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import { 
  FaRocket, FaEye, FaHandshake, FaChartLine, FaUsers, 
  FaLightbulb, FaCubes, FaGlobe, FaCode, FaServer,
  FaMobileAlt, FaDatabase, FaCloud, FaCogs, FaShieldAlt,
  FaAward, FaPlay, FaPause, FaArrowRight
} from 'react-icons/fa';

const PageWrapper = styled.div`
  padding-top: 120px;
  padding-bottom: 0;
  background: linear-gradient(
    135deg,
    ${theme.colors.backgroundDark} 0%,
    #0a1520 50%,
    ${theme.colors.backgroundDark} 100%
  );
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: radial-gradient(
      circle at 50% 0%,
      ${theme.colors.primary}15 0%,
      transparent 70%
    );
    z-index: -1;
    opacity: 0.5;
  }
`;

const IntroSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  margin-bottom: 80px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent,
      ${theme.colors.primary}40,
      transparent
    );
  }
`;

const IntroText = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  color: #fff;

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 25px;
    color: rgba(255, 255, 255, 0.8);
  }

  strong {
    color: ${theme.colors.primary};
    font-weight: 500;
  }
`;

const Title = styled(motion.h1)`
  font-size: ${theme.typography.h1.size};
  font-weight: ${theme.typography.h1.weight};
  color: ${theme.colors.text};
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent,
      ${theme.colors.primary},
      transparent
    );
    border-radius: 2px;
    box-shadow: 0 0 20px ${theme.colors.primary}40;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.textLight};
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.8;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.h2.size};
  font-weight: ${theme.typography.h2.weight};
  color: #fff;
  margin-bottom: 50px;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${theme.gradients.primary};
    border-radius: 2px;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 50px 0;
  position: relative;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: linear-gradient(
    135deg,
    rgba(17, 34, 64, 0.5) 0%,
    rgba(8, 15, 29, 0.5) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.large};
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;

  h3 {
    color: ${theme.colors.text};
    font-size: 1.5rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    color: ${theme.colors.textLight};
    line-height: 1.8;
  }

  svg {
    color: ${theme.colors.primary};
    font-size: 1.8rem;
    filter: drop-shadow(0 2px 4px rgba(8, 252, 172, 0.3));
  }

  &:hover {
    transform: translateY(-5px);
    border-color: ${theme.colors.primary}40;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
                0 0 30px ${theme.colors.primary}20;
  }
`;

const Values = styled.div`
  margin-top: 100px;
  text-align: center;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, ${theme.colors.primary}20, transparent);
  }
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const ValueCard = styled(motion.div)`
  padding: 30px;
  background: ${theme.colors.backgroundAlt}90;
  border-radius: 20px;
  border: 1px solid ${theme.colors.primary}10;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${theme.colors.primary}05, transparent);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover:before {
    transform: translateX(0);
  }

  h4 {
    color: #fff;
    font-size: 1.4rem;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    line-height: 1.6;
  }

  svg {
    color: ${theme.colors.primary};
    font-size: 1.6rem;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin: 80px 0;
  padding: 40px;
  background: linear-gradient(
    135deg,
    rgba(17, 34, 64, 0.7) 0%,
    rgba(8, 15, 29, 0.7) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid ${theme.colors.primary}15;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 20px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid ${theme.colors.primary}10;
  transition: all 0.3s ease;

  h4 {
    font-size: 3rem;
    color: ${theme.colors.primary};
    margin-bottom: 10px;
    font-weight: bold;
    text-shadow: 0 0 20px ${theme.colors.primary}40;
  }

  p {
    color: ${theme.colors.textLight};
    font-size: 1.1rem;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(8, 252, 172, 0.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Quote = styled(motion.div)`
  text-align: center;
  max-width: 900px;
  margin: 100px auto 0;
  padding: 60px;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(17, 34, 64, 0.6) 0%,
    rgba(8, 15, 29, 0.6) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid ${theme.colors.primary}15;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  &:before {
    content: '"';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 8rem;
    color: ${theme.colors.primary}20;
    font-family: serif;
    line-height: 1;
    text-shadow: 0 0 30px ${theme.colors.primary}20;
  }
`;

const QuoteText = styled.p`
  font-size: 1.6rem;
  color: ${theme.colors.text};
  font-style: italic;
  line-height: 1.8;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const QuoteAuthor = styled.p`
  color: ${theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 500;
  text-shadow: 0 0 10px ${theme.colors.primary}40;
`;

const HeroSection = styled.div`
  position: relative;
  padding: 100px 0;
  text-align: center;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(135deg, ${theme.colors.primary}15, transparent);
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    z-index: -1;
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 80px 0;
`;

const TechCard = styled(motion.div)`
  background: linear-gradient(
    135deg,
    rgba(17, 34, 64, 0.7) 0%,
    rgba(8, 15, 29, 0.7) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.large};
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    transition: all 0.5s ease;
    z-index: 0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    z-index: 1;
  }

  h3 {
    position: relative;
    z-index: 2;
    color: ${theme.colors.text};
    font-size: 1.4rem;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  p {
    position: relative;
    z-index: 2;
    color: ${theme.colors.textLight};
    line-height: 1.6;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4),
                0 0 30px ${theme.colors.primary}20;

    &:before {
      transform: scale(1.1);
      opacity: 0.25;
    }
  }
`;

const Achievements = styled.div`
  margin: 100px 0;
  padding: 60px 0;
  background: ${theme.colors.backgroundAlt}50;
  backdrop-filter: blur(10px);
  border-radius: 30px;
  border: 1px solid ${theme.colors.primary}10;
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 40px;
`;

const AchievementCard = styled(motion.div)`
  text-align: center;
  padding: 30px;
  background: ${theme.colors.background}30;
  border-radius: 20px;
  border: 1px solid ${theme.colors.primary}10;
  position: relative;
  overflow: hidden;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    transition: all 0.5s ease;
    z-index: 0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg,
      ${theme.colors.backgroundDark}90,
      transparent
    );
    z-index: 1;
  }

  svg, h4, p {
    position: relative;
    z-index: 2;
  }

  svg {
    font-size: 2.5rem;
    color: ${theme.colors.primary};
    margin-bottom: 20px;
  }

  h4 {
    color: #fff;
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    line-height: 1.6;
  }

  &:hover:before {
    transform: scale(1.1);
    opacity: 0.3;
  }
`;

const technologies = [
  {
    icon: FaCode,
    title: 'Modern Yazılım Geliştirme',
    description: 'En son teknolojileri kullanarak, ölçeklenebilir ve güvenli yazılım çözümleri geliştiriyoruz.'
  },
  {
    icon: FaCloud,
    title: 'Cloud Çözümler',
    description: 'AWS, Azure ve Google Cloud platformlarında optimize edilmiş cloud çözümleri sunuyoruz.'
  },
  {
    icon: FaMobileAlt,
    title: 'Mobil Uygulamalar',
    description: 'iOS ve Android için native ve cross-platform mobil uygulamalar geliştiriyoruz.'
  },
  {
    icon: FaDatabase,
    title: 'Veri Yönetimi',
    description: 'Büyük veri analizi ve yönetimi konusunda uzman çözümler üretiyoruz.'
  },
  {
    icon: FaServer,
    title: 'Sistem Entegrasyonu',
    description: 'Farklı sistemleri sorunsuz bir şekilde entegre ederek iş süreçlerinizi optimize ediyoruz.'
  },
  {
    icon: FaShieldAlt,
    title: 'Güvenlik Çözümleri',
    description: 'En üst düzey güvenlik standartlarıyla sistemlerinizi koruyoruz.'
  }
];

const achievements = [

  {
    icon: FaGlobe,
    title: 'Global Başarı',
    description: '10+ Ülkede Aktif Projeler'
  },
  {
    icon: FaUsers,
    title: 'Müşteri Memnuniyeti',
    description: '%98 Müşteri Memnuniyet Oranı'
  },
  {
    icon: FaCogs,
    title: 'Teknik Uzmanlık',
    description: '20+ Teknoloji Sertifikasyonu'
  }
];

const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: radial-gradient(
    circle at 50% 50%,
    ${theme.colors.primary}08 0%,
    transparent 70%
  );
  animation: pulse 8s ease-in-out infinite;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(8, 252, 172, 0.05) 0%,
      transparent 50%,
      rgba(8, 252, 172, 0.05) 100%
    );
    animation: gradientMove 15s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.5); opacity: 0.1; }
  }

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const FloatingParticle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${theme.colors.primary};
  border-radius: 50%;
  filter: blur(1px);
  box-shadow: 0 0 10px ${theme.colors.primary},
              0 0 20px ${theme.colors.primary}40;
`;

const VideoPreview = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 60px auto;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;

  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: ${theme.colors.primary}80;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    svg {
      font-size: 2rem;
      color: white;
    }

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
      background: ${theme.colors.primary};
    }
  }
`;

const InteractiveCard = styled(motion.div)`
  background: ${theme.gradients.glass};
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.large};
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    opacity: 0.3;
    transition: all 0.5s ease;
    z-index: 0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, 
      ${theme.colors.backgroundDark} 20%, 
      transparent 100%
    );
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
  }

  &:hover {
    &:before {
      transform: scale(1.1);
      opacity: 0.5;
    }

    .content {
      transform: translateY(-10px);
    }
  }

  h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const Footer = styled.div`
  text-align: center;
  padding: 20px 0;
  margin-top: 60px;
  font-size: 0.8rem;
  color: ${theme.colors.textLight};
  opacity: 0.7;
  
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function FirmaHakkinda() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const missionCards = [
    {
      icon: FaRocket,
      title: 'Misyonumuz',
      description: 'İşletmelerin dijital dönüşüm süreçlerinde en yenilikçi ve sürdürülebilir çözümleri sunarak, müşterilerimizin rekabet gücünü artırmak ve iş süreçlerini optimize etmek için çalışıyoruz.',
      bgImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'
    },
    {
      icon: FaEye,
      title: 'Vizyonumuz',
      description: 'Türkiye\'nin ve bölgenin lider kurumsal yazılım ve dijital dönüşüm şirketi olmak, global pazarda söz sahibi bir teknoloji markası haline gelerek dünya standartlarında hizmet sunmak.',
      bgImage: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg'
    },
    {
      icon: FaHandshake,
      title: 'Yaklaşımımız',
      description: 'Müşteri odaklı, yenilikçi ve sürdürülebilir çözümler sunarak, işletmelerin dijital geleceğini şekillendirmek için tutkuyla çalışıyor, her projede mükemmelliği hedefliyoruz.',
      bgImage: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg'
    }
  ];

  const technologiesWithImages = technologies.map((tech, index) => ({
    ...tech,
    bgImage: [
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
      'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg'
    ][index]
  }));

  const achievementsWithImages = achievements.map((achievement, index) => ({
    ...achievement,
    bgImage: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
    ][index]
  }));

  return (
    <PageWrapper>
      <AnimatedBackground />
      {[...Array(20)].map((_, i) => (
        <FloatingParticle
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <IntroSection>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Firma Hakkında
        </Title>
        <Subtitle>
          2009 yılından bu yana KOBİ ve Kamu Kurumlarına yönelik programlar dahilinde kurum ve kuruluşlara 
          ihtiyaçları odaklı olarak çeşitli alanlarda proje hazırlama ve yönetimine yönelik proje sahibi ile 
          koordineli bir çalışma ile profesyonel bir destek sağlamaktadır.
        </Subtitle>

        <VideoPreview
          whileHover={{ scale: 1.02 }}
          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
        >
          <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" alt="Şirket Tanıtım" />
          <div className="play-button">
            {isVideoPlaying ? <FaPause /> : <FaPlay />}
          </div>
        </VideoPreview>

        <IntroText>
          <p>
            Firmamız kurulduğu günden bu yana yüzlerce başarılı projenin hazırlık aşamasından itibaren başarı ile 
            yönetilmesinde müşterileri ile çalışmalarını gerçekleştirmiş olup önceleri sadece proje yazımı ve 
            yönetimi konusunda aktif olarak çalışmakta iken son yıllarda yatırım teşvik belgelendirme hizmetlerine 
            yönelikte aktif olarak danışmanlık hizmeti vermeye başlamıştır.
          </p>
          <p>
            Veri Verde Proje & Danışmanlık olarak "Müşterilerimizin talepleri doğrultusunda, kuruma özel yaklaşımlarla 
            yaptığımız işin sorumluluğunu alarak, hızlı ve doğru projeler üreten, kendi değerlerini keşfetmelerine ve 
            büyümelerine yardımcı olan dürüst ve açık bir yaklaşımla güvenilir bir danışmanlık hizmeti sunmak" misyonumuz 
            olarak belirlenmiş olup "Türkiye geneli danışmanlık firmaları arasında güvenilirlik ve etik değerleri ile ön 
            plana çıkan, inovatif proje fikirleri geliştirip bünyesinde, konusunda uzman kişileri barındıran, firmaların 
            tüm danışmanlık isteklerine cevap vererek hazırlık, takip ve sonuçlandırma noktasında tercih edilen ilk firma 
            olmak" vizyonu benimsenmiştir.
          </p>
          <p>
            Veri Verde Proje & Danışmanlık olarak gizlilik ve kişisel verileri koruma politikası kapsamından hareketle 
            müşterilerimizden aldığımız bilgilerde gizlilik ilkesi ile hareket edilmekte bu kapsamda aynı anda aynı veya 
            farklı sektörlere ilişkin hazırlanan projelerde bilgiler gizli bir şekilde hazırlanarak kurumsal ve kişisel 
            sosyal sorumluluk bilincimizle çözümlerimiz ve kaynaklarımız verimlilik esasına göre kullanılarak emeğe, 
            çevreye duyarlı ve saygılı bir şekilde çalışmalarımız yürütülmektedir.
          </p>
        </IntroText>
      </IntroSection>

      <Container>
        <MainGrid>
          {missionCards.map((item, index) => (
            <InteractiveCard
              key={index}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ '--bg-image': `url(${item.bgImage})` }}
            >
              <div className="content">
                <h3>
                  <item.icon />
                  {item.title}
                </h3>
                <p>{item.description}</p>
              </div>
            </InteractiveCard>
          ))}
        </MainGrid>

        <Stats>
          <StatItem
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4>13+</h4>
            <p>Yıllık Deneyim</p>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4>500+</h4>
            <p>Başarılı Proje</p>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4>50+</h4>
            <p>Uzman Çalışan</p>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4>300+</h4>
            <p>Mutlu Müşteri</p>
          </StatItem>
        </Stats>

        <Values>
          <Title>Teknoloji Çözümlerimiz</Title>
          <TechGrid>
            {technologiesWithImages.map((tech, index) => (
              <TechCard
                key={index}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ '--bg-image': `url(${tech.bgImage})` }}
              >
                <h3>
                  <tech.icon />
                  {tech.title}
                </h3>
                <p>{tech.description}</p>
              </TechCard>
            ))}
          </TechGrid>
        </Values>

        <Achievements>
          <Title>Başarılarımız</Title>
          <AchievementGrid>
            {achievementsWithImages.map((achievement, index) => (
              <AchievementCard
                key={index}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ '--bg-image': `url(${achievement.bgImage})` }}
              >
                <achievement.icon />
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
              </AchievementCard>
            ))}
          </AchievementGrid>
        </Achievements>

        <Values>
          <Title>Değerlerimiz</Title>
          <ValueGrid>
            {[
              {
                title: 'Müşteri Odaklılık',
                description: 'Müşterilerimizin ihtiyaçlarını en iyi şekilde anlayarak, onlara özel çözümler üretiyoruz.',
                icon: FaUsers
              },
              {
                title: 'Yenilikçilik',
                description: 'Teknolojik gelişmeleri yakından takip ederek, en güncel çözümleri sunuyoruz.',
                icon: FaLightbulb
              },
              {
                title: 'Kalite',
                description: 'Her projemizde en yüksek kalite standartlarını gözetiyor, mükemmelliği hedefliyoruz.',
                icon: FaCubes
              },
              {
                title: 'Sürdürülebilirlik',
                description: 'Uzun vadeli başarı için sürdürülebilir ve ölçeklenebilir çözümler geliştiriyoruz.',
                icon: FaChartLine
              },

            ].map((value, index) => (
              <ValueCard
                key={index}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <h4>
                  <value.icon />
                  {value.title}
                </h4>
                <p>{value.description}</p>
              </ValueCard>
            ))}
          </ValueGrid>
        </Values>

        <Quote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <QuoteText>
            "Teknoloji dünyasında başarı, müşterilerinizin başarısıyla ölçülür. 
            Her projede müşterilerimizin başarı hikayesinin bir parçası olmaktan gurur duyuyor,
            geleceğin teknolojilerini bugünden şekillendiriyoruz."
          </QuoteText>
          <QuoteAuthor>Ahmet Yılmaz - CEO & Kurucu</QuoteAuthor>
        </Quote>
      </Container>
      
      <Footer>
        <p>Orbitie planet ürünüdür</p>
      </Footer>
    </PageWrapper>
  );
}

export default FirmaHakkinda; 