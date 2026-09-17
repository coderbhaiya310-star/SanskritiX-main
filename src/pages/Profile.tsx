import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Section from '../components/Section';
import { useAuth } from '../context/AuthContext';
import { LANGUAGES } from '../data/translations';
import type { LangCode } from '../types';

const INTERESTS = ['Heritage', 'Food', 'Festivals', 'Nature', 'History', 'Architecture', 'Local experiences', 'Hidden places'];

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  function toggleInterest(i: string) {
    const has = user!.travelInterests.includes(i);
    updateProfile({ travelInterests: has ? user!.travelInterests.filter((x) => x !== i) : [...user!.travelInterests, i] });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h1 className="font-display text-3xl font-semibold text-ink">{user.name}</h1>
          <p className="mt-1 text-inksoft">{user.email}</p>
        </div>
      </div>

      <Section title="Preferences">
        <div className="max-w-xl space-y-6 rounded-2xl border border-stoneline bg-white p-6">
          <div>
            <p className="text-sm font-semibold text-ink">Country</p>
            <p className="mt-1 text-inksoft">{user.country || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Preferred language</p>
            <p className="mt-1 text-inksoft">{LANGUAGES.find((l) => l.code === user.preferredLanguage)?.native ?? user.preferredLanguage}</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Travel interests</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <button
                  key={i}
                  onClick={() => toggleInterest(i)}
                  aria-pressed={user.travelInterests.includes(i)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    user.travelInterests.includes(i) ? 'border-madder bg-madder text-white' : 'border-stoneline text-inksoft hover:border-ink/30'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            {saved && <p className="mt-2 text-xs font-medium text-indigo">Saved</p>}
          </div>
        </div>
      </Section>
    </div>
  );
}
