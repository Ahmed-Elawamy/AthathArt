import Hero from '../components/home/Hero';
import BenefitsStrip from '../components/home/BenefitsStrip';
import CategoriesSection from '../components/home/CategoriesSection';
import ProductSection from '../components/home/ProductSection';
import DesignShowcase from '../components/home/DesignShowcase';
import Reviews from '../components/home/Reviews';
import { FinalCTA } from '../components/home/FinalCTA';
import { products } from '../data';

export default function Home() {
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 4);

  return (
    <>
      <Hero />
      <BenefitsStrip />
      <CategoriesSection />
      
      <ProductSection 
        title="الأكثر مبيعًا"
        eyebrow="ثقة العملاء"
        description="المنتجات الأكثر مبيعاً ونالت إعجاب عملائنا بجودتها ومتانتها."
        products={bestSellers}
        bgColor="bg-white"
        linkTo="/products?filter=bestseller"
      />

      <DesignShowcase />
      
      <Reviews />
      
      <FinalCTA />
    </>
  );
}
