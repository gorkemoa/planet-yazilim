import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaIndustry, FaHospital, FaGraduationCap, FaShoppingBag, FaPlane, FaHome, FaChevronRight } from 'react-icons/fa';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  padding: 120px 0 60px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #08FCA8, #4158D0);
    border-radius: 2px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #fff;
  margin-bottom: 20px;
  font-weight: 800;
  letter-spacing: -1px;
  text-shadow: 0 0 20px rgba(8, 252, 172, 0.3);
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(8, 252, 172, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, #08FCA8, #4158D0);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    &::before {
      transform: scaleX(1);
    }
  }
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, rgba(8, 252, 172, 0.1), rgba(65, 88, 208, 0.1));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  position: relative;

  svg {
    font-size: 2rem;
    color: #08FCA8;
    filter: drop-shadow(0 0 10px rgba(8, 252, 172, 0.3));
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 15px;
  font-weight: 700;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 25px;
  flex-grow: 1;
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled(motion.li)`
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }

  svg {
    color: #08FCA8;
    font-size: 0.8em;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover {
    color: #fff;
    padding-left: 10px;

    svg {
      opacity: 1;
    }
  }
`;

function SektorelCozumler() {
  return (
    <PageWrapper>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sektörel Çözümler
          </Title>
          <Description
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Her sektörün kendine özgü ihtiyaçlarını anlıyor ve bu doğrultuda özelleştirilmiş
            dijital çözümler sunuyoruz. Modern teknolojiler ve yenilikçi yaklaşımlarla
            işletmenizi geleceğe taşıyoruz.
          </Description>
        </Header>

        <Grid>
          {sektorler.map((sektor, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <IconWrapper>
                <sektor.icon />
              </IconWrapper>
              <CardTitle>{sektor.title}</CardTitle>
              <CardDescription>{sektor.description}</CardDescription>
              <Features>
                {sektor.features.map((feature, idx) => (
                  <Feature key={idx}>
                    <FaChevronRight />
                    {feature}
                  </Feature>
                ))}
              </Features>
            </Card>
          ))}
        </Grid>
      </Container>
    </PageWrapper>
  );
}

const sektorler = [
  {
    icon: FaIndustry,
    title: "Üretim Sektörü",
    description: "Üretim süreçlerinizi optimize eden, verimliliği artıran çözümler",
    features: [
      "Üretim planlama ve kontrol",
      "Stok yönetimi",
      "Kalite kontrol sistemleri",
      "Bakım yönetimi"
    ]
  },
  {
    icon: FaHospital,
    title: "Sağlık Sektörü",
    description: "Hasta deneyimini iyileştiren, operasyonel verimliliği artıran sistemler",
    features: [
      "Hasta takip sistemleri",
      "Hastane yönetim yazılımı",
      "Tele-tıp çözümleri",
      "İlaç takip sistemleri"
    ]
  },
  {
    icon: FaGraduationCap,
    title: "Eğitim Sektörü",
    description: "Öğrenme deneyimini dijitalleştiren, yönetimi kolaylaştıran platformlar",
    features: [
      "Uzaktan eğitim sistemleri",
      "Öğrenci bilgi sistemleri",
      "Online sınav platformları",
      "Eğitim içerik yönetimi"
    ]
  },
  {
    icon: FaShoppingBag,
    title: "Perakende Sektörü",
    description: "Satış ve müşteri deneyimini optimize eden çözümler",
    features: [
      "POS sistemleri",
      "Stok takip yazılımı",
      "Müşteri sadakat programları",
      "E-ticaret entegrasyonları"
    ]
  },
  {
    icon: FaPlane,
    title: "Turizm Sektörü",
    description: "Rezervasyon ve operasyon süreçlerini dijitalleştiren sistemler",
    features: [
      "Otel yönetim sistemleri",
      "Online rezervasyon platformları",
      "Tur operatör yazılımları",
      "Müşteri ilişkileri yönetimi"
    ]
  },
  {
    icon: FaHome,
    title: "İnşaat Sektörü",
    description: "Proje yönetimi ve takibini kolaylaştıran çözümler",
    features: [
      "Proje yönetim yazılımı",
      "Maliyet analiz sistemleri",
      "İş takip platformları",
      "Tedarik zinciri yönetimi"
    ]
  }
];

export default SektorelCozumler; 