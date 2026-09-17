import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-b border-stoneline bg-sandstone py-16 sm:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(\'/images/india-cultural-heritage.jpg\')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sandstone/25 via-sandstone/10 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <div className="mb-4 flex items-center justify-center gap-2.5 text-xs font-bold tracking-wide text-marigold">
          <span className="inline-block h-0.5 w-6 bg-marigold" aria-hidden="true" />
          {t('heroEyebrow')}
          <span className="inline-block h-0.5 w-6 bg-marigold" aria-hidden="true" />
        </div>

        <h1 className="font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-6xl">
          {t('heroTitle1')}
          <span className="block text-madder">{t('heroTitle2')}</span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-inksoft">{t('heroLede')}</p>

        <div className="mt-7 w-full max-w-2xl">
          <SearchBar />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3.5">
          <Link to="/start" className="rounded-full bg-madder px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-madderdark">
            ✨ Plan My Trip
          </Link>
          <Link to="/companion/agra" className="rounded-full border border-stoneline bg-white/90 px-6 py-3 text-sm font-semibold text-ink shadow-sm hover:border-marigold">
            🪔 Ask the City
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2.5 text-sm text-muted">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-tealtint text-madder">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
            </svg>
          </span>
          {t('trust')}
        </div>
      </div>
    </section>
  );
}
