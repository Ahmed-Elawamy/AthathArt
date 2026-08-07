import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../lib/site';

interface FocusModeProps {
  onClose: () => void;
}

const steps = [
  {
    id: 1,
    title: 'تصميم يبرز هويتك',
    desc: 'سطح واسع بخامات راقية يمنحك الراحة الكاملة للإنتاج والإبداع.',
    scale: 1,
    x: '0%',
    y: '0%',
  },
  {
    id: 2,
    title: 'متانة لا تضاهى',
    desc: 'أرجل فولاذية صلبة تقاوم الاهتزاز مع قدرة تحمل فائقة للأوزان الثقيلة.',
    scale: 1.5,
    x: '10%',
    y: '-15%',
  },
  {
    id: 3,
    title: 'مساحة منظمة',
    desc: 'نظام إدارة كابلات ذكي يحافظ على مظهر مكتبك نظيفاً وخالياً من الفوضى.',
    scale: 1.8,
    x: '-15%',
    y: '10%',
  },
  {
    id: 4,
    title: 'ألوان تناسب ذوقك',
    desc: 'اختر اللون الذي يكمل جمالية غرفتك.',
    scale: 1,
    x: '0%',
    y: '0%',
    showColors: true,
  }
];

const variants = [
  { id: 'v1', name: 'أسود كربوني', color: '#1A1A1A', image: 'https://images.pexels.com/photos/30469973/pexels-photo-30469973.jpeg?auto=compress&cs=tinysrgb&w=2000' },
  { id: 'v2', name: 'أبيض ناصع', color: '#F4F4F2', image: 'https://images.pexels.com/photos/6489045/pexels-photo-6489045.jpeg?auto=compress&cs=tinysrgb&w=2000' },
  { id: 'v3', name: 'جوزي طبيعي', color: '#5B3A1F', image: 'https://images.pexels.com/photos/7658310/pexels-photo-7658310.jpeg?auto=compress&cs=tinysrgb&w=2000' },
];

export default function FocusMode({ onClose }: FocusModeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeVariant, setActiveVariant] = useState(variants[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when FocusMode is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-ink-950 flex flex-col"
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-ink-950/80 to-transparent">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-bold"
        >
          <ArrowRight size={18} />
          العودة
        </button>
        <span className="font-display font-black text-xl text-white">فُرُود Focus</span>
      </div>

      {/* Cinematic Viewport */}
      <div className="relative flex-1 overflow-hidden" ref={containerRef}>
        
        {/* Images Crossfade Container */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={activeVariant.id}
              src={activeVariant.image}
              alt={activeVariant.name}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                scale: step.scale,
                x: step.x,
                y: step.y,
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 0.8 },
                scale: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
                x: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
                y: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
              }}
              className="absolute inset-0 w-full h-full object-cover origin-center"
            />
          </AnimatePresence>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-ink-950/20" />
        </div>

        {/* UI Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-8 pb-12 z-20 flex flex-col items-center justify-end h-full pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl text-center pointer-events-auto bg-ink-950/40 backdrop-blur-md p-6 rounded-3xl border border-white/10"
            >
              <h2 className="text-3xl font-black text-white mb-3">{step.title}</h2>
              <p className="text-white/80 text-lg leading-relaxed">{step.desc}</p>
              
              {/* Color Selector (Only on final step) */}
              {step.showColors && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <p className="text-white/90 font-bold mb-4">اللون المختار: {activeVariant.name}</p>
                  <div className="flex items-center justify-center gap-4">
                    {variants.map(v => (
                      <button
                        key={v.id}
                        onClick={() => setActiveVariant(v)}
                        className={`w-12 h-12 rounded-full ring-2 ring-offset-2 ring-offset-ink-950 transition-all ${activeVariant.id === v.id ? 'ring-gold-500 scale-110' : 'ring-transparent hover:scale-105'}`}
                        style={{ backgroundColor: v.color }}
                        aria-label={v.name}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={whatsappLink(`مرحباً، أرغب في طلب ${activeVariant.name}`)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-gold"
                    >
                      <MessageCircle size={18} />
                      اطلب عبر واتساب
                    </a>
                    <button onClick={onClose} className="btn-outline-light">
                      العودة للمتجر
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Controls (Hidden on last step with CTAs) */}
          {!step.showColors && (
            <div className="absolute bottom-12 inset-x-12 flex justify-between items-center pointer-events-auto">
              <button 
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md text-white transition-all ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}
              >
                <ArrowRight size={20} />
              </button>
              
              <div className="flex gap-2">
                {steps.map((s, idx) => (
                  <div key={s.id} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-gold-400' : 'w-2 bg-white/30'}`} />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="btn-gold !px-6 !py-3 pointer-events-auto"
              >
                التالي
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
