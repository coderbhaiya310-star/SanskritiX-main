import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `border-b-2 pb-1 text-[15px] font-medium transition-colors ${isActive ? 'border-marigold text-ink' : 'border-transparent text-inksoft hover:text-ink'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-stoneline bg-sandstone">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-5 px-4 sm:px-6">
        <Link to="/" className="flex flex-shrink-0 items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-marigold font-display text-[15px] font-bold text-white">सं</span>
          <span className="text-[22px] font-semibold text-ink">
            Sanskriti<span className="text-marigold">X</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          <NavLink to="/explore" className={linkClass}>{t('explore')}</NavLink>
          <NavLink to="/experiences" className={linkClass}>Experiences</NavLink>
          <NavLink to="/companion/agra" className={linkClass}>Companion</NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/search" aria-label="Search" className="flex h-10 w-10 items-center justify-center rounded-full border border-stoneline bg-white text-inksoft hover:border-marigold hover:text-marigold">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </Link>
          <LanguageSelector />
          {user ? (
            <div className="flex items-center gap-3 rounded-full border border-stoneline bg-white py-1.5 pl-1.5 pr-3.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-madder text-sm font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <Link to="/profile" className="text-sm font-semibold text-ink">{user.name.split(' ')[0]}</Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="text-xs font-medium text-inksoft hover:text-madder"
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="rounded-full border border-stoneline px-4 py-2 text-sm font-semibold text-inksoft hover:border-ink hover:text-ink">
                {t('login')}
              </Link>
              <Link to="/signup" className="rounded-full bg-madder px-4 py-2 text-sm font-semibold text-white hover:bg-madderdark">
                {t('signup')}
              </Link>
            </>
          )}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stoneline md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-stoneline bg-sandstone px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-3 py-2">
            <NavLink to="/explore" className={linkClass} onClick={() => setMenuOpen(false)}>{t('explore')}</NavLink>
            <NavLink to="/experiences" className={linkClass} onClick={() => setMenuOpen(false)}>Experiences</NavLink>
            <NavLink to="/companion/agra" className={linkClass} onClick={() => setMenuOpen(false)}>Companion</NavLink>
          </nav>
          <div className="flex items-center justify-between border-t border-stoneline pt-3">
            <LanguageSelector />
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                  navigate('/');
                }}
                className="rounded-full border border-stoneline px-4 py-1.5 text-sm font-medium"
              >
                {t('logout')}
              </button>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>{t('login')}</Link>
                <Link to="/signup" className="rounded-full bg-madder px-3 py-1.5 text-sm font-medium text-white" onClick={() => setMenuOpen(false)}>
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
