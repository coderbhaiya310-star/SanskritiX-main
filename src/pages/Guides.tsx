import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Section from '../components/Section';
import GuideCard from '../components/GuideCard';
import { useLanguage } from '../context/LanguageContext';
import { getAllGuides } from '../data/repository';
import type { Guide } from '../types';

export default function Guides() {
  const { t } = useLanguage();
  const [remoteGuides, setRemoteGuides] = useState<Guide[] | null>(null);
  useEffect(() => { api.guides().then((data) => setRemoteGuides(data as Guide[])).catch(() => setRemoteGuides(null)); }, []);
  const guides = remoteGuides ?? getAllGuides();

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{t('guides')}</h1>
          <p className="mt-2 max-w-xl text-inksoft">
            People who live in these places, ready to answer the questions a search engine can't.
          </p>
          <Link to="/become-guide" className="mt-4 inline-block text-sm font-semibold text-madder hover:underline">
            Interested in becoming a guide?
          </Link>
        </div>
      </div>

      <Section title="All guides" subtitle={`${guides.length} local guides across destinations.`}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {guides.map((g) => (
            <GuideCard key={g.id} guide={g} />
          ))}
        </div>
      </Section>
    </div>
  );
}
