import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import type { MockUser } from '../types';
import { api } from '../lib/api';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../lib/storage';

type AuthResult = { ok: boolean; error?: string };
interface AuthContextValue {
  user: MockUser | null;
  signup: (user: MockUser) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  updateProfile: (patch: Partial<MockUser>) => void;
}
const AuthContext = createContext<AuthContextValue | null>(null);

function toMockUser(data: any, password = ''): MockUser {
  return { name: data.name, email: data.email, password, preferredLanguage: data.preferredLanguage || 'en', country: data.country || 'India', travelInterests: data.travelInterests || [] };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(() => loadJSON<MockUser | null>(STORAGE_KEYS.currentUser, null));

  const persist = (next: MockUser) => { saveJSON(STORAGE_KEYS.currentUser, next); setUser(next); };

  const signup = useCallback(async (newUser: MockUser): Promise<AuthResult> => {
    try {
      const result: any = await api.signup({ name: newUser.name, email: newUser.email, password: newUser.password, preferredLanguage: newUser.preferredLanguage, country: newUser.country, travelInterests: newUser.travelInterests });
      localStorage.setItem('sanskritix_token', result.access_token);
      persist(toMockUser(result.user, ''));
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : 'Unable to create account.' };
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const result: any = await api.login(email, password);
      localStorage.setItem('sanskritix_token', result.access_token);
      persist(toMockUser(result.user, ''));
      return { ok: true };
    } catch (error) {
      // Keep the app usable if the API is not running yet.
      const users = loadJSON<MockUser[]>(STORAGE_KEYS.users, []);
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (found) { persist(found); return { ok: true }; }
      return { ok: false, error: error instanceof Error ? error.message : 'Unable to sign in.' };
    }
  }, []);

  const logout = useCallback(() => { localStorage.removeItem(STORAGE_KEYS.currentUser); localStorage.removeItem('sanskritix_token'); setUser(null); }, []);
  const updateProfile = useCallback((patch: Partial<MockUser>) => {
    setUser((prev) => { if (!prev) return prev; const updated = { ...prev, ...patch }; saveJSON(STORAGE_KEYS.currentUser, updated); return updated; });
  }, []);
  const value = useMemo(() => ({ user, signup, login, logout, updateProfile }), [user, signup, login, logout, updateProfile]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth must be used within AuthProvider'); return ctx; }
