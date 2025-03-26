import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FaArrowRight, 
  FaStar, 
  FaCalendar, 
  FaRocket,
  FaChartLine,
  FaCog,
  FaGlobe,
  FaLock,
  FaMobile,
  FaCloud,
  FaBrain,
  FaSearch
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';

const PageWrapper = styled(motion.div)`
  padding: 120px 0;
  min-height: 100vh;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const GlowingBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
    ${theme.colors.primary}10 0%,
    transparent 50%);
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const ShiningTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    #4FD1C5 25%,
    ${theme.colors.primary} 50%,
    #4FD1C5 75%,
    ${theme.colors.primary} 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchBar = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  position: relative;

  input {
    width: 100%;
    padding: 1rem 1.5rem;
    padding-left: 3rem;
    border-radius: 50px;
    border: 1px solid ${theme.colors.primary}30;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px ${theme.colors.primary}30;
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.primary};
    font-size: 1.2rem;
  }
`;

const ProductList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ProductCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 400px 1fr;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.primary}20;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 25px;
    padding: 1px;
    background: linear-gradient(
      45deg,
      ${theme.colors.primary}50,
      transparent,
      ${theme.colors.primary}50
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const ProductImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    min-height: 300px;
  }
`;

const ProductContent = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h3`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: ${theme.colors.primary};
  }
`;

const ReleaseDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.primary};
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background: ${theme.colors.primary}20;
  border: 1px solid ${theme.colors.primary}40;

  svg {
    font-size: 1rem;
  }
`;

const ProductDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.colors.primary}20;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: visible;

  svg {
    color: ${theme.colors.primary};
    font-size: 1.2rem;
    min-width: 20px;
  }

  span {
    color: #fff;
    font-size: 1rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${theme.colors.primary}50;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

    .tooltip {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translate(-50%, -10px);
  background: ${theme.colors.primary};
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #000;
  width: 110%;
  min-width: 250px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: ${theme.colors.primary} transparent transparent transparent;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;

  button {
    flex: 1;
    padding: 1rem 2rem;
  }
`;

const ProductBadge = styled(motion.div)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  padding: 0.5rem 1rem;
  background: ${theme.colors.primary};
  color: #000;
  border-radius: 50px;
  font-weight: bold;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  svg {
    font-size: 1rem;
  }
`;

const featureIcons = {
  'AI': FaBrain,
  'Cloud': FaCloud,
  'Mobile': FaMobile,
  'Security': FaLock,
  'Global': FaGlobe,
  'Performance': FaChartLine,
  'Integration': FaCog,
  'Automation': FaRocket
};

const YeniUrunler = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const products = [
    {
      id: 1,
      title: 'AI Destekli CPQ',
      icon: FaBrain,
      badge: 'Yeni',
      description: 'CPQ (Configure, Price, Quote) çözümleri, teklif oluşturma süreçlerini hızlandırırken, WhatsApp entegrasyonu ile satış ekiplerine daha hızlı ve etkili bir iletişim imkânı sunar.',
      image: 'https://cdn.pixabay.com/photo/2022/01/21/00/35/whatsapp-icon-6953523_1280.jpg',
      releaseDate: '2024 Q1',
      features: [
        { 
          icon: 'AI', 
          text: 'Anında Teklif Paylaşımı',
          description: 'Müşterilere özel teklifler, doğrudan WhatsApp üzerinden PDF veya mesaj formatında iletilebilir.'
        },
        { 
          icon: 'Automation', 
          text: 'Hızlı Onay ve Geri Bildirim',
          description: 'Müşteriler, teklifleri anında inceleyerek sorularını WhatsApp üzerinden sorabilir ve hızlı karar verebilir.'
        },
        { 
          icon: 'Performance', 
          text: 'Otomatik Bildirimler',
          description: 'Teklif durumu, ödeme hatırlatmaları veya sipariş onayları otomatik WhatsApp mesajlarıyla iletilir.'
        },
        { 
          icon: 'Global', 
          text: 'Raporlama Deneyimi',
          description: 'Kişiselleştirilmiş mesajlar ve chatbot desteğiyle raporlama sürecini kolaylaştırır.'
        }
      ]
    }
  ];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GlowingBackground
        style={{
          '--x': `${mousePosition.x}%`,
          '--y': `${mousePosition.y}%`
        }}
      />
      <Container>
        <HeaderSection>
          <ShiningTitle
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            Yeni Ürünlerimiz
          </ShiningTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Subtitle>
              En son teknolojilerle geliştirdiğimiz yenilikçi ürünlerimizi keşfedin.
              Geleceğin çözümleri bugün burada.
            </Subtitle>
          </motion.div>
          <SearchBar>
            <FaSearch />
            <motion.input
              type="text"
              placeholder="Yeni ürünlerde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </SearchBar>
        </HeaderSection>

        <ProductList>
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                as={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: index * 0.2 }}
              >
                <ProductImage
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={product.image} alt={product.title} />
                </ProductImage>
                <ProductContent>
                  <ProductHeader>
                    <ProductInfo>
                      <ProductTitle>
                        <product.icon />
                        {product.title}
                      </ProductTitle>
                      <ReleaseDate>
                        <FaCalendar />
                        {product.releaseDate}
                      </ReleaseDate>
                    </ProductInfo>
                  </ProductHeader>
                  <ProductDescription>{product.description}</ProductDescription>
                  <Features>
                    {product.features.map((feature, index) => {
                      const Icon = featureIcons[feature.icon];
                      return (
                        <Feature
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Icon />
                          <span>{feature.text}</span>
                          <Tooltip className="tooltip">
                            {feature.description}
                          </Tooltip>
                        </Feature>
                      );
                    })}
                  </Features>
                  <ActionButtons>
                    <Button variant="primary">
                      Detaylı Bilgi <FaArrowRight />
                    </Button>
                    <Button variant="secondary">
                      Beta Başvurusu <FaRocket />
                    </Button>
                  </ActionButtons>
                  <ProductBadge
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <FaRocket />
                    {product.badge}
                  </ProductBadge>
                </ProductContent>
              </ProductCard>
            ))}
          </AnimatePresence>
        </ProductList>
      </Container>
    </PageWrapper>
  );
};

export default YeniUrunler; 