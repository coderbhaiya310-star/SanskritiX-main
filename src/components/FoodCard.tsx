import type { FoodItem } from '../types';
import PlaceholderImage from './PlaceholderImage';

export default function FoodCard({ item }: { item: FoodItem }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-stoneline bg-white sanskriti-card transition-shadow hover:shadow-md">
      <PlaceholderImage
        src={item.img}
        alt={item.name}
        ratio="aspect-[16/10]"
      />

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-base font-semibold text-ink">
            {item.name}
          </h4>

          <span
            className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
              item.veg
                ? 'bg-[#DDEFE0] text-[#256B3C]'
                : 'bg-[#F6DCD8] text-[#A03A2C]'
            }`}
          >
            {item.veg ? 'Veg' : 'Non-veg'}
          </span>
        </div>

        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-marigold">
          {item.area}
        </p>

        <p className="mt-2 text-sm text-inksoft">
          {item.desc}
        </p>

        <p className="mt-2 text-sm text-inksoft/80">
          <span className="font-semibold text-ink">
            Why it matters:{' '}
          </span>
          {item.why}
        </p>
      </div>
    </div>
  );
}