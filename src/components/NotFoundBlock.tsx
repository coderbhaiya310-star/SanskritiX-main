import { Link } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  backTo: string;
  backLabel: string;
}

export default function NotFoundBlock({ title, description, backTo, backLabel }: Props) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <div className="mb-4 text-3xl text-marigold" aria-hidden="true">✦</div>
      <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
      <p className="mt-2 text-ink/60">{description}</p>
      <Link to={backTo} className="mt-6 rounded-full bg-madder px-6 py-3 text-sm font-semibold text-white hover:bg-madder/90">
        {backLabel}
      </Link>
    </div>
  );
}
