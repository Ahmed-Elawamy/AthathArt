import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../../data';
import { Reveal } from '../Reveal';

export default function CategoriesSection() {
  const selected = categories.filter(c => ['gaming', 'office', 'study', 'l-shaped'].includes(c.slug));

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="container-luxe">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-black text-ink-950 sm:text-4xl lg:text-5xl">
            كل مساحة لها مكتبها
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-500">
            اختر الفئة التي تناسب مساحتك واكتشف مكاتب مصممة خصيصاً لها.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {selected.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/products?category=${c.slug}`}
                className="group relative block h-full overflow-hidden rounded-4xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-ink-100">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Lighter overlay — image stays visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-ink-950/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-medium tracking-widest text-white/60">{c.tagline}</p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-white">{c.name}</h3>
                  <p className="mt-2 text-sm text-white/70 line-clamp-2">{c.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-all group-hover:gap-3 group-hover:text-white">
                    استكشف الآن
                    <ArrowLeft size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
