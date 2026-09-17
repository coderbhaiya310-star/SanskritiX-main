// Lightweight localStorage helpers for the SanskritiX .
// This is intentionally simple (no schema versioning, no encryption) because
// SanskritiX keeps travel preferences and account data locally in this version
// without changing how the rest of the app reads/writes this data.

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can fail (private browsing, quota) — fail silently in a .
  }
}

export const STORAGE_KEYS = {
  currentUser: 'sanskritix.currentUser',
  users: 'sanskritix.users',
  savedPlaces: 'sanskritix.savedPlaces',
  language: 'sanskritix.language',
  guideReviews: 'sanskritix.guideReviews',
  placeReviews: 'sanskritix.placeReviews',
  tourRequests: 'sanskritix.tourRequests',
  feedback: 'sanskritix.feedback',
} as const;
