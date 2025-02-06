import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/GlobalStyles';
import Container from '../components/common/Container';
import { FaArrowRight, FaClock, FaUser, FaTag } from 'react-icons/fa';

const ArticlesSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(8, 252, 172, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(6, 194, 133, 0.05) 0%, transparent 50%);
    z-index: 1;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  text-align: center;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 2;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
  margin: 0 auto 4rem;
  line-height: 1.7;
  position: relative;
  z-index: 2;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 2;

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
  position: relative;

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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(8, 15, 29, 0.8) 100%);
    z-index: 1;
  }

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
  backdrop-filter: blur(5px);
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

export const articles = [
  {
    title: "Yapay Zeka ile İş Süreçlerini Optimize Etme",
    excerpt: "Modern işletmelerde yapay zeka teknolojilerinin kullanımı ve sağladığı avantajlar hakkında detaylı bir inceleme.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    category: "Yapay Zeka",
    author: "Dr. Mehmet Yılmaz",
    date: "15 Mart 2024",
    readTime: "8 dk",
    type: "makale"
  },
  {
    title: "Endüstri 5.0'a Doğru: Gelecek Vizyonu",
    excerpt: "Endüstri 5.0'ın getireceği yenilikler ve işletmelerin bu dönüşüme nasıl hazırlanması gerektiği üzerine bir analiz.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    category: "Teknoloji",
    author: "Ayşe Kaya",
    date: "12 Mart 2024",
    readTime: "6 dk",
    type: "makale"
  },
  {
    title: "Siber Güvenlikte Son Trendler",
    excerpt: "2024'ün öne çıkan siber güvenlik tehditleri ve kurumsal sistemleri korumak için alınması gereken önlemler.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    category: "Siber Güvenlik",
    author: "Ali Demir",
    date: "10 Mart 2024",
    readTime: "5 dk",
    type: "makale"
  },
  {
    title: "Blockchain ve Web3 Teknolojileri E-Kitabı",
    excerpt: "Blockchain teknolojisinin iş dünyasına etkileri ve Web3'ün getirdiği yeni fırsatlar hakkında kapsamlı bir rehber. PDF formatında indirilebilir kaynak.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
    category: "Blockchain",
    author: "Emre Can",
    date: "8 Mart 2024",
    readTime: "45 sayfa",
    type: "kaynak"
  },
  {
    title: "Yapay Zeka ve Derin Öğrenme Video Eğitimi",
    excerpt: "Yapay zeka ve derin öğrenme konularında kapsamlı video eğitim serisi. Pratik örnekler ve uygulamalarla öğrenin.",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800",
    category: "Eğitim",
    author: "Deniz Yıldırım",
    date: "5 Mart 2024",
    readTime: "120 dk",
    type: "video"
  },
  {
    title: "Kuantum Bilişim Teknik Dokümantasyonu",
    excerpt: "Kuantum bilgisayarların teknik detayları, programlama yaklaşımları ve uygulama alanları hakkında detaylı teknik doküman.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    category: "Kuantum",
    author: "Prof. Dr. Kemal Şahin",
    date: "3 Mart 2024",
    readTime: "60 sayfa",
    type: "kaynak"
  }
];

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

const LatestArticles = memo(() => {
  return (
    <ArticlesSection id="blog">
      <Container>
        <Title
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Son Makaleler
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Teknoloji dünyasındaki son gelişmeler ve uzman görüşlerimiz
        </Subtitle>

        <Grid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {articles.map((article, index) => (
            <ArticleCard
              key={article.title}
              variants={itemVariants}
              $ReadMore={ReadMore}
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
    </ArticlesSection>
  );
});

LatestArticles.displayName = 'LatestArticles';

export default LatestArticles; 