import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageCircle, MapPin, Phone, Mail, Send, Check } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { whatsappLink } from '../lib/site';
import { siteConfig } from '../lib/siteConfig';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `استفسار جديد من الموقع:\n• الاسم: ${form.name}\n• الهاتف: ${form.phone}\n• الموضوع: ${form.subject}\n• الرسالة: ${form.message}`;
    window.open(whatsappLink(msg), '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="bg-cream pt-28 pb-20 lg:pt-32">
      <div className="container-luxe">
        <nav className="flex items-center gap-1.5 text-sm font-bold text-ink-700">
          <Link to="/" className="hover:text-gold-600">الرئيسية</Link>
          <ChevronLeft size={14} />
          <span className="text-ink-950">تواصل معنا</span>
        </nav>

        <Reveal className="mt-6 max-w-2xl">
          <h1 className="font-display text-4xl font-black text-ink-950 sm:text-5xl">تواصل معنا</h1>
          <p className="mt-4 text-pretty text-lg text-ink-700">
            نحن هنا للإجابة على كل استفساراتك. اختر الطريقة التي تناسبك — واتساب، اتصال، أو النموذج التالي.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Info cards */}
          <div className="space-y-5 lg:col-span-5">
            {[
              { icon: MapPin, title: 'العنوان', value: siteConfig.address },
              { icon: Phone, title: 'الهاتف / واتساب', value: siteConfig.phone, ltr: true, href: whatsappLink(`مرحباً ${siteConfig.brandName}`) },
              { icon: Mail, title: 'البريد الإلكتروني', value: siteConfig.email, ltr: true, href: `mailto:${siteConfig.email}` },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-4 rounded-3xl bg-white p-6 shadow-luxe ring-1 ring-ink-950/5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold-700">
                  <c.icon size={22} />
                </span>
                <div>
                  <p className="font-display text-sm font-black text-ink-900">{c.title}</p>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" className={`mt-1 block font-bold text-ink-700 transition hover:text-gold-600 ${c.ltr ? 'ltr:text-left' : ''}`} dir={c.ltr ? 'ltr' : 'rtl'}>
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1 font-bold text-ink-700">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href={whatsappLink('مرحباً، أرغب في الاستفسار عن منتجاتكم')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-3xl bg-[#25D366] p-6 font-black text-white shadow-luxe transition hover:brightness-110"
            >
              <MessageCircle size={24} />
              محادثة فورية عبر واتساب
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="rounded-3xl bg-white p-8 shadow-luxe ring-1 ring-ink-950/5">
              <h2 className="font-display text-2xl font-black text-ink-950">أرسل رسالتك</h2>
              <p className="mt-2 text-sm text-ink-700">سنرد عليك عبر واتساب خلال دقائق.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-ink-900">الاسم الكامل</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-luxe"
                    placeholder="اكتب اسمك"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-ink-900">رقم الهاتف</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input-luxe"
                    placeholder="01XXXXXXXXX"
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-bold text-ink-900">الموضوع</label>
                <input
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="input-luxe"
                  placeholder="موضوع الاستفسار"
                />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-bold text-ink-900">رسالتك</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-luxe resize-none"
                  placeholder="اكتب تفاصيل استفسارك هنا..."
                />
              </div>

              <button type="submit" className="btn-gold mt-6 w-full">
                {sent ? (
                  <><Check size={18} /> تم الإرسال — تابع واتساب</>
                ) : (
                  <><Send size={18} /> إرسال عبر واتساب</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 overflow-hidden rounded-3xl shadow-luxe ring-1 ring-ink-950/5"
        >
          <div className="flex h-72 items-center justify-center bg-ink-950 text-center text-white">
            <div>
              <MapPin size={40} className="mx-auto text-gold" />
              <p className="mt-3 font-display text-xl font-black">موقعنا على الخريطة</p>
              <p className="mt-1 text-white/70">{siteConfig.address}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
