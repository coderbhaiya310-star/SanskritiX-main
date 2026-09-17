import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import Section from '../components/Section';

const cities = [
  { name: 'Agra', region: 'Uttar Pradesh', theme: 'Mughal heritage, crafts & local food' },
  { name: 'Jaipur', region: 'Rajasthan', theme: 'Royal heritage, bazaars & crafts' },
  { name: 'Varanasi', region: 'Uttar Pradesh', theme: 'Ghats, traditions & living culture' },
  { name: 'Delhi', region: 'Delhi', theme: 'Historic neighbourhoods, food & culture' },
];

const groupTours = [
  { id: 'local-agra-heritage', city: 'Agra', title: 'Agra Heritage Group Walk', duration: '4 hours', price: '₹999', detail: 'Taj Mahal • Agra Fort • local stories' },
  { id: 'local-jaipur-royal', city: 'Jaipur', title: 'Jaipur Royal City Tour', duration: '5 hours', price: '₹1,299', detail: 'Forts • old city • crafts & bazaars' },
  { id: 'local-varanasi-ghats', city: 'Varanasi', title: 'Varanasi Culture & Ghats', duration: '5 hours', price: '₹1,199', detail: 'Ghats • old lanes • local traditions' },
  { id: 'local-delhi-cultural', city: 'Delhi', title: 'Old Delhi Cultural Trail', duration: '4 hours', price: '₹999', detail: 'Heritage • markets • street food' },
];

const privateTours = [
  { title: 'Agra Heritage Essentials', duration: '4 hours', price: '₹1,499', detail: 'Taj Mahal • Agra Fort • local stories', badge: 'Most Popular' },
  { title: 'Old Agra & Local Culture', duration: '5 hours', price: '₹1,999', detail: 'Old city • markets • crafts • local food', badge: 'Cultural Pick' },
  { title: 'Private Agra Experience', duration: '7 hours', price: '₹2,999', detail: 'Private guide • flexible pace • personalised route', badge: 'Private' },
];

export default function Experiences() {
  const [city, setCity] = useState('Agra');
  const [selected, setSelected] = useState(privateTours[0].title);
  const [message, setMessage] = useState('');
  const [remoteTours, setRemoteTours] = useState<any[] | null>(null);
  const [bookingTour, setBookingTour] = useState<any | null>(null);
  const [travelDate, setTravelDate] = useState('');
  const [people, setPeople] = useState(1);
  const [language, setLanguage] = useState('English');
  const [bookingMessage, setBookingMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { api.tours<any[]>().then(setRemoteTours).catch(() => setRemoteTours(null)); }, []);
  const selectedCity = useMemo(() => cities.find((item) => item.name === city) || cities[0], [city]);
  const cityTours = (remoteTours?.filter((tour) => tour.kind === 'group' && tour.city === city).map((tour) => ({ ...tour, price: `₹${Number(tour.price).toLocaleString('en-IN')}` })) || groupTours.filter((tour) => tour.city === city));

  const book = (tour: any) => {
    setBookingTour(tour); setBookingMessage('');
  };

  const confirmBooking = async () => {
    if (!bookingTour) return;
    if (!user) { navigate('/login'); return; }
    if (!travelDate) { setBookingMessage('Please choose a travel date.'); return; }
    try {
      if (String(bookingTour.id).startsWith('local-')) {
        const saved = JSON.parse(localStorage.getItem('sanskritix_local_bookings') || '[]');
        saved.push({ id: Date.now(), tour: bookingTour.title, city: bookingTour.city, travelDate, people, language, createdAt: new Date().toISOString() });
        localStorage.setItem('sanskritix_local_bookings', JSON.stringify(saved));
        setBookingMessage('Request saved. SanskritiX will confirm the guide and timing for this experience.');
        return;
      }
      const result: any = await api.createBooking({ tour_id: bookingTour.id, travel_date: travelDate, people, language });
      setBookingMessage(`Booking request #${result.id} created. Total: ₹${Number(result.total_amount).toLocaleString('en-IN')}.`);
      setBookingTour(null);
    } catch (error) { setBookingMessage(error instanceof Error ? error.message : 'Unable to create booking.'); }
  };

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <span className="rounded-full border border-marigold/30 bg-marigold/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-marigold">SanskritiX Experiences</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold text-ink sm:text-5xl">Travel with people who know the place.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-inksoft">Book a SanskritiX group tour or a private cultural experience with a professional local guide — without leaving the platform.</p>
        </div>
      </div>

      <Section title="Group tours across India" subtitle="Choose a city, pick a cultural experience and travel with a SanskritiX guide and fellow travellers.">
        <div className="flex flex-wrap gap-2">
          {cities.map((item) => <button key={item.name} onClick={() => setCity(item.name)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${city === item.name ? 'border-marigold bg-marigold text-white' : 'border-stoneline bg-white text-inksoft hover:border-marigold'}`}>{item.name}</button>)}
        </div>
        <div className="mt-6 rounded-3xl bg-sandstone p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-marigold">{selectedCity.region}</p><h2 className="mt-1 font-display text-3xl font-semibold text-ink">{selectedCity.name}</h2><p className="mt-1 text-sm text-inksoft">{selectedCity.theme}</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-madder">Professional guide</span></div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {cityTours.map((tour) => <div key={tour.title} className="rounded-2xl border border-stoneline bg-white p-6"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-wide text-madder">Group tour</span><span className="text-sm font-semibold text-inksoft">{tour.duration}</span></div><h3 className="mt-4 font-display text-xl font-semibold text-ink">{tour.title}</h3><p className="mt-2 text-sm leading-6 text-inksoft">{tour.detail}</p><div className="mt-5 flex items-end justify-between gap-4"><div><p className="text-[11px] uppercase tracking-wide text-inksoft">Starting from</p><p className="text-2xl font-bold text-ink">{tour.price}<span className="text-sm font-medium text-inksoft"> / person</span></p></div><button onClick={() => book(tour)} className="rounded-full bg-marigold px-4 py-2.5 text-xs font-bold text-white hover:bg-marigolddark">Join group</button></div></div>)}
          </div>
        </div>
      </Section>

      <Section title="Private cultural experiences" subtitle="For couples, families and small groups who want a more personal pace.">
        <div className="grid gap-5 md:grid-cols-3">
          {privateTours.map((tour) => <button key={tour.title} onClick={() => setSelected(tour.title)} className={`text-left rounded-2xl border p-6 transition ${selected === tour.title ? 'border-marigold bg-white shadow-lg' : 'border-stoneline bg-white hover:border-marigold/50'}`}><div className="flex items-center justify-between gap-3"><span className="rounded-full bg-madder/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-madder">{tour.badge}</span><span className="text-sm font-semibold text-inksoft">{tour.duration}</span></div><h2 className="mt-5 font-display text-2xl font-semibold text-ink">{tour.title}</h2><p className="mt-2 text-sm leading-6 text-inksoft">{tour.detail}</p><div className="mt-6 border-t border-stoneline pt-5"><p className="text-xs uppercase tracking-wide text-inksoft">Starting from</p><p className="mt-1 text-2xl font-bold text-ink">{tour.price}<span className="text-sm font-medium text-inksoft"> / person</span></p></div></button>)}
        </div>
        <div className="mt-8 rounded-3xl bg-ink p-7 text-white sm:p-9"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-marigold">Book with SanskritiX</p><h2 className="mt-2 font-display text-3xl font-semibold">Your guide. Your pace. Your story.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">Tell us your language, interests, group size and preferred timing. Our team can match you with a suitable professional guide.</p></div><button onClick={() => book({ title: selected })} className="rounded-full bg-marigold px-6 py-3 text-sm font-bold text-white hover:bg-marigolddark">Request this tour</button></div>{message && <p className="mt-5 rounded-xl bg-white/10 px-4 py-3 text-sm text-white/85">✓ {message}</p>}</div>
      </Section>

      {bookingTour && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/40 p-4" onClick={() => setBookingTour(null)}><div className="w-full max-w-md rounded-3xl bg-sandstone p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}><p className="text-xs font-bold uppercase tracking-[0.16em] text-marigold">Reserve your experience</p><h2 className="mt-2 font-display text-2xl font-semibold text-ink">{bookingTour.title}</h2><div className="mt-5 space-y-4"><label className="block text-sm font-semibold text-ink">Travel date<input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="mt-1 w-full rounded-xl border border-stoneline bg-white px-3 py-2.5" /></label><div className="grid grid-cols-2 gap-3"><label className="block text-sm font-semibold text-ink">People<input type="number" min="1" max="20" value={people} onChange={(e) => setPeople(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-stoneline bg-white px-3 py-2.5" /></label><label className="block text-sm font-semibold text-ink">Language<select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 w-full rounded-xl border border-stoneline bg-white px-3 py-2.5"><option>English</option><option>Hindi</option><option>French</option><option>Spanish</option></select></label></div></div>{bookingMessage && <p className="mt-4 rounded-xl bg-white px-3 py-2 text-sm text-ink">{bookingMessage}</p>}<div className="mt-6 flex justify-end gap-2"><button onClick={() => setBookingTour(null)} className="rounded-full border border-stoneline px-4 py-2.5 text-sm font-semibold text-inksoft">Cancel</button><button onClick={() => void confirmBooking()} className="rounded-full bg-marigold px-5 py-2.5 text-sm font-bold text-white">Confirm request</button></div></div></div>}

      <Section title="What is included">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{['Professional local guide', 'Cultural & historical storytelling', 'Local language assistance', 'Personalised route guidance'].map((item) => <div key={item} className="rounded-2xl border border-stoneline bg-white p-5 text-sm font-semibold text-ink">✓ {item}</div>)}</div>
      </Section>
    </div>
  );
}
