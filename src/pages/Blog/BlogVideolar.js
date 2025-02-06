import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import { FaPlay, FaClock, FaUser, FaSearch, FaTimes, FaTag } from 'react-icons/fa';
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
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled(motion.article)`
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

    ${props => props.$PlayButton} {
      transform: translate(-50%, -50%) scale(1.1);
      background: ${theme.colors.primary};
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(8, 252, 172, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;

  svg {
    color: #000;
    font-size: 1.5rem;
    margin-left: 4px;
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

const VideoTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const VideoExcerpt = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
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
  max-width: 1000px;
  margin: 2rem auto;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(8, 252, 172, 0.2);
  overflow: hidden;
  position: relative;
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

const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
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

const RelatedVideos = styled.div`
  margin-top: 3rem;
  
  h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const RelatedVideo = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: ${theme.borderRadius.medium};
    margin-bottom: 0.5rem;
  }

  h4 {
    color: #fff;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogVideolar = () => {
  const videolar = articles.filter(article => article.type === 'video');
  const [selectedVideo, setSelectedVideo] = useState(null);

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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Video İçerikler
            </Title>
            <Details
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p>
                Uzman ekibimizin hazırladığı eğitici ve bilgilendirici video içeriklerimizle öğrenme deneyiminizi zenginleştirin. Ürün tanıtımları, teknik eğitimler ve sektörel analizler için video kütüphanemizi keşfedin.
              </p>
            
            </Details>
            <SearchBar>
              <input type="text" placeholder="Videolarda ara..." />
              <FaSearch />
            </SearchBar>
          </Header>

          <Grid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {videolar.map((video, index) => (
              <VideoCard
                key={video.title}
                variants={itemVariants}
                $PlayButton={PlayButton}
                onClick={() => setSelectedVideo(video)}
              >
                <ImageWrapper>
                  <img src={video.image} alt={video.title} />
                  <PlayButton>
                    <FaPlay />
                  </PlayButton>
                  <Category>{video.category}</Category>
                </ImageWrapper>
                <Content>
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoExcerpt>{video.excerpt}</VideoExcerpt>
                  <Meta>
                    <MetaItem>
                      <FaUser />
                      {video.author}
                    </MetaItem>
                    <MetaItem>
                      <FaClock />
                      {video.readTime}
                    </MetaItem>
                  </Meta>
                </Content>
              </VideoCard>
            ))}
          </Grid>
        </Container>
      </BlogSection>

      <AnimatePresence>
        {selectedVideo && (
          <Modal
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ModalWrapper variants={modalContentVariants}>
              <ModalClose onClick={() => setSelectedVideo(null)}>
                <FaTimes />
              </ModalClose>
              
              <VideoContainer>
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoContainer>

              <ModalBody>
                <ModalTitle>{selectedVideo.title}</ModalTitle>
                <ModalMeta>
                  <MetaItem>
                    <FaUser />
                    {selectedVideo.author}
                  </MetaItem>
                  <MetaItem>
                    <FaClock />
                    {selectedVideo.readTime}
                  </MetaItem>
                  <MetaItem>
                    <FaTag />
                    {selectedVideo.category}
                  </MetaItem>
                </ModalMeta>
                <ModalText>
                  <p>{selectedVideo.excerpt}</p>
                  <h3>Video İçeriği</h3>
                  <ul>
                    <li>Detaylı teknik anlatım ve örnekler</li>
                    <li>Pratik uygulama adımları</li>
                    <li>Sık karşılaşılan sorunlar ve çözümleri</li>
                    <li>En iyi pratikler ve öneriler</li>
                  </ul>
                </ModalText>

                <RelatedVideos>
                  <h3>Benzer Videolar</h3>
                  <RelatedGrid>
                    {videolar.slice(0, 3).map((video) => (
                      <RelatedVideo 
                        key={video.title}
                        onClick={() => setSelectedVideo(video)}
                      >
                        <img src={video.image} alt={video.title} />
                        <h4>{video.title}</h4>
                      </RelatedVideo>
                    ))}
                  </RelatedGrid>
                </RelatedVideos>
              </ModalBody>
            </ModalWrapper>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogVideolar; 