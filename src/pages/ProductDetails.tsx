import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, X, Truck, ShieldCheck, Wrench, MessageCircle, ChevronLeft,
  Ruler, Box, ArrowLeft, Minus, Plus,
} from 'lucide-react';
import { products, reviews as allReviews } from '../data';
import { formatPrice, whatsappLink } from '../lib/site';
import { Stars } from '../components/Stars';
import ZoomImage from '../components/ZoomImage';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import { Reveal } from '../components/Reveal';
import type { Product } from '../types';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);

  const [colorIdx, setColorIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [openSpec, setOpenSpec] = useState<number | null>(0);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      const stored = JSON.parse(localStorage.getItem('furud_recent') || '[]');
      const filtered = stored.filter((s: string) => s !== product.slug);
      const updated = [product.slug, ...filtered].slice(0, 4);
      localStorage.setItem('furud_recent', JSON.stringify(updated));
      setRecentSlugs(filtered.slice(0, 3)); // show up to 3 others
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-cream pt-28 text-center">
        <h1 className="font-display text-3xl font-black text-ink-950">المنتج غير موجود</h1>
        <p className="mt-3 text-ink-600">ربما تم حذف هذا المنتج أو الرابط غير صحيح.</p>
        <button onClick={() => navigate('/products')} className="btn-gold mt-6">العودة للمنتجات</button>
      </div>
    );
  }

  const color = product.colors[colorIdx];
  const images = color.images;
  const mainImg = images[imgIdx];
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const productReviews = allReviews.filter((r) => r.productSlug === product.slug);
  const related = products.filter((p) => product.relatedSlugs.includes(p.slug));
  const recentlyViewed = products.filter((p) => recentSlugs.includes(p.slug));

  const orderMsg = `مرحباً فُرُود، أرغب في طلب:\n• ${product.name}\n• اللون: ${color.name}\n• المقاس: ${product.sizes[sizeIdx]}\n• الكمية: ${qty}\n• السعر: ${formatPrice(product.price * qty)} ج.م`;

  const specSections = [
    { title: 'الأبعاد', icon: Ruler, items: product.dimensions },
    { title: 'الخامات الأساسية', icon: Wrench, items: product.materials.map(m => ({ label: 'خامة', value: m })) },
    { title: 'المواصفات التقنية', icon: Box, items: product.specs },
  ];

  return (
    <div className="bg-cream pt-28 pb-24 lg:pt-32">
      <div className="container-luxe">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-ink-500">
          <Link to="/" className="transition hover:text-ink-900">الرئيسية</Link>
          <ChevronLeft size={14} />
          <Link to="/products" className="transition hover:text-ink-900">المنتجات</Link>
          <ChevronLeft size={14} />
          <span className="text-ink-900">{product.name}</span>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Gallery — large, calm */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-[1fr_84px]">
              {/* Main image with smooth transition on color change */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-4xl bg-white shadow-luxe ring-1 ring-ink-950/[0.04]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mainImg + imgIdx}
                    src={mainImg}
                    alt={`${product.name} - ${color.name}`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
                {discount > 0 && (
                  <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink-900 shadow-soft backdrop-blur">
                    خصم {discount}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto no-scrollbar sm:flex-col">
                {images.map((im, i) => (
                  <button
                    key={im + i}
                    onClick={() => setImgIdx(i)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 transition-all ${
                      i === imgIdx ? 'ring-gold' : 'ring-ink-200 hover:ring-ink-300'
                    }`}
                  >
                    <img src={im} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky purchase section */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="text-sm font-bold text-gold-600">{product.categoryName}</span>
              <h1 className="mt-2 font-display text-3xl font-black leading-tight text-ink-950 sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <Stars rating={product.rating} size={16} />
                <span className="text-sm text-ink-500">
                  {product.rating} ({product.reviewCount} تقييم)
                </span>
              </div>

              <div className="mt-7 flex items-end gap-3">
                <p className="font-display text-4xl font-black text-ink-950">
                  {formatPrice(product.price)}
                  <span className="ms-1 text-lg font-bold text-ink-500">ج.م</span>
                </p>
                {product.oldPrice && (
                  <p className="pb-1.5 text-base font-medium text-ink-400 line-through">
                    {formatPrice(product.oldPrice)} ج.م
                  </p>
                )}
              </div>

              <p className="mt-6 max-w-md text-pretty leading-[1.8] text-ink-600">{product.description}</p>

              {/* Colors — premium selector */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-ink-900">اللون</p>
                  <span className="text-sm text-ink-500">{color.name}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setColorIdx(i);
                        setImgIdx(0);
                      }}
                      className={`relative h-9 w-9 rounded-full transition-all duration-300 ${
                        i === colorIdx
                          ? 'ring-2 ring-gold ring-offset-2 ring-offset-cream'
                          : 'ring-1 ring-ink-200 hover:ring-ink-400'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={c.name}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-8">
                <p className="text-sm font-bold text-ink-900">المقاس</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {product.sizes.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => setSizeIdx(i)}
                      className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                        i === sizeIdx
                          ? 'bg-ink-950 text-white'
                          : 'bg-white text-ink-700 ring-1 ring-ink-200 hover:ring-ink-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + stock */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center rounded-2xl bg-white ring-1 ring-ink-200">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-12 w-12 items-center justify-center text-ink-500 transition hover:text-ink-900"
                    aria-label="إنقاص"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-display text-lg font-bold text-ink-950">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stockCount, q + 1))}
                    className="flex h-12 w-12 items-center justify-center text-ink-500 transition hover:text-ink-900"
                    aria-label="زيادة"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {product.inStock ? (
                  <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <Check size={16} /> متوفر
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm font-medium text-rose-500">
                    <X size={16} /> نفد المخزون
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href={whatsappLink(orderMsg)}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn-gold w-full !py-4 text-base ${!product.inStock ? 'pointer-events-none opacity-40' : ''}`}
                >
                  <MessageCircle size={20} />
                  اطلب عبر واتساب
                </a>
              </div>

              {/* Trust — minimal, no boxes */}
              <div className="mt-8 flex items-center justify-between border-t border-ink-200 pt-6">
                {[
                  { icon: Truck, label: 'توصيل سريع' },
                  { icon: ShieldCheck, label: 'ضمان 5 سنوات' },
                  { icon: Wrench, label: 'تركيب سهل' },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-2 text-center">
                    <b.icon size={20} className="text-ink-500" />
                    <span className="text-xs font-medium text-ink-600">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Specs accordion */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <h2 className="font-display text-2xl font-black text-ink-950 sm:text-3xl">المواصفات والتفاصيل</h2>
          </Reveal>
          <div className="mt-8 max-w-3xl divide-y divide-ink-200 border-t border-b border-ink-200">
            {specSections.map((sec, si) => {
              const isOpen = openSpec === si;
              return (
                <div key={sec.title}>
                  <button
                    onClick={() => setOpenSpec(isOpen ? null : si)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-right"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3 font-display text-lg font-bold text-ink-950">
                      <sec.icon size={20} className="text-ink-400" />
                      {sec.title}
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }}>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400">
                        <Plus size={18} />
                      </span>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6">
                          <table className="w-full text-sm">
                            <tbody>
                              {sec.items.map((d) => (
                                <tr key={d.label} className="border-b border-ink-100 last:border-0">
                                  <td className="py-3 font-medium text-ink-500">{d.label}</td>
                                  <td className="py-3 text-left font-bold text-ink-950">{d.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features — clean list */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <h2 className="font-display text-2xl font-black text-ink-950 sm:text-3xl">المميزات</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-4xl">
            {product.features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Check size={14} className="text-gold-600" />
                </span>
                <p className="text-pretty font-medium text-ink-700">{f}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reviews — compact */}
        {productReviews.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <Reveal>
              <h2 className="font-display text-2xl font-black text-ink-950 sm:text-3xl">آراء العملاء</h2>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:max-w-4xl">
              {productReviews.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                  className="rounded-3xl bg-white p-6 ring-1 ring-ink-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                        style={{ backgroundColor: r.avatarColor }}
                      >
                        {r.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-display font-bold text-ink-950">{r.name}</p>
                        <p className="text-xs text-ink-500">{r.city} • {r.date}</p>
                      </div>
                    </div>
                    <Stars rating={r.rating} size={13} />
                  </div>
                  <p className="mt-4 line-clamp-3 text-pretty leading-relaxed text-ink-600">{r.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <Reveal>
              <h2 className="font-display text-2xl font-black text-ink-950 sm:text-3xl">منتجات ذات صلة</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickView} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <Reveal>
              <h2 className="font-display text-2xl font-black text-ink-950 sm:text-3xl">شوهد مؤخراً</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentlyViewed.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickView} />
              ))}
            </div>
          </div>
        )}
      </div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
