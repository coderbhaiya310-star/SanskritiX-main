import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ItineraryCard from '../components/ItineraryCard';
import data from '../data/agraFeatures.json';
import AnimatedRoutePath from '../components/AnimatedRoutePath';

type TripId = 'agra-1-day' | 'agra-2-day' | 'agra-3-day';
type Budget = 'budget' | 'comfort' | 'premium';
type TravelStyle = 'explorer' | 'slow' | 'hidden' | 'culture';
type Companion = 'solo' | 'couple' | 'family' | 'friends';
type Interest =
  | 'heritage'
  | 'food'
  | 'crafts'
  | 'history'
  | 'nature'
  | 'hidden'
  | 'photography'
  | 'shopping'
  | 'culture';

type Place = {
  time: string;
  name: string;
  duration: string;
  description: string;
  mapUrl: string;
};

type Day = {
  day: number;
  title: string;
  places: Place[];
};

type RouteStop = Place & {
  day: number;
  dayTitle: string;
};

type TransportStatus = 'good' | 'limited' | 'plan-ahead';

type TravelSegment = {
  distance: string;
  travelTime: string;
  mode: string;
  icon: string;
  note: string;
  warning?: string;
  publicTransport: TransportStatus;
  publicTransportLabel: string;
  lastSuggestedTime?: string;
  backup: string;
  backupFare: string;
  returnAdvice: string;
};

type SafetyInfo = {
  areaLabel: string;
  level: 'normal' | 'attention' | 'extra-care';
  levelLabel: string;
  tip: string;
  hospitalArea: string;
  policeArea: string;
  quietAfter?: string;
};

const interestMeta: { id: Interest; label: string; emoji: string }[] = [
  { id: 'heritage', label: 'Heritage', emoji: '🏛️' },
  { id: 'food', label: 'Food', emoji: '🍛' },
  { id: 'crafts', label: 'Arts & Crafts', emoji: '🎨' },
  { id: 'history', label: 'History', emoji: '📖' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'hidden', label: 'Hidden Gems', emoji: '💎' },
  { id: 'photography', label: 'Photography', emoji: '📸' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'culture', label: 'Culture', emoji: '🪔' },
];

const interestKeywords: Record<Interest, string[]> = {
  heritage: ['taj', 'fort', 'tomb', 'masjid', 'heritage', 'monument'],
  food: ['food', 'lunch', 'restaurant', 'mughlai'],
  crafts: ['marble', 'handicraft', 'craft'],
  history: ['historic', 'history', 'mughal', 'tomb', 'fort'],
  nature: ['bagh', 'garden', 'lake', 'nature'],
  hidden: ['ram bagh', 'hidden', 'local', 'itmad'],
  photography: ['taj', 'mehtab', 'bagh', 'view'],
  shopping: ['bazaar', 'market', 'shopping', 'handicraft'],
  culture: ['culture', 'local', 'bazaar', 'masjid', 'craft'],
};

function scorePlace(place: Place, interests: Interest[]) {
  const haystack = `${place.name} ${place.description}`.toLowerCase();
  return interests.reduce((score, interest) => {
    const matches = interestKeywords[interest].filter((keyword) =>
      haystack.includes(keyword),
    ).length;
    return score + matches * 3;
  }, 0);
}

/**
 *  travel estimates used to turn the itinerary into a connected route.
 * In production, this layer can be replaced by a live maps/transport API.
 */
function getTravelSegment(from: string, to: string, index: number): TravelSegment {
  const key = `${from}->${to}`;
  const known: Record<string, TravelSegment> = {
    'Current location->Taj Mahal': {
      distance: '4.2 km', travelTime: '18 min', mode: 'Auto / Cab', icon: '🛺',
      note: 'Start early for the planned morning entry.', publicTransport: 'good', publicTransportLabel: 'Options generally available',
      backup: 'Auto / Cab', backupFare: '₹100–180', returnAdvice: 'Return transport is usually easier from the main visitor corridor.',
    },
    'Taj Mahal->Agra Fort': {
      distance: '3.1 km', travelTime: '14 min', mode: 'Auto / Cab', icon: '🛺',
      note: 'A short city transfer between two major heritage stops.', publicTransport: 'good', publicTransportLabel: 'Options generally available',
      backup: 'Auto / Cab', backupFare: '₹80–150', returnAdvice: 'Keep your next transfer in mind around the busy afternoon period.',
    },
    'Agra Fort->Itmad-ud-Daulah': {
      distance: '4.3 km', travelTime: '18 min', mode: 'Auto / Cab', icon: '🛺',
      note: 'Allow extra time for city traffic.', publicTransport: 'limited', publicTransportLabel: 'May take longer',
      backup: 'Auto / Cab', backupFare: '₹100–180', returnAdvice: 'If you finish late, prefer a pre-arranged ride rather than waiting on the roadside.',
    },
    'Itmad-ud-Daulah->Mehtab Bagh': {
      distance: '4.8 km', travelTime: '20 min', mode: 'Auto / Cab', icon: '🚕',
      note: 'Reach before sunset if the viewpoint is part of your plan.', warning: 'Return transport can be limited later in the evening. Plan your ride before leaving this area.',
      publicTransport: 'plan-ahead', publicTransportLabel: 'Plan your return before leaving', lastSuggestedTime: 'Before 6:30 PM',
      backup: 'Pre-booked Auto / Cab', backupFare: '₹120–220', returnAdvice: 'Arrange the return ride before entering the viewpoint area, especially for an evening visit.',
    },
    'Kinari Bazaar->Jama Masjid': {
      distance: '0.6 km', travelTime: '8 min', mode: 'Walk', icon: '🚶',
      note: 'A walkable Old Agra connection.', publicTransport: 'good', publicTransportLabel: 'Walking is simplest here',
      backup: 'Walk', backupFare: '₹0', returnAdvice: 'Stay on the planned pedestrian route between nearby stops.',
    },
    'Jama Masjid->Sadar Bazaar': {
      distance: '4.5 km', travelTime: '20 min', mode: 'Auto / Cab', icon: '🛺',
      note: 'Busy market traffic is possible around peak hours.', publicTransport: 'limited', publicTransportLabel: 'Allow extra waiting time',
      backup: 'Auto / Cab', backupFare: '₹100–180', returnAdvice: 'Keep a ride option ready if you are leaving after the market gets busy.',
    },
    'Sadar Bazaar->Agra Marble Market': {
      distance: '3.8 km', travelTime: '16 min', mode: 'Auto / Cab', icon: '🛺',
      note: 'Keep shopping time separate from your return journey.', warning: 'Public transport frequency may reduce later in the evening. Keep a return option ready.',
      publicTransport: 'plan-ahead', publicTransportLabel: 'Return plan recommended', lastSuggestedTime: 'Before 7:00 PM',
      backup: 'Pre-arranged Auto / Cab', backupFare: '₹100–200', returnAdvice: 'Finish shopping with enough buffer to arrange your ride back to your stay.',
    },
    'Itmad-ud-Daulah->Ram Bagh': {
      distance: '2.7 km', travelTime: '12 min', mode: 'Auto / Cab', icon: '🛺',
      note: 'A short transfer along the Yamuna-side route.', publicTransport: 'limited', publicTransportLabel: 'May take longer',
      backup: 'Auto / Cab', backupFare: '₹80–150', returnAdvice: 'Check your next ride before spending too long at the stop.',
    },
    'Ram Bagh->Mehtab Bagh': {
      distance: '5.9 km', travelTime: '24 min', mode: 'Auto / Cab', icon: '🚕',
      note: 'Keep your return transport in mind before the evening viewpoint.', warning: 'This route is more comfortable with a pre-arranged return ride after sunset.',
      publicTransport: 'plan-ahead', publicTransportLabel: 'Plan return transport first', lastSuggestedTime: 'Before 6:30 PM',
      backup: 'Pre-arranged Auto / Cab', backupFare: '₹150–250', returnAdvice: 'Do not wait until the viewpoint visit is over to arrange your return ride.',
    },
  };

  return known[key] ?? {
    distance: index % 2 === 0 ? '2.8 km' : '4.1 km',
    travelTime: index % 2 === 0 ? '14 min' : '18 min',
    mode: 'Auto / Cab', icon: '🛺',
    note: ' route estimate — live routing can be connected later.',
    publicTransport: 'limited', publicTransportLabel: 'Live availability not connected',
    backup: 'Auto / Cab', backupFare: 'Check locally', returnAdvice: 'Keep a backup ride option ready.',
  };
}
function flattenDays(days: Day[]): RouteStop[] {
  return days.flatMap((day) =>
    day.places.map((place) => ({ ...place, day: day.day, dayTitle: day.title })),
  );
}

function getSafetyInfo(stopName: string): SafetyInfo {
  const name = stopName.toLowerCase();
  if (name.includes('mehtab')) {
    return {
      areaLabel: 'Yamuna-side viewpoint area',
      level: 'extra-care',
      levelLabel: 'Extra planning recommended',
      tip: 'Finish your visit with enough daylight and arrange the return ride before leaving the viewpoint area.',
      hospitalArea: 'Search nearby hospitals from this stop',
      policeArea: 'Search nearby police stations from this stop',
      quietAfter: 'Evening',
    };
  }
  if (name.includes('kinari') || name.includes('sadar') || name.includes('bazaar') || name.includes('market')) {
    return {
      areaLabel: 'Busy market area',
      level: 'attention',
      levelLabel: 'Crowd awareness',
      tip: 'Keep your phone and wallet secure, agree on prices before rides, and stay with your planned route in busy lanes.',
      hospitalArea: 'Search nearby hospitals from this stop',
      policeArea: 'Search nearby police stations from this stop',
    };
  }
  return {
    areaLabel: 'Main visitor corridor',
    level: 'normal',
    levelLabel: 'Normal travel awareness',
    tip: 'Keep your belongings secure, follow venue rules and keep your next transport plan visible before moving on.',
    hospitalArea: 'Search nearby hospitals from this stop',
    policeArea: 'Search nearby police stations from this stop',
  };
}

function nearbySearchUrl(type: 'hospital' | 'police', stopName: string) {
  const query = `${type === 'hospital' ? 'hospital' : 'police station'} near ${stopName} Agra`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}


const transportMeta: Record<TransportStatus, { label: string; icon: string; className: string }> = {
  good: { label: 'Public transport: generally available', icon: '🟢', className: 'border-emerald-200 bg-emerald-50 text-emerald-900' },
  limited: { label: 'Public transport: may be limited', icon: '🟠', className: 'border-amber-200 bg-amber-50 text-amber-950' },
  'plan-ahead': { label: 'Plan your return transport', icon: '🔴', className: 'border-red-200 bg-red-50 text-red-950' },
};

export default function AgraPlanner() {
  const [selectedTrip, setSelectedTrip] = useState<TripId>('agra-2-day');
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(['heritage', 'food']);
  const [budget, setBudget] = useState<Budget>('budget');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('explorer');
  const [companion, setCompanion] = useState<Companion>('solo');
  const [generated, setGenerated] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [activeStop, setActiveStop] = useState(0);
  const [transportChecked, setTransportChecked] = useState(false);
  const [tripAction, setTripAction] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'checking' | 'ready' | 'unavailable'>('idle');
  const [locationMessage, setLocationMessage] = useState('Location is used only to improve the  travel experience.');
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Namaste! 👋 I am your SanskritiX travel companion. Tell me what you need — for example, “I have only 5 hours”, “keep it under ₹2000”, or “add more food”.' },
  ]);
  const [aiMode, setAiMode] = useState<'normal' | 'short' | 'quiet'>('normal');
  const [passportCompleted, setPassportCompleted] = useState(false);
  const [journeyMode, setJourneyMode] = useState(false);
  const [journeyStep, setJourneyStep] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('journey') !== '1') return;
    setJourneyMode(true);
    setSelectedTrip('agra-1-day');
    setSelectedInterests(['heritage', 'food', 'culture', 'photography']);
    setBudget('budget');
    setTravelStyle('explorer');
    setCompanion('solo');
    setGenerated(true);
    setLiveMode(true);
    setActiveStop(0);
    setJourneyStep(1);
    setLocationStatus('ready');
    setLocationMessage('Your Agra journey is ready — no location permission is required.');
    setAiMessages([
      { role: 'assistant', text: '🪔 Your Agra journey is ready. Explore the complete SanskritiX experience without setting up a trip manually.' },
    ]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const baseItinerary = useMemo(
    () => data.itineraries.find((item) => item.id === selectedTrip),
    [selectedTrip],
  );

  const generatedDays = useMemo<Day[]>(() => {
    if (!baseItinerary) return [];

    return baseItinerary.days.map((day) => {
      const places = [...day.places] as Place[];
      const ranked = places
        .map((place, index) => ({ place, index, score: scorePlace(place, selectedInterests) }))
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .map((item) => item.place);

      if (ranked.length > 1) {
        const firstOriginal = places[0];
        const firstIndex = ranked.findIndex((p) => p.name === firstOriginal.name);
        if (firstIndex > 0) {
          const [first] = ranked.splice(firstIndex, 1);
          ranked.unshift(first);
        }
      }

      return { ...day, places: ranked };
    });
  }, [baseItinerary, selectedInterests]);

  const aiDays = useMemo<Day[]>(() => {
    if (aiMode === 'short') {
      const stops = flattenDays(generatedDays).slice(0, 4);
      const byDay: Day[] = [];
      stops.forEach((stop) => {
        const existing = byDay.find((day) => day.day === stop.day);
        if (existing) existing.places.push(stop);
        else byDay.push({ day: stop.day, title: stop.dayTitle, places: [stop] });
      });
      return byDay;
    }
    if (aiMode === 'quiet') {
      const crowded = ['kinari bazaar', 'sadar bazaar', 'marble market'];
      return generatedDays.map((day) => ({ ...day, places: day.places.filter((place) => !crowded.some((name) => place.name.toLowerCase().includes(name))) }));
    }
    return generatedDays;
  }, [generatedDays, aiMode]);

  const routeStops = useMemo(() => flattenDays(aiDays), [aiDays]);

  const routeSegments = useMemo(() => {
    return routeStops.map((stop, index) => ({
      stop,
      segment: getTravelSegment(index === 0 ? 'Current location' : routeStops[index - 1].name, stop.name, index),
    }));
  }, [routeStops]);

  function toggleInterest(id: Interest) {
    setSelectedInterests((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      return [...current, id];
    });
  }

  const journeyStops = ['Location detected', 'Trip personalised', 'Travel Assistant', 'Live route', 'Safety & transport', 'Smart Passport'];

  function advanceJourney() {
    if (journeyStep < journeyStops.length - 1) {
      setJourneyStep((step) => step + 1);
      if (journeyStep >= 2 && routeStops.length) {
        setActiveStop((current) => Math.min(current + 1, routeStops.length - 1));
      }
    } else {
      setPassportCompleted(true);
      setJourneyStep(journeyStops.length);
      setLiveMode(false);
    }
  }

  function exitJourney() {
    setJourneyMode(false);
    setJourneyStep(0);
    window.history.replaceState({}, '', '/agra/planner');
  }

  function createTrip() {
    setGenerated(true);
    setLiveMode(false);
    setActiveStop(0);
    window.localStorage.setItem(
      'sanskritix_trip_preferences',
      JSON.stringify({ selectedTrip, selectedInterests, budget, travelStyle, companion }),
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startLiveTrip() {
    setLiveMode(true);
    setActiveStop(0);
    setTransportChecked(false);
    document.getElementById('smart-route')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function checkTransport() {
    setTransportChecked(true);
  }

  function nextStop() {
    setTransportChecked(false);
    setActiveStop((current) => Math.min(current + 1, Math.max(routeStops.length - 1, 0)));
  }

  function completeTrip() {
    setPassportCompleted(true);
    setLiveMode(false);
    window.localStorage.setItem('sanskritix_trip_completed', JSON.stringify({ city: 'Agra', completedAt: new Date().toISOString(), stops: totalStops, budget }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function checkLocation() {
    if (!navigator.geolocation) {
      setLocationStatus('unavailable');
      setLocationMessage('Location is not supported in this browser. You can continue with the Agra route.');
      return;
    }
    setLocationStatus('checking');
    setLocationMessage('Checking your device location…');
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationStatus('ready');
        setLocationMessage('Location access is available. For this , your route remains centred on Agra.');
      },
      () => {
        setLocationStatus('unavailable');
        setLocationMessage('Location permission was not available. No problem — the Agra trip can still run normally.');
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 300000 },
    );
  }

  const budgetLabel = { budget: 'Budget Friendly', comfort: 'Comfort', premium: 'Premium' }[budget];
  const styleLabel = { explorer: 'Explorer', slow: 'Slow Traveller', hidden: 'Hidden Gem Hunter', culture: 'Culture Seeker' }[travelStyle];
  const companionLabel = { solo: 'Solo', couple: 'Couple', family: 'Family', friends: 'Friends' }[companion];
  const activeRoute = routeStops[activeStop];
  const activeSafety = activeRoute ? getSafetyInfo(activeRoute.name) : null;
  const progress = routeStops.length ? ((activeStop + 1) / routeStops.length) * 100 : 0;
  const estimatedBudget = budget === 'budget' ? '₹1,800–₹3,000' : budget === 'comfort' ? '₹3,500–₹6,000' : '₹7,000+';
  const tripDays = selectedTrip === 'agra-1-day' ? 1 : selectedTrip === 'agra-2-day' ? 2 : 3;
  const totalStops = routeStops.length;
  const totalTravelTime = routeSegments.reduce((minutes, item) => minutes + Number(item.segment.travelTime.match(/\d+/)?.[0] || 0), 0);
  const actionText: Record<string, string> = {
    cheaper: 'Budget mode selected — we will prioritise lower-cost transport and experiences.',
    food: 'Food boost selected — local food stops will receive higher priority.',
    quiet: 'Quiet route selected — crowded market stops will be deprioritised where alternatives exist.',
    short: '5-hour mode selected — the route should be compressed around your highest-priority stops.',
    hidden: 'Hidden-gem mode selected — lesser-known cultural stops will receive higher priority.',
  };

  function applyTripAction(action: string) {
    setTripAction(actionText[action]);
    if (action === 'cheaper') setBudget('budget');
    if (action === 'food' && !selectedInterests.includes('food')) setSelectedInterests((items) => [...items, 'food']);
    if (action === 'hidden') {
      if (!selectedInterests.includes('hidden')) setSelectedInterests((items) => [...items, 'hidden']);
      setTravelStyle('hidden');
    }
    if (action === 'quiet') setAiMode('quiet');
    if (action === 'short') setAiMode('short');
  }

  function askSanskritiX(command?: string) {
    const raw = (command ?? aiInput).trim();
    if (!raw) return;
    const text = raw.toLowerCase();
    let reply = 'I can help with time, budget, food, crowds, hidden gems and culture. Try: “I have 5 hours”, “make it cheaper”, or “add more food”.';
    let action: string | null = null;

    if (/5\s*(hour|hours|hr|hrs)|only 5/.test(text)) {
      action = 'short';
      reply = 'Done ⏱️ I switched your trip to a 5-hour route and kept the first four priority stops so the plan stays practical.';
    } else if (/₹?\s*2000|under 2000|below 2000|cheap|cheaper|budget|less money/.test(text)) {
      action = 'cheaper';
      reply = 'Done 💰 Budget mode is on. SanskritiX will prioritise lower-cost choices while keeping the main cultural experience.';
    } else if (/food|eat|restaurant|mughlai/.test(text)) {
      action = 'food';
      reply = 'Absolutely 🍛 Food priority is added. Local food-related stops will now receive more weight in your itinerary.';
    } else if (/crowd|crowded|quiet|peaceful|less busy/.test(text)) {
      action = 'quiet';
      reply = 'Done 🌿 I removed the busiest market stops from the route and kept the quieter cultural/heritage experience.';
    } else if (/hidden|offbeat|secret|lesser known/.test(text)) {
      action = 'hidden';
      reply = 'Nice choice 💎 Hidden-gem mode is on. Lesser-known cultural stops will get higher priority.';
    } else if (/culture|heritage|history|monument/.test(text)) {
      if (!selectedInterests.includes('culture')) setSelectedInterests((items) => [...items, 'culture']);
      if (!selectedInterests.includes('heritage')) setSelectedInterests((items) => [...items, 'heritage']);
      reply = 'Done 🪔 I increased culture and heritage priority for your trip.';
    }

    if (action) applyTripAction(action);
    setAiMessages((messages) => [...messages, { role: 'user', text: raw }, { role: 'assistant', text: reply }]);
    setAiInput('');
  }

  return (
    <main className="min-h-screen bg-paper">
      {journeyMode && (
        <div className="sticky top-0 z-50 border-b border-ink/10 bg-ink text-white shadow-lg">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
            <span className="rounded-full bg-marigold px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">✨ Journey Guide</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">Journey walkthrough</p>
              <p className="text-[11px] text-white/55">Your journey is ready to explore.</p>
            </div>
            <button onClick={advanceJourney} className="rounded-full bg-white px-4 py-2 text-xs font-black text-ink hover:bg-sandstone">
              {journeyStep >= journeyStops.length - 1 ? 'Complete ✓' : `Next: ${journeyStops[Math.min(journeyStep, journeyStops.length - 1)]} →`}
            </button>
            <button onClick={exitJourney} className="rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-white/70 hover:bg-white/10">Exit</button>
          </div>
          <div className="h-1 bg-white/10"><div className="h-1 bg-marigold transition-all duration-500" style={{ width: `${Math.min((journeyStep / (journeyStops.length - 1)) * 100, 100)}%` }} /></div>
        </div>
      )}
      <section className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Link to="/destination/agra" className="text-sm font-semibold text-marigold hover:underline">← Back to Agra</Link>
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">SanskritiX Journey</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              {generated ? 'Your Agra Experience' : 'Let’s create your Agra trip'}
            </h1>
            <p className="mt-4 text-base leading-7 text-inksoft">
              {generated
                ? 'Your itinerary is personalised around your time, interests, budget and travel style.'
                : 'Tell us a few things about yourself. SanskritiX will turn them into a practical trip plan.'}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {!generated ? (
          <div className="space-y-6">
            <section className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-marigold"></p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">How long are you staying?</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[['agra-1-day', '1 Day', 'Quick Agra'], ['agra-2-day', '2 Days', 'Classic + local'], ['agra-3-day', '3 Days', 'Deep explore']].map(([id, label, description]) => (
                  <button key={id} onClick={() => setSelectedTrip(id as TripId)} className={`rounded-2xl border p-5 text-left transition ${selectedTrip === id ? 'border-ink bg-ink text-white' : 'border-stoneline bg-white hover:border-ink'}`}>
                    <div className="font-semibold">{label}</div>
                    <div className={`mt-1 text-sm ${selectedTrip === id ? 'text-white/70' : 'text-ink/50'}`}>{description}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-marigold"></p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">What do you want to experience?</h2>
              <p className="mt-2 text-sm text-ink/60">Pick as many as you like. We’ll use these to personalise your route.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {interestMeta.map((interest) => {
                  const active = selectedInterests.includes(interest.id);
                  return (
                    <button key={interest.id} onClick={() => toggleInterest(interest.id)} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-marigold bg-marigold/10' : 'border-stoneline bg-white hover:border-ink'}`}>
                      <div className="text-2xl">{interest.emoji}</div>
                      <div className="mt-2 font-semibold text-ink">{interest.label}</div>
                      <div className="mt-1 text-xs text-ink/50">{active ? 'Selected ✓' : 'Tap to select'}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-marigold"></p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">What is your budget?</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[['budget', '💰 Budget', 'Keep it affordable'], ['comfort', '✨ Comfort', 'Balanced spending'], ['premium', '👑 Premium', 'Comfort first']].map(([id, label, description]) => (
                  <button key={id} onClick={() => setBudget(id as Budget)} className={`rounded-2xl border p-5 text-left transition ${budget === id ? 'border-ink bg-ink text-white' : 'border-stoneline bg-white hover:border-ink'}`}>
                    <div className="font-semibold">{label}</div>
                    <div className={`mt-1 text-sm ${budget === id ? 'text-white/70' : 'text-ink/50'}`}>{description}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-marigold"></p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">What kind of traveller are you?</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[['explorer', '🧭 Explorer', 'See as much as possible'], ['slow', '☕ Slow Traveller', 'Fewer places, more time'], ['hidden', '💎 Hidden Gem Hunter', 'Avoid the usual tourist route'], ['culture', '🪔 Culture Seeker', 'Understand local life and traditions']].map(([id, label, description]) => (
                  <button key={id} onClick={() => setTravelStyle(id as TravelStyle)} className={`rounded-2xl border p-5 text-left transition ${travelStyle === id ? 'border-ink bg-ink text-white' : 'border-stoneline bg-white hover:border-ink'}`}>
                    <div className="font-semibold">{label}</div>
                    <div className={`mt-1 text-sm ${travelStyle === id ? 'text-white/70' : 'text-ink/50'}`}>{description}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-marigold"></p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Who are you travelling with?</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[['solo', '🧍 Solo'], ['couple', '❤️ Couple'], ['family', '👨‍👩‍👧 Family'], ['friends', '👥 Friends']].map(([id, label]) => (
                  <button key={id} onClick={() => setCompanion(id as Companion)} className={`rounded-2xl border p-5 font-semibold transition ${companion === id ? 'border-marigold bg-marigold/10 text-ink' : 'border-stoneline bg-white hover:border-ink'}`}>{label}</button>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-ink bg-ink p-6 text-white shadow-sm sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">Ready?</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold">Create your personalised Agra trip ✨</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">SanskritiX will combine your preferences with our curated Agra routes to create the first version of your trip.</p>
                </div>
                <button onClick={createTrip} disabled={selectedInterests.length === 0} className="rounded-full bg-marigold px-7 py-4 text-sm font-bold text-white transition hover:bg-marigolddark disabled:cursor-not-allowed disabled:opacity-40">Create My Trip ✨</button>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            <section className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-marigold">Your traveller profile</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Agra, personalised for you</h2>
                </div>
                <button onClick={() => setGenerated(false)} className="rounded-full border border-stoneline px-4 py-2 text-sm font-semibold text-ink hover:border-ink">Edit preferences</button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">📅 {selectedTrip === 'agra-1-day' ? '1 Day' : selectedTrip === 'agra-2-day' ? '2 Days' : '3 Days'}</span>
                <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">💰 {budgetLabel}</span>
                <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">🧭 {styleLabel}</span>
                <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">👥 {companionLabel}</span>
                {selectedInterests.map((interest) => <span key={interest} className="rounded-full bg-marigold/10 px-3 py-1 text-xs font-semibold text-marigolddark">{interestMeta.find((item) => item.id === interest)?.label}</span>)}
              </div>
            </section>

            {/*  */}
            <section className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold"> · Travel Intelligence</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Your trip, aware of what you need. 🧭</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-inksoft">Quick travel tools stay connected to your current route, so you can check location, nearby help, transport and your next move without leaving the trip dashboard.</p>
                </div>
                <button onClick={checkLocation} disabled={locationStatus === 'checking'} className="rounded-full bg-ink px-5 py-3 text-xs font-bold text-white transition hover:bg-black disabled:opacity-60">{locationStatus === 'checking' ? '📍 Checking…' : '📍 Check My Location'}</button>
              </div>

              <div className="mt-5 rounded-2xl border border-marigold/30 bg-marigold/5 p-4">
                <div className="flex gap-3"><span className="text-xl">{locationStatus === 'ready' ? '✅' : locationStatus === 'unavailable' ? 'ℹ️' : '📍'}</span><div><p className="text-sm font-bold text-ink">{locationStatus === 'ready' ? 'Location access ready' : locationStatus === 'unavailable' ? 'Using Agra location' : 'Location-aware trip mode'}</p><p className="mt-1 text-xs leading-5 text-inksoft">{locationMessage}</p></div></div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['📍', 'Current stop', activeRoute?.name || 'Taj Mahal', 'Your route focus'],
                  ['➡️', 'Next move', routeStops[activeStop + 1]?.name || 'Trip complete', activeRoute ? getTravelSegment(activeRoute.name, routeStops[activeStop + 1]?.name || activeRoute.name, activeStop + 1).travelTime : '—'],
                  ['🚌', 'Transport', routeSegments[activeStop]?.segment.mode || 'Auto / Cab', routeSegments[activeStop]?.segment.publicTransportLabel || ' estimate'],
                  ['🚨', 'Emergency', '112', 'Quick access anytime'],
                ].map(([icon, title, value, sub]) => (
                  <div key={title} className="rounded-2xl border border-stoneline bg-paper p-4">
                    <div className="text-2xl">{icon}</div><p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-ink/45">{title}</p><p className="mt-1 text-sm font-bold text-ink">{value}</p><p className="mt-1 text-xs text-inksoft">{sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {[
                  ['🏥', 'Nearby hospital', 'Find medical help around your selected stop.', nearbySearchUrl('hospital', activeRoute?.name || 'Agra')],
                  ['👮', 'Nearby police', 'Open a police search centred on your route.', nearbySearchUrl('police', activeRoute?.name || 'Agra')],
                  ['🗺️', 'Open route map', 'See the current stop on a map before moving.', activeRoute?.mapUrl || 'https://www.google.com/maps/search/?api=1&query=Agra'],
                ].map(([icon, title, text, url]) => (
                  <a key={title} href={url} target="_blank" rel="noreferrer" className="rounded-2xl border border-stoneline p-4 transition hover:border-ink hover:shadow-sm">
                    <span className="text-2xl">{icon}</span><p className="mt-2 text-sm font-bold text-ink">{title} ↗</p><p className="mt-1 text-xs leading-5 text-inksoft">{text}</p>
                  </a>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-ink p-5 text-white">
                <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wide text-marigold">Leave-now guidance</p><p className="mt-1 text-sm font-semibold">{activeRoute ? `Ready for ${activeRoute.name}? Check transport before you leave.` : 'Start your route when you are ready.'}</p><p className="mt-1 text-xs text-white/55">These travel estimates are for planning and may vary with traffic or availability.</p></div><button onClick={checkTransport} className="rounded-full bg-marigold px-4 py-2 text-xs font-bold text-white">Check before leaving</button></div>
              </div>
            </section>

            {/*  */}
            <section className="rounded-3xl border border-marigold/30 bg-gradient-to-br from-white to-marigold/5 p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold">0 · Sanskriti Smart Passport</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Carry your journey with you. 🇮🇳</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-inksoft">A simple digital memory of the cultural journey you planned — places, interests, estimated spend and progress in one shareable card.</p>
                </div>
                <span className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white">{passportCompleted ? '✓ Journey completed' : 'Trip passport ready'}</span>
              </div>

              <div className="mt-6 rounded-3xl bg-ink p-6 text-white sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">SanskritiX · Agra</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold">My Agra Cultural Journey</h3>
                    <p className="mt-2 text-sm text-white/60">Personalised {tripDays}-day cultural journey</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3 text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-white/45">Progress</p>
                    <p className="mt-1 text-xl font-black">{passportCompleted ? '100%' : `${Math.round(progress)}%`}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl">🏛️</p><p className="mt-2 text-lg font-bold">{totalStops}</p><p className="text-xs text-white/55">Planned cultural stops</p></div>
                  <div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl">🍛</p><p className="mt-2 text-lg font-bold">{selectedInterests.includes('food') ? 'Food ready' : 'Explore local food'}</p><p className="text-xs text-white/55">Interest profile</p></div>
                  <div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl">💰</p><p className="mt-2 text-lg font-bold">{estimatedBudget}</p><p className="text-xs text-white/55">Estimated trip budget</p></div>
                  <div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl">🧭</p><p className="mt-2 text-lg font-bold">{styleLabel}</p><p className="text-xs text-white/55">Travel personality</p></div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedInterests.slice(0, 5).map((interest) => <span key={interest} className="rounded-full bg-marigold/20 px-3 py-1.5 text-xs font-bold text-white">{interestMeta.find((item) => item.id === interest)?.emoji} {interestMeta.find((item) => item.id === interest)?.label}</span>)}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {!passportCompleted && <button onClick={completeTrip} className="rounded-full bg-marigold px-5 py-3 text-sm font-black text-white hover:opacity-90">✓ Complete Journey</button>}
                  <button onClick={() => window.print()} className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15">🖨️ Save / Print Passport</button>
                </div>
              </div>

              {passportCompleted && <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-sm font-bold text-emerald-900">🎉 Journey completed!</p><p className="mt-1 text-xs leading-5 text-emerald-800">Your journey is saved locally on this device. In a future version, this passport can become a real account-based travel history with memories, reviews and achievements.</p></div>}
            </section>

            {/*  */}
            <section className="rounded-3xl border border-ink bg-ink p-6 text-white shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold"> · Your Trip Dashboard</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold">Everything you need for the journey.</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">One screen connects your plan, route, transport, safety and practical travel information—so you do not have to jump between different pages.</p>
                </div>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">📍 Agra · Your journey</span>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-white/50">TRIP</p><p className="mt-1 text-lg font-bold">{tripDays} {tripDays === 1 ? 'Day' : 'Days'}</p><p className="text-xs text-white/55">{totalStops} planned stops</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-white/50">EST. BUDGET</p><p className="mt-1 text-lg font-bold">{estimatedBudget}</p><p className="text-xs text-white/55">{budgetLabel}</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-white/50">ROUTE TRANSFER</p><p className="mt-1 text-lg font-bold">~{totalTravelTime} min</p><p className="text-xs text-white/55"> travel estimate</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-white/50">LANGUAGE HELP</p><p className="mt-1 text-lg font-bold">Hindi + English</p><p className="text-xs text-white/55">Quick local phrases</p></div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ['cheaper', '💰', 'Make it cheaper'],
                  ['food', '🍛', 'Add more food'],
                  ['quiet', '🚫', 'Avoid crowded places'],
                  ['short', '⏱️', 'I have 5 hours'],
                  ['hidden', '💎', 'Add hidden places'],
                ].map(([id, icon, label]) => (
                  <button key={id} onClick={() => applyTripAction(id)} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-left text-xs font-bold transition hover:bg-white/10"><span className="text-lg">{icon}</span><span className="ml-2">{label}</span></button>
                ))}
              </div>
              {tripAction && <div className="mt-4 rounded-2xl bg-marigold p-4 text-sm font-semibold text-white">✨ {tripAction}</div>}
            </section>

            {/*  */}
            <section className="rounded-3xl border border-marigold/30 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold"> · SanskritiX Travel Assistant</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Just tell SanskritiX what you need. 🤖</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-inksoft">No complicated filters. Type a normal sentence and the  adapts your trip preferences and route.</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">● Travel Assistant Online</span>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
                <div className="overflow-hidden rounded-3xl border border-stoneline bg-paper">
                  <div className="max-h-72 space-y-3 overflow-y-auto p-4">
                    {aiMessages.map((message, index) => (
                      <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'bg-ink text-white' : 'bg-white text-ink shadow-sm'}`}>
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-stoneline bg-white p-3">
                    <div className="flex gap-2">
                      <input value={aiInput} onChange={(event) => setAiInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') askSanskritiX(); }} placeholder="e.g. I have only 5 hours…" className="min-w-0 flex-1 rounded-full border border-stoneline px-4 py-3 text-sm outline-none focus:border-ink" />
                      <button onClick={() => askSanskritiX()} className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white hover:opacity-90">Ask ✨</button>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-ink p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-wide text-marigold">Try saying</p>
                  <div className="mt-4 space-y-2">
                    {[['⏱️', 'I have only 5 hours'], ['💰', 'Keep it under ₹2000'], ['🍛', 'Add more local food'], ['🌿', 'Avoid crowded places'], ['💎', 'Show me hidden gems']].map(([icon, text]) => (
                      <button key={text} onClick={() => askSanskritiX(text)} className="flex w-full items-center gap-3 rounded-2xl bg-white/10 px-3 py-3 text-left text-xs font-bold transition hover:bg-white/15"><span className="text-lg">{icon}</span>{text}</button>
                    ))}
                  </div>
                  <p className="mt-4 text-[10px] leading-4 text-white/45"> Ask naturally and get quick travel suggestions based on your trip preferences.</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-marigold/30 bg-marigold/5 p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-marigolddark">Why we chose this trip</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4"><div className="text-2xl">🎯</div><p className="mt-2 text-sm font-semibold text-ink">Preference matched</p><p className="mt-1 text-xs text-inksoft">Your selected interests influence which stops get priority.</p></div>
                <div className="rounded-2xl bg-white p-4"><div className="text-2xl">⏱️</div><p className="mt-2 text-sm font-semibold text-ink">Time matched</p><p className="mt-1 text-xs text-inksoft">Stops are taken from the route that fits your selected stay.</p></div>
                <div className="rounded-2xl bg-white p-4"><div className="text-2xl">🧳</div><p className="mt-2 text-sm font-semibold text-ink">Travel style</p><p className="mt-1 text-xs text-inksoft">{styleLabel} preferences are kept visible for the route layer.</p></div>
              </div>
            </section>

            {/*  */}
            <section id="smart-route" className="scroll-mt-6 rounded-3xl border border-stoneline bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold"> · Route Intelligence</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Your trip path</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-inksoft">Instead of showing only a list, SanskritiX connects every stop so you know where to go next, how to get there and what to watch for.</p>
                </div>
                <div className="flex gap-2">
                  {!liveMode ? (
                    <button onClick={startLiveTrip} className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white hover:opacity-90">▶ Start Live Trip</button>
                  ) : (
                    <button onClick={nextStop} disabled={activeStop >= routeStops.length - 1} className="rounded-full bg-marigold px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Next Stop →</button>
                  )}
                </div>
              </div>

              {liveMode && activeRoute && (
                <div className="mt-6 rounded-2xl border border-marigold/30 bg-marigold/5 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-marigolddark">Live Route</p>
                      <h3 className="mt-1 text-xl font-bold text-ink">You are heading to {activeRoute.name}</h3>
                    </div>
                    <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-ink">Stop {activeStop + 1} / {routeStops.length}</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-marigold transition-all duration-500" style={{ width: `${progress}%` }} /></div>
                  <p className="mt-2 text-xs text-inksoft">This preview highlights your current stop. Live positioning can be added as the service expands.</p>
                </div>
              )}

              {liveMode && activeRoute && activeSafety && (
                <section className="mt-6 rounded-3xl border border-stoneline bg-paper p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-marigold">Live stop safety</p>
                      <h3 className="mt-1 text-xl font-bold text-ink">Before you move around {activeRoute.name}</h3>
                      <p className="mt-1 text-xs text-inksoft">{activeSafety.areaLabel} · {activeSafety.levelLabel}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${activeSafety.level === 'extra-care' ? 'bg-red-100 text-red-900' : activeSafety.level === 'attention' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
                      {activeSafety.level === 'extra-care' ? '🔴 Plan ahead' : activeSafety.level === 'attention' ? '🟠 Stay aware' : '🟢 Normal awareness'}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl bg-white p-4"><p className="text-lg">🏥</p><p className="mt-1 text-sm font-bold text-ink">Nearby hospital</p><a className="mt-1 inline-flex text-xs font-bold text-marigolddark hover:underline" href={nearbySearchUrl('hospital', activeRoute.name)} target="_blank" rel="noreferrer">Find near this stop ↗</a></div>
                    <div className="rounded-2xl bg-white p-4"><p className="text-lg">👮</p><p className="mt-1 text-sm font-bold text-ink">Nearby police</p><a className="mt-1 inline-flex text-xs font-bold text-marigolddark hover:underline" href={nearbySearchUrl('police', activeRoute.name)} target="_blank" rel="noreferrer">Find near this stop ↗</a></div>
                    <div className="rounded-2xl bg-ink p-4 text-white"><p className="text-lg">🚨</p><p className="mt-1 text-sm font-bold">Emergency</p><a className="mt-1 inline-flex text-xs font-bold text-white/80 hover:text-white hover:underline" href="tel:112">Call 112</a></div>
                  </div>
                  <div className="mt-3 rounded-2xl border border-marigold/30 bg-white p-4 text-xs leading-5 text-inksoft">
                    <span className="font-bold text-ink">Smart safety tip:</span> {activeSafety.tip}
                    {activeSafety.quietAfter && <span className="ml-1 font-semibold text-marigolddark">Extra return planning is recommended for the {activeSafety.quietAfter.toLowerCase()}.</span>}
                  </div>
                  <p className="mt-3 text-[10px] leading-4 text-ink/45"> safety layer: nearby results open a live map search. Exact distance, operating status and route should be verified by the traveller.</p>
                </section>
              )}

              <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-3xl bg-ink p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div><p className="text-xs font-bold uppercase tracking-widest text-marigold">Path summary</p><p className="mt-1 text-sm text-white/60">Day-wise connected journey</p></div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{routeStops.length} stops</span>
                  </div>
                  <div className="mt-7">
                    <AnimatedRoutePath stops={routeStops.map((stop) => ({ name: stop.name }))} activeStop={liveMode ? activeStop : 0} />
                    <div className="mt-5 space-y-2">
                      {routeSegments.map(({ stop, segment }, index) => <div key={`${stop.name}-${index}`} className={`flex flex-wrap items-center gap-2 rounded-xl px-3 py-2 text-xs ${liveMode && index === activeStop ? 'bg-white/15 ring-1 ring-marigold' : 'bg-white/5 text-white/65'}`}><span className="font-bold text-white">{index+1}. {stop.name}</span>{index>0 && <><span>·</span><span>{segment.icon} {segment.travelTime}</span><span>·</span><span>{segment.distance}</span><span>·</span><span>{segment.mode}</span></>}</div>)}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-stoneline bg-paper p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div><p className="text-xs font-bold uppercase tracking-wide text-marigold">Transport coverage map</p><h3 className="mt-1 text-xl font-bold text-ink">Know the safe return window</h3></div>
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-ink"> zones</span>
                    </div>
                    <div className="mt-5 space-y-3">
                      {routeSegments.slice(0, 5).map(({ stop, segment }, index) => {
                        const meta = transportMeta[segment.publicTransport];
                        return (
                          <div key={`coverage-${stop.name}-${index}`} className={`rounded-2xl border p-3 ${meta.className}`}>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-ink">{index + 1}</div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-bold">{stop.name}</p><span className="text-[11px] font-bold">{meta.icon} {meta.label}</span></div>
                                <p className="mt-1 text-[11px] leading-5">{segment.lastSuggestedTime ? `Suggested return planning: ${segment.lastSuggestedTime}` : segment.returnAdvice}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-stoneline bg-paper p-5">
                    <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wide text-marigold">Route instructions</p><h3 className="mt-1 text-xl font-bold text-ink">Where to go next</h3></div><span className="text-2xl">🧭</span></div>
                    <div className="mt-5 space-y-3">
                      {routeSegments.slice(0, 5).map(({ stop, segment }, index) => (
                        <div key={`instruction-${stop.name}-${index}`} className="rounded-2xl bg-white p-4">
                          <div className="flex items-start gap-3">
                            <span className="rounded-xl bg-marigold/10 px-2.5 py-2 text-lg">{index === 0 ? '📍' : segment.icon}</span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold text-ink">{index === 0 ? `Start → ${stop.name}` : `Next → ${stop.name}`}</p><span className="text-xs font-bold text-ink/50">{segment.travelTime}</span></div>
                              <p className="mt-1 text-xs leading-5 text-inksoft">{segment.distance} · {segment.mode} · {segment.note}</p>
                              <p className="mt-2 inline-flex rounded-full bg-paper px-2.5 py-1 text-[11px] font-bold text-ink">{transportMeta[segment.publicTransport].icon} {segment.publicTransportLabel}</p>
                              <a href={stop.mapUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs font-bold text-marigolddark hover:underline">Open map for this stop ↗</a>
                              {segment.warning && <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold leading-5 text-amber-900">⚠️ {segment.warning}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-stoneline bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-marigold"> · Transport Intelligence</p>
                        <h3 className="mt-1 text-xl font-bold text-ink">Will you still find transport here?</h3>
                        <p className="mt-1 text-xs leading-5 text-inksoft">SanskritiX checks the route's  transport rules before you move to the next area.</p>
                      </div>
                      <button onClick={checkTransport} className="rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white hover:opacity-90">{transportChecked ? '✓ Checked' : 'Check this route'}</button>
                    </div>
                    {transportChecked && activeRoute && (() => {
                      const activeSegment = routeSegments[activeStop]?.segment;
                      if (!activeSegment) return null;
                      const meta = transportMeta[activeSegment.publicTransport];
                      return (
                        <div className={`mt-5 rounded-2xl border p-4 ${meta.className}`}>
                          <div className="flex items-start gap-3">
                            <span className="text-xl">{meta.icon}</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold">{meta.label}</p>
                              <p className="mt-1 text-xs leading-5">For <strong>{activeRoute.name}</strong>: {activeSegment.publicTransportLabel}. {activeSegment.returnAdvice}</p>
                              {activeSegment.lastSuggestedTime && <p className="mt-2 text-xs font-bold">⏰ Recommended action: arrange your ride {activeSegment.lastSuggestedTime}.</p>}
                              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                <div className="rounded-xl bg-white/70 p-3"><p className="text-[11px] font-bold uppercase tracking-wide">Backup</p><p className="mt-1 text-sm font-semibold">{activeSegment.backup}</p></div>
                                <div className="rounded-xl bg-white/70 p-3"><p className="text-[11px] font-bold uppercase tracking-wide"> fare</p><p className="mt-1 text-sm font-semibold">{activeSegment.backupFare}</p></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-paper p-4"><p className="text-2xl">🚍</p><p className="mt-1 text-sm font-bold text-ink">Coverage check</p><p className="mt-1 text-xs leading-5 text-inksoft">Know before entering an area where public transport may become sparse.</p></div>
                      <div className="rounded-2xl bg-paper p-4"><p className="text-2xl">🛺</p><p className="mt-1 text-sm font-bold text-ink">Backup option</p><p className="mt-1 text-xs leading-5 text-inksoft">The route always keeps a fallback ride visible for flagged segments.</p></div>
                      <div className="rounded-2xl bg-paper p-4"><p className="text-2xl">↩️</p><p className="mt-1 text-sm font-bold text-ink">Return planning</p><p className="mt-1 text-xs leading-5 text-inksoft">A warning appears before the user reaches a late-evening or lower-coverage stop.</p></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex gap-3"><span className="text-xl">⚠️</span><div><p className="text-sm font-bold text-amber-950">Area & transport alert</p><p className="mt-1 text-xs leading-5 text-amber-900">If a route segment is marked <strong>Plan your return transport</strong>, SanskritiX surfaces the warning before that stop. The user can then arrange a ride instead of discovering the transport gap after reaching the area.</p><p className="mt-2 text-[11px] font-semibold text-amber-800"> Note: transport coverage, timings and fares shown here are curated travel estimates, not live transit availability.</p></div></div>
              </div>
            </section>

            {/*  */}
            <section className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold"> · Safety Intelligence</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Safety follows your route 🛡️</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-inksoft">Instead of hiding emergency information on a separate page, SanskritiX keeps help, local safety guidance and nearby search options connected to the traveller's current stop.</p>
                </div>
                <div className="rounded-2xl bg-paper px-4 py-3 text-xs font-semibold text-ink">🚨 Emergency: <span className="text-marigolddark">112</span></div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-stoneline bg-paper p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-marigold">Route safety snapshot</p>
                  <div className="mt-4 space-y-3">
                    {routeStops.slice(0, 6).map((stop, index) => {
                      const info = getSafetyInfo(stop.name);
                      return (
                        <div key={`safety-${stop.name}-${index}`} className="flex items-center gap-3 rounded-2xl bg-white p-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marigold/10 text-sm font-bold text-ink">{index + 1}</div>
                          <div className="min-w-0 flex-1"><p className="text-sm font-bold text-ink">{stop.name}</p><p className="text-[11px] text-inksoft">{info.areaLabel}</p></div>
                          <span className={`text-[10px] font-bold ${info.level === 'extra-care' ? 'text-red-700' : info.level === 'attention' ? 'text-amber-700' : 'text-emerald-700'}`}>{info.level === 'extra-care' ? 'Plan ahead' : info.level === 'attention' ? 'Stay aware' : 'Normal'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-3xl border border-stoneline bg-paper p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-marigold">Always available</p>
                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl bg-white p-4"><div className="flex items-center gap-3"><span className="text-2xl">🏥</span><div><p className="text-sm font-bold text-ink">Find a nearby hospital</p><p className="text-xs text-inksoft">Search is centred on the selected Agra stop.</p></div></div><a href={nearbySearchUrl('hospital', activeRoute?.name || 'Agra')} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-full border border-stoneline px-3 py-2 text-xs font-bold text-ink hover:border-ink">Open hospital search ↗</a></div>
                    <div className="rounded-2xl bg-white p-4"><div className="flex items-center gap-3"><span className="text-2xl">👮</span><div><p className="text-sm font-bold text-ink">Find a nearby police station</p><p className="text-xs text-inksoft">Open a map search around the selected stop.</p></div></div><a href={nearbySearchUrl('police', activeRoute?.name || 'Agra')} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-full border border-stoneline px-3 py-2 text-xs font-bold text-ink hover:border-ink">Open police search ↗</a></div>
                    <div className="rounded-2xl bg-ink p-4 text-white"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-bold">Emergency assistance</p><p className="mt-1 text-xs text-white/60">Police, fire and other emergency assistance.</p></div><a href="tel:112" className="rounded-full bg-marigold px-4 py-2 text-xs font-black text-white">112 · Call</a></div></div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-marigold/30 bg-marigold/5 p-4">
                <p className="text-sm font-bold text-ink">🧠 SanskritiX safety principle</p>
                <p className="mt-1 text-xs leading-5 text-inksoft">The platform should warn the traveller <strong>before</strong> a route becomes inconvenient—not after they reach the area. Transport coverage, nearby help and local guidance therefore appear as part of the trip path.</p>
                <p className="mt-2 text-[10px] leading-4 text-ink/45"> Note: safety labels are curated travel guidance. Nearby facility results, distances and availability should be verified through live services in a future version.</p>
              </div>
            </section>

            {/* Before-you-leave handoff */}
            <section className="rounded-3xl border border-ink bg-ink p-6 text-white shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold">Before you leave</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">One last smart check 🧳</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {['Check your next stop and arrival time.', 'If transport is limited, arrange the return ride early.', 'Keep your phone charged and emergency help accessible.', 'Follow local etiquette and stay aware in crowded or quiet areas.'].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm leading-6 text-white/80"><span className="mr-2 font-bold text-marigold">✓</span>{item}</div>)}
              </div>
            </section>

            {baseItinerary && <ItineraryCard title={baseItinerary.title} days={aiDays} />}

            <section className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-marigold">Change your trip</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Want to optimise it?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-inksoft">Next, this same route engine can respond to commands like “Make it cheaper”, “Add more food”, “Remove crowded places” or “I have only 5 hours today”.</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-ink">
                {['💰 Make it cheaper', '🍛 Add more food', '🚫 Remove crowded places', '⏱️ I have only 5 hours', '💎 Add hidden places'].map((label) => <span key={label} className="rounded-full bg-paper px-3 py-2">{label}</span>)}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
