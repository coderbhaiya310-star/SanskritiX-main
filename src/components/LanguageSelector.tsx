import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { LangCode } from '../types';

export default function LanguageSelector() {
  const { lang, setLang, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find((l) => l.code === lang)!;

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3 py-1.5 text-sm font-medium text-ink hover:border-ink/30 transition-colors"
      >
        <span aria-hidden="true">🌐</span>
        <span>{current.native}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-ink/10 bg-white shadow-lg"
        >
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code as LangCode);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-sandstone ${
                  l.code === lang ? 'bg-sandstone font-semibold' : ''
                }`}
              >
                <span>{l.native}</span>
                <span className="text-xs text-ink/50">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
