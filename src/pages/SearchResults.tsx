import { useSearchParams } from 'react-router-dom';
import Section from '../components/Section';
import PlaceCard from '../components/PlaceCard';
import FoodCard from '../components/FoodCard';
import FestivalCard from '../components/FestivalCard';
import GuideCard from '../components/GuideCard';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import { getAllPlaces, getAllDestinations, getAllGuides, getStates } from '../data/repository';
import { cityProfiles } from '../data/cityProfiles';

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = (params.get('q') ?? '').trim().toLowerCase();
  const places = getAllPlaces();
  const destinations = getAllDestinations();
  const guides = getAllGuides();
  const states = getStates();

  const matches = (...values: (string | undefined)[]) => values.some((v) => v?.toLowerCase().includes(query));
  const matchedDestinations = query ? destinations.filter((d) => matches(d.name, d.intro, d.history, ...d.streets.map(s => s.name), ...d.food.map(f => f.name), ...d.festivals.map(f => f.name))) : [];
  const matchedStates = query ? states.filter((s) => matches(s.name, s.description, s.tag)) : [];
  const matchedPlaces = query ? places.filter((p) => matches(p.name, p.location, p.category, p.intro, p.whyFamous)) : [];
  const matchedFood = query ? destinations.flatMap((d) => d.food).filter((f) => matches(f.name, f.desc, f.area, f.why)) : [];
  const matchedFestivals = query ? destinations.flatMap((d) => d.festivals).filter((f) => matches(f.name, f.desc, f.season, f.significance)) : [];
  const matchedGuides = query ? guides.filter((g) => matches(g.name, g.city, ...g.specialties, ...g.languages)) : [];
  const matchedCityProfiles = query ? cityProfiles.filter((c) => matches(c.name, c.state, c.theme, ...c.highlights, ...c.foods, ...c.festivals, ...c.hidden)) : [];
  const total = matchedDestinations.length + matchedStates.length + matchedPlaces.length + matchedFood.length + matchedFestivals.length + matchedGuides.length + matchedCityProfiles.length;

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h1 className="font-display text-3xl font-semibold text-ink">Search India</h1>
          <p className="mt-2 text-inksoft">{query ? `Showing results for "${query}"` : 'Search destinations, states, places, food, festivals and local guides.'}</p>
          <div className="mt-5 max-w-lg"><SearchBar /></div>
        </div>
      </div>

      {query && total === 0 && (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <EmptyState title="No results found" description={`We couldn't find anything matching "${query}" in the SanskritiX catalogue yet. Try another city, place, food, festival or guide.`} />
        </div>
      )}

      {matchedDestinations.length > 0 && <Section title="Destinations"><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{matchedDestinations.map((d) => <a key={d.id} href={`/destination/${d.id}`} className="sanskriti-card rounded-2xl border border-stoneline p-5 transition hover:-translate-y-1 hover:shadow-md"><p className="text-xs font-bold uppercase tracking-wide text-marigold">Destination</p><h3 className="mt-2 font-display text-xl font-semibold text-ink">{d.name}</h3><p className="mt-2 text-sm leading-6 text-inksoft">{d.intro}</p><span className="mt-4 inline-block text-sm font-semibold text-madder">Explore {d.name} →</span></a>)}</div></Section>}

      {matchedStates.length > 0 && <Section title="States" className="pt-0"><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{matchedStates.map((s) => <a key={s.id} href={`/states/${s.id}`} className="sanskriti-card rounded-2xl border border-stoneline p-5 transition hover:-translate-y-1 hover:shadow-md"><p className="text-xs font-bold uppercase tracking-wide text-marigold">{s.tag}</p><h3 className="mt-2 font-display text-xl font-semibold text-ink">{s.name}</h3><p className="mt-2 text-sm leading-6 text-inksoft">{s.description}</p></a>)}</div></Section>}

      {matchedPlaces.length > 0 && <Section title="Places" className="pt-0"><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{matchedPlaces.map((p) => <PlaceCard key={p.id} place={p} />)}</div></Section>}
      {matchedFood.length > 0 && <Section title="Food" className="pt-0"><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{matchedFood.map((f) => <FoodCard key={f.id} item={f} />)}</div></Section>}
      {matchedFestivals.length > 0 && <Section title="Festivals" className="pt-0"><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{matchedFestivals.map((f) => <FestivalCard key={f.id} item={f} />)}</div></Section>}
      {matchedGuides.length > 0 && <Section title="Local guides" className="pt-0"><div className="grid grid-cols-1 gap-5 md:grid-cols-2">{matchedGuides.map((g) => <GuideCard key={g.id} guide={g} />)}</div></Section>}
      {matchedCityProfiles.length > 0 && <Section title="Cultural companions" className="pt-0"><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{matchedCityProfiles.map((c) => <a key={c.id} href={`/companion/${c.id}`} className="sanskriti-card rounded-2xl border border-stoneline p-5 transition hover:-translate-y-1 hover:shadow-md"><p className="text-xs font-bold uppercase tracking-wide text-marigold">Cultural Companion • {c.state}</p><h3 className="mt-2 font-display text-xl font-semibold text-ink">{c.name}</h3><p className="mt-2 text-sm leading-6 text-inksoft">{c.theme}</p><p className="mt-4 text-sm font-semibold text-madder">Build a cultural journey →</p></a>)}</div></Section>}

    </div>
  );
}
