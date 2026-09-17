import { useSaved } from '../context/SavedContext';
import { useLanguage } from '../context/LanguageContext';

export default function SaveButton({ id }: { id: string }) {
  const { isSaved, toggleSaved } = useSaved();
  const { t } = useLanguage();
  const saved = isSaved(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(id);
      }}
      aria-pressed={saved}
      aria-label={saved ? t('saved') : t('save')}
      className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-colors ${
        saved ? 'border-madder bg-madder text-white' : 'border-ink/15 bg-white/90 text-ink hover:border-madder/60'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} aria-hidden="true">
        <path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
