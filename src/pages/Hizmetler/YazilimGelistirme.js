import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaMobile, FaCloud, FaDatabase, FaRobot, FaLock } from 'react-icons/fa';
import { VscTerminalCmd, VscJson, VscSymbolVariable, VscDebugStart } from 'react-icons/vsc';
import { theme } from '../../styles/GlobalStyles';

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  50% { border-color: transparent }
`;

const matrix = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(100%);
    opacity: 0.8;
  }
`;

const LineNumbers = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 50px;
  background: rgba(30, 30, 30, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  font-family: 'Fira Code', monospace;
  color: #858585;
  font-size: 0.8rem;
  user-select: none;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: #404040;
  }
`;

const TabBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 35px;
  background: rgba(30, 30, 30, 0.8);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #404040;
`;

const Tab = styled.div`
  padding: 0.5rem 1rem;
  background: rgba(8, 252, 172, 0.1);
  color: ${theme.colors.primary};
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4px 4px 0 0;
  border: 1px solid rgba(8, 252, 172, 0.2);
  border-bottom: none;

  svg {
    font-size: 1rem;
  }
`;

const StatusBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25px;
  background: rgba(30, 30, 30, 0.9);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: ${theme.colors.primary};
  border-top: 1px solid #404040;
  z-index: 100;

  > * + * {
    margin-left: 1rem;
    padding-left: 1rem;
    border-left: 1px solid #404040;
  }
`;

const PageContainer = styled.div`
  padding-top: 120px;
  padding-bottom: 25px; // For status bar
  min-height: 100vh;
  background: #1e1e1e;
  color: #e0e0e0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: 
      linear-gradient(90deg, rgba(8, 252, 172, 0.03) 1px, transparent 1px),
      linear-gradient(rgba(8, 252, 172, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
  }
`;

const MatrixBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.1;

  &::before {
    content: '01001010101110101010101010101';
    position: absolute;
    color: ${theme.colors.primary};
    font-family: 'Courier New', monospace;
    font-size: 12px;
    line-height: 12px;
    white-space: nowrap;
    animation: ${matrix} 20s linear infinite;
  }
`;

const HeroSection = styled.div`
  position: relative;
  padding: 4rem 0;
  z-index: 2;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CodeComment = styled.div`
  color: #6a9955;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const Title = styled(motion.h1)`
  font-family: 'Fira Code', monospace;
  font-size: 4rem;
  color: ${theme.colors.primary};
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    right: -15px;
    top: 0;
    height: 100%;
    width: 5px;
    background: ${theme.colors.primary};
    animation: ${blink} 1s step-end infinite;
  }
`;

const Subtitle = styled(motion.div)`
  font-family: 'Fira Code', monospace;
  font-size: 1.2rem;
  color: #d4d4d4;
  max-width: 800px;
  margin: 0 auto 3rem;
  padding: 1rem;
  background: rgba(30, 30, 30, 0.7);
  border-radius: 8px;
  border-left: 4px solid ${theme.colors.primary};
  
  > span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    animation: ${typing} 3.5s steps(60, end);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin: 4rem 0;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.7);
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(8, 252, 172, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(45deg, transparent 45%, rgba(8, 252, 172, 0.1) 50%, transparent 55%),
      linear-gradient(-45deg, transparent 45%, rgba(8, 252, 172, 0.1) 50%, transparent 55%);
    background-size: 200% 200%;
    animation: gradient-shift 3s linear infinite;
  }

  @keyframes gradient-shift {
    0% { background-position: 200% 200% }
    100% { background-position: -200% -200% }
  }
`;

const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  background: rgba(8, 252, 172, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 14px;
    padding: 2px;
    background: linear-gradient(135deg, ${theme.colors.primary}, transparent);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  svg {
    font-size: 2rem;
    color: ${theme.colors.primary};
    filter: drop-shadow(0 0 8px rgba(8, 252, 172, 0.5));
  }
`;

const ServiceTitle = styled.h3`
  font-family: 'Fira Code', monospace;
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &::before {
    content: '>';
    color: ${theme.colors.primary};
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

const ServiceDescription = styled.p`
  color: #d4d4d4;
  line-height: 1.8;
  font-size: 1rem;
  font-family: 'Fira Code', monospace;
`;

const TechStack = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const TechTitle = styled.h4`
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &::before {
    content: '$';
    margin-right: 0.5rem;
  }
`;

const TechList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechItem = styled.li`
  background: rgba(8, 252, 172, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #d4d4d4;
  font-family: 'Fira Code', monospace;
  border: 1px solid rgba(8, 252, 172, 0.3);
  
  &:hover {
    background: rgba(8, 252, 172, 0.2);
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
`;

const EditorPane = styled.div`
  position: relative;
  background: rgba(30, 30, 30, 0.7);
  border-radius: 8px;
  border: 1px solid #404040;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const CodeBlock = styled.pre`
  font-family: 'Fira Code', monospace;
  color: #d4d4d4;
  margin: 0;
  padding: 1rem;
  background: rgba(30, 30, 30, 0.5);
  border-radius: 4px;
  overflow-x: auto;

  .keyword { color: #569cd6; }
  .string { color: #ce9178; }
  .comment { color: #6a9955; }
  .function { color: #dcdcaa; }
  .variable { color: #9cdcfe; }
  .number { color: #b5cea8; }
`;

const services = [
  {
    icon: <FaCode />,
    title: 'Web Uygulamaları',
    description: 'Modern ve ölçeklenebilir web uygulamaları geliştiriyoruz. En son teknolojileri kullanarak işletmenize özel çözümler sunuyoruz.',
    technologies: ['React', 'Node.js', 'Vue.js', 'Angular', 'Laravel']
  },
  {
    icon: <FaMobile />,
    title: 'Mobil Uygulamalar',
    description: 'iOS ve Android platformları için native ve cross-platform mobil uygulamalar geliştiriyoruz. Kullanıcı deneyimini ön planda tutuyoruz.',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
  },
  {
    icon: <FaCloud />,
    title: 'Cloud Çözümleri',
    description: 'Bulut tabanlı altyapı çözümleri ile işletmenizi dijital dönüşüme hazırlıyoruz. Ölçeklenebilir ve güvenli sistemler kuruyoruz.',
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes']
  },
  {
    icon: <FaDatabase />,
    title: 'Veritabanı Sistemleri',
    description: 'Yüksek performanslı veritabanı sistemleri tasarlıyor ve yönetiyoruz. Veri güvenliğini ve erişilebilirliği optimize ediyoruz.',
    technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch']
  },
  {
    icon: <FaRobot />,
    title: 'Yapay Zeka & ML',
    description: 'Yapay zeka ve makine öğrenimi teknolojileri ile akıllı sistemler geliştiriyoruz. Verilerinizi değere dönüştürüyoruz.',
    technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI', 'Computer Vision']
  },
  {
    icon: <FaLock />,
    title: 'Siber Güvenlik',
    description: 'Uygulamalarınızı ve sistemlerinizi güvende tutuyoruz. Güvenlik açıklarını tespit ediyor ve önlemler alıyoruz.',
    technologies: ['Penetration Testing', 'SSL/TLS', 'OAuth', 'JWT', 'Encryption']
  }
];

function YazilimGelistirme() {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageContainer>
      <MatrixBackground />
      <StatusBar>
        <div><VscTerminalCmd /> Terminal</div>
        <div><VscJson /> JSON</div>
        <div><VscSymbolVariable /> Variables</div>
        <div><VscDebugStart /> Running</div>
        <div style={{ marginLeft: 'auto' }}>{time}</div>
      </StatusBar>
      <HeroSection>
        <Container>
          <EditorPane>
            <TabBar>
              <Tab>
                <FaCode />
                yazilim.js
              </Tab>
            </TabBar>
            <LineNumbers>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </LineNumbers>
            <CodeBlock>
              <span className="keyword">const</span> <span className="variable">planetYazilim</span> = {'{'}
              <br />
              {'  '}<span className="function">mission</span>: <span className="string">"Geleceğin Teknolojileri"</span>,
              <br />
              {'  '}<span className="function">expertise</span>: <span className="string">"Yazılım Geliştirme"</span>
              <br />
              {'}'};
            </CodeBlock>
          </EditorPane>

          <Title
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Yazılım Geliştirme
          </Title>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span>const mission = "Modern teknolojiler ve yenilikçi yaklaşımlarla işletmenize özel çözümler";</span>
          </Subtitle>

          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <CodeBlock style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                  <span className="comment">// {service.description}</span>
                </CodeBlock>
                <TechStack>
                  <TechTitle>tech_stack</TechTitle>
                  <TechList>
                    {service.technologies.map((tech, i) => (
                      <TechItem key={i}>{tech}</TechItem>
                    ))}
                  </TechList>
                </TechStack>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </HeroSection>
    </PageContainer>
  );
}

export default YazilimGelistirme; 