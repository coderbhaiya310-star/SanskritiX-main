import { Link } from 'react-router-dom';
import type { StateEntry } from '../types';
import PlaceholderImage from './PlaceholderImage';

const GRADIENTS: Record<string, string> = {
  Heritage: 'linear-gradient(135deg,#E0B27F,#C98A4F)',
  Craft: 'linear-gradient(135deg,#9FBBAE,#6E9384)',
  Nature: 'linear-gradient(135deg,#9AAEC7,#6C86AC)',
  Culture: 'linear-gradient(135deg,#CBAED0,#A57DAC)',
  History: 'linear-gradient(135deg,#B8B08C,#8F8760)',
};

export default function StateCard({ state }: { state: StateEntry }) {
  const hasDestinations = state.destinationIds.length > 0;

  return (
    <Link
      to={`/states/${state.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stoneline bg-white transition-transform hover:-translate-y-1 hover:shadow-md"
    >
      {state.image ? (
        <PlaceholderImage src={state.image} alt={state.name} />
      ) : (
        <div
          className="flex aspect-[4/3] w-full items-end p-3.5"
          style={{ background: GRADIENTS[state.tag] ?? GRADIENTS.Heritage }}
        >
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-wide text-ink">{state.tag}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{state.name}</h3>
        <p className="mt-1.5 flex-1 text-sm text-inksoft">{state.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-muted">{hasDestinations ? `${state.destinationIds.length} places live` : 'Coming soon'}</span>
          <span className="text-sm font-semibold text-madder group-hover:underline">Explore</span>
        </div>
      </div>
    </Link>
  );
}
