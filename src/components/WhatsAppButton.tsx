import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { whatsappLink } from '../lib/site';
import { siteConfig } from '../lib/siteConfig';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-3">
      {open && (
        <div className="w-72 overflow-hidden rounded-3xl bg-white shadow-luxe-lg ring-1 ring-ink-950/5">
          <div className="flex items-center justify-between bg-[#25D366] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <div className="leading-tight">
                <p className="text-sm font-black">فريق {siteConfig.brandName}</p>
                <p className="text-[11px] opacity-90">يرد عادةً خلال دقائق</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="إغلاق">
              <X size={18} />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm leading-relaxed text-ink-700">
              مرحباً بك في {siteConfig.brandName}! كيف يمكننا مساعدتك اليوم؟ اختر أحد الخيارات أو اكتب رسالتك مباشرةً.
            </p>
            <div className="mt-3 grid gap-2">
              <a
                href={whatsappLink('أرغب في الاستفسار عن أسعار المكاتب')}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-ink-950/5 px-3 py-2.5 text-sm font-bold text-ink-900 transition hover:bg-ink-950/10"
              >
                الاستفسار عن الأسعار
              </a>
              <a
                href={whatsappLink('أرغب في طلب مكتب بتصميم مخصص')}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-ink-950/5 px-3 py-2.5 text-sm font-bold text-ink-900 transition hover:bg-ink-950/10"
              >
                تصميم مخصص
              </a>
              <a
                href={whatsappLink('أحتاج مساعدة في اختيار المكتب المناسب')}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-ink-950/5 px-3 py-2.5 text-sm font-bold text-ink-900 transition hover:bg-ink-950/10"
              >
                مساعدة في الاختيار
              </a>
            </div>
            <a
              href={whatsappLink(`مرحباً ${siteConfig.brandName} 👋`)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-black text-white transition hover:brightness-110"
            >
              <MessageCircle size={18} />
              ابدأ المحادثة
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-luxe-lg transition hover:scale-105"
        aria-label="تواصل عبر واتساب"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        {open ? <X size={26} className="relative" /> : <MessageCircle size={28} className="relative" />}
      </button>
    </div>
  );
}
