import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section';
import EmptyState from '../components/EmptyState';
import NotFoundBlock from '../components/NotFoundBlock';
import { getStateById, getDestinationsByState, getPlacesByIds } from '../data/repository';

export default function StatePage() {
  const { stateId } = useParams();
  const state = stateId ? getStateById(stateId) : undefined;

  if (!state) {
    return <NotFoundBlock title="State not found" description="We couldn't find that state in this destination yet." backTo="/explore" backLabel="Back to Explore" />;
  }

  const destinations = getDestinationsByState(state.id);

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <span className="inline-block rounded-full bg-cream2 px-3 py-1 text-xs font-bold uppercase tracking-wide text-inksoft">{state.tag}</span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{state.name}</h1>
          <p className="mt-3 max-w-lg text-inksoft">{state.description}</p>
        </div>
      </div>

      <Section title="Destinations in this state">
        {destinations.length === 0 ? (
          <EmptyState
            title="No destinations listed yet"
            description={`SanskritiX is preparing destination information for ${state.name}. You can still search the wider India catalogue.`}
            action={
              <Link to="/search" className="rounded-full bg-madder px-5 py-2.5 text-sm font-semibold text-white hover:bg-madderdark">
                Search India
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => {
              const places = getPlacesByIds(d.placeIds);
              return (
                <Link key={d.id} to={`/destination/${d.id}`} className="flex flex-col rounded-2xl border border-stoneline bg-white p-5 transition-shadow hover:shadow-md">
                  <h3 className="font-display text-lg font-semibold text-ink">{d.name}</h3>
                  <p className="mt-1.5 line-clamp-3 text-sm text-inksoft">{d.intro}</p>
                  <span className="mt-3 text-xs font-medium text-muted">{places.length} places to explore</span>
                  <span className="mt-2 text-sm font-semibold text-madder">Explore</span>
                </Link>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}
