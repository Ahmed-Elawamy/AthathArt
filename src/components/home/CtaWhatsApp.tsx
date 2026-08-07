import { motion } from 'framer-motion';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { whatsappLink } from '../../lib/site';
import { siteConfig } from '../../lib/siteConfig';

export default function CtaWhatsApp() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-4xl bg-ink-950 px-8 py-16 text-center lg:px-16 lg:py-20"
        >
          <h2 className="font-display text-3xl font-black text-white text-balance sm:text-4xl lg:text-5xl">
            اطلب مكتبك الفاخر عبر واتساب
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg leading-relaxed text-white/50">
            فريقنا جاهز لمساعدتك في اختيار المكتب المثالي.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={whatsappLink(`مرحباً ${siteConfig.brandName}، أرغب في طلب مكتب`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-8 py-4 font-bold text-ink-950 transition-all duration-300 hover:bg-gold-400 hover:-translate-y-0.5"
            >
              <MessageCircle size={20} />
              ابدأ المحادثة
            </a>
            <a
              href={whatsappLink('أرغب في كتالوج المنتجات')}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-light"
            >
              اطلب الكتالوج
              <ArrowLeft size={18} />
            </a>
          </div>

          <p className="mt-8 text-sm font-medium text-white/40" dir="ltr">{siteConfig.phone}</p>
        </motion.div>
      </div>
    </section>
  );
}
