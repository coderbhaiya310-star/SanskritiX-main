import type { PlaceMedia } from '../types';
import PlaceholderImage from './PlaceholderImage';

export default function MediaGallery({ media, name }: { media: PlaceMedia; name: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {media.images.map((img, i) => (
        <PlaceholderImage key={i} src={img} alt={`${name} photo ${i + 1}`} ratio="aspect-square" className="rounded-xl" />
      ))}
    </div>
  );
}