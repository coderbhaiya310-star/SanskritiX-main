import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStates } from '../data/repository';

type Category = { id: string; label: string; icon: string; color: string; tags: string[] };

const CATEGORIES: Category[] = [
  { id: 'nature', label: 'Nature', icon: '🌿', color: 'from-emerald-100 to-teal-50', tags: ['Nature'] },
  { id: 'wildlife', label: 'Wildlife', icon: '🐅', color: 'from-lime-100 to-emerald-50', tags: ['Nature', 'Wildlife'] },
  { id: 'spiritual', label: 'Spiritual', icon: '🪔', color: 'from-amber-100 to-orange-50', tags: ['Culture', 'Spiritual', 'History'] },
  { id: 'heritage', label: 'Heritage', icon: '🏛️', color: 'from-orange-100 to-amber-50', tags: ['Heritage', 'History'] },
  { id: 'adventure', label: 'Adventure', icon: '⛰️', color: 'from-sky-100 to-blue-50', tags: ['Nature'] },
  { id: 'food', label: 'Food', icon: '🍲', color: 'from-rose-100 to-orange-50', tags: ['Culture', 'Heritage'] },
  { id: 'crafts', label: 'Arts & Crafts', icon: '🧵', color: 'from-violet-100 to-fuchsia-50', tags: ['Craft', 'Culture'] },
  { id: 'hidden', label: 'Hidden India', icon: '🗺️', color: 'from-indigo-100 to-slate-50', tags: ['Nature', 'Craft', 'History'] },
];

const INTEREST_OPTIONS: Record<string, string[]> = {
  nature: ['All Nature', 'Mountains', 'Forests', 'Lakes & Rivers', 'Waterfalls', 'Beaches'],
  wildlife: ['All Wildlife', 'Wildlife Sanctuaries', 'National Parks', 'Bird Watching', 'Marine Life', 'Zoos'],
  spiritual: ['All Spiritual', 'Temples', 'Ghats & Aarti', 'Mosques', 'Gurudwaras', 'Monasteries'],
  heritage: ['All Heritage', 'Monuments', 'Museums', 'Historical Buildings', 'UNESCO Sites', 'Palaces & Forts'],
  adventure: ['All Adventure', 'Trekking', 'Rafting', 'Cycling', 'Camping', 'Nature Trails'],
  food: ['All Food', 'Street Food', 'Local Cuisine', 'Sweets', 'Food Walks', 'Traditional Drinks'],
  crafts: ['All Crafts', 'Textiles', 'Pottery', 'Woodwork', 'Metalwork', 'Handicrafts'],
  hidden: ['All Hidden India', 'Underrated Places', 'Local Stories', 'Village Experiences', 'Quiet Routes'],
};

const REGIONS = {
  North: ['Delhi', 'Haryana', 'Himachal Pradesh', 'Punjab', 'Rajasthan', 'Uttar Pradesh', 'Uttarakhand', 'Jammu & Kashmir'],
  'North East': ['Assam', 'Arunachal Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'],
  East: ['Bihar', 'Jharkhand', 'Odisha', 'West Bengal'],
  Central: ['Chhattisgarh', 'Madhya Pradesh'],
  West: ['Goa', 'Gujarat', 'Maharashtra'],
  South: ['Andhra Pradesh', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Telangana'],
};

const TRIP_LENGTHS = ['Any duration', '1–2 Days', '3–5 Days', '6–10 Days', '10+ Days'];

export default function InterestExplorer() {
  const [active, setActive] = useState<string | null>(null);
  const [interest, setInterest] = useState('');
  const [region, setRegion] = useState('');
  const [trip, setTrip] = useState('Any duration');
  const [applied, setApplied] = useState(false);
  const states = getStates();

  const selected = CATEGORIES.find((item) => item.id === active);
  const results = useMemo(() => {
    if (!applied) return [];
    return states.filter((state) => {
      const interestMatch = !active || selected?.tags.includes(state.tag) || active === 'food' || active === 'wildlife' || active === 'adventure' || active === 'hidden';
      const regionMatch = !region || Object.entries(REGIONS).some(([key, values]) => key === region && values.includes(state.name));
      return interestMatch && regionMatch;
    });
  }, [active, applied, region, selected, states]);

  return (
    <section className="relative overflow-hidden bg-[#101827] py-16 text-white sm:py-20">
      <div className="absolute inset-0 jaali-texture-light opacity-30" aria-hidden="true" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl reveal-on-scroll">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-300">Find your thread</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">What do you want to experience in India?</h2>
          <p className="mt-3 text-sm leading-6 text-white/65">Choose a passion, then narrow it by region and trip length. SanskritiX turns the selection into a starting point for your journey.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              data-cursor
              onClick={() => { setActive(category.id); setApplied(false); }}
              className={`group relative min-h-[126px] overflow-hidden rounded-2xl border p-4 text-left transition duration-500 hover:-translate-y-1 hover:rotate-[1deg] hover:border-orange-300/70 hover:shadow-2xl hover:shadow-orange-950/30 ${active === category.id ? 'border-orange-300 bg-white/15' : 'border-white/10 bg-white/[0.055]'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition duration-500 group-hover:opacity-10`} />
              <span className="relative text-2xl">{category.icon}</span>
              <span className="relative mt-6 block font-display text-lg font-semibold">{category.label}</span>
              <span className="relative mt-1 block text-xs text-white/50">Explore this thread →</span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="filter-panel mt-7 rounded-[26px] border border-white/10 bg-white/[0.075] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-orange-300">{selected.icon} {selected.label}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">Refine your discovery</h3>
              </div>
              <button type="button" data-cursor onClick={() => setActive(null)} className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 hover:bg-white/10">Close</button>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/55">Interests</label>
                <select value={interest} onChange={(e) => setInterest(e.target.value)} className="filter-select">
                  <option value="">Choose interest</option>
                  {INTEREST_OPTIONS[selected.id].map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/55">Regions</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="filter-select">
                  <option value="">All regions</option>
                  {Object.keys(REGIONS).map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/55">Trip Length</label>
                <select value={trip} onChange={(e) => setTrip(e.target.value)} className="filter-select">
                  {TRIP_LENGTHS.map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" data-cursor onClick={() => setApplied(true)} className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-400">Show matching India →</button>
              <Link to="/explore" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/10">Open full explorer</Link>
            </div>

            {applied && (
              <div className="mt-7 border-t border-white/10 pt-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">Matching destinations</p>
                  <span className="text-xs text-white/45">{results.length} result{results.length === 1 ? '' : 's'}</span>
                </div>
                {results.length ? (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((state) => (
                      <Link key={state.id} data-cursor to={`/states/${state.id}`} className="group rounded-2xl border border-white/10 bg-black/10 p-4 transition hover:-translate-y-1 hover:bg-white/10">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-display text-lg font-semibold">{state.name}</p>
                            <p className="mt-1 text-xs text-white/50">{state.tag} • {trip}</p>
                          </div>
                          <span className="text-orange-300 transition group-hover:translate-x-1">↗</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-white/55">No result found for this combination yet. Try another region or interest.</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
