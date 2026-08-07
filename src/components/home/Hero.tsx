import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Maximize } from 'lucide-react';
import FocusMode from './FocusMode';

export default function Hero() {
  const [showFocusMode, setShowFocusMode] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 pt-32 pb-24 lg:pt-40 lg:pb-36">
      <div className="container-luxe relative">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* Text — left 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 text-center lg:text-right"
          >
            <span className="inline-block rounded-full bg-white/8 px-4 py-1.5 text-sm font-bold text-gold-300 ring-1 ring-white/10">
              صناعة مصرية فاخرة
            </span>

            <h1 className="mt-7 font-display text-4xl font-black leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
              مكاتب تُلهم الإنتاج
            </h1>

            <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-white/55 lg:mx-0">
              خامات راقية وهندسة مريحة — صُممت لتمنح مساحة عملك حضوراً هادئاً.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link to="/products" className="btn-gold w-full sm:w-auto">
                تصفح المنتجات
                <ArrowLeft size={18} />
              </Link>
              <button onClick={() => setShowFocusMode(true)} className="btn-outline-light w-full sm:w-auto">
                <Maximize size={18} />
                استكشف المنتج
              </button>
            </div>
          </motion.div>

          {/* Product image — right 7 cols, becomes the focal point */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/30469973/pexels-photo-30469973.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="مكتب ألعاب فاخر"
                className="aspect-[4/3] w-full rounded-4xl object-cover"
              />
              <div className="absolute inset-0 rounded-4xl bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
      </section>

      <AnimatePresence>
        {showFocusMode && <FocusMode onClose={() => setShowFocusMode(false)} />}
      </AnimatePresence>
    </>
  );
}
