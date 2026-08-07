import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

interface Preview360Props {
  images: string[];
  alt: string;
}

export default function Preview360({ images, alt }: Preview360Props) {
  const [idx, setIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startIdx = useRef(0);

  const go = useCallback((next: number) => {
    setIdx(((next % images.length) + images.length) % images.length);
  }, [images.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    startX.current = e.clientX;
    startIdx.current = idx;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    const step = 40;
    const steps = Math.round(-dx / step);
    go(startIdx.current + steps);
  };

  const onPointerUp = () => setDragging(false);

  return (
    <div className="relative">
      <div
        className="relative aspect-square cursor-grab touch-none select-none overflow-hidden rounded-3xl bg-ink-950/5 ring-1 ring-ink-950/10 active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <AnimatePresence mode="popLayout">
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`${alt} - زاوية ${idx + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent opacity-0 transition-opacity hover:opacity-100" />

        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-ink-950 shadow-lg backdrop-blur">
          <RotateCw size={14} className={dragging ? 'animate-spin' : ''} />
          اسحب للدوران 360°
        </div>

        <button
          onClick={() => go(idx - 1)}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-950 shadow-lg transition hover:bg-white"
          aria-label="السابق"
        >
          <ChevronRight size={20} />
        </button>
        <button
          onClick={() => go(idx + 1)}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-950 shadow-lg transition hover:bg-white"
          aria-label="التالي"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-gold' : 'w-1.5 bg-ink-950/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
