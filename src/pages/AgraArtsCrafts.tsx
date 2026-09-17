import { Link } from 'react-router-dom';

const crafts = [
  {
    name: 'Marble Inlay',
    category: 'Stone Craft',
    description:
      'Agra is famous for delicate marble inlay work where colourful stones are carefully fitted into marble to create floral and geometric designs.',
    location: 'Taj Ganj & areas around the Taj Mahal',
    mapQuery: 'marble inlay Agra Uttar Pradesh',
  },
  {
    name: 'Leather Craft',
    category: 'Leather Craft',
    description:
      'Traditional leather craftsmanship in Agra includes footwear, bags, belts, wallets and other handmade leather products.',
    location: 'Sadar Bazaar & local markets',
    mapQuery: 'Sadar Bazaar Agra Uttar Pradesh',
  },
  {
    name: 'Zardozi Embroidery',
    category: 'Textile Craft',
    description:
      'Zardozi is a decorative embroidery tradition using metallic threads and embellishments to create detailed patterns on fabric.',
    location: 'Local handicraft markets',
    mapQuery: 'handicraft market Agra Uttar Pradesh',
  },
  {
    name: 'Carpet Weaving',
    category: 'Handloom',
    description:
      'Agra has a long association with carpet weaving, with intricate patterns and traditional designs produced by skilled artisans.',
    location: 'Agra handicraft markets',
    mapQuery: 'carpet market Agra Uttar Pradesh',
  },
];

export default function AgraArtsCrafts() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">
              Art & Craft
            </p>

            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Arts & Crafts of Agra
            </h1>

            <p className="mt-4 max-w-2xl text-inksoft">
              Explore traditional crafts, handmade products and artistic
              traditions that are part of Agra's cultural identity.
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
          {crafts.map((craft) => (
            <article
              key={craft.name}
              className="group overflow-hidden rounded-2xl border border-stoneline bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-2 bg-marigold" />

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-marigold/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-marigold">
                    {craft.category}
                  </span>

                  <span className="text-2xl">🎨</span>
                </div>

                <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
                  {craft.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-inksoft">
                  {craft.description}
                </p>

                <div className="mt-5 rounded-xl bg-cream p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink/50">
                    Where to explore
                  </p>

                  <p className="mt-1 text-sm font-semibold text-ink">
                    📍 {craft.location}
                  </p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    craft.mapQuery
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marigold"
                >
                  Explore on Map
                </a>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-stoneline bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">
            Experience the Craft
          </p>

          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            Meet the Makers
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-inksoft">
            Visit local craft areas, watch artisans at work and discover
            handmade products directly from traditional markets and workshops.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/agra/planner"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marigold"
            >
              Add to Trip
            </Link>

            <Link
              to="/agra/stay-eat"
              className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-marigold hover:text-marigold"
            >
              Stay & Eat
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}