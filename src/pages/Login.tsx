import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import MotifDivider from '../components/MotifDivider';
import { WELCOME_CREDENTIALS } from '../lib/seedWelcomeAccount';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await login(email, password);
    if (result.ok) {
      navigate('/explore');
    } else {
      setError(result.error ?? 'Something went wrong.');
    }
  }

  function useWelcomeAccount() {
    setEmail(WELCOME_CREDENTIALS.email);
    setPassword(WELCOME_CREDENTIALS.password);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-0">
      <h1 className="font-display text-3xl font-semibold text-ink">{t('login')}</h1>
      <p className="mt-2 text-inksoft"> authentication — no real account or password server involved.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1 block text-sm font-semibold text-ink">Email</label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-stoneline px-4 py-2.5 text-sm outline-none focus:border-madder"
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="login-password" className="block text-sm font-semibold text-ink">Password</label>
            <Link to="/forgot-password" className="text-xs font-medium text-madder hover:underline">Forgot password?</Link>
          </div>
          <input
            id="login-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-stoneline px-4 py-2.5 text-sm outline-none focus:border-madder"
          />
        </div>
        {error && <p className="text-sm text-madder">{error}</p>}
        <button type="submit" className="w-full rounded-full bg-madder px-6 py-3 text-sm font-semibold text-white hover:bg-madderdark">
          {t('login')}
        </button>
      </form>

      <button onClick={useWelcomeAccount} className="mt-4 text-sm font-medium text-indigo hover:underline">
        Fill quick account details
      </button>
      <p className="mt-1 text-xs text-muted">A ready-made account is available for a quick sign in.</p>

      <MotifDivider />

      <p className="text-center text-sm text-inksoft">
        New to SanskritiX?{' '}
        <Link to="/signup" className="font-semibold text-madder hover:underline">
          {t('signup')}
        </Link>
      </p>
    </div>
  );
}
