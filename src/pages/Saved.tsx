import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PlaceCard from '../components/PlaceCard';
import EmptyState from '../components/EmptyState';
import { useLanguage } from '../context/LanguageContext';
import { useSaved } from '../context/SavedContext';
import { getAllPlaces } from '../data/repository';

export default function Saved() {
  const { t } = useLanguage();
  const { savedIds } = useSaved();
  const places = getAllPlaces().filter((p) => savedIds.includes(p.id));

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h1 className="font-display text-3xl font-semibold text-ink">{t('navSaved')}</h1>
          <p className="mt-2 text-inksoft">Places you've bookmarked to revisit or plan around.</p>
        </div>
      </div>

      <Section title="Your saved places">
        {places.length === 0 ? (
          <EmptyState
            title={t('noSavedTitle')}
            description="Tap the bookmark icon on any place to save it here."
            action={
              <Link to="/explore" className="rounded-full bg-madder px-5 py-2.5 text-sm font-semibold text-white hover:bg-madderdark">
                {t('exploreBtn')}
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
