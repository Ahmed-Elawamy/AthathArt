import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle, ShoppingCart, Heart } from 'lucide-react';
import { whatsappLink } from '../lib/site';
import { siteConfig } from '../lib/siteConfig';

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/products', label: 'المنتجات' },
  { to: '/categories', label: 'التصنيفات' },
  { to: '/products?filter=bestseller', label: 'الأكثر مبيعًا' },
  { to: '/about', label: 'من نحن' },
  { to: '/#reviews', label: 'آراء العملاء' },
  { to: '/contact', label: 'تواصل معنا' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';
  const dark = isHome && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-luxe py-2.5' : 'bg-transparent py-4'
        }`}
      >
        <nav className="container-luxe flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label={siteConfig.brandName}>
            <img src="/logo.svg" alt={siteConfig.brandName} className="h-9 w-9 rounded-xl" />
            <div className="flex flex-col leading-none">
              <span className={`font-display text-xl font-black tracking-tight ${dark ? 'text-white' : 'text-ink-950'}`}>
                {siteConfig.brandName}
              </span>
              <span className={`text-[10px] font-bold tracking-[0.25em] ${dark ? 'text-gold-300' : 'text-gold-600'}`}>
                STORE
              </span>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                      dark ? 'text-white/80 hover:text-white' : 'text-ink-700 hover:text-ink-950'
                    } ${isActive ? (dark ? 'text-white' : 'text-ink-950') : ''}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button className={`relative p-2 rounded-xl transition-colors ${dark ? 'text-white hover:bg-white/10' : 'text-ink-700 hover:bg-ink-100'}`} aria-label="المفضلة">
              <Heart size={20} />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-gold-500"></span>
            </button>
            <button className={`relative p-2 rounded-xl transition-colors ${dark ? 'text-white hover:bg-white/10' : 'text-ink-700 hover:bg-ink-100'}`} aria-label="سلة المشتريات">
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-ink-950 text-[10px] font-bold text-white">2</span>
            </button>
            <a
              href={whatsappLink('مرحباً، أرغب في الاستفسار عن منتجاتكم')}
              target="_blank"
              rel="noreferrer"
              className="btn-gold !px-5 !py-2.5 text-sm"
            >
              <MessageCircle size={17} />
              اطلب عبر واتساب
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button className={`relative p-2 rounded-xl ${dark ? 'text-white' : 'text-ink-950'}`} aria-label="سلة المشتريات">
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-white">2</span>
            </button>
            <button
              onClick={() => setOpen(true)}
              className={`rounded-xl p-2 ${dark ? 'text-white' : 'text-ink-950'}`}
              aria-label="القائمة"
            >
              <Menu size={26} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="absolute inset-y-0 right-0 w-[82%] max-w-sm bg-ink-950 p-6 text-white shadow-luxe-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.svg" alt="" className="h-9 w-9 rounded-xl" />
                  <span className="font-display text-xl font-black">{siteConfig.brandName}</span>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-xl p-2 hover:bg-white/10" aria-label="إغلاق">
                  <X size={24} />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3.5 text-lg font-bold text-white/90 hover:bg-white/10"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink('مرحباً، أرغب في الاستفسار عن منتجاتكم')}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn-gold mt-6 w-full"
              >
                <MessageCircle size={18} />
                اطلب عبر واتساب
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
