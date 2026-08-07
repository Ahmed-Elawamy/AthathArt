import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice, whatsappLink } from '../lib/site';

interface ProductCardProps {
  product: Product;
  onQuickView: (p: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onQuickView, index = 0 }: ProductCardProps) {
  const [colorIdx, setColorIdx] = useState(0);
  const color = product.colors[colorIdx];
  const img = color.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink-100">
        <img
          src={img}
          alt={`${product.name} - ${color.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
            <span className="text-sm font-bold text-ink-700">نفد المخزون</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink-950">
          <Link to={`/products/${product.slug}`} className="transition hover:text-gold-600">
            {product.name}
          </Link>
        </h3>

        {/* Colors */}
        <div className="mt-3 flex items-center gap-2">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setColorIdx(i)}
              className={`h-5 w-5 rounded-full ring-1 ring-offset-2 ring-offset-cream transition-all ${
                i === colorIdx ? 'ring-gold' : 'ring-ink-200'
              }`}
              style={{ backgroundColor: c.hex }}
              aria-label={c.name}
              title={c.name}
            />
          ))}
        </div>

        {/* Price + WhatsApp */}
        <div className="mt-5 flex items-center justify-between">
          <p className="font-display text-xl font-black text-ink-950">
            {formatPrice(product.price)} <span className="text-sm font-bold text-ink-500">ج.م</span>
          </p>
          {product.inStock && (
            <a
              href={whatsappLink(`أرغب في طلب: ${product.name} (${color.name})`)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-white transition-all duration-300 hover:bg-gold hover:text-ink-950"
              aria-label="اطلب عبر واتساب"
              title="اطلب عبر واتساب"
            >
              <MessageCircle size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Hidden quick-view trigger on hover — minimal */}
      <button
        onClick={() => onQuickView(product)}
        className="sr-only"
        aria-label={`عرض سريع لـ ${product.name}`}
      />
    </motion.article>
  );
}
