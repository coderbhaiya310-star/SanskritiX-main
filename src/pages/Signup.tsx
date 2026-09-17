import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import type { LangCode } from '../types';
import { LANGUAGES } from '../data/translations';

const INTERESTS = ['Heritage', 'Food', 'Festivals', 'Nature', 'History', 'Architecture', 'Local experiences', 'Hidden places'];

export default function Signup() {
  const { signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<LangCode>('en');
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState('');

  function toggleInterest(i: string) {
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await signup({ name, email, password, preferredLanguage, country, travelInterests: interests });
    if (result.ok) {
      navigate('/explore');
    } else {
      setError(result.error ?? 'Something went wrong.');
    }
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col px-4 py-16 sm:px-0">
      <h1 className="font-display text-3xl font-semibold text-ink">{t('signup')}</h1>
      <p className="mt-2 text-inksoft">Tell us a little about your travel interests so SanskritiX can tailor your first explore.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="signup-name" className="mb-1 block text-sm font-semibold text-ink">Name</label>
          <input id="signup-name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-stoneline px-4 py-2.5 text-sm outline-none focus:border-madder" />
        </div>
        <div>
          <label htmlFor="signup-email" className="mb-1 block text-sm font-semibold text-ink">Email</label>
          <input id="signup-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-stoneline px-4 py-2.5 text-sm outline-none focus:border-madder" />
        </div>
        <div>
          <label htmlFor="signup-password" className="mb-1 block text-sm font-semibold text-ink">Password</label>
          <input id="signup-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-stoneline px-4 py-2.5 text-sm outline-none focus:border-madder" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="signup-country" className="mb-1 block text-sm font-semibold text-ink">Country</label>
            <input id="signup-country" required value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-xl border border-stoneline px-4 py-2.5 text-sm outline-none focus:border-madder" />
          </div>
          <div>
            <label htmlFor="signup-lang" className="mb-1 block text-sm font-semibold text-ink">Preferred language</label>
            <select
              id="signup-lang"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value as LangCode)}
              className="w-full rounded-xl border border-stoneline px-4 py-2.5 text-sm outline-none focus:border-madder"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.native}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-ink">Travel interests</p>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => toggleInterest(i)}
                aria-pressed={interests.includes(i)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  interests.includes(i) ? 'border-madder bg-madder text-white' : 'border-stoneline text-inksoft hover:border-ink/30'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
        {error && <p className="text-sm text-madder">{error}</p>}
        <button type="submit" className="w-full rounded-full bg-madder px-6 py-3 text-sm font-semibold text-white hover:bg-madderdark">
          {t('signup')}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-inksoft">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-madder hover:underline">
          {t('login')}
        </Link>
      </p>
    </div>
  );
}
