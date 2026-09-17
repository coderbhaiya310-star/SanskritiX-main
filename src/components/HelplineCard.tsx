type Props = {
  name: string;
  number: string;
  description: string;
};

export default function HelplineCard({
  name,
  number,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-stoneline bg-white sanskriti-card p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-ink">
        {name}
      </h3>

      <p className="mt-2 text-sm text-inksoft">
        {description}
      </p>

      <a
        href={`tel:${number}`}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white"
      >
        📞 {number}
      </a>
    </div>
  );
}