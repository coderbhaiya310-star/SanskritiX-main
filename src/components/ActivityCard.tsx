import type { ActivityItem } from '../types';

export default function ActivityCard({ item }: { item: ActivityItem }) {
  return (
    <div className="rounded-2xl border border-stoneline bg-white sanskriti-card p-5 transition-shadow hover:shadow-md">
      <h4 className="font-display text-base font-semibold text-ink">{item.name}</h4>
      <p className="mt-2 text-sm text-inksoft">{item.desc}</p>
    </div>
  );
}
