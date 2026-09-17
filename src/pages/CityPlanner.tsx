import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFoundBlock from '../components/NotFoundBlock';
import { getDestinationById, getPlacesByIds } from '../data/repository';

const interests = ['Heritage', 'Food', 'Culture', 'Nature', 'Crafts', 'Hidden gems', 'Photography'];

export default function CityPlanner() {
  const { destinationId } = useParams();
  const destination = destinationId ? getDestinationById(destinationId) : undefined;
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState('Comfort');
  const [selected, setSelected] = useState<string[]>(['Heritage', 'Food', 'Culture']);
  const [generated, setGenerated] = useState(false);
  const places = destination ? getPlacesByIds(destination.placeIds) : [];
  const names = destination ? Array.from(new Set([...places.map(p => p.name), ...destination.streets.map(s => s.name), ...destination.activities.map(a => a.name)])).slice(0, 8) : [];
  if (!destination) return <NotFoundBlock title="Destination not found" description="We couldn't find that city in the SanskritiX catalogue." backTo="/explore" backLabel="Back to Explore" />;
  const route = names.slice(0, days === 1 ? 4 : days === 2 ? 6 : 8);
  const budgetText = budget === 'Budget' ? '₹1,500–₹2,800' : budget === 'Premium' ? '₹6,000+' : '₹3,000–₹5,500';
  const toggleInterest = (item: string) => setSelected(v => v.includes(item) ? v.filter(x => x !== item) : [...v, item]);
  const mapUrl = (name: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${destination.name}, India`)}`;

  return <div className="min-h-screen bg-paper">
    <div className="border-b border-stoneline bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Link to={`/destination/${destination.id}`} className="text-sm font-semibold text-marigold hover:underline">← Back to {destination.name}</Link>
        <div className="mt-8 rounded-[30px] bg-ink p-7 text-white shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold">Make My Trip</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">A trip shaped around {destination.name}.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">Choose your time, interests and budget. SanskritiX then builds a simple connected route using the cultural information available for this destination.</p>
        </div>
      </div>
    </div>

    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
        <div className="sanskriti-card rounded-3xl border border-stoneline p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-marigold">Your preferences</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">How do you want to experience {destination.name}?</h2>
          <div className="mt-6"><p className="text-sm font-bold text-ink">Duration</p><div className="mt-2 flex flex-wrap gap-2">{[1,2,3].map(d => <button key={d} onClick={() => setDays(d)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${days===d?'border-marigold bg-marigold text-white':'border-stoneline bg-white text-inksoft'}`}>{d} {d===1?'Day':'Days'}</button>)}</div></div>
          <div className="mt-6"><p className="text-sm font-bold text-ink">Interests</p><div className="mt-2 flex flex-wrap gap-2">{interests.map(i => <button key={i} onClick={() => toggleInterest(i)} className={`rounded-full border px-3 py-2 text-xs font-semibold ${selected.includes(i)?'border-madder bg-madder text-white':'border-stoneline bg-white text-inksoft'}`}>{i}</button>)}</div></div>
          <div className="mt-6"><p className="text-sm font-bold text-ink">Budget</p><div className="mt-2 grid grid-cols-3 gap-2">{['Budget','Comfort','Premium'].map(b => <button key={b} onClick={() => setBudget(b)} className={`rounded-2xl border p-3 text-left text-sm font-semibold ${budget===b?'border-marigold bg-marigold/10':'border-stoneline bg-white'}`}>{b}</button>)}</div></div>
          <button onClick={() => setGenerated(true)} className="mt-7 w-full rounded-full bg-madder px-6 py-3 text-sm font-bold text-white hover:bg-madderdark">Create My {destination.name} Trip ✨</button>
          <Link to={`/companion/${destination.id}`} className="mt-3 block w-full rounded-full border border-stoneline bg-white px-6 py-3 text-center text-sm font-bold text-ink hover:border-marigold">Open Cultural Companion →</Link>
        </div>

        <div className="sanskriti-card rounded-3xl border border-stoneline p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-marigold">Trip snapshot</p>
          <div className="mt-5 grid grid-cols-2 gap-3">{[['📅',`${days} day${days>1?'s':''}`],['💰',budgetText],['🎯',`${selected.length} interests`],['📍',`${route.length} stops`]].map(([icon,text]) => <div key={text} className="rounded-2xl bg-paper p-4"><span className="text-xl">{icon}</span><p className="mt-2 text-sm font-bold text-ink">{text}</p></div>)}</div>
          <div className="mt-5 rounded-2xl bg-ink p-5 text-white"><p className="text-xs font-bold uppercase tracking-wide text-marigold">Why this route</p><p className="mt-2 text-sm leading-6 text-white/70">Your route follows a Sanskriti thread: begin with a signature story, move through living culture and food, then finish with a neighbourhood or hidden experience where available.</p></div>
        </div>
      </div>

      {generated && <div className="mt-7 sanskriti-card rounded-3xl border border-marigold/30 p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold">Your {destination.name} journey</p><h2 className="mt-2 font-display text-3xl font-semibold text-ink">Connected route</h2></div><span className="rounded-full bg-marigold px-3 py-1 text-xs font-bold text-white">{route.length} stops</span></div>
        <div className="mt-7 overflow-x-auto rounded-3xl bg-ink p-4 sm:p-6"><div className="min-w-[760px]"><svg viewBox="0 0 900 270" className="h-[260px] w-full" role="img" aria-label={`Animated route through ${destination.name}`}>
          <defs><filter id="routeGlow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <path d="M50 135 C120 40 190 40 260 135 S400 230 470 135 S610 40 680 135 S820 230 870 135" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="16" strokeLinecap="round"/>
          <path className="route-dash" d="M50 135 C120 40 190 40 260 135 S400 230 470 135 S610 40 680 135 S820 230 870 135" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="4" strokeDasharray="10 12" strokeLinecap="round"/>
          {route.map((name,i) => { const x=50+(820/(Math.max(route.length-1,1)))*i; const y=i%2===0?135:135; return <g key={`${name}-${i}`}><circle className="route-node-pulse" cx={x} cy={y} r="17" fill={i===0?'#E57B28':'#247C70'} filter="url(#routeGlow)"/><circle cx={x} cy={y} r="11" fill={i===0?'#E57B28':'#247C70'} stroke="white" strokeWidth="3"/><text x={x} y={y+5} textAnchor="middle" fill="white" fontSize="12" fontWeight="700">{i+1}</text><text x={x} y={i%2===0?y-30:y+42} textAnchor="middle" fill="white" fontSize="13" fontWeight="600">{name.length>20?name.slice(0,18)+'…':name}</text></g>})}
        </svg></div></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{route.map((name,i) => <div key={name} className="sanskriti-card rounded-2xl border border-stoneline p-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-marigold text-sm font-bold text-white">{i+1}</span><div className="min-w-0"><p className="font-semibold text-ink">{name}</p><p className="mt-1 text-xs text-inksoft">{i===0?'Start here':'Continue from the previous stop'}</p></div></div><a href={mapUrl(name)} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs font-bold text-madder hover:underline">Open map ↗</a></div>)}</div>
      </div>}
    </section>
  </div>;
}
