import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import './Partners.css';

const PartnersSection = styled.section`
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

const partners = [
  {
    logo: '🏢',
    name: 'Logo',
    description: "Türkiye'nin önde gelen kurumsal yazılım şirketi."
  },
  {
    logo: '⚡',
    name: 'Netoloji',
    description: 'İş süreçleri yönetimi ve dijital dönüşüm çözümleri.'
  },
  {
    logo: '📱',
    name: 'Kuika',
    description: 'Low-code mobil uygulama geliştirme platformu.'
  },
  {
    logo: '💻',
    name: 'Gmb',
    description: 'Yazılım geliştirme ve danışmanlık hizmetleri.'
  },
  {
    logo: '📦',
    name: 'FsSoftware',
    description: 'Depo yönetim sistemleri ve lojistik çözümleri.'
  },
  {
    logo: '🔄',
    name: 'Contact',
    description: 'PLM ve ürün yaşam döngüsü yönetimi çözümleri.'
  },
  {
    logo: '⚖️',
    name: 'Eriş Avukatlık',
    description: 'Hukuki danışmanlık ve yasal süreç yönetimi.'
  }
];

function Partners() {
  return (
    <section className="partners-section" id="cozum-ortaklari">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Çözüm Ortaklarımız
          </h2>
        </motion.div>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="partner-card">
                <div className="partner-logo">{partner.logo}</div>
                <h3 className="partner-name">{partner.name}</h3>
                <p className="partner-description">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners; 