import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import { FaDownload, FaClock, FaUser, FaSearch, FaFileAlt } from 'react-icons/fa';
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
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ResourceCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  border: 1px solid rgba(8, 252, 172, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: stretch;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(8, 252, 172, 0.3);
    box-shadow: 
      0 0 30px rgba(8, 252, 172, 0.1),
      inset 0 0 20px rgba(8, 252, 172, 0.05);

    ${props => props.$DownloadButton} {
      background: ${theme.colors.primary};
      color: #000;
    }
  }
`;

const IconWrapper = styled.div`
  width: 200px;
  background: rgba(8, 252, 172, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  svg {
    font-size: 4rem;
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 120px;
    
    svg {
      font-size: 3rem;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const ResourceTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ResourceExcerpt = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: auto;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 1.5rem;
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

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(8, 252, 172, 0.1);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primary};
    color: #000;
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

const BlogKaynaklar = () => {
  const kaynaklar = articles.filter(article => article.type === 'kaynak');

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
              Kaynaklar
            </Title>
            <Details
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p>
                Profesyonel gelişiminiz için hazırladığımız kapsamlı kaynaklara göz atın. E-kitaplar, teknik dökümanlar, şablonlar ve daha fazlasına ücretsiz erişim sağlayın. İndirilebilir kaynaklarımızla bilgi birikiminizi artırın.
              </p>
             
            </Details>
            <SearchBar>
              <input type="text" placeholder="Kaynaklarda ara..." />
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
            {kaynaklar.map((kaynak, index) => (
              <ResourceCard
                key={kaynak.title}
                variants={itemVariants}
                $DownloadButton={DownloadButton}
              >
                <IconWrapper>
                  <FaFileAlt />
                </IconWrapper>
                <Content>
                  <ResourceTitle>{kaynak.title}</ResourceTitle>
                  <ResourceExcerpt>{kaynak.excerpt}</ResourceExcerpt>
                  <Meta>
                    <MetaInfo>
                      <MetaItem>
                        <FaUser />
                        {kaynak.author}
                      </MetaItem>
                      <MetaItem>
                        <FaClock />
                        {kaynak.readTime}
                      </MetaItem>
                    </MetaInfo>
                    <DownloadButton>
                      <FaDownload />
                      İndir
                    </DownloadButton>
                  </Meta>
                </Content>
              </ResourceCard>
            ))}
          </Grid>
        </Container>
      </BlogSection>
    </>
  );
};

export default BlogKaynaklar; 