import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BestSellers from './components/BestSellers';
import FeaturedCategories from './components/FeaturedCategories';
import FeaturedProducts from './components/FeaturedProducts';
import PromoSection from './components/PromoSection';
import MoreThanPaperclips from './components/MoreThanPaperclips';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <BestSellers />
      <FeaturedCategories />
      <FeaturedProducts title="Featured Products" />
      <FeaturedProducts title="New Products" />
      <PromoSection />
      <MoreThanPaperclips />
      <Footer />
    </div>
  );
}
