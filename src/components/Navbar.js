import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome,
  FaBuilding, 
  FaCogs,
  FaBoxOpen,
  FaLightbulb,
  FaHandshake,
  FaBook,
  FaPhoneAlt,
  FaBars,
  FaTimes,
  FaHeadset,
  FaUsers,
  FaHistory,
  FaChartLine,
  FaRocket,
  FaCode,
  FaIndustry,
  FaGlobe,
  FaNewspaper,
  FaVideo,
  FaFileAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { theme } from '../styles/GlobalStyles';
import Container from './common/Container';
import Button from './common/Button';
import { Link } from 'react-router-dom';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: ${theme.zIndex.navbar};
  transition: ${theme.transitions.default};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $scrolled }) => 
      $scrolled 
        ? `${theme.colors.background}`
        : 'transparent'
    };
    backdrop-filter: ${({ $scrolled }) => 
      $scrolled 
        ? 'blur(20px)'
        : 'blur(10px)'
    };
    border-bottom: 1px solid ${({ $scrolled }) => 
      $scrolled 
        ? `${theme.colors.primary}20`
        : 'transparent'
    };
    transition: ${theme.transitions.default};
  }
`;

const NavContainer = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Logo = styled.div`
  margin-right: auto;
  z-index: 1;
  img {
    height: 40px;
    width: auto;
    transition: transform 0.3s ease;
    filter: brightness(0) invert(1);

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-left: auto;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const IconBox = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(8, 252, 172, 0.1);
  transition: all 0.3s ease;

  svg {
    font-size: 0.8rem;
    color: ${theme.colors.primary};
    transition: all 0.3s ease;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  transition: ${theme.transitions.default};
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 6px;
  border-radius: 6px;

  &:hover {
    color: #fff;
    background: rgba(8, 252, 172, 0.05);

    ${IconBox} {
      background: rgba(8, 252, 172, 0.2);
      transform: translateY(-2px);
      
      svg {
        transform: scale(1.1);
      }
    }
  }
`;

const DropdownContent = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 400px;
  background: ${theme.colors.background};
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 0.75rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.primary}20;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 0 30px ${theme.colors.primary}10;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    background: ${theme.colors.background};
    border-left: 1px solid ${theme.colors.primary}20;
    border-top: 1px solid ${theme.colors.primary}20;
    rotate: 45deg;
  }
`;

const NavItem = styled.div`
  position: relative;
  padding: ${theme.spacing.xs} 0;

  &:hover {
    ${DropdownContent} {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
  }

  &:last-child ${DropdownContent} {
    left: auto;
    right: 0;
    transform: translateX(0);

    &::before {
      left: auto;
      right: 40px;
    }
  }
`;

const DropdownLink = styled(Link)`
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1rem;
    min-width: 18px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  small {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.5);
    font-weight: normal;
    line-height: 1.2;
  }
  
  &:hover {
    background: rgba(8, 252, 172, 0.1);
    transform: translateX(4px);
    color: #fff;

    ${IconBox} {
      background: rgba(8, 252, 172, 0.2);
    }

    small {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background: ${theme.colors.background};
  backdrop-filter: blur(20px);
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  box-shadow: ${theme.shadows.large};
  border-left: 1px solid ${theme.colors.primary}20;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

const MobileNavLink = styled(Link)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background: rgba(8, 252, 172, 0.05);

    ${IconBox} {
      background: rgba(8, 252, 172, 0.2);
    }
  }
`;

const MobileSubMenu = styled.div`
  margin-left: 2rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MobileSubLink = styled(Link)`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background: rgba(8, 252, 172, 0.05);

    ${IconBox} {
      background: rgba(8, 252, 172, 0.2);
    }
  }

  small {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    display: block;
  }
`;

const menuItems = [
  {
    title: 'ANASAYFA',
    icon: FaHome,
    href: '/',
    items: []
  },
  {
    title: 'HAKKIMIZDA',
    icon: FaBuilding,
    href: '/hakkimizda/firma-hakkinda',
    items: [
      {
        title: 'Firma Hakkında',
        description: 'Misyon, vizyon ve değerlerimiz',
        icon: FaBuilding,
        href: '/hakkimizda/firma-hakkinda'
      },
      {
        title: 'Ekibimiz',
        description: 'Profesyonel kadromuz',
        icon: FaUsers,
        href: '/hakkimizda/ekibimiz'
      },
      {
        title: 'Tarihçe',
        description: 'Firmamızın gelişim süreci',
        icon: FaHistory,
        href: '/hakkimizda/tarihce'
      }
    ]
  },
  {
    title: 'HİZMETLERİMİZ',
    icon: FaCogs,
    href: '#hizmetler',
    items: [
      {
        title: 'CRM Çözümleri',
        description: 'Müşteri ilişkileri yönetimi',
        icon: FaUsers,
        href: '/crm'
      },
      {
        title: 'ERP Sistemleri',
        description: 'Kurumsal kaynak planlaması',
        icon: FaRocket,
        href: '/erp'
      },
      {
        title: 'Yazılım Geliştirme',
        description: 'Özel yazılım çözümleri',
        icon: FaCode,
        href: '/yazilim'
      },
      {
        title: 'Entegrasyon Hizmetleri',
        description: 'Sistem entegrasyonları',
        icon: FaIndustry,
        href: '/entegrasyon'
      }
    ]
  },
  {
    title: 'ÜRÜNLER',
    icon: FaBoxOpen,
    href: '/tum-urunler',
    items: [
      {
        title: 'Tüm Ürünler',
        description: 'Ürün kataloğumuz',
        icon: FaBoxOpen,
        href: '/tum-urunler'
      },
      {
        title: 'Demolar',
        description: 'Ürün demoları ve tanıtımlar',
        icon: FaRocket,
        href: '/demolar'
      },
      {
        title: 'Yeni Ürünler',
        description: 'En son çıkan ürünlerimiz',
        icon: FaLightbulb,
        href: '/yeni-urunler'
      }
    ]
  },
  {
    title: 'ÇÖZÜMLER',
    icon: FaLightbulb,
    href: '/sektorel',
    items: [
      {
        title: 'Sektörel Çözümler',
        description: 'Sektöre özel çözümlerimiz',
        icon: FaIndustry,
        href: '/sektorel'
      },
      {
        title: 'E-Ticaret',
        description: 'Online ticaret çözümleri',
        icon: FaGlobe,
        href: '/e-ticaret'
      },
      {
        title: 'İş Süreçleri',
        description: 'Süreç optimizasyonu',
        icon: FaCogs,
        href: '/is-surecleri'
      }
    ]
  },
  {
    title: 'REFERANSLAR',
    icon: FaHandshake,
    href: '/referanslar',
    items: [
      {
        title: 'Müşteri Yorumları',
        description: 'Başarı hikayeleri',
        icon: FaHandshake,
        href: '/referanslar/musteri-yorumlari'
      },
      {
        title: 'Vaka Çalışmaları',
        description: 'Detaylı proje analizleri',
        icon: FaFileAlt,
        href: '/referanslar/vaka-calismalari'
      },
      {
        title: 'Başarı Hikayeleri',
        description: 'Müşterilerimizin başarı öyküleri',
        icon: FaChartLine,
        href: '/referanslar/basari-hikayeleri'
      },
      {
        title: 'Sektörel Referanslar',
        description: 'Sektöre özel çözüm örnekleri',
        icon: FaIndustry,
        href: '/referanslar/sektorel-referanslar'
      }
    ]
  },
  {
    title: 'BLOG',
    icon: FaBook,
    href: '/blog',
    items: [
      {
        title: 'Makaleler',
        description: 'Teknoloji ve yazılım makaleleri',
        icon: FaNewspaper,
        href: '/blog/makaleler'
      },
      {
        title: 'Video İçerikler',
        description: 'Eğitim ve tanıtım videoları',
        icon: FaVideo,
        href: '/blog/videolar'
      },
      {
        title: 'Kaynaklar',
        description: 'E-kitaplar ve teknik dökümanlar',
        icon: FaBook,
        href: '/blog/kaynaklar'
      }
    ]
  },
  {
    title: 'İLETİŞİM',
    icon: FaPhoneAlt,
    href: '/iletisim-bilgileri',
    items: [
      {
        title: 'İletişim Bilgileri',
        description: 'Telefon ve e-posta',
        icon: FaPhoneAlt,
        href: '/iletisim-bilgileri'
      },
      {
        title: 'Lokasyon',
        description: 'Ofis adresimiz',
        icon: FaMapMarkerAlt,
        href: '/lokasyon'
      }
    ]
  }
];

const transformedMenuItems = menuItems.map(item => ({
  ...item,
  title: item.title.replace(/İ/g, 'I').replace(/Ü/g, 'U').replace(/Ö/g, 'O'),
}));

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav 
      $scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContainer>
        <Logo>
          <img src="https://cdn.prod.website-files.com/656dddd9e3a697410a7d9441/65c57944bcebcfa17ad0716d_logo_orbify.webp" alt="Planet Yazılım Logo" />
        </Logo>

        <NavLinks>
          {transformedMenuItems.map((item) => (
            item.items.length > 0 ? (
              <NavItem key={item.title}>
                <NavLink to={item.href}>
                  <IconBox>
                    <item.icon />
                  </IconBox>
                  {item.title}
                </NavLink>
                <DropdownContent>
                  {item.items.map((subItem) => (
                    <DropdownLink key={subItem.title} to={subItem.href}>
                      <IconBox>
                        <subItem.icon />
                      </IconBox>
                      <div>
                        <div>{subItem.title}</div>
                        <small>{subItem.description}</small>
                      </div>
                    </DropdownLink>
                  ))}
                </DropdownContent>
              </NavItem>
            ) : (
              <NavLink key={item.title} to={item.href}>
                <IconBox>
                  <item.icon />
                </IconBox>
                {item.title}
              </NavLink>
            )
          ))}
          <Button variant="secondary" size="small">
            <IconBox>
              <FaHeadset />
            </IconBox>
            DESTEK
          </Button>
        </NavLinks>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'tween' }}
            >
              <MobileNavLinks>
                {transformedMenuItems.map((item) => (
                  <React.Fragment key={item.title}>
                    <MobileNavLink to={item.href}>
                      <IconBox>
                        <item.icon />
                      </IconBox>
                      {item.title}
                    </MobileNavLink>
                    {item.items && item.items.length > 0 && (
                      <MobileSubMenu>
                        {item.items.map((subItem) => (
                          <MobileSubLink key={subItem.title} to={subItem.href}>
                            <IconBox>
                              <subItem.icon />
                            </IconBox>
                            <div>
                              {subItem.title}
                              <small>{subItem.description}</small>
                            </div>
                          </MobileSubLink>
                        ))}
                      </MobileSubMenu>
                    )}
                  </React.Fragment>
                ))}
                <Button variant="secondary" fullWidth>
                  <IconBox>
                    <FaHeadset />
                  </IconBox>
                  DESTEK
                </Button>
              </MobileNavLinks>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContainer>
    </Nav>
  );
}

export default Navbar; 