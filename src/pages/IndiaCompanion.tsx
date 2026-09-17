import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AskAI from '../components/AskAI';
import NotFoundBlock from '../components/NotFoundBlock';
import { getAllDestinations, getDestinationById, getPlacesByIds } from '../data/repository';
import { cityProfiles, getCityProfile } from '../data/cityProfiles';

const interests = ['Heritage', 'Food', 'Culture', 'Crafts', 'Hidden gems', 'Nature', 'Photography'];
const budgets = ['Budget', 'Comfort', 'Premium'];

function moneyFor(budget: string) {
  if (budget === 'Budget') return '₹1,500–₹2,800';
  if (budget === 'Premium') return '₹6,000+';
  return '₹3,000–₹5,500';
}

function makeQueryRoute(destination: any, days: number, selected: string[]) {
  const places = getPlacesByIds(destination.placeIds);
  const hidden = getPlacesByIds(destination.hiddenGemIds);
  const all = [...places, ...hidden];
  const ranked = all.filter((item, index, arr) => arr.findIndex((x) => x.id === item.id) === index);
  const score = (place: any) => {
    const text = `${place.name} ${place.category} ${place.intro} ${place.whyFamous} ${place.culturalImportance}`.toLowerCase();
    let value = 0;
    selected.forEach((interest) => {
      if (interest.toLowerCase() === 'hidden gems' && hidden.some((h) => h.id === place.id)) value += 6;
      if (text.includes(interest.toLowerCase().replace(' gems', ''))) value += 4;
    });
    if (text.includes('heritage') || text.includes('history')) value += selected.includes('Heritage') ? 3 : 0;
    return value;
  };
  const routePlaces = ranked.sort((a, b) => score(b) - score(a));
  const route = [
    ...routePlaces,
    ...destination.streets,
    ...destination.activities,
  ];
  return route
    .filter((item, index, arr) => arr.findIndex((x: any) => x.name === item.name) === index)
    .slice(0, days === 1 ? 5 : days === 2 ? 7 : 9)
    .map((item: any) => item.name);
}

function makeFallbackDestination(id: string) {
  const profile = getCityProfile(id);
  if (!profile) return undefined;
  return {
    id: profile.id,
    stateId: profile.state.toLowerCase().replace(/\s+/g, '-'),
    name: profile.name,
    intro: profile.theme,
    video: { title: `${profile.name} cultural preview`, duration: '—', src: '', description: profile.theme },
    history: `${profile.name} offers a mix of historic neighbourhoods, local traditions, food and living cultural experiences.`,
    hiddenGemsNote: 'Explore beyond the headline attractions with neighbourhood stories and local craft experiences.',
    placeIds: [], hiddenGemIds: [], streets: profile.hidden.map((name, i) => ({ id: `${id}-hidden-${i}`, name, location: profile.name, knownFor: 'Local culture', experience: 'Neighbourhood experience', time: '1 hour', food: profile.foods[0], images: [] })),
    food: profile.foods.map((name, i) => ({ id: `${id}-food-${i}`, name, veg: true, area: profile.name, desc: `${name} is part of the local food culture.`, why: 'A taste-led way to understand the city.', img: '' })),
    festivals: profile.festivals.map((name, i) => ({ id: `${id}-festival-${i}`, name, season: 'Seasonal', desc: `${name} is a cultural experience associated with ${profile.name}.`, significance: 'Local cultural tradition', whatToSee: 'Local celebrations and community activity', clothing: 'Dress comfortably and respectfully', etiquette: profile.etiquette[0] })),
    rituals: [], activities: profile.highlights.map((name, i) => ({ id: `${id}-activity-${i}`, name, desc: `Explore ${name} as part of your ${profile.name} journey.` })),
    localStories: profile.hidden.map((name, i) => ({ id: `${id}-story-${i}`, title: name, body: `Discover the local character of ${profile.name} through ${name}.` })),
    _profile: profile,
  } as any;
}

export default function IndiaCompanion() {
  const { destinationId = 'agra' } = useParams();
  const destination = getDestinationById(destinationId) || makeFallbackDestination(destinationId);
  const destinations = getAllDestinations();
  const [tab, setTab] = useState<'discover' | 'plan' | 'live' | 'culture' | 'passport'>('discover');
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState('Comfort');
  const [selected, setSelected] = useState<string[]>(['Heritage', 'Food', 'Culture']);
  const [currentStop, setCurrentStop] = useState(0);
  const [passportDone, setPassportDone] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('sanskritix_passport') || '[]'); } catch { return []; }
  });

  const route = useMemo(() => destination ? makeQueryRoute(destination, days, selected) : [], [destination, days, selected]);

  if (!destination) {
    return <NotFoundBlock title="Destination not found" description="We couldn't find that city in the SanskritiX catalogue yet." backTo="/explore" backLabel="Back to Explore" />;
  }

  const places = getPlacesByIds(destination.placeIds);
  const hidden = getPlacesByIds(destination.hiddenGemIds);
  const festival = destination.festivals[0];
  const active = route[currentStop] || route[0];

  const toggle = (item: string) => setSelected((old) => old.includes(item) ? old.filter((x) => x !== item) : [...old, item]);
  const completeStop = () => {
    const next = Array.from(new Set([...passportDone, active]));
    setPassportDone(next);
    localStorage.setItem('sanskritix_passport', JSON.stringify(next));
  };

  const tabs = [
    ['discover', 'Discover'], ['plan', 'Smart Plan'], ['live', 'Live Trip'], ['culture', 'Culture'], ['passport', 'Passport'],
  ] as const;

  return <div className="min-h-screen bg-paper">
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,123,40,.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(36,124,112,.25),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Link to={`/destination/${destination.id}`} className="text-sm font-semibold text-marigold hover:underline">← Explore {destination.name}</Link>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">SanskritiX Cultural Companion</p>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">Live the culture of {destination.name}.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">Discover the place, shape a personal route, understand local culture, navigate your day and keep the memories in one journey.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold">Journey engine</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/10 p-4"><b>{places.length}</b><span className="ml-1 text-white/60">known places</span></div>
              <div className="rounded-2xl bg-white/10 p-4"><b>{hidden.length}</b><span className="ml-1 text-white/60">hidden spots</span></div>
              <div className="rounded-2xl bg-white/10 p-4"><b>{destination.food.length}</b><span className="ml-1 text-white/60">local foods</span></div>
              <div className="rounded-2xl bg-white/10 p-4"><b>{destination.festivals.length}</b><span className="ml-1 text-white/60">festivals</span></div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {[...destinations, ...cityProfiles.map((profile) => ({ id: profile.id, name: profile.name }))].filter((item, index, arr) => arr.findIndex((x) => x.id === item.id) === index).slice(0, 24).map((item) => <Link key={item.id} to={`/companion/${item.id}`} className={`rounded-full border px-3 py-2 text-xs font-bold ${item.id === destination.id ? 'border-marigold bg-marigold text-white' : 'border-white/15 bg-white/5 text-white/75 hover:bg-white/10'}`}>{item.name}</Link>)}
        </div>
      </div>
    </section>

    <div className="sticky top-[76px] z-30 border-b border-stoneline bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
        {tabs.map(([id, label]) => <button key={id} type="button" onClick={() => setTab(id)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${tab === id ? 'bg-madder text-white' : 'bg-white text-inksoft hover:text-ink'}`}>{label}</button>)}
      </div>
    </div>

    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {tab === 'discover' && <div className="space-y-8">
        <section className="grid gap-5 md:grid-cols-3">
          <div className="sanskriti-card rounded-3xl border border-stoneline bg-white p-6"><span className="text-3xl">🧭</span><h2 className="mt-4 font-display text-2xl font-semibold">Discover</h2><p className="mt-2 text-sm leading-6 text-inksoft">Start with places, streets and stories instead of a generic checklist.</p></div>
          <div className="sanskriti-card rounded-3xl border border-stoneline bg-white p-6"><span className="text-3xl">🪔</span><h2 className="mt-4 font-display text-2xl font-semibold">Understand</h2><p className="mt-2 text-sm leading-6 text-inksoft">Learn why a food, ritual, craft or festival matters before you experience it.</p></div>
          <div className="sanskriti-card rounded-3xl border border-stoneline bg-white p-6"><span className="text-3xl">🧳</span><h2 className="mt-4 font-display text-2xl font-semibold">Experience</h2><p className="mt-2 text-sm leading-6 text-inksoft">Turn your interests into a connected route with practical next steps.</p></div>
        </section>
        <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-marigold">Why this place?</p><h2 className="mt-2 font-display text-3xl font-semibold">A place is more than its landmark.</h2></div><button type="button" onClick={() => setTab('plan')} className="rounded-full bg-marigold px-5 py-2.5 text-sm font-bold text-white">Build my route →</button></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{places.slice(0, 6).map((place) => <div key={place.id} className="rounded-2xl border border-stoneline bg-paper p-5"><p className="text-xs font-bold uppercase tracking-wide text-madder">{place.category}</p><h3 className="mt-2 font-display text-xl font-semibold">{place.name}</h3><p className="mt-2 text-sm leading-6 text-inksoft">{place.whyFamous}</p><p className="mt-3 text-xs font-semibold text-madder">Best for: {place.experiences.slice(0, 2).join(' • ')}</p></div>)}</div>
        </section>
        <section><AskAI city={destination.name} /></section>
      </div>}

      {tab === 'plan' && <section className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-marigold">Smart Journey Builder</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Tell SanskritiX how you want to travel.</h2>
          <div className="mt-7"><p className="text-sm font-bold">Duration</p><div className="mt-2 flex gap-2">{[1,2,3].map((d) => <button key={d} type="button" onClick={() => setDays(d)} className={`rounded-full border px-4 py-2 text-sm font-bold ${days===d?'border-marigold bg-marigold text-white':'border-stoneline bg-white'}`}>{d} day{d>1?'s':''}</button>)}</div></div>
          <div className="mt-6"><p className="text-sm font-bold">Interests</p><div className="mt-2 flex flex-wrap gap-2">{interests.map((i) => <button key={i} type="button" onClick={() => toggle(i)} className={`rounded-full border px-3 py-2 text-xs font-bold ${selected.includes(i)?'border-madder bg-madder text-white':'border-stoneline bg-white text-inksoft'}`}>{i}</button>)}</div></div>
          <div className="mt-6"><p className="text-sm font-bold">Budget</p><div className="mt-2 grid grid-cols-3 gap-2">{budgets.map((b) => <button key={b} type="button" onClick={() => setBudget(b)} className={`rounded-2xl border p-3 text-left text-sm font-bold ${budget===b?'border-marigold bg-marigold/10':'border-stoneline bg-white'}`}>{b}<span className="mt-1 block text-xs font-medium text-inksoft">{moneyFor(b)}</span></button>)}</div></div>
          <div className="mt-7 rounded-2xl bg-ink p-5 text-white"><p className="text-xs font-bold uppercase tracking-wide text-marigold">Sanskrit route theme</p><p className="mt-2 text-sm leading-6 text-white/70">The route starts with a signature place, moves into local culture and food, then surfaces a hidden or neighbourhood experience where available.</p></div>
        </div>
        <div className="rounded-3xl bg-ink p-6 text-white shadow-sm sm:p-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-marigold">Your route</p><h2 className="mt-2 font-display text-3xl font-semibold">{destination.name}, your way.</h2><p className="mt-2 text-sm text-white/60">{days} day{days>1?'s':''} • {budget} • {selected.join(' + ')}</p><div className="mt-6 space-y-3">{route.map((name, i) => <div key={`${name}-${i}`} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marigold text-sm font-bold">{i+1}</span><div><p className="font-semibold">{name}</p><p className="text-xs text-white/50">{i===0?'Start with the signature story':'Continue the cultural thread'}</p></div></div>)}</div><button type="button" onClick={() => setTab('live')} className="mt-6 w-full rounded-full bg-marigold px-5 py-3 text-sm font-bold text-white">Start Live Trip →</button></div>
      </section>}

      {tab === 'live' && <section className="space-y-6">
        <div className="rounded-3xl bg-ink p-6 text-white sm:p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-marigold">Live Trip Mode</p><h2 className="mt-2 font-display text-3xl font-semibold">Stay inside the journey.</h2><p className="mt-2 text-sm text-white/60">Demo navigation using your SanskritiX route. No live GPS claim is made.</p></div><span className="rounded-full bg-marigold px-3 py-1 text-xs font-bold">STOP {Math.min(currentStop+1, route.length)} / {route.length}</span></div><div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-marigold transition-all" style={{ width: `${((currentStop+1)/Math.max(route.length,1))*100}%` }} /></div></div>
        <div className="grid gap-5 md:grid-cols-3"><div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase text-marigold">📍 You are exploring</p><h3 className="mt-2 font-display text-2xl font-semibold">{active}</h3><p className="mt-2 text-sm text-inksoft">Take a moment to notice the story, architecture and local details around you.</p></div><div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase text-marigold">🗣 Local phrase</p><h3 className="mt-2 font-display text-2xl font-semibold">Namaste</h3><p className="mt-2 text-sm text-inksoft">A simple respectful greeting you can use across India.</p></div><div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase text-marigold">🚨 Safety</p><h3 className="mt-2 font-display text-2xl font-semibold">Emergency 112</h3><p className="mt-2 text-sm text-inksoft">For urgent emergencies in India, use the national emergency number 112.</p></div></div>
        <div className="flex flex-wrap gap-3"><button type="button" onClick={completeStop} className="rounded-full bg-madder px-5 py-3 text-sm font-bold text-white">✓ Add to Passport</button><button type="button" disabled={currentStop >= route.length-1} onClick={() => setCurrentStop((v) => Math.min(v+1, route.length-1))} className="rounded-full bg-marigold px-5 py-3 text-sm font-bold text-white disabled:opacity-40">Next Stop →</button><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${active}, ${destination.name}, India`)}`} target="_blank" rel="noreferrer" className="rounded-full border border-stoneline bg-white px-5 py-3 text-sm font-bold text-ink">Open Map ↗</a></div>
      </section>}

      {tab === 'culture' && <section className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2"><div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-marigold">Local Culture</p><h2 className="mt-2 font-display text-3xl font-semibold">Know before you go.</h2><div className="mt-6 space-y-4">{destination.rituals.slice(0, 3).map((r) => <div key={r.id} className="rounded-2xl bg-paper p-4"><p className="font-semibold">{r.name}</p><p className="mt-1 text-sm leading-6 text-inksoft">{r.desc}</p><p className="mt-2 text-xs font-bold text-madder">Etiquette: {r.etiquette.slice(0, 2).join(' • ')}</p></div>)}</div></div><div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-marigold">Festival Mode</p><h2 className="mt-2 font-display text-3xl font-semibold">Experience the celebration, not just the date.</h2>{festival && <div className="mt-6 rounded-2xl bg-madder p-5 text-white"><p className="text-xs font-bold uppercase tracking-wide text-marigold">{festival.season}</p><h3 className="mt-2 font-display text-2xl font-semibold">{festival.name}</h3><p className="mt-2 text-sm leading-6 text-white/75">{festival.desc}</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-white/10 p-3"><b>See</b><p className="mt-1 text-xs text-white/70">{festival.whatToSee}</p></div><div className="rounded-xl bg-white/10 p-3"><b>Respect</b><p className="mt-1 text-xs text-white/70">{festival.etiquette}</p></div></div></div>}</div></div>
        <div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[.18em] text-marigold">Beyond the Tourist List</p><h2 className="mt-2 font-display text-3xl font-semibold">Hidden India in {destination.name}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{hidden.slice(0, 6).map((place) => <div key={place.id} className="rounded-2xl border border-stoneline p-5"><p className="text-xs font-bold uppercase text-madder">Local find</p><h3 className="mt-2 font-display text-xl font-semibold">{place.name}</h3><p className="mt-2 text-sm leading-6 text-inksoft">{place.intro}</p></div>)}</div></div>
      </section>}

      {tab === 'passport' && <section className="rounded-[32px] bg-ink p-6 text-white shadow-xl sm:p-10"><div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-marigold">Sanskriti Smart Passport</p><h2 className="mt-2 font-display text-4xl font-semibold">Your journey becomes a cultural memory.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/65">Keep the places you experienced, the food you discovered and the cultural moments you understood. Your passport is stored locally on this device.</p><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{[['Stops', passportDone.length], ['Food', destination.food.length], ['Festivals', destination.festivals.length], ['Interests', selected.length]].map(([label,value]) => <div key={String(label)} className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-white/50">{label}</p></div>)}</div></div><div className="rounded-3xl border border-white/10 bg-white/10 p-6"><p className="text-xs font-bold uppercase tracking-wide text-marigold">Visited</p><div className="mt-4 space-y-2">{passportDone.length ? passportDone.map((name) => <div key={name} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold">✓ {name}</div>) : <p className="text-sm text-white/50">Complete a Live Trip stop to start your passport.</p>}</div><button type="button" onClick={() => window.print()} className="mt-5 w-full rounded-full bg-marigold px-5 py-3 text-sm font-bold text-white">Print Passport</button></div></div></section>}
    </main>
  </div>;
}
