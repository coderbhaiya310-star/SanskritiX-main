import { Link } from 'react-router-dom';

const stories = [
  {
    title: 'The Black Taj Legend',
    category: 'Legend',
    description:
      'A famous Agra legend tells of a proposed black marble mausoleum that Shah Jahan supposedly planned to build opposite the Taj Mahal. The story remains one of the city’s most fascinating historical legends.',
    place: 'Mehtab Bagh',
    mapQuery: 'Mehtab Bagh Agra Uttar Pradesh',
  },
  {
    title: 'Why Gyarah Sidi Has Eleven Steps',
    category: 'Local History',
    description:
      'Gyarah Sidi is associated with eleven stone steps and is traditionally linked with astronomical observations. Its quiet setting offers a lesser-known glimpse into Agra’s historical landscape.',
    place: 'Gyarah Sidi',
    mapQuery: 'Gyarah Sidi Agra Uttar Pradesh',
  },
  {
    title: 'The Story of Marble Inlay',
    category: 'Craft Tradition',
    description:
      'The detailed stone inlay tradition seen in Agra developed into a highly skilled craft involving carefully cut pieces of coloured stone fitted into marble designs.',
    place: 'Taj Ganj',
    mapQuery: 'Taj Ganj Agra Uttar Pradesh',
  },
  {
    title: 'Agra’s Mughal Food Heritage',
    category: 'Food Culture',
    description:
      'Agra’s food culture reflects centuries of Mughal influence, with rich gravies, kebabs, breads and sweets forming an important part of the city’s culinary identity.',
    place: 'Old Agra',
    mapQuery: 'old city Agra Uttar Pradesh',
  },
];

export default function AgraLocalStories() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">
              Stories of Agra
            </p>

            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Local Stories
            </h1>

            <p className="mt-4 max-w-2xl text-inksoft">
              Discover legends, traditions and lesser-known stories connected
              with Agra’s places, people and culture.
            </p>
          </div>

          <Link
            to="/destination/agra"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-marigold hover:bg-marigold hover:text-white"
          >
            ← Back to Agra
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {stories.map((story) => (
            <article
              key={story.title}
              className="group overflow-hidden rounded-2xl border border-stoneline bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-2 bg-marigold" />

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-marigold/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-marigold">
                    {story.category}
                  </span>

                  <span className="text-2xl">📖</span>
                </div>

                <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
                  {story.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-inksoft">
                  {story.description}
                </p>

                <div className="mt-5 rounded-xl bg-cream p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink/50">
                    Connected place
                  </p>

                  <p className="mt-1 text-sm font-semibold text-ink">
                    📍 {story.place}
                  </p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    story.mapQuery
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marigold"
                >
                  Visit the Place
                </a>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-stoneline bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">
            Explore More
          </p>

          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            Experience Agra Beyond the Monuments
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-inksoft">
            Connect Agra’s stories with its streets, food, crafts, festivals
            and lesser-known places.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/agra/arts-crafts"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marigold"
            >
              Arts & Crafts
            </Link>

            <Link
              to="/agra/hidden"
              className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-marigold hover:text-marigold"
            >
              Hidden Agra
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}