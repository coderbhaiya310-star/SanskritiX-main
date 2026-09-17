import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-10 bg-indigo text-[#EFEAD9]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-marigold font-display text-[15px] font-bold text-white">सं</span>
              <span className="text-lg font-semibold text-white">
                Sanskriti<span className="text-marigold">X</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-[#DCE6DF]/80">{t('footerTagline')}</p>
            <span className="mt-4 inline-block rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/70">
              SanskritiX Experiences
            </span>
          </div>
          <FooterColumn
            heading="Explore"
            links={[
              { to: '/explore', label: t('explore') },
              { to: '/states', label: t('states') },
              { to: '/search?q=food', label: t('food') },
              { to: '/search?q=festival', label: t('festivals') },
            ]}
          />
          <FooterColumn
            heading="Community"
            links={[
              { to: '/become-guide', label: 'Become a Guide' },
              { to: '/feedback', label: t('navFeedback') },
              { to: '/about', label: t('navAbout') },
            ]}
          />
          <FooterColumn
            heading="More"
            links={[
              { to: '/experiences', label: 'Guided Tours' },
              { to: '/feedback', label: 'Privacy (placeholder)' },
              { to: '/feedback', label: 'Terms (placeholder)' },
            ]}
          />
        </div>
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-5 text-white/65">
          <span className="font-semibold text-white">Content verification:</span> Destination information is reviewed against official government tourism, heritage and public-information resources wherever available. Availability, timings and local conditions should always be checked with the relevant authority before travel.
        </div>
        <div className="mt-4 border-t border-white/15 pt-6 text-xs text-white/40">
          SanskritiX brings discovery, planning, local experiences and travel support together in one place.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <p className="text-[13px] font-semibold uppercase tracking-wide text-[#B9CFC7]">{heading}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-[#DCE6DF]/85 hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
