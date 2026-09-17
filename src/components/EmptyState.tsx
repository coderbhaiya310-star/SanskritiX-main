interface Props {
  title: string;
  description?: string;
  icon?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, icon = '✦', action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-white/50 px-6 py-12 text-center">
      <div className="mb-3 text-2xl text-marigold" aria-hidden="true">{icon}</div>
      <p className="font-display text-lg text-ink">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-ink/60">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
