import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-display text-8xl font-black text-gold">404</p>
      <h1 className="mt-4 font-display text-3xl font-black text-ink-950">الصفحة غير موجودة</h1>
      <p className="mt-3 max-w-md text-ink-700">عذراً، الصفحة التي تبحث عنها غير متاحة أو تم نقلها.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn-gold"><Home size={18} /> العودة للرئيسية</Link>
        <Link to="/products" className="btn-dark">تصفح المنتجات <ArrowLeft size={18} /></Link>
      </div>
    </div>
  );
}
