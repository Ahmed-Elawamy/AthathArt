import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gem, ShieldCheck, Truck, Wrench, Headphones, Award, Users, Factory, ChevronLeft, ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { whatsappLink } from '../lib/site';
import { siteConfig } from '../lib/siteConfig';

const stats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Users, value: '+12,000', label: 'عميل سعيد' },
  { icon: Award, value: '4.9/5', label: 'متوسط التقييم' },
  { icon: Factory, value: '+15', label: 'عام من الخبرة' },
  { icon: ShieldCheck, value: '5', label: 'سنوات ضمان' },
];

const values: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Gem, title: 'الجودة أولاً', desc: 'لا نساوم على الخامات. نختار أجود الأخشاب والفولاذ والزجاج لضمان منتج يدوم.' },
  { icon: ShieldCheck, title: 'ثقة وضمان', desc: 'نقف خلف كل منتج بضمان 5 سنوات، لأننا واثقون من جودة ما نصنع.' },
  { icon: Wrench, title: 'تصميم مدروس', desc: 'كل تفصيلة في مكاتبنا مدروسة لتمنحك تجربة استخدام مريحة وذكية.' },
  { icon: Headphones, title: 'خدمة حقيقية', desc: 'فريق دعم يعرف المنتجات من الداخل، ويرد على استفساراتك بصدق وسرعة.' },
];

export default function About() {
  return (
    <div className="bg-cream pt-28 pb-20 lg:pt-32">
      <div className="container-luxe">
        <nav className="flex items-center gap-1.5 text-sm font-bold text-ink-700">
          <Link to="/" className="hover:text-gold-600">الرئيسية</Link>
          <ChevronLeft size={14} />
          <span className="text-ink-950">من نحن</span>
        </nav>

        {/* Hero */}
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="section-eyebrow">قصتنا</span>
            <h1 className="mt-3 font-display text-4xl font-black leading-tight text-ink-950 sm:text-5xl">
              نصنع مكاتب تُلهم الإنتاج
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-700">
              بدأت {siteConfig.brandName} من ورشة صغيرة في القاهرة عام 2010، بحلم بسيط: صناعة مكاتب مصرية تنافس العالم في الجمال والمتانة.
              اليوم، بعد أكثر من 15 عاماً، أصبحنا الوجهة الأولى لآلاف العملاء الذين يبحثون عن مكتب يستحق أن يكون محور مساحة عملهم.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-ink-700">
              نؤمن أن المكتب ليس مجرد سطح وخشب — بل مساحة تُولد فيها الأفكار وتُنجز فيها المشاريع.
              ولذلك نولي كل تفصيلة اهتماماً استثنائياً، من اختيار الخامة إلى لمسة الطلاء النهائية.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="btn-gold">تصفح منتجاتنا <ArrowLeft size={18} /></Link>
              <a href={whatsappLink(`أرغب في معرفة المزيد عن ${siteConfig.brandName}`)} target="_blank" rel="noreferrer" className="btn-dark">
                تواصل معنا
              </a>
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/7658310/pexels-photo-7658310.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt={`ورشة ${siteConfig.brandName}`}
              className="aspect-[4/3] w-full rounded-4xl object-cover shadow-luxe-lg"
            />
            <div className="absolute -bottom-5 -right-5 hidden rounded-3xl bg-ink-950 p-5 text-white shadow-luxe-lg sm:block">
              <p className="font-display text-3xl font-black text-gold">15+</p>
              <p className="text-sm font-bold text-white/70">عاماً من الإبداع</p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-3xl bg-white p-7 text-center shadow-luxe ring-1 ring-ink-950/5"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-700">
                <s.icon size={22} />
              </span>
              <p className="mt-4 font-display text-3xl font-black text-ink-950">{s.value}</p>
              <p className="mt-1 text-sm font-bold text-ink-700">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mt-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">قيمنا</span>
            <h2 className="mt-3 font-display text-3xl font-black text-ink-950 sm:text-4xl">ما الذي يحركنا</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-3xl bg-white p-7 shadow-luxe ring-1 ring-ink-950/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-gold">
                  <v.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-black text-ink-950">{v.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-700">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mt-24 rounded-3xl bg-ink-950 p-8 text-white sm:p-12">
          <Reveal>
            <span className="section-eyebrow text-gold-400">كيف نعمل</span>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">رحلة كل مكتب</h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {[
              { n: '01', t: 'اختيار الخامة', d: 'ننتقي الأخشاب والفولاذ بعناية من أفضل الموردين.' },
              { n: '02', t: 'التصميم', d: 'فريقنا يرسم كل تفصيلة لضمان الجمال والراحة.' },
              { n: '03', t: 'التصنيع', d: 'ورشتنا تجهز كل قطعة بدقة وإتقان.' },
              { n: '04', t: 'الفحص والتوصيل', d: 'نفحص كل منتج قبل التوصيل لضمان الجودة.' },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <p className="font-display text-5xl font-black text-gold/30">{step.n}</p>
                <h3 className="mt-2 font-display text-lg font-black">{step.t}</h3>
                <p className="mt-2 text-sm text-white/65">{step.d}</p>
                {i < 3 && <div className="absolute -left-4 top-8 hidden h-px w-8 bg-white/15 md:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
