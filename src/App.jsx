import HeroSection from './components/HeroSection.jsx';
import CategorySection from './components/CategorySection.jsx';
import BestsellerSection from './components/BestsellerSection.jsx';
import SofaSection from './components/SofaSection.jsx';
import OurProductsSection from './components/OurProductsSection.jsx';
import BannerCarousel from './components/BannerCarousel.jsx';
import InfoStrip from './components/InfoStrip.jsx';
import Footer from './components/Footer.jsx';
import AboutSection from './components/AboutSection.jsx';
import FaqSection from './components/FaqSection.jsx';
import BlogSection from './components/BlogSection.jsx';
import ContactSection from './components/ContactSection.jsx';

export default function App() {
  return (
    <>
    <main>
      <HeroSection />
      <CategorySection />
      <BestsellerSection />
      <SofaSection />
      <OurProductsSection />
      <InfoStrip />
      <BannerCarousel />
      <AboutSection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
    </main>
    <Footer />
    </>
  );
}
