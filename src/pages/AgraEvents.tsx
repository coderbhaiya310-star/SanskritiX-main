import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Section from '../components/Section';
import MotifDivider from '../components/MotifDivider';


type EventCategory =
  | 'all'
  | 'festival'
  | 'culture'
  | 'workshop'
  | 'food'
  | 'heritage';

type AgraEvent = {
  id: string;
  title: string;
  category: Exclude<EventCategory, 'all'>;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  description: string;
  icon: string;
  status: 'upcoming' | 'ongoing' | 'seasonal';
};

const events: AgraEvent[] = [
  {
    id: 'agra-event-1',
    title: 'Taj Cultural Evening',
    category: 'culture',
    date: '2026-09-18',
    time: '6:00 PM – 9:00 PM',
    venue: 'Cultural Venue, Agra',
    description:
      'A  cultural evening featuring local music, dance and traditional performances.',
    icon: '🎭',
    status: 'upcoming',
  },

  {
    id: 'agra-event-2',
    title: 'Traditional Craft Workshop',
    category: 'workshop',
    date: '2026-09-20',
    time: '11:00 AM – 2:00 PM',
    venue: 'Local Craft Centre, Agra',
    description:
      'Learn about traditional decorative crafts and the skills used by local artisans.',
    icon: '🎨',
    status: 'upcoming',
  },

  {
    id: 'agra-event-3',
    title: 'Agra Food Experience',
    category: 'food',
    date: '2026-09-21',
    time: '5:00 PM – 9:00 PM',
    venue: 'Agra Food District',
    description:
      'Explore local flavours, traditional sweets and popular Agra food experiences.',
    icon: '🍛',
    status: 'upcoming',
  },

  {
    id: 'agra-event-4',
    title: 'Heritage Walk',
    category: 'heritage',
    date: '2026-09-22',
    time: '7:00 AM – 10:00 AM',
    venue: 'Old Agra',
    description:
      'A guided  heritage walk focusing on architecture, stories and historic neighbourhoods.',
    icon: '🏛️',
    status: 'upcoming',
  },

  {
    id: 'agra-event-5',
    title: 'Seasonal Cultural Celebrations',
    category: 'festival',
    date: '2026-09-25',
    time: 'Various timings',
    venue: 'Different locations across Agra',
    description:
      'Seasonal celebrations and community activities may take place at different locations in Agra.',
    icon: '🎉',
    status: 'seasonal',
  },
];

const categoryLabels: Record<EventCategory, string> = {
  all: 'All',
  festival: 'Festivals & Fairs',
  culture: 'Cultural Shows',
  workshop: 'Workshops',
  food: 'Food Events',
  heritage: 'Heritage',
};

export default function AgraEvents() {
  const [searchParams] = useSearchParams();

  const initialCategory =
    (searchParams.get('filter') as EventCategory) || 'all';

  const [category, setCategory] =
    useState<EventCategory>(initialCategory);

  const filteredEvents = useMemo(() => {
    if (category === 'all') {
      return events;
    }

    return events.filter((event) => event.category === category);
  }, [category]);

  return (
    <div>

      {/* =========================
          HEADER
          ========================= */}
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">

          <p className="text-xs font-bold uppercase tracking-wide text-marigold">
            SanskritiX • Agra
          </p>

          <h1 className="mt-2 font-display text-4xl font-semibold text-ink">
            What's Happening in Agra
          </h1>

          <p className="mt-4 max-w-3xl text-inksoft">
            Discover cultural programmes, festivals, workshops, food
            experiences and heritage activities happening around Agra.
          </p>

        </div>
      </div>


      {/* =========================
          FILTERS
          ========================= */}
      <Section
        title="Explore Events"
        subtitle="Filter events according to what you want to experience."
      >

        <div className="flex flex-wrap gap-3">

          {(Object.keys(categoryLabels) as EventCategory[]).map(
            (item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  category === item
                    ? 'border-ink bg-ink text-white'
                    : 'border-stoneline bg-white text-ink hover:border-marigold'
                }`}
              >
                {categoryLabels[item]}
              </button>
            )
          )}

        </div>

      </Section>


      <MotifDivider />


      {/* =========================
          EVENT LIST
          ========================= */}
      <Section
        title={`${category === 'all' ? 'All' : categoryLabels[category]} Events`}
        subtitle={`${filteredEvents.length} event${
          filteredEvents.length === 1 ? '' : 's'
        } in the SanskritiX Agra .`}
      >

        {filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-stoneline bg-white p-10 text-center">

            <div className="text-5xl">📅</div>

            <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
              No events found
            </h2>

            <p className="mt-2 text-inksoft">
              Try another event category.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-2xl border border-stoneline bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                {/* Event top */}
                <div className="flex items-start justify-between bg-paper p-6">

                  <div className="text-4xl">
                    {event.icon}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                      event.status === 'ongoing'
                        ? 'bg-green-100 text-green-700'
                        : event.status === 'seasonal'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {event.status}
                  </span>

                </div>


                {/* Event content */}
                <div className="p-6">

                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {event.title}
                  </h2>

                  <p className="mt-3 leading-relaxed text-inksoft">
                    {event.description}
                  </p>


                  {/* Date */}
                  <div className="mt-5 space-y-3 text-sm">

                    <div className="flex gap-3">
                      <span>📅</span>
                      <span className="font-medium text-ink">
                        {event.date}
                        {event.endDate && ` – ${event.endDate}`}
                      </span>
                    </div>


                    {/* Time */}
                    <div className="flex gap-3">
                      <span>🕐</span>
                      <span className="text-inksoft">
                        {event.time}
                      </span>
                    </div>


                    {/* Venue */}
                    <div className="flex gap-3">
                      <span>📍</span>
                      <span className="text-inksoft">
                        {event.venue}
                      </span>
                    </div>

                  </div>


                  {/*  note */}
                  <div className="mt-5 rounded-xl border border-stoneline bg-paper p-4">

                    <p className="text-xs leading-relaxed text-inksoft">
                      <strong className="text-ink">
                         information:
                      </strong>{' '}
                      Event listings are sample information for SanskritiX.
                      Verify dates and timings with the official organiser
                      before visiting.
                    </p>

                  </div>

                </div>

              </article>
            ))}

          </div>
        )}

      </Section>


      {/* =========================
          FUTURE FEATURE
          ========================= */}
      <Section
        title="How This Will Work in the Future"
        subtitle="The event system can later become a real-time discovery feature."
      >

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-stoneline bg-white p-6">
            <div className="text-3xl">🔎</div>

            <h3 className="mt-4 font-display text-xl font-semibold text-ink">
              Discover
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-inksoft">
              Find events happening today, this week and this month.
            </p>
          </div>


          <div className="rounded-2xl border border-stoneline bg-white p-6">
            <div className="text-3xl">📍</div>

            <h3 className="mt-4 font-display text-xl font-semibold text-ink">
              Navigate
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-inksoft">
              Open the venue location and get directions from the
              tourist's current location.
            </p>
          </div>


          <div className="rounded-2xl border border-stoneline bg-white p-6">
            <div className="text-3xl">🔔</div>

            <h3 className="mt-4 font-display text-xl font-semibold text-ink">
              Get Updates
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-inksoft">
              Later, tourists can receive updates when new events are
              added or dates change.
            </p>
          </div>

        </div>

      </Section>


      {/* =========================
          BACK
          ========================= */}
      <Section title="" className="pt-0">

        <Link
          to="/destination/agra"
          className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-madder"
        >
          ← Back to Agra
        </Link>

      </Section>

    </div>
  );
}