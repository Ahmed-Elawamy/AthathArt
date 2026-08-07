import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../../data';
import { Reveal } from '../Reveal';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-luxe">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="section-eyebrow">الأسئلة الشائعة</span>
            <h2 className="mt-3 font-display text-3xl font-black text-ink-950 sm:text-4xl lg:text-5xl">
              كل ما تريد معرفته
            </h2>
            <p className="mt-4 text-pretty text-lg text-ink-700">
              جمعنا لك أكثر الأسئلة شيوعاً. لم تجد إجابتك؟ تواصل معنا عبر واتساب في أي وقت.
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="divide-y divide-ink-950/10 rounded-3xl bg-cream px-2 ring-1 ring-ink-950/5">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="px-4">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-right"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-lg font-black text-ink-950">{f.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                          isOpen ? 'bg-gold text-ink-950' : 'bg-ink-950/5 text-ink-700'
                        }`}
                      >
                        <Plus size={18} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-pretty leading-relaxed text-ink-700">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
