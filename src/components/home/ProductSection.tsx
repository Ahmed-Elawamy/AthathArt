import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '../../types';
import ProductCard from '../ProductCard';
import QuickView from '../QuickView';

interface ProductSectionProps {
  title: string;
  eyebrow: string;
  description: string;
  products: Product[];
  bgColor?: string;
  linkTo?: string;
}

export default function ProductSection({ title, eyebrow, description, products, bgColor = 'bg-white', linkTo = '/products' }: ProductSectionProps) {
  const [quickView, setQuickView] = useState<Product | null>(null);

  if (products.length === 0) return null;

  return (
    <section className={`${bgColor} py-20 lg:py-28`}>
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className="mt-3 font-display text-3xl font-black text-ink-950 sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-pretty text-lg text-ink-700">
              {description}
            </p>
          </div>
          <Link to={linkTo} className="btn-dark !py-3 text-sm">
            عرض جميع المنتجات
            <ArrowLeft size={16} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickView} />
          ))}
        </div>
      </div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
