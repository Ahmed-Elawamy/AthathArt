import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, Phone, Instagram, Facebook, Youtube } from 'lucide-react';
import { categories } from '../data';
import { whatsappLink } from '../lib/site';
import { siteConfig } from '../lib/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-white">
      <div className="container-luxe py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.svg" alt={siteConfig.brandName} className="h-11 w-11 rounded-xl" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl font-black">{siteConfig.brandName}</span>
                <span className="text-[11px] font-bold tracking-[0.25em] text-gold-400">STORE</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-pretty leading-relaxed text-white/70">
              {siteConfig.brandName} شركة مصرية متخصصة في تصنيع المكاتب الراقية — مكاتب الألعاب، المكاتب الإدارية، المكاتب الدراسية،
              والأثاث المريح. {siteConfig.policies.warranty}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Facebook, url: siteConfig.social.facebook },
                { Icon: Instagram, url: siteConfig.social.instagram },
                { Icon: Youtube, url: siteConfig.social.twitter }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/70 transition hover:bg-gold hover:text-ink-950"
                  aria-label="تواصل اجتماعي"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-lg font-black text-white">التصنيفات</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/products?category=${c.slug}`} className="text-white/70 transition hover:text-gold">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-lg font-black text-white">روابط سريعة</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/products" className="text-white/70 hover:text-gold">المنتجات</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-gold">من نحن</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-gold">تواصل معنا</Link></li>
              <li><Link to="/products?filter=bestseller" className="text-white/70 hover:text-gold">الأكثر مبيعًا</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-display text-lg font-black text-white">تواصل معنا</h4>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-center gap-3 text-white/70">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gold">
                  <MapPin size={16} />
                </span>
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-3 text-white/70" dir="ltr">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gold">
                  <Phone size={16} />
                </span>
                {siteConfig.phone}
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gold">
                  <Mail size={16} />
                </span>
                {siteConfig.email}
              </li>
            </ul>
            <a
              href={whatsappLink('مرحباً، أرغب في الاستفسار عن منتجاتكم')}
              target="_blank"
              rel="noreferrer"
              className="btn-gold mt-6 !py-2.5 text-sm"
            >
              <MessageCircle size={17} />
              محادثة فورية
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-2">
            صُنع بكل <span className="text-gold">●</span> في مصر
          </p>
        </div>
      </div>
    </footer>
  );
}
