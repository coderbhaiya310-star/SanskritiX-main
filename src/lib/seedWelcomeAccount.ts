import { loadJSON, saveJSON, STORAGE_KEYS } from './storage';
import type { MockUser } from '../types';

const WELCOME_USER: MockUser = {
  name: 'Aanya Verma',
  email: 'welcome@sanskritix.app',
  password: 'exploreindia',
  preferredLanguage: 'en',
  country: 'India',
  travelInterests: ['Heritage', 'Food', 'Hidden places'],
};

/**
 * Ensures a fixed quick account exists in local storage so the login flow
 * can be accessed immediately, without requiring a fresh sign-up first.
 */
export function seedWelcomeAccount() {
  const users = loadJSON<MockUser[]>(STORAGE_KEYS.users, []);
  if (!users.some((u) => u.email === WELCOME_USER.email)) {
    saveJSON(STORAGE_KEYS.users, [...users, WELCOME_USER]);
  }
}

export const WELCOME_CREDENTIALS = { email: WELCOME_USER.email, password: WELCOME_USER.password };
