import { Star } from 'lucide-react';

interface StarsProps {
  rating: number;
  size?: number;
  className?: string;
}

export function Stars({ rating, size = 16, className = '' }: StarsProps) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`تقييم ${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const isHalf = !filled && i === full && half;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-gold/25" strokeWidth={1.5} />
            {(filled || isHalf) && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: isHalf ? size / 2 : size }}>
                <Star size={size} className="text-gold fill-gold" strokeWidth={1.5} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
