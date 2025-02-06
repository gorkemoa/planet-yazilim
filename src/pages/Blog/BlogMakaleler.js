import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import { FaArrowRight, FaClock, FaUser, FaTag, FaSearch, FaTimes } from 'react-icons/fa';
import { articles } from '../../sections/LatestArticles';
import Navbar from '../../components/Navbar';

const BlogSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.background};
  min-height: 100vh;
  position: relative;
  margin-top: 80px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Details = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  color: rgba(255, 255, 255, 0.8);
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
`;

const StatItem = styled.div`
  text-align: center;

  .number {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const SearchBar = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  position: relative;

  input {
    width: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(8, 252, 172, 0.1);
    border-radius: ${theme.borderRadius.medium};
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      background: rgba(255, 255, 255, 0.1);
    }
  }

  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.primary};
    font-size: 1.2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  border: 1px solid rgba(8, 252, 172, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(8, 252, 172, 0.3);
    box-shadow: 
      0 0 30px rgba(8, 252, 172, 0.1),
      inset 0 0 20px rgba(8, 252, 172, 0.05);

    img {
      transform: scale(1.1);
    }

    ${props => props.$ReadMore} {
      gap: 1rem;
      color: ${theme.colors.primary};
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const Category = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(8, 252, 172, 0.9);
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
`;

const Content = styled.div`
  padding: 2rem;
`;

const ArticleTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ArticleExcerpt = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;

  svg {
    color: ${theme.colors.primary};
  }
`;

const ReadMore = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-weight: 500;
  transition: all 0.3s ease;
`;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem;
`;

const ModalWrapper = styled(motion.div)`
  max-width: 900px;
  margin: 2rem auto;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(8, 252, 172, 0.2);
  overflow: hidden;
  position: relative;
`;

const ModalHeader = styled.div`
  position: relative;
  height: 400px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: ${theme.colors.primary};
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const ModalMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.8;

  p {
    margin-bottom: 1.5rem;
  }

  h3 {
    color: #fff;
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }

  ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const BlogMakaleler = () => {
  const makaleler = articles.filter(article => article.type === 'makale');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalContentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.2 } }
  };

  return (
    <>
      <Navbar />
      <BlogSection>
        <Container>
          <Header>
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Makaleler
            </Title>
            <Details
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p>
                Teknoloji dünyasındaki en son gelişmeleri, uzman görüşlerini ve detaylı teknik analizleri bulabileceğiniz makalelerimizi keşfedin. Yapay zeka, blockchain, siber güvenlik ve daha fazlası hakkında derinlemesine içerikler.
              </p>
          
            </Details>
            <SearchBar>
              <input type="text" placeholder="Makalelerde ara..." />
              <FaSearch />
            </SearchBar>
          </Header>

          <Grid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {makaleler.map((article, index) => (
              <ArticleCard
                key={article.title}
                variants={itemVariants}
                $ReadMore={ReadMore}
                onClick={() => setSelectedArticle(article)}
              >
                <ImageWrapper>
                  <img src={article.image} alt={article.title} />
                  <Category>{article.category}</Category>
                </ImageWrapper>
                <Content>
                  <Meta>
                    <MetaItem>
                      <FaUser />
                      {article.author}
                    </MetaItem>
                    <MetaItem>
                      <FaClock />
                      {article.readTime}
                    </MetaItem>
                  </Meta>
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleExcerpt>{article.excerpt}</ArticleExcerpt>
                  <ReadMore>
                    Devamını Oku
                    <FaArrowRight />
                  </ReadMore>
                </Content>
              </ArticleCard>
            ))}
          </Grid>
        </Container>
      </BlogSection>

      <AnimatePresence>
        {selectedArticle && (
          <Modal
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ModalWrapper variants={modalContentVariants}>
              <ModalClose onClick={() => setSelectedArticle(null)}>
                <FaTimes />
              </ModalClose>
              <ModalHeader>
                <img src={selectedArticle.image} alt={selectedArticle.title} />
                <Category>{selectedArticle.category}</Category>
              </ModalHeader>
              <ModalBody>
                <ModalTitle>{selectedArticle.title}</ModalTitle>
                <ModalMeta>
                  <MetaItem>
                    <FaUser />
                    {selectedArticle.author}
                  </MetaItem>
                  <MetaItem>
                    <FaClock />
                    {selectedArticle.readTime}
                  </MetaItem>
                  <MetaItem>
                    <FaTag />
                    {selectedArticle.category}
                  </MetaItem>
                </ModalMeta>
                <ModalText>
                  <p>{selectedArticle.excerpt}</p>
                  <h3>Öne Çıkan Noktalar</h3>
                  <ul>
                    <li>Modern teknolojilerin iş süreçlerine entegrasyonu</li>
                    <li>Yapay zeka destekli çözümlerin avantajları</li>
                    <li>Uygulama örnekleri ve başarı hikayeleri</li>
                    <li>Gelecek trendleri ve öngörüler</li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </ModalText>
              </ModalBody>
            </ModalWrapper>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogMakaleler; 