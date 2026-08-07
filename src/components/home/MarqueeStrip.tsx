import { motion } from 'framer-motion';
import { Gem, ShieldCheck, Truck, Wrench } from 'lucide-react';

const items = [
  { icon: Gem, text: 'خامات فاخرة' },
  { icon: ShieldCheck, text: 'ضمان 5 سنوات' },
  { icon: Truck, text: 'توصيل سريع' },
  { icon: Wrench, text: 'تركيب سهل' },
];

export default function MarqueeStrip() {
  return (
    <div className="border-b border-ink-200 bg-white py-5">
      <div className="container-luxe overflow-hidden">
        <motion.div
          className="flex items-center gap-16 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          {[...items, ...items, ...items, ...items, ...items, ...items].map((it, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-medium text-ink-400">
              <it.icon size={16} strokeWidth={1.5} />
              {it.text}
              <span className="ms-10 text-ink-200">·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
