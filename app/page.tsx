import Header from './landing/components/Header';
import HeroSection from './landing/components/HeroSection';
import BestSellers from './landing/components/BestSellers';
import FeaturedCategories from './landing/components/FeaturedCategories';
import FeaturedProducts from './landing/components/FeaturedProducts';
import PromoSection from './landing/components/PromoSection';
import MoreThanPaperclips from './landing/components/MoreThanPaperclips';
import Footer from './landing/components/Footer';

export default function Home() {
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
