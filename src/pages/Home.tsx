import Hero from '../components/home/Hero';
import CategoriesSection from '../components/home/CategoriesSection';
import ProductSection from '../components/home/ProductSection';
import WhyUs from '../components/home/WhyUs';
import Reviews from '../components/home/Reviews';
import Faq from '../components/home/Faq';
import CtaWhatsApp from '../components/home/CtaWhatsApp';
import MarqueeStrip from '../components/home/MarqueeStrip';
import { products } from '../data';

export default function Home() {
  const featured = products.slice(0, 8); // 8 featured
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 6);
  const newArrivals = products.filter(p => p.isNew).slice(0, 6);
  const specialOffers = products.filter(p => p.oldPrice && p.oldPrice > p.price).slice(0, 4);

  return (
    <>
      <Hero />
      <MarqueeStrip />
      <CategoriesSection />
      
      <ProductSection 
        title="مختارات فُرُود"
        eyebrow="تصاميم مميزة"
        description="مجموعة من أفضل مكاتبنا التي تمزج بين الجمال والعملية."
        products={featured}
        bgColor="bg-white"
      />
      
      <ProductSection 
        title="الأكثر مبيعًا"
        eyebrow="ثقة العملاء"
        description="المنتجات التي حازت على إعجاب الآلاف من عملائنا بفضل جودتها العالية."
        products={bestSellers}
        bgColor="bg-ink-50"
      />

      <WhyUs />
      
      <ProductSection 
        title="وصل حديثاً"
        eyebrow="أحدث الإضافات"
        description="اكتشف أحدث التصاميم التي تمت إضافتها مؤخراً لتواكب أحدث صيحات الديكور."
        products={newArrivals}
        bgColor="bg-white"
      />
      
      <ProductSection 
        title="عروض مميزة"
        eyebrow="خصومات استثنائية"
        description="استفد من خصوماتنا الحصرية على مجموعة مختارة من المكاتب الفاخرة."
        products={specialOffers}
        bgColor="bg-ink-50"
      />

      <Reviews />
      <Faq />
      <CtaWhatsApp />
    </>
  );
}
