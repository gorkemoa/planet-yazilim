import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/GlobalStyles';
import LoadingFallback from './components/common/LoadingFallback';
import Navbar from './components/Navbar';
import Footer from './components/common/Footer';
import BlogMakaleler from './pages/Blog/BlogMakaleler';
import BlogVideolar from './pages/Blog/BlogVideolar';
import BlogKaynaklar from './pages/Blog/BlogKaynaklar';
import FirmaHakkinda from './pages/Hakkimizda/FirmaHakkinda';
import Ekibimiz from './pages/Hakkimizda/Ekibimiz';
import Tarihce from './pages/Hakkimizda/Tarihce';

// Sections bileşenlerini import ediyoruz
import Sections from './sections';

// Diğer sayfalar için lazy loading
const ContactPage = lazy(() => import('./pages/İletişim/ContactPage'));

// Referanslar sayfaları
const BasariHikayeleri = lazy(() => import('./pages/Referanslar/BasariHikayeleri'));
const MusteriYorumlari = lazy(() => import('./pages/Referanslar/MusteriYorumlari'));

// Çözümler sayfaları
const SektorelCozumler = lazy(() => import('./pages/Cozumler/SektorelCozumler'));
const ETicaret = lazy(() => import('./pages/Cozumler/ETicaret'));
const IsSurecleri = lazy(() => import('./pages/Cozumler/IsSurecleri'));

// Ürünler sayfaları
const TumUrunler = lazy(() => import('./pages/Urunler/TumUrunler'));
const Demolar = lazy(() => import('./pages/Urunler/Demolar'));
const YeniUrunler = lazy(() => import('./pages/Urunler/YeniUrunler'));

// Hizmetler sayfaları
const Projelendirme = lazy(() => import('./pages/Hizmetler/Projelendirme'));
const UyarlamaSureci = lazy(() => import('./pages/Hizmetler/ERPSistemleri'));
const DestekHizmetleri = lazy(() => import('./pages/Hizmetler/DestekHizmetleri'));
const EntegrasyonHizmetleri = lazy(() => import('./pages/Hizmetler/EntegrasyonHizmetleri'));

// KPE sayfası
const KPE = lazy(() => import('./pages/KPE/kpe'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={
                <main>
                  <Sections.Hero />
                  <Sections.Products />
                  <Sections.Solutions />
                  <Sections.Services />
                  <Sections.Testimonials />
                  <Sections.LatestArticles />
                </main>
              } />
              <Route path="/iletisim-bilgileri" element={<ContactPage />} />
              <Route path="/blog/makaleler" element={<BlogMakaleler />} />
              <Route path="/blog/videolar" element={<BlogVideolar />} />
              <Route path="/blog/kaynaklar" element={<BlogKaynaklar />} />
              <Route path="/referanslar/basari-hikayeleri" element={<BasariHikayeleri />} />
              <Route path="/referanslar/musteri-yorumlari" element={<MusteriYorumlari />} />
              
              {/* Çözümler route'ları */}
              <Route path="/sektorel" element={<SektorelCozumler />} />
              <Route path="/e-ticaret" element={<ETicaret />} />
              <Route path="/is-surecleri" element={<IsSurecleri />} />

              {/* Ürünler route'ları */}
              <Route path="/tum-urunler" element={<TumUrunler />} />
              <Route path="/demolar" element={<Demolar />} />
              <Route path="/yeni-urunler" element={<YeniUrunler />} />

              {/* Hizmetler route'ları */}
              <Route path="/projelendirme" element={<Projelendirme />} />
              <Route path="/uyarlama" element={<UyarlamaSureci />} />
              <Route path="/destek" element={<DestekHizmetleri/>} />
              <Route path="/entegrasyon" element={<EntegrasyonHizmetleri />} />

              {/* Hakkımızda Sayfaları */}
              <Route path="/hakkimizda/firma-hakkinda" element={<FirmaHakkinda />} />
              <Route path="/hakkimizda/ekibimiz" element={<Ekibimiz />} />
              <Route path="/hakkimizda/tarihce" element={<Tarihce />} />

              {/* KPE sayfası */}
              <Route path="/kpe" element={<KPE />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 