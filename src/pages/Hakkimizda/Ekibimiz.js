import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/GlobalStyles';
import Container from '../../components/common/Container';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const PageWrapper = styled.div`
  padding: 120px 0;
  background: ${theme.colors.background};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 50px;
`;

const TeamMemberCard = styled(motion.div)`
  background: ${theme.colors.backgroundAlt};
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid ${theme.colors.primary}20;
`;

const MemberImage = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, ${theme.colors.backgroundAlt}, transparent);
  }
`;

const MemberInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const MemberName = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const MemberPosition = styled.p`
  color: ${theme.colors.primary};
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const MemberBio = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  
  a {
    color: ${theme.colors.textSecondary};
    font-size: 1.2rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${theme.colors.primary};
      transform: translateY(-2px);
    }
  }
`;

const teamMembers = [
  {
    name: 'Ahmet Yılmaz',
    position: 'CEO & Kurucu',
    bio: '15+ yıllık yazılım ve teknoloji sektörü deneyimi. Dijital dönüşüm ve inovasyon konularında uzman.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    name: 'Ayşe Kaya',
    position: 'CTO',
    bio: 'Yazılım mimarisi ve büyük ölçekli sistemler konusunda uzman. 12 yıllık sektör deneyimi.',
    image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    name: 'Mehmet Demir',
    position: 'Ürün Müdürü',
    bio: 'Kullanıcı deneyimi ve ürün yönetimi konularında uzman. 8 yıllık ürün geliştirme deneyimi.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    name: 'Zeynep Şahin',
    position: 'Baş Yazılım Mimarı',
    bio: 'Mikroservis mimarisi ve cloud computing konularında uzman. 10 yıllık yazılım geliştirme deneyimi.',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    name: 'Can Özkan',
    position: 'Proje Müdürü',
    bio: 'Agile proje yönetimi ve takım liderliği konularında uzman. 7 yıllık proje yönetimi deneyimi.',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    name: 'Elif Yıldız',
    position: 'UX/UI Tasarım Lideri',
    bio: 'Kullanıcı arayüzü tasarımı ve kullanıcı deneyimi konularında uzman. 6 yıllık tasarım deneyimi.',
    image: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  }
];

function Ekibimiz() {
  return (
    <PageWrapper>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Profesyonel Ekibimiz
          </Title>
          <Subtitle>
            Deneyimli ve uzman kadromuzla müşterilerimize en iyi hizmeti sunmak için çalışıyoruz.
          </Subtitle>
        </Header>

        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MemberImage style={{ backgroundImage: `url(${member.image})` }} />
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberPosition>{member.position}</MemberPosition>
                <MemberBio>{member.bio}</MemberBio>
                <SocialLinks>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </SocialLinks>
              </MemberInfo>
            </TeamMemberCard>
          ))}
        </TeamGrid>
      </Container>
    </PageWrapper>
  );
}

export default Ekibimiz; 