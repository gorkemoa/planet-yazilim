import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaDownload, FaSearch, FaFilter, FaClock, FaEye, FaStar } from 'react-icons/fa';
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

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  flex: 1;
  max-width: 400px;
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

const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
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

const DemoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const DemoCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.primary}20;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);

    .play-icon {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
`;

const DemoVideo = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: url(${props => props.thumbnail}) center/cover no-repeat;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
`;

const PlayIcon = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: ${theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  svg {
    color: #000;
    font-size: 1.8rem;
    margin-left: 5px;
  }
`;

const DemoStats = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 0.9rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: ${theme.colors.primary};
    }
  }
`;

const DemoContent = styled.div`
  padding: 1.5rem;
`;

const DemoTitle = styled.h3`
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
`;

const DemoDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const DemoTags = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const DemoTag = styled(motion.span)`
  padding: 0.4rem 1rem;
  border-radius: 50px;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${theme.colors.primary}40;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  button {
    flex: 1;
  }
`;

const Demolar = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const demos = [
    {
      id: 1,
      title: 'CRM Yazılımı Demo',
      description: 'Müşteri yönetimi ve satış süreçlerinin nasıl yönetildiğini gösteren kapsamlı demo video.',
      videoUrl: '/videos/crm-demo.mp4',
      downloadUrl: '/downloads/crm-demo.zip',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
      category: 'CRM',
      duration: '15:20',
      views: '2.5K',
      rating: '4.8',
      tags: ['Müşteri Yönetimi', 'Satış', 'Raporlama']
    },
    {
      id: 2,
      title: 'ERP Sistemi Demo',
      description: 'Stok yönetimi, muhasebe ve üretim süreçlerinin entegre çalışmasını gösteren detaylı demo.',
      videoUrl: '/videos/erp-demo.mp4',
      downloadUrl: '/downloads/erp-demo.zip',
      thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800',
      category: 'ERP',
      duration: '20:45',
      views: '3.1K',
      rating: '4.9',
      tags: ['Stok Yönetimi', 'Muhasebe', 'Üretim']
    },
    {
      id: 3,
      title: 'E-Ticaret Demo',
      description: 'Online mağaza yönetimi ve sipariş süreçlerini gösteren kapsamlı demo ve entegrasyon örnekleri.',
      videoUrl: '/videos/ecommerce-demo.mp4',
      downloadUrl: '/downloads/ecommerce-demo.zip',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
      category: 'E-Ticaret',
      duration: '18:30',
      views: '4.2K',
      rating: '4.7',
      tags: ['Online Satış', 'Sipariş Yönetimi', 'Entegrasyon']
    }
  ];

  const filteredDemos = demos.filter(demo => 
    (activeFilter === 'all' || demo.category === activeFilter) &&
    (demo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     demo.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
            Ürün Demoları
          </ShiningTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Subtitle>
              Ürünlerimizin kapsamlı demo videolarını izleyerek özelliklerini keşfedin
              ve işletmeniz için en uygun çözümü seçin.
            </Subtitle>
          </motion.div>
        </HeaderSection>

        <FilterSection>
          <SearchBar>
            <FaSearch />
            <motion.input
              type="text"
              placeholder="Demo ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </SearchBar>
          <FilterTabs>
            <FilterTab
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              <FaFilter /> Tümü
            </FilterTab>
            <FilterTab
              active={activeFilter === 'CRM'}
              onClick={() => setActiveFilter('CRM')}
            >
              CRM
            </FilterTab>
            <FilterTab
              active={activeFilter === 'ERP'}
              onClick={() => setActiveFilter('ERP')}
            >
              ERP
            </FilterTab>
            <FilterTab
              active={activeFilter === 'E-Ticaret'}
              onClick={() => setActiveFilter('E-Ticaret')}
            >
              E-Ticaret
            </FilterTab>
          </FilterTabs>
        </FilterSection>

        <DemoGrid>
          <AnimatePresence>
            {filteredDemos.map((demo, index) => (
              <DemoCard
                key={demo.id}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <DemoVideo thumbnail={demo.thumbnail}>
                  <PlayIcon
                    className="play-icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaPlay />
                  </PlayIcon>
                  <DemoStats>
                    <div>
                      <FaClock />
                      {demo.duration}
                    </div>
                    <div>
                      <FaEye />
                      {demo.views}
                    </div>
                    <div>
                      <FaStar />
                      {demo.rating}
                    </div>
                  </DemoStats>
                </DemoVideo>
                <DemoContent>
                  <DemoTitle>{demo.title}</DemoTitle>
                  <DemoDescription>{demo.description}</DemoDescription>
                  <DemoTags>
                    {demo.tags.map((tag, index) => (
                      <DemoTag
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {tag}
                      </DemoTag>
                    ))}
                  </DemoTags>
                  <ButtonGroup>
                    <Button variant="primary" size="small">
                      <FaPlay /> Demo İzle
                    </Button>
                    <Button variant="secondary" size="small">
                      <FaDownload /> İndir
                    </Button>
                  </ButtonGroup>
                </DemoContent>
              </DemoCard>
            ))}
          </AnimatePresence>
        </DemoGrid>
      </Container>
    </PageWrapper>
  );
};

export default Demolar; 