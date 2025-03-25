import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: linear-gradient(to bottom, #000000 0%, #000000 100%);
  color: #8892b0;
  padding: 3rem 0;
  margin-top: auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, #1d2d50, transparent);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #ccd6f6;
  }
  
  p {
    line-height: 1.6;
    opacity: 0.8;
  }
`;

const FooterLink = styled(Link)`
  color: #8892b0;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #64ffda;
    text-decoration: none;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: #8892b0;
    text-decoration: none;
    font-size: 1.5rem;
    transition: color 0.2s ease;
    
    &:hover {
      color: #64ffda;
      opacity: 1;
    }
  }
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #1d2d50;
  font-size: 0.9rem;
  opacity: 0.7;
`;

const FooterSubLinks = styled.div`
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const FooterSubLink = styled(Link)`
  color: #8892b0;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  opacity: 0.8;
  
  &:hover {
    color: #64ffda;
    text-decoration: none;
    opacity: 1;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>Planet Yazılım</h3>
            <p>Yazılım çözümleri ile işletmenizi geleceğe taşıyoruz.</p>
          </FooterSection>
          
          <FooterSection>
            <h3>Hızlı Erişim</h3>
            <FooterLink to="/hakkimizda">Hakkımızda</FooterLink>
            <FooterLink>Hizmetler</FooterLink>
            <FooterSubLinks>
              <FooterSubLink to="/projelendirme">Projelendirme</FooterSubLink>
              <FooterSubLink to="/uyarlama">Uyarlama</FooterSubLink>
              <FooterSubLink to="/destek">Destek</FooterSubLink>
              <FooterSubLink to="/entegrasyon">Entegrasyon Hizmetleri</FooterSubLink>
            </FooterSubLinks>
            <FooterLink to="/tum-urunler">Ürünler</FooterLink>
            <FooterLink to="/iletisim-bilgileri">İletişim</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h3>Bizi Takip Edin</h3>
            <SocialLinks>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </SocialLinks>
          </FooterSection>
        </FooterGrid>
        
        <Copyright>
          © {new Date().getFullYear()} Planet Yazılım. Tüm hakları saklıdır.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 