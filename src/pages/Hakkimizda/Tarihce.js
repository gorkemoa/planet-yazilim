import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.backgroundDark};
  padding: 120px 20px 60px;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.textLight};
  text-align: center;
  margin-bottom: 4rem;
`;

const TimelineItem = styled.div`
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${theme.colors.primary}20;

  &:last-child {
    border-bottom: none;
  }
`;

const Year = styled.div`
  font-size: 2rem;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Event = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const Details = styled.p`
  font-size: 1rem;
  color: ${theme.colors.textLight}80;
  line-height: 1.6;
  font-style: italic;
`;

const milestones = [
  {
    year: '2010',
    event: 'Vizyoner Başlangıç',
    description: 'Teknoloji dünyasına ilk adımımızı attık. İnovasyon ve mükemmellik arayışımız burada başladı.',
    details: 'Küçük bir ekip, büyük hayaller ve sınırsız potansiyelle yola çıktık. Her zorluk bizi daha da güçlendirdi.'
  },
  {
    year: '2012',
    event: 'İlk Büyük Zafer',
    description: 'Sektörde ses getiren ilk büyük projemizi tamamladık ve adımızı duyurmaya başladık.',
    details: 'Müşteri memnuniyeti ve kalite odaklı yaklaşımımız, bizi sektörde öne çıkardı.'
  },
  {
    year: '2014',
    event: 'Ekip Genişlemesi',
    description: 'Yetenekli profesyonellerle büyüdük ve yeni ofisimize taşındık.',
    details: 'Her yeni takım üyesi, vizyonumuza ve başarımıza değerli katkılar sağladı.'
  },
  {
    year: '2016',
    event: 'Global Açılım',
    description: 'Uluslararası pazarda ilk projemizi başarıyla tamamladık.',
    details: 'Sınırları aşarak global bir marka olma yolunda önemli adımlar attık.'
  },
  {
    year: '2018',
    event: 'İnovasyon Atılımı',
    description: 'Cloud çözümlerimiz ve yenilikçi projelerimizle sektöre yön verdik.',
    details: 'Teknolojik gelişmeleri yakından takip ederek, en yenilikçi çözümleri sunduk.'
  },
  {
    year: '2020',
    event: 'Zirveye Yolculuk',
    description: 'Yılın Teknoloji Şirketi ödülüyle başarımız taçlandı.',
    details: 'Sürekli gelişim ve inovasyon anlayışımız bizi zirveye taşıdı.'
  }
];

function Tarihce() {
  return (
    <PageWrapper>
      <Container>
        <Title>Başarı Hikayemiz</Title>
        <Subtitle>
          2010'dan bugüne, teknoloji ve inovasyonla dolu yolculuğumuz
        </Subtitle>

        {milestones.map((milestone, index) => (
          <TimelineItem key={index}>
            <Year>{milestone.year}</Year>
            <Event>{milestone.event}</Event>
            <Description>{milestone.description}</Description>
            <Details>{milestone.details}</Details>
          </TimelineItem>
        ))}
      </Container>
    </PageWrapper>
  );
}

export default Tarihce; 