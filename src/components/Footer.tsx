import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { siteConfig } from '../lib/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-[#080D18] text-white border-t border-white/5">
      <div className="container-luxe py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          {/* Right Column: Logo, description, social */}
          <div className="flex flex-col items-start text-right">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.svg" alt={siteConfig.brandName} className="h-9 w-9 rounded-xl" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-black text-white">
                  {siteConfig.brandName}
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-gold-500">
                  STORE
                </span>
              </div>
            </Link>
            
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              مكاتب تجمع بين التصميم العملي، الجودة، والتفاصيل التي تصنع فرقًا.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              {[
                { Icon: Facebook, url: siteConfig.social.facebook, label: 'فيسبوك' },
                { Icon: Instagram, url: siteConfig.social.instagram, label: 'إنستغرام' },
                { Icon: Youtube, url: siteConfig.social.twitter || 'https://youtube.com', label: 'يوتيوب' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/40 transition-colors hover:bg-gold-500 hover:text-ink-950"
                  aria-label={social.label}
                >
                  <social.Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Left Column: Quick Links & Contact info */}
          <div className="grid grid-cols-2 gap-8 text-right">
            {/* Quick Links */}
            <div>
              <h4 className="font-display text-sm font-bold tracking-wider text-white mb-4">
                روابط سريعة
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/" className="text-white/50 transition-colors hover:text-gold-500">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-white/50 transition-colors hover:text-gold-500">
                    المنتجات
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-white/50 transition-colors hover:text-gold-500">
                    التصنيفات
                  </Link>
                </li>
                <li>
                  <Link to="/products?filter=bestseller" className="text-white/50 transition-colors hover:text-gold-500">
                    الأكثر مبيعًا
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white/50 transition-colors hover:text-gold-500">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white/50 transition-colors hover:text-gold-500">
                    تواصل معنا
                  </Link>
                </li>
              </ul>
            </div>

            {/* Compact Contact details */}
            <div className="flex flex-col">
              <h4 className="font-display text-sm font-bold tracking-wider text-white mb-4">
                اتصل بنا
              </h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li>{siteConfig.phone}</li>
                <li className="break-all">{siteConfig.email}</li>
                <li>{siteConfig.address.split('،').slice(-2).join('،').trim() || siteConfig.address}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider & Bottom bar */}
        <div className="mt-12 border-t border-white/5 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/30 sm:flex-row">
            <p className="text-center sm:text-right">
              © 2026 {siteConfig.brandName}. جميع الحقوق محفوظة.
            </p>
            <p className="text-center sm:text-left">
              <span className="text-white/40 m-1">تصميم وتطوير </span>
              <span className="text-gold-400 font-bold tracking-wide hover:text-gold-300 transition-colors duration-300">
                Ahmed Elawamy
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
