import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../lib/storage';

interface SavedContextValue {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
}

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(() => loadJSON<string[]>(STORAGE_KEYS.savedPlaces, []));

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveJSON(STORAGE_KEYS.savedPlaces, next);
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const value = useMemo(() => ({ savedIds, isSaved, toggleSaved }), [savedIds, isSaved, toggleSaved]);

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used within SavedProvider');
  return ctx;
}
