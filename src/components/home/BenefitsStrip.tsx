import { ShieldCheck, Truck, Headphones, Gem } from 'lucide-react';

const items = [
  { icon: ShieldCheck, title: 'دفع آمن 100%', desc: 'طرق دفع موثوقة ومتنوعة' },
  { icon: Truck, title: 'توصيل سريع', desc: 'توصيل لباب بيتك خلال 2-4 أيام' },
  { icon: Headphones, title: 'دعم ما بعد البيع', desc: 'فريقنا متواجد دائماً لمساعدتك' },
  { icon: Gem, title: 'خامات عالية الجودة', desc: 'أخشاب صلبة وهيكل فولاذي متين' },
];

export default function BenefitsStrip() {
  return (
    <div className="border-y border-ink-200 bg-white py-6">
      <div className="container-luxe">
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-3 justify-center text-right">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/5 text-gold">
                <it.icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-ink-950">{it.title}</h4>
                <p className="text-xs text-ink-500">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
