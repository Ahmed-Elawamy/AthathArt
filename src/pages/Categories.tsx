import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, Gamepad2, Briefcase, CornerDownRight, GraduationCap, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { categories, products } from '../data';
import { Reveal } from '../components/Reveal';

const iconMap: Record<string, LucideIcon> = {
  Gamepad2, Briefcase, CornerDownRight, GraduationCap, Lightbulb,
};

export default function Categories() {
  return (
    <div className="bg-cream pt-28 pb-20 lg:pt-32">
      <div className="container-luxe">
        <nav className="flex items-center gap-1.5 text-sm font-bold text-ink-700">
          <Link to="/" className="hover:text-gold-600">الرئيسية</Link>
          <ChevronLeft size={14} />
          <span className="text-ink-950">التصنيفات</span>
        </nav>

        <Reveal className="mt-6 max-w-2xl">
          <h1 className="font-display text-4xl font-black text-ink-950 sm:text-5xl">تصنيفاتنا</h1>
          <p className="mt-4 text-pretty text-lg text-ink-700">
            خمس فئات رئيسية تغطي كل احتياجات مساحة العمل — من مكاتب الألعاب إلى الإكسسوارات الذكية.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {categories.map((c, i) => {
            const Icon = iconMap[c.icon] ?? Briefcase;
            const count = products.filter((p) => p.category === c.slug).length;
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/products?category=${c.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-3xl shadow-luxe ring-1 ring-ink-950/5 sm:flex-row"
                >
                  <div className="relative h-56 overflow-hidden bg-ink-950 sm:w-2/5">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent sm:bg-gradient-to-l" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center bg-white p-7">
                    <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-ink-950 shadow-gold">
                      <Icon size={22} />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-600">{c.tagline}</p>
                    <h2 className="mt-1 font-display text-2xl font-black text-ink-950">{c.name}</h2>
                    <p className="mt-2 text-pretty leading-relaxed text-ink-700">{c.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-ink-700">{count} منتج</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-black text-ink-950 transition-all group-hover:gap-3 group-hover:text-gold-600">
                        تصفح
                        <ArrowLeft size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
