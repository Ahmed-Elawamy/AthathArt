import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Truck, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#080D18] pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="container-luxe relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual — Image side (appears first in DOM for LTR, but in RTL it's on the left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <img
                src="/hero-gaming-desk.jpg"
                alt="مكتب ألعاب فاخر في غرفة Gaming سينمائية"
                className="aspect-[4/3] w-full rounded-3xl object-cover"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#080D18]/30 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content — Text side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 text-center lg:text-right"
          >
            <span className="inline-block rounded-full bg-white/[0.08] px-4 py-1.5 text-sm font-bold text-gold-300 ring-1 ring-white/10">
              صناعة مصرية فاخرة
            </span>

            <h1 className="mt-7 font-display text-4xl font-black leading-[1.15] text-white sm:text-5xl lg:text-[3.5rem]">
              صمّم مساحة<br />
              عمل <span className="text-gold-500">تستحقها</span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/55 lg:mx-0">
              مكاتب مصممة للعمل، الدراسة والألعاب، بخامات عملية وتصميم يناسب مساحتك.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link to="/products" className="btn-gold w-full sm:w-auto">
                اكتشف المنتجات
                <ArrowLeft size={18} />
              </Link>
              <a href="#design-showcase" className="btn-outline-light w-full sm:w-auto">
                استكشف كيف صُممت
              </a>
            </div>

            {/* Trust Signals */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-start">
              <span className="flex items-center gap-2 text-sm text-white/40">
                <Users size={15} strokeWidth={1.5} />
                +12,000 عميل راضٍ
              </span>
              <span className="flex items-center gap-2 text-sm text-white/40">
                <Truck size={15} strokeWidth={1.5} />
                توصيل 2-4 أيام
              </span>
              <span className="flex items-center gap-2 text-sm text-white/40">
                <ShieldCheck size={15} strokeWidth={1.5} />
                ضمان 5 سنوات
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
