type Props = {
  name: string;
  area: string;
  price: string;
  type: string;
  description: string;
  mapUrl: string;
};

export default function StayCard({
  name,
  area,
  price,
  type,
  description,
  mapUrl,
}: Props) {
  return (
    <div className="rounded-2xl border border-stoneline bg-white sanskriti-card p-5 shadow-sm">
      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-ink">
        {type}
      </span>

      <h3 className="mt-4 text-xl font-semibold text-ink">
        {name}
      </h3>

      <p className="mt-2 text-sm font-medium text-marigold">
        {area}
      </p>

      <p className="mt-3 text-lg font-bold text-ink">
        {price}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-inksoft">
        {description}
      </p>

      <a
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex rounded-full border border-ink px-5 py-2.5 text-sm font-semibold text-ink"
      >
        View on Maps
      </a>
    </div>
  );
}