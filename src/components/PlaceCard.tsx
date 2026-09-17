import { Link } from 'react-router-dom';
import type { Place } from '../types';
import PlaceholderImage from './PlaceholderImage';
import SaveButton from './SaveButton';

export default function PlaceCard({ place }: { place: Place }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-stoneline bg-white sanskriti-card transition-shadow hover:shadow-md">
      <Link to={`/place/${place.id}`}>
        <PlaceholderImage src={place.media.images.find(Boolean)} alt={place.name} />
      </Link>
      <div className="absolute right-3 top-3">
        <SaveButton id={place.id} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/place/${place.id}`}>
          <h3 className="font-display text-lg font-semibold text-ink group-hover:underline">{place.name}</h3>
        </Link>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-marigold">{place.category}</p>
        <p className="mt-2 line-clamp-2 text-sm text-inksoft">{place.intro}</p>
        <Link to={`/place/${place.id}`} className="mt-3 text-sm font-semibold text-madder hover:underline">
          Explore
        </Link>
      </div>
    </div>
  );
}
