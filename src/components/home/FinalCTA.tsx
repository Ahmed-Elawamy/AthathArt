import { Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { whatsappLink } from '../../lib/site';
import { siteConfig } from '../../lib/siteConfig';
import { Reveal } from '../Reveal';

export function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(/final-cta-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="container-luxe relative z-20">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            جاهز تطور مساحة عملك؟
          </h2>
          <p className="text-xl text-white/80 mb-10">
            اختر مكتبك واطلبه الآن بسهولة.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="btn-gold w-full sm:w-auto">
              <span>تصفح المنتجات</span>
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Link>
            
            <a 
              href={whatsappLink('أهلاً، أرغب في الاستفسار عن منتجاتكم.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light w-full sm:w-auto text-white border-white/30 hover:bg-white/10"
            >
              <MessageCircle className="w-5 h-5 ml-2" />
              <span>اطلب عبر واتساب</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
