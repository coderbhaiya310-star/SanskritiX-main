import { Link } from 'react-router-dom';
import type { Guide } from '../types';
import RatingStars from './RatingStars';
import PlaceholderImage from './PlaceholderImage';

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link to={`/guides/${guide.id}`} className="flex gap-4 rounded-2xl border border-stoneline bg-white sanskriti-card p-4 transition-shadow hover:shadow-md">
      <PlaceholderImage src={guide.photo} alt={guide.name} ratio="aspect-square" className="h-16 w-16 max-h-16 max-w-16 flex-shrink-0 rounded-xl object-cover" />
      <div className="flex flex-1 flex-col">
        <p className="font-display text-lg font-semibold text-ink">{guide.name}</p>
        <p className="text-sm text-muted">{guide.city}</p>
        <p className="mt-1 line-clamp-2 text-sm text-inksoft">{guide.specialties.join(', ')}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="rounded-full bg-cream2 px-2 py-0.5">{guide.languages.join(', ')}</span>
          <span>{guide.experience} experience</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <RatingStars rating={guide.baseRating} reviewCount={guide.reviews.length} />
          <span className="text-sm font-semibold text-madder">View Profile</span>
        </div>
      </div>
    </Link>
  );
}
