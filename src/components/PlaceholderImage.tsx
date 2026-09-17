import { useLanguage } from '../context/LanguageContext';

interface Props {
  src?: string;
  alt: string;
  className?: string;
  ratio?: string; // tailwind aspect-ratio class
}

/**
 * Renders the real image when a src is provided; otherwise shows a calm,
 * on-brand placeholder rather than a broken image icon. Media (photos/videos)
 * is intentionally left empty for manual addition later.
 */
export default function PlaceholderImage({ src, alt, className = '', ratio = 'aspect-[4/3]' }: Props) {
  const { t } = useLanguage();
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`${ratio} w-full object-cover ${className}`} />;
  }
  return (
    <div
      className={`${ratio} w-full jaali-texture flex flex-col items-center justify-center gap-1 bg-stoneline/40 text-ink/40 ${className}`}
      role="img"
      aria-label={alt}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8" cy="10" r="1.6" fill="currentColor" />
        <path d="M3 17L9 12L13 15L21 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xs font-medium">{t('photoComingSoon')}</span>
    </div>
  );
}
