import { Link } from 'react-router-dom';
import HiddenPlaceCard from '../components/HiddenPlaceCard';
import data from '../data/agraFeatures.json';

export default function AgraHiddenPlaces() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">
              Explore Beyond The Famous Sights
            </p>

            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Hidden Agra
            </h1>

            <p className="mt-4 max-w-2xl text-inksoft">
              Discover quieter heritage sites, peaceful escapes and lesser-known
              places that add a different experience to your Agra journey.
            </p>
          </div>

          <Link
            to="/destination/agra"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-marigold hover:bg-marigold hover:text-white"
          >
            ← Back to Agra
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.hiddenPlaces.map((place) => (
            <HiddenPlaceCard
              key={place.id}
              {...place}
            />
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
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
              Choose 1, 2 or 3 days and create a route-based Agra itinerary.
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
              Check common local prices for transport, food and sightseeing
              before you pay.
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