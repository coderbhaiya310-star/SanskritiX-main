import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import StateCard from '../components/StateCard';
import { useLanguage } from '../context/LanguageContext';
import { getStates } from '../data/repository';
import InterestExplorer from '../components/InterestExplorer';

const THREADS = [
  {
    id: 't1',
    gradient: 'linear-gradient(160deg,#EAC79B,#E7A96B)',
    title: 'Walk through history',
    desc: 'Monuments that make more sense with a local lens.',
    icon: (
      <path d="M4 19.5V4.5A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5z" />
    ),
  },
  {
    id: 't2',
    gradient: 'linear-gradient(160deg,#BFD6BE,#9AC0A6)',
    title: 'Follow the living craft',
    desc: 'Meet the hands, materials and rituals behind the object.',
    icon: <path d="M20 4L9 15l-5-5" />,
  },
  {
    id: 't3',
    gradient: 'linear-gradient(160deg,#B9CBD6,#93AEC0)',
    title: 'Find your outside',
    desc: 'Wetlands, mountain paths and forests beyond the city.',
    icon: <path d="M12 3c-4 4-7 7-7 11a7 7 0 0014 0c0-4-3-7-7-11z" />,
  },
];

export default function Landing() {
  const { t } = useLanguage();
  const states = getStates().slice(0, 3);

  return (
    <div className="relative overflow-hidden bg-sandstone">
      <HeroSection />

      <InterestExplorer />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-3.5 flex items-center gap-2.5 text-xs font-bold tracking-wide text-marigold">
              <span className="inline-block h-0.5 w-6 bg-marigold" aria-hidden="true" />
              {t('threadEyebrow')}
            </div>
            <h2 className="font-display text-3xl font-semibold text-ink">{t('threadTitle')}</h2>
            <p className="mt-2 max-w-xl text-inksoft">{t('threadSub')}</p>
          </div>
          <Link to="/start" className="flex flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-madder hover:underline">
            {t('seeAll')}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {THREADS.map((thread) => (
            <Link
              key={thread.id}
              to="/destination/agra"
              className="flex min-h-[250px] flex-col justify-end overflow-hidden rounded-[22px] p-8"
              style={{ background: thread.gradient }}
            >
              <span className="mb-16 flex h-11 w-11 items-center justify-center rounded-full bg-white/55">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E2438" strokeWidth="1.6">
                  {thread.icon}
                </svg>
              </span>
              <h3 className="font-display text-xl font-semibold text-ink">{thread.title}</h3>
              <p className="mt-1.5 text-sm text-inksoft">{thread.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-3.5 flex items-center gap-2.5 text-xs font-bold tracking-wide text-marigold">
              <span className="inline-block h-0.5 w-6 bg-marigold" aria-hidden="true" />
              {t('mapEyebrow')}
            </div>
            <h2 className="font-display text-3xl font-semibold text-ink">{t('mapTitle')}</h2>
            <p className="mt-2 max-w-xl text-inksoft">{t('mapSub')}</p>
          </div>
          <Link to="/explore" className="flex flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-madder hover:underline">
            {t('seeAll')}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((s) => (
            <StateCard key={s.id} state={s} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-[28px] bg-white p-7 shadow-sm sm:p-9">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold">One journey, not five tabs</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Discover → Understand → Travel → Remember.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-inksoft">SanskritiX combines destination discovery, a personal route, cultural context, live trip guidance and a Smart Passport into one connected experience.</p>
            </div>
            <Link to="/companion/agra" className="rounded-full bg-madder px-6 py-3 text-center text-sm font-bold text-white hover:bg-madderdark">Open Cultural Companion →</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[26px] bg-indigo px-8 py-12 text-center text-sandstone sm:flex-row sm:text-left">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('ctaTitle')}</h2>
            <p className="mt-2 text-sandstone/75">{t('ctaSub')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
            <Link to="/start" className="flex-shrink-0 rounded-full bg-marigold px-7 py-3 text-sm font-semibold text-white hover:bg-marigolddark">
              {t('exploreBtn')}
            </Link>
            <Link to="/companion/agra" className="flex-shrink-0 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-bold text-white hover:bg-white/15">
              ✨ Cultural Companion
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
