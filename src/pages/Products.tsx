import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, Check, ChevronLeft } from 'lucide-react';
import { products, categories } from '../data';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import { formatPrice } from '../lib/site';

const ALL_MATERIALS = Array.from(new Set(products.flatMap((p) => p.materials)));
const ALL_SIZES = Array.from(new Set(products.flatMap((p) => p.sizes)));
const ALL_COLORS = Array.from(new Set(products.flatMap((p) => p.colors.map((c) => c.name))));

const MAX_PRICE = Math.max(...products.map((p) => p.price));

type SortKey = 'featured' | 'newest' | 'bestseller' | 'price-asc' | 'price-desc' | 'rating';

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const category = params.get('category') || '';
  const color = params.get('color') || '';
  const material = params.get('material') || '';
  const size = params.get('size') || '';
  const availability = params.get('availability') || '';
  const maxPrice = Number(params.get('maxPrice') || MAX_PRICE);
  const sort = (params.get('sort') as SortKey) || 'featured';
  const bestsellerOnly = params.get('filter') === 'bestseller';

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams({}, { replace: true });

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (bestsellerOnly && !p.bestSeller) return false;
      if (category && p.category !== category) return false;
      if (color && !p.colors.some((c) => c.name === color)) return false;
      if (material && !p.materials.includes(material)) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (availability === 'in' && !p.inStock) return false;
      if (availability === 'out' && p.inStock) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'bestseller') list = [...list].sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    if (sort === 'newest') list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return list;
  }, [category, color, material, size, availability, maxPrice, sort, bestsellerOnly]);

  const activeCount = [category, color, material, size, availability].filter(Boolean).length + (maxPrice < MAX_PRICE ? 1 : 0);

  useEffect(() => {
    setMobileOpen(false);
  }, [params]);

  const FilterPanel = (
    <div className="space-y-7">
      <FilterGroup title="التصنيف">
        <div className="flex flex-col gap-1.5">
          <FilterRadio label="كل التصنيفات" checked={!category} onChange={() => update('category', '')} />
          {categories.map((c) => (
            <FilterRadio
              key={c.slug}
              label={c.name}
              checked={category === c.slug}
              onChange={() => update('category', c.slug)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="السعر">
        <input
          type="range"
          min={1000}
          max={MAX_PRICE}
          step={500}
          value={maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
          className="w-full accent-gold"
        />
        <div className="mt-2 flex items-center justify-between text-sm font-bold text-ink-700">
          <span>1,000 ج.م</span>
          <span className="text-gold-700">حتى {formatPrice(maxPrice)} ج.م</span>
        </div>
      </FilterGroup>

      <FilterGroup title="اللون">
        <div className="flex flex-wrap gap-2">
          <ColorChip label="الكل" active={!color} onClick={() => update('color', '')} />
          {ALL_COLORS.map((c) => {
            const hex = products.flatMap((p) => p.colors).find((x) => x.name === c)?.hex || '#999';
            return <ColorChip key={c} label={c} hex={hex} active={color === c} onClick={() => update('color', c)} />;
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="الخامة">
        <div className="flex flex-col gap-1.5">
          <FilterRadio label="كل الخامات" checked={!material} onChange={() => update('material', '')} />
          {ALL_MATERIALS.map((m) => (
            <FilterRadio key={m} label={m} checked={material === m} onChange={() => update('material', m)} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="المقاس">
        <div className="flex flex-col gap-1.5">
          <FilterRadio label="كل المقاسات" checked={!size} onChange={() => update('size', '')} />
          {ALL_SIZES.map((s) => (
            <FilterRadio key={s} label={s} checked={size === s} onChange={() => update('size', s)} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="التوفر">
        <div className="flex flex-col gap-1.5">
          <FilterRadio label="الكل" checked={!availability} onChange={() => update('availability', '')} />
          <FilterRadio label="متوفر" checked={availability === 'in'} onChange={() => update('availability', 'in')} />
          <FilterRadio label="نفد المخزون" checked={availability === 'out'} onChange={() => update('availability', 'out')} />
        </div>
      </FilterGroup>

      {activeCount > 0 && (
        <button onClick={clearAll} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-950/5 py-3 text-sm font-bold text-ink-700 transition hover:bg-ink-950/10">
          <X size={16} /> مسح كل الفلاتر ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-cream pt-28 pb-20 lg:pt-32">
      <div className="container-luxe">
        <nav className="flex items-center gap-1.5 text-sm font-bold text-ink-700">
          <Link to="/" className="hover:text-gold-600">الرئيسية</Link>
          <ChevronLeft size={14} />
          <span className="text-ink-950">المنتجات</span>
        </nav>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-3xl font-black text-ink-950 sm:text-4xl">
              {bestsellerOnly ? 'الأكثر مبيعًا' : category ? categories.find((c) => c.slug === category)?.name : 'كل المنتجات'}
            </h1>
            <p className="mt-2 text-ink-700">عرض {filtered.length} من أصل {products.length} منتج</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => update('sort', e.target.value)}
              className="rounded-2xl border border-ink-950/10 bg-white px-4 py-2.5 text-sm font-bold text-ink-900 focus:border-gold focus:outline-none"
            >
              <option value="featured">الأكثر تميزاً</option>
              <option value="newest">الأحدث</option>
              <option value="bestseller">الأكثر مبيعًا</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="price-asc">السعر من الأقل للأعلى</option>
              <option value="price-desc">السعر من الأعلى للأقل</option>
            </select>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-ink-950 px-4 py-2.5 text-sm font-bold text-white lg:hidden"
            >
              <SlidersHorizontal size={16} />
              فلترة
              {activeCount > 0 && <span className="rounded-full bg-gold px-1.5 text-xs text-ink-950">{activeCount}</span>}
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-luxe ring-1 ring-ink-950/5">
              <h2 className="flex items-center gap-2 font-display text-lg font-black text-ink-950">
                <SlidersHorizontal size={18} className="text-gold-600" />
                تصفية النتائج
              </h2>
              <div className="mt-6">{FilterPanel}</div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-24 text-center shadow-luxe ring-1 ring-ink-950/5">
                <p className="font-display text-2xl font-black text-ink-950">لا توجد نتائج مطابقة</p>
                <p className="mt-2 text-ink-700">جرّب تعديل الفلاتر أو مسحها لعرض كل المنتجات.</p>
                <button onClick={clearAll} className="btn-gold mt-6">مسح الفلاتر</button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickView} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <motion.div
        initial={false}
        animate={mobileOpen ? 'open' : 'closed'}
        className="fixed inset-0 z-[60] lg:hidden"
      >
        {mobileOpen && <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />}
        <motion.div
          variants={{ open: { x: 0 }, closed: { x: '100%' } }}
          transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto bg-white p-6 shadow-luxe-lg"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-black">تصفية النتائج</h2>
            <button onClick={() => setMobileOpen(false)} className="rounded-xl p-2 hover:bg-ink-950/5" aria-label="إغلاق">
              <X size={22} />
            </button>
          </div>
          <div className="mt-6">{FilterPanel}</div>
        </motion.div>
      </motion.div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-display text-sm font-black uppercase tracking-wider text-ink-900">{title}</h3>
      {children}
    </div>
  );
}

function FilterRadio({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-right transition hover:bg-ink-950/5">
      <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${checked ? 'border-gold bg-gold' : 'border-ink-950/20'}`}>
        {checked && <Check size={12} className="text-ink-950" strokeWidth={3} />}
      </span>
      <span className={`text-sm font-bold ${checked ? 'text-ink-950' : 'text-ink-700'}`}>{label}</span>
    </button>
  );
}

function ColorChip({ label, hex, active, onClick }: { label: string; hex?: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
        active ? 'bg-ink-950 text-white' : 'bg-ink-950/5 text-ink-700 hover:bg-ink-950/10'
      }`}
    >
      {hex && <span className="h-3.5 w-3.5 rounded-full ring-1 ring-ink-950/10" style={{ backgroundColor: hex }} />}
      {label}
    </button>
  );
}
