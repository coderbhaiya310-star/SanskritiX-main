import { Link } from 'react-router-dom';
import data from '../data/agraFeatures.json';

export default function AgraStayEat() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">
              Stay & Eat in Agra
            </p>

            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Where to Stay & Eat
            </h1>

            <p className="mt-4 max-w-2xl text-inksoft">
              Find suitable areas to stay and places to enjoy local Agra food.
            </p>
          </div>

          <Link
            to="/destination/agra"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-marigold hover:bg-marigold hover:text-white"
          >
            ← Back to Agra
          </Link>
        </div>

        <section className="mt-12">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">
              Accommodation
            </p>

            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
              Stay in Agra
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {data.stays.map((stay) => (
              <article
                key={stay.name}
                className="rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="rounded-full bg-marigold/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-marigold">
                  {stay.type}
                </span>

                <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                  {stay.name}
                </h3>

                <div className="mt-5 rounded-xl bg-cream p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink/50">
                    Typical price
                  </p>

                  <p className="mt-1 text-lg font-semibold text-ink">
                    ₹{stay.priceRange}
                  </p>
                  <p className="mt-1 text-xs text-inksoft">per night</p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${stay.name}, Agra`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marigold"
                >
                  View on Map
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">
              Local Food
            </p>

            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
              Eat in Agra
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {data.restaurants.map((restaurant) => (
              <article
                key={restaurant.name}
                className="rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="rounded-full bg-marigold/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-marigold">
                  {restaurant.cuisine}
                </span>

                <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                  {restaurant.name}
                </h3>

                <p className="mt-2 text-sm font-medium text-inksoft">
                  📍 {restaurant.area}
                </p>

                <div className="mt-5 rounded-xl bg-cream p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink/50">
                    Typical price
                  </p>

                  <p className="mt-1 text-lg font-semibold text-ink">
                    ₹{restaurant.priceRange}
                  </p>
                  <p className="mt-1 text-xs text-inksoft">per person</p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${restaurant.name}, ${restaurant.area}, Agra`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marigold"
                >
                  Find on Map
                </a>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          <Link
            to="/agra/planner"
            className="group rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm font-semibold text-marigold">
              PLAN YOUR VISIT
            </p>

            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
              Make My Agra Trip
            </h2>

            <p className="mt-2 text-sm leading-6 text-inksoft">
              Create a 1, 2 or 3-day route-based itinerary.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-ink transition group-hover:text-marigold">
              Plan your trip →
            </span>
          </Link>

          <Link
            to="/agra/money"
            className="group rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm font-semibold text-marigold">
              TRAVEL SMART
            </p>

            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
              Fair Price Guide
            </h2>

            <p className="mt-2 text-sm leading-6 text-inksoft">
              Check local prices before booking transport, food or guides.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-ink transition group-hover:text-marigold">
              Check prices →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}