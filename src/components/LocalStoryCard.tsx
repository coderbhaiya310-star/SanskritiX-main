import type { LocalStory } from '../types';

export default function LocalStoryCard({ story }: { story: LocalStory }) {
  return (
    <div className="rounded-2xl border border-stoneline bg-white sanskriti-card p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-base font-semibold text-ink">{story.title}</h4>
        {story.folklore && (
          <span className="flex-shrink-0 rounded-full bg-marigold/15 px-2.5 py-0.5 text-xs font-medium text-marigolddark">
            Local tradition / folklore
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-inksoft">{story.body}</p>
    </div>
  );
}
