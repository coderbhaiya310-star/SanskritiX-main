type Props = {
  category: string;
  service: string;
  price: string;
  note: string;
};

export default function PriceGuideCard({
  category,
  service,
  price,
  note,
}: Props) {
  return (
    <div className="rounded-2xl border border-stoneline bg-white sanskriti-card p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-marigold">
        {category}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-ink">
        {service}
      </h3>

      <p className="mt-3 text-2xl font-bold text-ink">
        {price}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-inksoft">
        {note}
      </p>

      <p className="mt-3 text-xs font-semibold text-marigold">
        Typical estimated range
      </p>
    </div>
  );
}