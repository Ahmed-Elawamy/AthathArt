import { useRef, useState } from 'react';

interface ZoomImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ZoomImage({ src, alt, className = '' }: ZoomImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [zoom, setZoom] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={onMove}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 ease-out"
        style={{
          transform: zoom ? 'scale(1.8)' : 'scale(1)',
          transformOrigin: `${pos.x}% ${pos.y}%`,
        }}
        draggable={false}
      />
      <div className={`pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-ink-950 shadow backdrop-blur transition-opacity ${zoom ? 'opacity-0' : 'opacity-100'}`}>
        مرر للتكبير 🔍
      </div>
    </div>
  );
}
