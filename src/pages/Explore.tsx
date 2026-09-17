import Section from '../components/Section';
import StateCard from '../components/StateCard';
import SearchBar from '../components/SearchBar';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getStates } from '../data/repository';

export default function Explore() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const states = getStates();

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="text-sm font-semibold text-madder">{user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Welcome'}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">{t('whereExplore')}</h1>
          <div className="mt-6 max-w-lg">
            <SearchBar />
          </div>
        </div>
      </div>

      <Section title={t('states')} subtitle={`${states.length} `}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((s) => (
            <StateCard key={s.id} state={s} />
          ))}
        </div>
      </Section>
    </div>
  );
}
