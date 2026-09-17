import type { StreetItem } from '../types';
import PlaceholderImage from './PlaceholderImage';

export default function StreetCard({ item }: { item: StreetItem }) {
  const images = item.images && item.images.length > 0 ? item.images : [''];

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-stoneline bg-white sanskriti-card transition-shadow hover:shadow-md">
      {images.length === 1 ? (
        <PlaceholderImage src={images[0]} alt={item.name} ratio="aspect-[16/10]" />
      ) : (
        <div className="grid grid-cols-3 gap-0.5">
          {images.slice(0, 3).map((img, i) => (
            <PlaceholderImage key={i} src={img} alt={`${item.name} photo ${i + 1}`} ratio="aspect-square" />
          ))}
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <h4 className="font-display text-base font-semibold text-ink">{item.name}</h4>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-marigold">{item.location}</p>
        <p className="mt-2 text-sm text-inksoft">{item.knownFor}</p>
        <p className="mt-2 text-sm text-inksoft/80">{item.experience}</p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-muted">
          <span className="rounded-full bg-cream2 px-2 py-0.5 font-medium">Best time: {item.time}</span>
        </div>
      </div>
    </div>
  );
}