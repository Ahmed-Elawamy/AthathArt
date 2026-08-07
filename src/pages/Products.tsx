import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Check, ChevronLeft, ChevronDown } from 'lucide-react';
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

const sortLabels: Record<SortKey, string> = {
  featured: 'الأكثر تميزاً',
  newest: 'الأحدث',
  bestseller: 'الأكثر مبيعًا',
  rating: 'الأعلى تقييماً',
  'price-asc': 'السعر من الأقل للأعلى',
  'price-desc': 'السعر من الأعلى للأقل',
};

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sortMobileOpen, setSortMobileOpen] = useState(false);

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

  // Close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setSortMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    </div>
  );

  return (
    <div className="bg-cream pt-28 pb-20 lg:pt-32">
      <div className="container-luxe">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-sm font-bold text-ink-700">
          <Link to="/" className="hover:text-gold-600">الرئيسية</Link>
          <ChevronLeft size={14} />
          <span className="text-ink-950">المنتجات</span>
        </nav>

        {/* Page title & Filter button row */}
        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-3xl font-black text-ink-950 sm:text-4xl">
              {bestsellerOnly ? 'الأكثر مبيعًا' : category ? categories.find((c) => c.slug === category)?.name : 'كل المنتجات'}
            </h1>
            <p className="mt-2 text-ink-700">عرض {filtered.length} من أصل {products.length} منتج</p>
          </div>

          {/* Filter & Sort controls */}
          <div className="flex w-full sm:w-auto items-center gap-3">
            {/* Desktop Sort select */}
            <select
              value={sort}
              onChange={(e) => update('sort', e.target.value)}
              className="hidden lg:block rounded-2xl border border-ink-950/10 bg-white px-4 py-2.5 text-sm font-bold text-ink-900 focus:border-gold focus:outline-none"
            >
              {Object.entries(sortLabels).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>

            {/* Mobile Sort button */}
            <button
              onClick={() => setSortMobileOpen(true)}
              className="flex flex-1 sm:flex-none items-center justify-between gap-2 rounded-2xl border border-ink-950/10 bg-white px-4 py-2.5 text-sm font-bold text-ink-900 lg:hidden text-right"
            >
              <span className="truncate">ترتيب: {sortLabels[sort]}</span>
              <ChevronDown size={16} className="shrink-0" />
            </button>

            {/* Mobile Filter toggle button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-2xl bg-ink-950 px-4 py-2.5 text-sm font-bold text-white lg:hidden"
            >
              <SlidersHorizontal size={16} />
              <span>فلترة</span>
              {activeCount > 0 && (
                <span className="rounded-full bg-gold px-1.5 py-0.5 text-xs font-bold text-ink-950">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeCount > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2 text-right">
            <span className="text-sm font-bold text-ink-500">الفلاتر النشطة:</span>
            {category && (
              <Chip
                label={categories.find((c) => c.slug === category)?.name || category}
                onClear={() => update('category', '')}
              />
            )}
            {color && <Chip label={`اللون: ${color}`} onClear={() => update('color', '')} />}
            {material && <Chip label={`الخامة: ${material}`} onClear={() => update('material', '')} />}
            {size && <Chip label={`المقاس: ${size}`} onClear={() => update('size', '')} />}
            {availability && (
              <Chip
                label={availability === 'in' ? 'متوفر' : 'نفد المخزون'}
                onClear={() => update('availability', '')}
              />
            )}
            {maxPrice < MAX_PRICE && (
              <Chip label={`السعر حتى: ${formatPrice(maxPrice)} ج.م`} onClear={() => update('maxPrice', '')} />
            )}
            <button
              onClick={clearAll}
              className="text-xs font-bold text-gold-600 transition hover:text-gold-700 underline"
            >
              مسح الكل
            </button>
          </div>
        )}

        {/* Main Grid content */}
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-luxe ring-1 ring-ink-950/5">
              <h2 className="flex items-center gap-2 font-display text-lg font-black text-ink-950 mb-6">
                <SlidersHorizontal size={18} className="text-gold-600" />
                تصفية النتائج
              </h2>
              {FilterPanel}
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-950/5 py-3 text-sm font-bold text-ink-700 transition hover:bg-ink-950/10"
                >
                  <X size={16} /> مسح كل الفلاتر
                </button>
              )}
            </div>
          </aside>

          {/* Products lists cards */}
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

      {/* Mobile filter Bottom Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Bottom Sheet container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute inset-x-0 bottom-0 rounded-t-[2rem] bg-white p-6 shadow-luxe-lg flex flex-col max-h-[85vh] z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-ink-100 pb-4">
                <h2 className="font-display text-lg font-black text-ink-950">تصفية النتائج</h2>
                <button onClick={() => setMobileOpen(false)} className="rounded-xl p-2 hover:bg-ink-950/5" aria-label="إغلاق">
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable Filters */}
              <div className="flex-1 overflow-y-auto py-6 no-scrollbar">
                {FilterPanel}
              </div>

              {/* Action Buttons */}
              <div className="border-t border-ink-100 pt-4 flex gap-3">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold flex-1 text-sm py-3.5"
                >
                  عرض النتائج ({filtered.length})
                </button>
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="btn-outline flex-1 text-sm py-3.5"
                  >
                    مسح الفلاتر
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sort Bottom Sheet */}
      <AnimatePresence>
        {sortMobileOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
              onClick={() => setSortMobileOpen(false)}
            />
            {/* Bottom Sheet container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute inset-x-0 bottom-0 rounded-t-[2rem] bg-white p-6 shadow-luxe-lg max-h-[60vh] flex flex-col z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-ink-100 pb-4">
                <h2 className="font-display text-lg font-black text-ink-950">ترتيب المنتجات</h2>
                <button onClick={() => setSortMobileOpen(false)} className="rounded-xl p-2 hover:bg-ink-950/5" aria-label="إغلاق">
                  <X size={22} />
                </button>
              </div>

              {/* Sort Options list */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="flex flex-col gap-1">
                  {Object.entries(sortLabels).map(([key, label]) => {
                    const active = sort === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          update('sort', key);
                          setSortMobileOpen(false);
                        }}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-right font-bold transition ${
                          active ? 'bg-gold/10 text-gold-700' : 'text-ink-700 hover:bg-ink-950/5'
                        }`}
                      >
                        <span>{label}</span>
                        {active && <Check size={18} className="text-gold-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950/5 px-3 py-1.5 text-xs font-bold text-ink-800">
      <span>{label}</span>
      <button
        onClick={onClear}
        className="rounded-full p-0.5 hover:bg-ink-950/10 text-ink-500 hover:text-ink-800 transition"
        aria-label="مسح الفلتر"
      >
        <X size={12} />
      </button>
    </span>
  );
}
