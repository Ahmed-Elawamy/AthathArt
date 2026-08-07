import { motion } from 'framer-motion';
import { Gem, ShieldCheck, Truck, Wrench, Headphones } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '../Reveal';

const items: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Gem, title: 'خامات فاخرة', desc: 'أخشاب صلبة وفولاذ مقوّى — نختار ما يدوم.' },
  { icon: ShieldCheck, title: 'ضمان 5 سنوات', desc: 'ضمان شامل يغطي الهيكل والسطح والأدراج.' },
  { icon: Truck, title: 'شحن سريع', desc: 'توصيل خلال 2-4 أيام عمل لكل المحافظات.' },
  { icon: Wrench, title: 'تجميع سهل', desc: 'كتيب واضح وأدوات مرفقة — تركيب في 30 دقيقة.' },
  { icon: Headphones, title: 'دعم مخصص', desc: 'فريق متخصص يرد على استفساراتك via واتساب.' },
];

export default function WhyUs() {
  return (
    <section className="bg-ink-950 py-24 lg:py-32">
      <div className="container-luxe">
        <Reveal className="max-w-xl">
          <span className="section-eyebrow text-ink-400">لماذا فُرُود</span>
          <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            الجودة في كل تفصيلة
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-white/50">
            نؤمن أن المكتب مساحة إنتاج — لا قطعة أثاث.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.08 }}
              className="flex flex-col"
            >
              <it.icon size={28} className="text-white/80" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-lg font-bold text-white">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
