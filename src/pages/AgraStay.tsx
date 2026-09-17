import StayCard from '../components/StayCard';
import data from '../data/agraFeatures.json';

export default function AgraStay() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-wide text-marigold">
        Stay & Eat
      </p>

      <h1 className="mt-2 font-display text-4xl font-semibold text-ink">
        Where to Stay in Agra
      </h1>

      <p className="mt-4 max-w-2xl text-inksoft">
        Explore accommodation areas according to your budget and
        sightseeing needs.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {data.stays.map((stay) => (
          <StayCard
  key={stay.name}
  name={stay.name}
  area={stay.area}
  price={stay.priceRange}
  type={stay.type}
  description={stay.description}
  mapUrl={stay.mapUrl}
/>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Restaurants & Local Food
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {data.restaurants.map((restaurant) => (
            <div
              key={restaurant.name}
              className="rounded-2xl border border-stoneline bg-white p-5"
            >
              <h3 className="text-xl font-semibold text-ink">
                {restaurant.name}
              </h3>

              <p className="mt-2 text-sm text-marigold">
                {restaurant.area}
              </p>

              <p className="mt-3 text-sm text-inksoft">
                Cuisine: {restaurant.cuisine}
              </p>

              <p className="mt-2 font-semibold text-ink">
                {restaurant.priceRange}
              </p>

              <a
                href={restaurant.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full border border-ink px-5 py-2.5 text-sm font-semibold"
              >
                Find on Maps
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}