type Props = {
  name: string;
  type: string;
  description: string;
  bestTime: string;
  mapUrl: string;
};

export default function HiddenPlaceCard({
  name,
  type,
  description,
  bestTime,
  mapUrl,
}: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stoneline bg-white sanskriti-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-2 bg-marigold" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-marigold/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-marigold">
            {type}
          </span>

          <span className="text-xl opacity-60">📍</span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
          {name}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-inksoft">
          {description}
        </p>

        <div className="mt-5 rounded-xl bg-cream p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-ink/50">
            Best time to visit
          </p>

          <p className="mt-1 text-sm font-semibold text-ink">
            🕐 {bestTime}
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-marigold"
          >
            Get Directions
          </a>

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-marigold hover:text-marigold"
          >
            Map
          </a>
        </div>
      </div>
    </article>
  );
}