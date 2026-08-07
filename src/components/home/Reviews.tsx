import { motion } from 'framer-motion';
import { reviews } from '../../data';
import { Stars } from '../Stars';
import { Reveal } from '../Reveal';

export default function Reviews() {
  const short = reviews.slice(0, 4);

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="container-luxe">
        <Reveal className="max-w-xl">
          <span className="section-eyebrow">آراء عملائنا</span>
          <h2 className="mt-4 font-display text-3xl font-black text-ink-950 sm:text-4xl lg:text-5xl">
            ثقة تُبنى بالتفاصيل
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-500">
            أكثر من 12,000 عميل اختاروا فُرُود.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-2 max-w-4xl">
          {short.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-white p-7 ring-1 ring-ink-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                    style={{ backgroundColor: r.avatarColor }}
                  >
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display font-bold text-ink-950">{r.name}</p>
                    <p className="text-xs text-ink-500">{r.city}</p>
                  </div>
                </div>
                <Stars rating={r.rating} size={14} />
              </div>
              <p className="mt-4 line-clamp-2 text-pretty leading-relaxed text-ink-600">{r.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
