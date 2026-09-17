import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({
  title,
  subtitle,
  children,
  className = '',
  id,
}: Props) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl px-4 py-10 sm:px-6 ${className}`}
    >
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-ink/60">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}