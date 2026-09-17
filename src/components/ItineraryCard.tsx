type ItineraryPlace = {
  time: string;
  name: string;
  duration: string;
  description: string;
  mapUrl: string;
};

type ItineraryDay = {
  day: number;
  title: string;
  places: ItineraryPlace[];
};

type Props = {
  title: string;
  days: ItineraryDay[];
};

export default function ItineraryCard({ title, days }: Props) {
  return (
    <div className="rounded-2xl border border-stoneline bg-white sanskriti-card p-6 shadow-sm">
      <h2 className="font-display text-2xl font-semibold text-ink">
        {title}
      </h2>

      <div className="mt-6 space-y-8">
        {days.map((day) => (
          <div key={day.day}>
            <div className="mb-4">
              <span className="text-sm font-bold uppercase tracking-wide text-marigold">
                Day {day.day}
              </span>

              <h3 className="mt-1 text-xl font-semibold text-ink">
                {day.title}
              </h3>
            </div>

            <div className="space-y-4">
              {day.places.map((place) => (
                <div
                  key={`${day.day}-${place.time}-${place.name}`}
                  className="rounded-xl border border-stoneline bg-stone-50 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-marigold">
                        {place.time}
                      </p>

                      <h4 className="mt-1 font-semibold text-ink">
                        {place.name}
                      </h4>

                      <p className="mt-1 text-sm text-inksoft">
                        {place.description}
                      </p>

                      <p className="mt-2 text-xs font-medium text-inksoft">
                        Visit duration: {place.duration}
                      </p>
                    </div>

                    <a
                      href={place.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                      Open Route
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}