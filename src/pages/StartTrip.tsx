import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDestinations } from '../data/repository';

type Status = 'idle' | 'detecting' | 'detected' | 'denied' | 'unsupported';

function isNearAgra(latitude: number, longitude: number) {
  return latitude >= 26.0 && latitude <= 27.0 && longitude >= 77.5 && longitude <= 78.5;
}

export default function StartTrip() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>('idle');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  function chooseCity(nextCity: string, source: 'gps' | 'manual') {
    setCity(nextCity);
    localStorage.setItem('sanskritix_detected_city', nextCity);
    localStorage.setItem('sanskritix_location_source', source);
    setStatus('detected');
    setMessage(source === 'gps' ? `Your browser location matched ${nextCity}.` : `${nextCity} selected. You can change it anytime.`);
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setStatus('unsupported');
      setMessage('Location is not supported by this browser. You can select a city manually.');
      return;
    }

    setStatus('detecting');
    setMessage('Checking your location… Please allow location access in the browser popup.');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (isNearAgra(position.coords.latitude, position.coords.longitude)) {
          chooseCity('Agra', 'gps');
        } else {
          setStatus('denied');
          setMessage('We could not automatically match your location to a city yet. Choose a destination below to continue.');
        }
      },
      () => {
        setStatus('denied');
        setMessage('Location access was not available. No problem — you can continue by selecting a city manually.');
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  }

  useEffect(() => {
    const saved = localStorage.getItem('sanskritix_detected_city');
    if (saved) {
      setCity(saved);
      setStatus('detected');
      setMessage(`${saved} is saved as your last selected city.`);
    }
  }, []);

  function continueToTrip() {
    if (!city) return;
    const destination = getAllDestinations().find((d) => d.name.toLowerCase() === city.toLowerCase());
    if (destination) navigate(`/destination/${destination.id}/plan`);
    else navigate('/explore');
  }

  return (
    <main className="min-h-screen bg-paper">
      <section className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <Link to="/" className="text-sm font-semibold text-marigold hover:underline">← Back to SanskritiX</Link>

          <div className="mt-12 grid gap-8 md:grid-cols-[1.05fr_.95fr] md:items-center">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2"><span className="rounded-full border border-marigold/30 bg-marigold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-marigold">SanskritiX Journey</span><span className="rounded-full border border-stoneline bg-paper px-3 py-1 text-[11px] font-semibold text-inksoft"> • India</span></div>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">
                Let’s start with <span className="text-madder">where you are.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-inksoft">
                Discover a destination, understand its culture, plan your day and travel with confidence — all from one connected journey.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  aria-label="Detect my current location"
                  onClick={detectLocation}
                  disabled={status === 'detecting'}
                  className="rounded-full bg-madder px-6 py-3 text-sm font-semibold text-white transition hover:bg-madderdark disabled:cursor-wait disabled:opacity-60"
                >
                  {status === 'detecting' ? '📍 Detecting…' : '📍 Detect My Location'}
                </button>
                <select
                  aria-label="Select a city"
                  value={city}
                  onChange={(e) => e.target.value && chooseCity(e.target.value, 'manual')}
                  className="rounded-full border border-ink bg-white px-5 py-3 text-sm font-semibold text-ink outline-none"
                >
                  <option value="">Select a City</option>
                  {getAllDestinations().map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>

              {message && (
                <div className="mt-5 rounded-2xl border border-stoneline bg-sandstone/60 p-4 text-sm leading-6 text-inksoft">
                  {status === 'detected' ? '✓ ' : 'ℹ️ '}{message}
                </div>
              )}
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-stoneline bg-ink p-6 text-white shadow-sm sm:p-8"><div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-marigold/15 blur-2xl" />
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide">Start your journey</span>
                <span className="text-3xl">🧭</span>
              </div>
              <h2 className="mt-8 font-display text-3xl font-semibold">One connected journey</h2><p className="mt-2 max-w-sm text-sm leading-6 text-white/60">From location to cultural experience, SanskritiX keeps the important pieces together.</p>
              <div className="mt-6 space-y-3">
                {[
                  ['01', 'Detect location', 'Find the starting city'],
                  ['02', 'Confirm destination', 'You remain in control'],
                  ['03', 'Personalise', 'Time, interests, budget & style'],
                  ['04', 'Create my trip', 'Get your connected travel dashboard'],
                ].map(([number, title, desc]) => (
                  <div key={number} className="flex gap-4 rounded-2xl bg-white/10 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marigold text-xs font-bold">{number}</span>
                    <div><p className="font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-white/60">{desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{[['📍','Location','Find your starting city'],['🎯','Personalise','Shape your trip'],['🗺️','Navigate','Follow your route'],['🛡️','Travel safe','Safety stays close']].map(([icon,title,desc]) => <div key={title} className="rounded-2xl border border-stoneline bg-white p-4"><div className="text-xl">{icon}</div><p className="mt-2 text-sm font-bold text-ink">{title}</p><p className="mt-1 text-xs leading-5 text-inksoft">{desc}</p></div>)}</div>
        <div className="rounded-3xl border border-stoneline bg-white p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-marigold">Selected destination</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-ink">{city || 'No city selected yet'}</h2>
              <p className="mt-1 text-sm text-inksoft">{city ? 'Ready to personalise your journey.' : 'Detect your location or choose a city above.'}</p>
            </div>
            <button
              onClick={continueToTrip}
              disabled={!city}
              className="rounded-full bg-marigold px-6 py-3 text-sm font-bold text-white hover:bg-marigolddark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue to Personalise →
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-xs leading-5 text-muted">Location detection uses browser coordinates where a city match is available. Manual city selection is always available.</p>
      </section>
    </main>
  );
}
