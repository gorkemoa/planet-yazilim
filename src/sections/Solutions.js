import React, { memo, useCallback, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import Container from '../components/common/Container';
import { theme } from '../styles/GlobalStyles';
import { BiNetworkChart, BiSupport, BiCodeAlt, BiBookContent, BiGitBranch, BiBookReader } from 'react-icons/bi';

const SolutionsSection = styled.section`
  padding: clamp(3rem, 5vw, ${theme.spacing.xxl}) 0;
  background: ${theme.colors.background};
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 2rem 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(8, 252, 172, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(6, 194, 133, 0.03) 0%, transparent 50%);
    z-index: 1;
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform, opacity;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.8rem, 4vw, 3.5rem);
  text-align: center;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 2;
  padding: 0 1rem;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: clamp(1.6rem, 3.5vw, 2rem);
    margin-bottom: 0.8rem;
    padding: 0 0.5rem;
  }
`;

const Subtitle = styled(motion.div)`
  width: 60px;
  height: 4px;
  background: ${theme.colors.primary};
  margin: 0 auto 4rem;
  position: relative;
  border-radius: 2px;
  box-shadow: 0 0 20px ${theme.colors.primary}40;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 4px;
    background: ${theme.colors.primary};
    border-radius: 2px;
    box-shadow: 0 0 15px ${theme.colors.primary};
  }

  &::before {
    left: -30px;
  }

  &::after {
    right: -30px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 1rem;
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: ${theme.borderRadius.medium};
  padding: clamp(1.5rem, 4vw, 2.5rem);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, background-color 0.3s ease;
  isolation: isolate;
  z-index: 1;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-8px);
      background: rgba(255, 255, 255, 0.05);

      ${props => props.$IconWrapper} {
        transform: scale(1.1);
        background: rgba(8, 252, 172, 0.15);
        
        svg {
          color: ${theme.colors.primary};
        }
      }
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1.2rem;
    min-height: 180px;
    
    &:active {
      transform: translateY(-4px);
    }
  }
`;

const IconWrapper = styled.div`
  width: clamp(50px, 8vw, 65px);
  height: clamp(50px, 8vw, 65px);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(8, 252, 172, 0.08);
  border: 1.5px solid rgba(8, 252, 172, 0.3);
  transition: all 0.3s ease;
  position: relative;
  transform: translateZ(0);
  will-change: transform;

  svg {
    width: clamp(24px, 4vw, 32px);
    height: clamp(24px, 4vw, 32px);
    color: rgba(255, 255, 255, 0.9);
    transition: color 0.3s ease;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: clamp(45px, 7vw, 55px);
    height: clamp(45px, 7vw, 55px);
    margin-bottom: 1rem;

    svg {
      width: clamp(20px, 3.5vw, 28px);
      height: clamp(20px, 3.5vw, 28px);
    }
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: #fff;
  margin-bottom: 0.8rem;
  font-weight: 600;
  background: linear-gradient(to right, #fff, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    margin-bottom: 0.6rem;
  }
`;

const CardText = styled.p`
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: clamp(0.85rem, 1.8vw, 0.95rem);
    line-height: 1.5;
  }
`;

const solutions = [
  {
    icon: BiNetworkChart,
    title: 'Son Teknoloji',
    description: 'İhtiyaçlarınıza göre kolayca uyarlanabilen, esnek modüler çözümlerimizden yararlanın.'
  },
  {
    icon: BiSupport,
    title: 'Danışmanlık',
    description: 'Yazılım uzmanı danışmanlarımız, özel ihtiyaçlarınıza anında çözüm üretirler.'
  },
  {
    icon: BiBookReader,
    title: 'Destek',
    description: 'Sorularınıza hızlıca yanıt vermek ve sorunlarınızı çözmek için anında destek sunuyoruz.'
  },
  {
    icon: BiCodeAlt,
    title: 'Yazılım Geliştirme',
    description: 'Sürekli gelişerek ve geliştirerek, her zaman en son teknolojiyi kullanmanızı sağlıyoruz.'
  },
  {
    icon: BiGitBranch,
    title: 'Rehberlik',
    description: 'Kapsamlı proje desteğimiz; ihtiyaçlarınıza özel, optimum şekilde uyarlanmış çözümler üretir.'
  },
  {
    icon: BiBookContent,
    title: 'IAS Akademi',
    description: 'Çözümünüz hakkında detaylı bilgiye sahip olmanız ve verimliliğinizi arttırmanız için özel eğitimler veriyoruz.'
  }
];

const Solutions = memo(() => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    
    if (!section || !grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.willChange = 'transform, opacity';
            setIsInView(true);
          } else {
            entry.target.style.willChange = 'auto';
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(section);
    observer.observe(grid);

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth <= 768) return; // Mobilde devre dışı bırak
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    requestAnimationFrame(() => {
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <SolutionsSection id="cozumler" ref={sectionRef}>
        <Container>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            Yenilikçi ve Esnek Teknoloji Çözümleri
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          />
          <Grid ref={gridRef}>
            {solutions.map((solution, index) => (
              <Card
                key={solution.title}
                data-card
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.4, 
                  delay: isInView ? index * 0.1 : 0,
                  ease: [0.4, 0, 0.2, 1]
                }}
                $IconWrapper={IconWrapper}
              >
                <IconWrapper>
                  <solution.icon />
                </IconWrapper>
                <CardTitle>{solution.title}</CardTitle>
                <CardText>{solution.description}</CardText>
              </Card>
            ))}
          </Grid>
        </Container>
      </SolutionsSection>
    </LazyMotion>
  );
});

Solutions.displayName = 'Solutions';

export default Solutions; 