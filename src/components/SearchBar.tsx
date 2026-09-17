import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function SearchBar({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className={`flex w-full items-center gap-2 rounded-full border border-ink/15 bg-white p-1.5 shadow-sm ${className}`}>
      <label htmlFor="site-search" className="sr-only">
        {t('searchPlaceholder')}
      </label>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-2 flex-shrink-0 text-ink/40" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
        <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-ink outline-none placeholder:text-ink/40"
      />
      <button type="submit" className="rounded-full bg-madder px-5 py-2 text-sm font-semibold text-white hover:bg-madder/90">
        {t('explore')}
      </button>
    </form>
  );
}
