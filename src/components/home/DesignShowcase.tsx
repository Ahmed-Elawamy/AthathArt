import { Lightbulb, Cable, Shield, Layers } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '../Reveal';

const features = [
  {
    icon: Lightbulb,
    title: 'إضاءة RGB قابلة للتخصيص',
    desc: 'تحكم كامل في ألوان وأنماط الإضاءة لتناسب ذوقك.',
  },
  {
    icon: Cable,
    title: 'إدارة احترافية للأسلاك',
    desc: 'قنوات مخفية تبقي مساحتك نظيفة ومرتبة.',
  },
  {
    icon: Shield,
    title: 'هيكل معدني قوي',
    desc: 'فولاذ مقوّى يتحمل الاستخدام اليومي المكثف.',
  },
  {
    icon: Layers,
    title: 'سطح مقاوم للاستخدام اليومي',
    desc: 'سطح مقاوم للخدش والماء بلمسة ناعمة.',
  },
];

export default function DesignShowcase() {
  return (
    <section id="design-showcase" className="bg-[#080D18] py-24 lg:py-32 overflow-hidden">
      <div className="container-luxe">
        <Reveal className="mb-14">
          <span className="section-eyebrow text-ink-400">تفاصيل التصميم</span>
          <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            اكتشف تفاصيل التصميم
          </h2>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <Reveal className="relative overflow-hidden rounded-3xl">
            <img
              src="/design-showcase.jpg"
              alt="تفاصيل تصميم المكتب"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>

          {/* Features */}
          <Stagger className="space-y-8">
            {features.map((f, i) => (
              <StaggerItem key={i} className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
                  <f.icon size={22} className="text-gold-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/45">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
