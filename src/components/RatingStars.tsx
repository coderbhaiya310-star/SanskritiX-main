interface Props {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
}

export default function RatingStars({ rating, reviewCount, size = 'sm' }: Props) {
  const full = Math.round(rating);
  const starSize = size === 'sm' ? 'text-sm' : 'text-lg';
  return (
    <div className={`flex items-center gap-1 ${starSize}`} role="img" aria-label={`Rated ${rating} out of 5${reviewCount ? ` from ${reviewCount} reviews` : ''}`}>
      <span className="flex text-marigold" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < full ? '★' : '☆'}</span>
        ))}
      </span>
      <span className="text-ink/70 font-medium">{rating.toFixed(1)}</span>
      {typeof reviewCount === 'number' && <span className="text-ink/50">({reviewCount})</span>}
    </div>
  );
}
