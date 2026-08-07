import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Check, MessageCircle } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice, whatsappLink } from '../lib/site';
import { Stars } from './Stars';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const [colorIdx, setColorIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (product) {
      setColorIdx(0);
      setImgIdx(0);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (product) document.addEventListener('keydown', onKey);
    document.body.style.overflow = product ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  const color = product?.colors[colorIdx];
  const images = color?.images ?? [];
  const img = images[imgIdx] ?? images[0];

  return (
    <AnimatePresence>
      {product && color && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-luxe-lg md:grid-cols-2"
          >
            <button
              onClick={onClose}
              className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-950 shadow-lg transition hover:bg-white"
              aria-label="إغلاق"
            >
              <X size={20} />
            </button>

            <div className="relative bg-ink-950/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={img}
                  src={img}
                  alt={`${product.name} - ${color.name}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-64 w-full object-cover md:h-full"
                />
              </AnimatePresence>
              <div className="absolute inset-x-3 bottom-3 flex gap-2">
                {images.map((im, i) => (
                  <button
                    key={im}
                    onClick={() => setImgIdx(i)}
                    className={`h-12 w-16 overflow-hidden rounded-lg ring-2 transition ${
                      i === imgIdx ? 'ring-gold' : 'ring-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={im} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col overflow-y-auto p-6 md:p-8">
              <span className="text-xs font-bold text-gold-600">{product.categoryName}</span>
              <h3 className="mt-1 font-display text-2xl font-black text-ink-950">{product.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <Stars rating={product.rating} size={15} />
                <span className="text-sm font-bold text-ink-700">({product.reviewCount} تقييم)</span>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-700">{product.description}</p>

              <div className="mt-4">
                <p className="text-xs font-bold text-ink-700">الألوان المتاحة</p>
                <div className="mt-2 flex items-center gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setColorIdx(i);
                        setImgIdx(0);
                      }}
                      className={`h-7 w-7 rounded-full ring-2 ring-offset-2 ring-offset-white transition ${
                        i === colorIdx ? 'ring-gold' : 'ring-ink-950/15'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={c.name}
                      title={c.name}
                    />
                  ))}
                  <span className="ms-1 text-sm font-bold text-ink-900">{color.name}</span>
                </div>
              </div>

              <ul className="mt-4 grid grid-cols-2 gap-2">
                {product.shortSpecs.map((s) => (
                  <li key={s} className="flex items-center gap-1.5 text-xs font-bold text-ink-700">
                    <Check size={14} className="text-gold-600" /> {s}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <div className="flex items-end gap-3">
                  <p className="font-display text-3xl font-black text-ink-950">
                    {formatPrice(product.price)} <span className="text-base font-bold text-ink-700">ج.م</span>
                  </p>
                  {product.oldPrice && (
                    <p className="pb-1 text-sm font-bold text-ink-700/60 line-through">
                      {formatPrice(product.oldPrice)} ج.م
                    </p>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to={`/products/${product.slug}`} className="btn-dark flex-1 !py-3 text-sm">
                    التفاصيل الكاملة
                    <ArrowLeft size={16} />
                  </Link>
                  <a
                    href={whatsappLink(`أرغب في طلب: ${product.name} (${color.name}) بسعر ${formatPrice(product.price)} ج.م`)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold flex-1 !py-3 text-sm"
                  >
                    <MessageCircle size={16} />
                    اطلب الآن
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
