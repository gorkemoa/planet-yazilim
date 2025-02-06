import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/GlobalStyles';
import LoadingFallback from './components/common/LoadingFallback';
import Navbar from './components/Navbar';
import BlogMakaleler from './pages/Blog/BlogMakaleler';
import BlogVideolar from './pages/Blog/BlogVideolar';
import BlogKaynaklar from './pages/Blog/BlogKaynaklar';
import FirmaHakkinda from './pages/Hakkimizda/FirmaHakkinda';
import Ekibimiz from './pages/Hakkimizda/Ekibimiz';
import Tarihce from './pages/Hakkimizda/Tarihce';

// Lazy load components
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Products = lazy(() => import('./sections/Products'));
const Services = lazy(() => import('./sections/Services'));
const Solutions = lazy(() => import('./sections/Solutions'));
const LearnMore = lazy(() => import('./sections/LearnMore'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const LatestArticles = lazy(() => import('./sections/LatestArticles'));
const ContactPage = lazy(() => import('./pages/İletişim/ContactPage'));
const LocationPage = lazy(() => import('./pages/İletişim/LocationPage'));

// Referanslar sayfaları
const BasariHikayeleri = lazy(() => import('./pages/Referanslar/BasariHikayeleri'));
const SektorelReferanslar = lazy(() => import('./pages/Referanslar/SektorelReferanslar'));
const MusteriYorumlari = lazy(() => import('./pages/Referanslar/MusteriYorumlari'));
const VakaCalismalari = lazy(() => import('./pages/Referanslar/VakaCalismalari'));

// Çözümler sayfaları
const SektorelCozumler = lazy(() => import('./pages/Cozumler/SektorelCozumler'));
const ETicaret = lazy(() => import('./pages/Cozumler/ETicaret'));
const IsSurecleri = lazy(() => import('./pages/Cozumler/IsSurecleri'));

// Ürünler sayfaları
const TumUrunler = lazy(() => import('./pages/Urunler/TumUrunler'));
const Demolar = lazy(() => import('./pages/Urunler/Demolar'));
const YeniUrunler = lazy(() => import('./pages/Urunler/YeniUrunler'));

// Hizmetler sayfaları
const CRMCozumleri = lazy(() => import('./pages/Hizmetler/CRMCozumleri'));
const ERPSistemleri = lazy(() => import('./pages/Hizmetler/ERPSistemleri'));
const YazilimGelistirme = lazy(() => import('./pages/Hizmetler/YazilimGelistirme'));
const EntegrasyonHizmetleri = lazy(() => import('./pages/Hizmetler/EntegrasyonHizmetleri'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={
              <main>
                <Hero />
                <About />
                <LearnMore />
                <Products />
                <Solutions />
                <Services />
                <Testimonials />
                <LatestArticles />
              </main>
            } />
            <Route path="/iletisim-bilgileri" element={<ContactPage />} />
            <Route path="/lokasyon" element={<LocationPage />} />
            <Route path="/blog/makaleler" element={<BlogMakaleler />} />
            <Route path="/blog/videolar" element={<BlogVideolar />} />
            <Route path="/blog/kaynaklar" element={<BlogKaynaklar />} />
            <Route path="/referanslar/basari-hikayeleri" element={<BasariHikayeleri />} />
            <Route path="/referanslar/sektorel-referanslar" element={<SektorelReferanslar />} />
            <Route path="/referanslar/musteri-yorumlari" element={<MusteriYorumlari />} />
            <Route path="/referanslar/vaka-calismalari" element={<VakaCalismalari />} />
            
            {/* Çözümler route'ları */}
            <Route path="/sektorel" element={<SektorelCozumler />} />
            <Route path="/e-ticaret" element={<ETicaret />} />
            <Route path="/is-surecleri" element={<IsSurecleri />} />

            {/* Ürünler route'ları */}
            <Route path="/tum-urunler" element={<TumUrunler />} />
            <Route path="/demolar" element={<Demolar />} />
            <Route path="/yeni-urunler" element={<YeniUrunler />} />

            {/* Hizmetler route'ları */}
            <Route path="/crm" element={<CRMCozumleri />} />
            <Route path="/erp" element={<ERPSistemleri />} />
            <Route path="/yazilim" element={<YazilimGelistirme />} />
            <Route path="/entegrasyon" element={<EntegrasyonHizmetleri />} />

            {/* Hakkımızda Sayfaları */}
            <Route path="/hakkimizda/firma-hakkinda" element={<FirmaHakkinda />} />
            <Route path="/hakkimizda/ekibimiz" element={<Ekibimiz />} />
            <Route path="/hakkimizda/tarihce" element={<Tarihce />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App; 