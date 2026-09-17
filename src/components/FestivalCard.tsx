import type { FestivalItem } from '../types';

export default function FestivalCard({ item }: { item: FestivalItem }) {
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
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-marigold">{item.season}</p>
      <p className="mt-2 text-sm text-inksoft">{item.desc}</p>
      <dl className="mt-3 space-y-1.5 text-sm text-inksoft/85">
        <div><dt className="inline font-semibold text-ink">Significance: </dt><dd className="inline">{item.significance}</dd></div>
        <div><dt className="inline font-semibold text-ink">What to see: </dt><dd className="inline">{item.whatToSee}</dd></div>
        <div><dt className="inline font-semibold text-ink">Etiquette: </dt><dd className="inline">{item.etiquette}</dd></div>
      </dl>
    </div>
  );
}
