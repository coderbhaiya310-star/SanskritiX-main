import HelplineCard from '../components/HelplineCard';
import data from '../data/agraFeatures.json';

export default function AgraHelp() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-wide text-marigold">
        Stay Safe
      </p>

      <h1 className="mt-2 font-display text-4xl font-semibold text-ink">
        Agra Emergency Helplines
      </h1>

      <p className="mt-4 max-w-2xl text-inksoft">
        Keep these numbers handy while travelling in Agra.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.helplines.map((item) => (
          <HelplineCard
            key={`${item.name}-${item.number}`}
            {...item}
          />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">
        For an immediate emergency, use the appropriate emergency
        service number and follow instructions from the operator.
      </div>
    </div>
  );
}