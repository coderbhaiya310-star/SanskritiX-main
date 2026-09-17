import type { RitualItem } from '../types';

export default function RitualCard({ item }: { item: RitualItem }) {
  return (
    <div className="flex flex-col rounded-2xl border border-stoneline bg-white sanskriti-card p-5 transition-shadow hover:shadow-md">
      {item.images && item.images.length > 0 && (
  <div className="mb-4 grid grid-cols-2 gap-2">
    {item.images.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`${item.name} ${index + 1}`}
        className="h-32 w-full rounded-xl object-cover"
      />
    ))}
  </div>
)}
      <h4 className="font-display text-lg font-semibold text-ink">{item.name}</h4>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-marigold">{item.community}</p>
      <p className="mt-2 text-sm text-inksoft">{item.desc}</p>
      <p className="mt-2 text-sm text-inksoft/85">
        <span className="font-semibold text-ink">What visitors see: </span>
        {item.whatVisitors}
      </p>
      <ul className="mt-3 space-y-1">
        {item.etiquette.map((e, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-inksoft/85">
            <span className="mt-1 text-marigold" aria-hidden="true">◆</span>
            <span>{e}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-lg bg-cream2 p-3 text-xs text-muted">{item.note}</p>
    </div>
  );
}
