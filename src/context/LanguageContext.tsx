import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import type { LangCode, LocalizedText } from '../types';
import { UI, LANGUAGES } from '../data/translations';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../lib/storage';

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: keyof typeof UI) => string;
  tx: (text: LocalizedText | undefined) => string;
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => loadJSON<LangCode>(STORAGE_KEYS.language, 'en'));

  const setLang = useCallback((next: LangCode) => {
    setLangState(next);
    saveJSON(STORAGE_KEYS.language, next);
  }, []);

  const t = useCallback((key: keyof typeof UI) => UI[key]?.[lang] ?? UI[key]?.en ?? String(key), [lang]);

  const tx = useCallback(
    (text: LocalizedText | undefined) => {
      if (!text) return '';
      return text[lang] ?? text.en ?? '';
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, tx, languages: LANGUAGES }), [lang, setLang, t, tx]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
