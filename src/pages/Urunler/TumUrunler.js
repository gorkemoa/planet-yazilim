import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import { 
  FaSearch, 
  FaInfoCircle, 
  FaDownload,
  FaExternalLinkAlt,
  FaUser,
  FaCogs,
  FaShoppingBasket,
  FaShoppingCart,
  FaProjectDiagram,
  FaFileArchive,
  FaServer,
  FaSellcast,
} from 'react-icons/fa';

const PageWrapper = styled(motion.div)`
  padding: 120px 0;
  min-height: 100vh;
  background: ${theme.colors.background};
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  color: ${theme.colors.text};
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${theme.colors.primary}, #4FD1C5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
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

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const CategoryTab = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  border: none;
  background: ${props => props.active ? theme.colors.primary : 'transparent'};
  color: ${props => props.active ? '#000' : '#fff'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${props => props.active ? 'transparent' : theme.colors.primary}30;

  &:hover {
    background: ${props => props.active ? theme.colors.primary : theme.colors.primary}20;
    transform: translateY(-2px);
  }

  svg {
    font-size: 1rem;
  }
`;

const CategorySection = styled(motion.div)`
  margin-bottom: 4rem;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: ${theme.colors.primary};
  }
`;

const CategoryStats = styled.div`
  display: flex;
  gap: 2rem;
`;

const StatItem = styled.div`
  text-align: center;

  .value {
    color: ${theme.colors.primary};
    font-size: 1.5rem;
    font-weight: bold;
  }

  .label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
  }
`;

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.primary}20;
  position: relative;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);

    .overlay {
      opacity: 1;
    }
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ProductOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(3px);
`;

const OverlayButton = styled.button`
  padding: 0.8rem;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.primary};
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  svg {
    font-size: 1rem;
  }
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ProductFeatures = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FeatureTag = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  font-size: 0.8rem;
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

const ShiningTitle = styled(motion.h1)`
  color: ${theme.colors.text};
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

const FloatingCard = styled(motion.div)`
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 17px;
    padding: 1px;
    background: linear-gradient(
      45deg,
      ${theme.colors.primary}50,
      ${theme.colors.primary}20,
      ${theme.colors.primary}50
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(
      45deg,
      ${theme.colors.primary}50,
      transparent,
      ${theme.colors.primary}50
    );
    filter: blur(10px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const GlowingFeatureTag = styled(motion.span)`
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  font-size: 0.8rem;
  position: relative;
  overflow: hidden;
  border: 1px solid ${theme.colors.primary}40;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      ${theme.colors.primary}30,
      transparent,
      ${theme.colors.primary}30
    );
    border-radius: inherit;
    z-index: -1;
    animation: rotate 3s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const categoryIcons = {
  'CPQ': FaCogs,
  'CRM': FaUser,
  'SATIN ALMA': FaShoppingCart,
  'PROJE YÖNETİMİ': FaProjectDiagram,
  'DOKÜMAN ARŞİVİ': FaFileArchive,
  'NEXUS': FaSellcast,
  'E-PAZAR': FaShoppingBasket,
  'SERVİS(SSH)': FaServer,
};

const TumUrunler = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const productCategories = [
    {
      title: 'CPQ',
      stats: {
        clients: '500+',
        satisfaction: '98%',
        updates: '12/yıl'
      },
      products: [
        {
          id: 1,
          title: 'Netsis 3 Enterprise',
          description: 'Büyük ölçekli işletmeler için kapsamlı ERP çözümü',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
          features: ['Çok Şirketli Yapı', 'Gelişmiş Raporlama', 'API Desteği']
        },
        {
          id: 2,
          title: 'Netsis 3 Standart',
          description: 'Orta ölçekli işletmeler için optimize edilmiş ERP sistemi',
          image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800',
          features: ['Tek Şirket', 'Standart Raporlama', 'Kolay Kullanım']
        },
        {
          id: 3,
          title: 'Netsis 3 Entegre',
          description: 'Küçük ve orta ölçekli işletmeler için entegre çözüm',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
          features: ['Temel Modüller', 'Entegre Çözüm', 'Uygun Maliyet']
        }
      ]
    },
    {
      title: 'CRM',
      stats: {
        clients: '300+',
        satisfaction: '96%',
        updates: '6/yıl'
      },
      products: [
        {
          id: 4,
          title: 'Logo İnsan Kaynakları',
          description: 'Kapsamlı insan kaynakları yönetim sistemi',
          image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800',
          features: ['Personel Yönetimi', 'Bordro', 'Performans Takibi']
        },
        {
          id: 5,
          title: 'Logo CRM',
          description: 'Müşteri ilişkileri yönetimi çözümü',
          image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800',
          features: ['Müşteri Takibi', 'Satış Otomasyonu', 'Raporlama']
        }
      ]
    },
    {
      title: 'E-PAZAR',
      stats: {
        clients: '1000+',
        satisfaction: '99%',
        updates: '24/yıl'
      },
      products: [
        {
          id: 6,
          title: 'E-Logo',
          description: 'Entegre e-dönüşüm platformu',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
          features: ['Tüm E-Belgeler', 'Kolay Entegrasyon', 'GİB Uyumlu']
        },
        {
          id: 7,
          title: 'E-Fatura',
          description: 'Elektronik fatura oluşturma ve yönetim sistemi',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
          features: ['Hızlı Oluşturma', 'Otomatik Gönderim', 'Arşivleme']
        },
        {
          id: 8,
          title: 'E-Defter',
          description: 'Elektronik defter oluşturma ve saklama çözümü',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
          features: ['Yasal Uyumluluk', 'Otomatik Oluşturma', 'Güvenli Saklama']
        },
        {
          id: 9,
          title: 'E-Arşiv',
          description: 'Elektronik belge arşivleme sistemi',
          image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
          features: ['Kolay Erişim', 'Güvenli Depolama', 'Hızlı Arama']
        },
        {
          id: 10,
          title: 'E-İrsaliye',
          description: 'Elektronik irsaliye yönetim sistemi',
          image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=800',
          features: ['Anlık Oluşturma', 'Mobil Erişim', 'Takip Sistemi']
        },
        {
          id: 11,
          title: 'E-Mutabakat',
          description: 'Elektronik mutabakat yönetimi',
          image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800',
          features: ['Otomatik Mutabakat', 'E-posta Bildirimi', 'Raporlama']
        },
        {
          id: 12,
          title: 'E-Ekstre',
          description: 'Elektronik ekstre yönetim sistemi',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
          features: ['Anlık Görüntüleme', 'Otomatik Eşleştirme', 'Detaylı Analiz']
        }
      ]
    },
    {
      title: 'PROJE YÖNETİMİ',
      stats: {
        clients: '200+',
        satisfaction: '95%',
        updates: '4/yıl'
      },
      products: [
        {
          id: 13,
          title: 'Netoloji E-Flow',
          description: 'İş süreçleri yönetimi (BPM) çözümü',
          image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&q=80&w=800',
          features: ['Süreç Tasarımı', 'İş Akışı', 'Performans Analizi']
        },
        {
          id: 14,
          title: 'Contact Software',
          description: 'Ürün yaşam döngüsü yönetimi (PLM) yazılımı',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
          features: ['Ürün Tasarımı', 'Versiyon Kontrolü', 'Ekip İşbirliği']
        },
        {
          id: 15,
          title: 'Logo Mind Insight',
          description: 'İş zekası ve analitik çözümü',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
          features: ['Veri Analizi', 'Dashboard', 'Özel Raporlar']
        }
      ]
    },
    {
      title: 'DOKÜMAN ARŞİVİ',
      stats: {
        clients: '150+',
        satisfaction: '97%',
        updates: '8/yıl'
      },
      products: [
        {
          id: 16,
          title: 'FS Depo',
          description: 'Depo yönetim sistemi (WMS)',
          image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800',
          features: ['Stok Takibi', 'Barkod Sistemi', 'Mobil Kullanım']
        },
        {
          id: 17,
          title: 'Logo Ocean',
          description: 'Entegre lojistik yönetim platformu',
          image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=800',
          features: ['Rota Optimizasyonu', 'Filo Yönetimi', 'Teslimat Takibi']
        }
      ]
    },
    {
      title: 'NEXUS',
      stats: {
        clients: '400+',
        satisfaction: '94%',
        updates: '12/yıl'
      },
      products: [
        {
          id: 18,
          title: 'Kuika',
          description: 'Özelleştirilebilir mobil iş uygulamaları platformu',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
          features: ['Hızlı Geliştirme', 'Cross-Platform', 'Özel Tasarım']
        }
      ]
    },
    {
      title: 'SERVİS(SSH)',
      stats: {
        clients: '100+',
        satisfaction: '93%',
        updates: '6/yıl'
      },
      products: [
        {
          id: 19,
          title: 'Logo Cloud',
          description: 'Bulut tabanlı veri yönetimi çözümü',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
          features: ['Hızlı Geliştirme', 'Cross-Platform', 'Özel Tasarım']
        }
      ]
    }
  ];

  const filteredCategories = productCategories.filter(category => 
    activeCategory === 'all' || category.title === activeCategory
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
            Kurumsal Çözümler
          </ShiningTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Subtitle>
              İşletmenizi geleceğe taşıyacak kapsamlı yazılım çözümlerimizi keşfedin
            </Subtitle>
          </motion.div>
          <SearchBar>
            <FaSearch />
            <motion.input 
              type="text" 
              placeholder="Ürün veya çözüm arayın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </SearchBar>
        </HeaderSection>

        <CategoryTabs>
          <motion.div
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CategoryTab 
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCogs /> Tüm Kategoriler
            </CategoryTab>
            {productCategories.map((category, index) => {
              const Icon = categoryIcons[category.title];
              return (
                <CategoryTab
                  key={index}
                  active={activeCategory === category.title}
                  onClick={() => setActiveCategory(category.title)}
                >
                  <Icon /> {category.title}
                </CategoryTab>
              );
            })}
          </motion.div>
        </CategoryTabs>

        <AnimatePresence mode="wait">
          {filteredCategories.map((category, index) => (
            <CategorySection
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                type: "spring"
              }}
            >
              <CategoryHeader>
                <CategoryTitle>
                  {categoryIcons[category.title] && (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {React.createElement(categoryIcons[category.title])}
                    </motion.div>
                  )}
                  {category.title}
                </CategoryTitle>
                <CategoryStats>
                  <StatItem>
                    <div className="value">{category.stats.clients}</div>
                    <div className="label">Aktif Müşteri</div>
                  </StatItem>
                  <StatItem>
                    <div className="value">{category.stats.satisfaction}</div>
                    <div className="label">Memnuniyet</div>
                  </StatItem>
                  <StatItem>
                    <div className="value">{category.stats.updates}</div>
                    <div className="label">Güncelleme</div>
                  </StatItem>
                </CategoryStats>
              </CategoryHeader>

              <ProductGrid>
                {category.products.map((product, productIndex) => (
                  <FloatingCard
                    key={product.id}
                    as={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: productIndex * 0.1 }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <ProductImage>
                      <motion.img 
                        src={product.image} 
                        alt={product.title}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <ProductOverlay className="overlay">
                        <OverlayButton>
                          <FaInfoCircle />
                        </OverlayButton>
                        <OverlayButton>
                          <FaDownload />
                        </OverlayButton>
                        <OverlayButton>
                          <FaExternalLinkAlt />
                        </OverlayButton>
                      </ProductOverlay>
                    </ProductImage>
                    <ProductContent>
                      <ProductTitle>{product.title}</ProductTitle>
                      <ProductDescription>{product.description}</ProductDescription>
                      <ProductFeatures>
                        {product.features.map((feature, featureIndex) => (
                          <GlowingFeatureTag
                            key={featureIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: featureIndex * 0.1 }}
                          >
                            {feature}
                          </GlowingFeatureTag>
                        ))}
                      </ProductFeatures>
                    </ProductContent>
                  </FloatingCard>
                ))}
              </ProductGrid>
            </CategorySection>
          ))}
        </AnimatePresence>
      </Container>
    </PageWrapper>
  );
};

export default TumUrunler; 