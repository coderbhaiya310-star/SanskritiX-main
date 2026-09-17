export default function CulturalEtiquette({ tips }: { tips: string[] }) {
  if (tips.length === 0) return null;
  return (
    <ul className="space-y-3">
      {tips.map((tip, i) => (
        <li key={i} className="flex items-start gap-3 rounded-xl border border-stoneline bg-white sanskriti-card p-4">
          <span className="mt-0.5 text-marigold" aria-hidden="true">◆</span>
          <span className="text-sm text-inksoft">{tip}</span>
        </li>
      ))}
    </ul>
  );
}
