import { useMemo, useState } from 'react';
import { api } from '../lib/api';

type Props = { city?: string };
const suggestions = ['Plan a 2-day cultural trip', 'What should I eat here?', 'Suggest quiet places', 'How can I travel around?'];

export default function AskAI({ city = 'Agra' }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'assistant'; text: string }[]>([
    { from: 'assistant', text: `Namaste! I can help you discover ${city}. Ask me about places, food, culture, routes, shopping or local experiences.` },
  ]);

  const fallbackAnswer = useMemo(() => (question: string) => {
    const q = question.toLowerCase();
    if (q.includes('food') || q.includes('eat') || q.includes('dish')) return `For ${city}, start with local specialities and choose places that fit your budget and preferred area.`;
    if (q.includes('quiet') || q.includes('hidden') || q.includes('less crowded')) return `Try lesser-known cultural spots around the old city and local neighbourhoods of ${city}.`;
    if (q.includes('route') || q.includes('travel') || q.includes('transport')) return `Tell me how many hours or days you have and I can suggest a practical order of places with travel-time tips.`;
    if (q.includes('plan') || q.includes('2-day') || q.includes('two day')) return `For a 2-day ${city} visit, balance major heritage sights with local food, crafts and one slower cultural experience.`;
    return `I can help with ${city} places, culture, food, shopping, routes, festivals and guided experiences.`;
  }, [city]);

  const ask = async (text = input) => {
    const clean = text.trim();
    if (!clean || busy) return;
    setInput('');
    setMessages((m) => [...m, { from: 'user', text: clean }]);
    setBusy(true);
    try {
      const result = await api.askAI(clean, city);
      setMessages((m) => [...m, { from: 'assistant', text: result.answer }]);
    } catch {
      setMessages((m) => [...m, { from: 'assistant', text: fallbackAnswer(clean) }]);
    } finally { setBusy(false); }
  };

  return <>
    <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-madder px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-madderdark" aria-label="Ask SanskritiX Assistant">✦ Ask SanskritiX</button>
    {open && <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/30 p-4 sm:items-center" onClick={() => setOpen(false)}>
      <div className="w-full max-w-lg overflow-hidden rounded-[26px] border border-stoneline bg-sandstone shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-stoneline bg-white px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-marigold">SanskritiX Assistant</p><h2 className="mt-1 font-display text-2xl font-semibold text-ink">Ask about {city}</h2></div><button onClick={() => setOpen(false)} className="rounded-full border border-stoneline px-3 py-1.5 text-sm text-inksoft">Close</button></div>
        <div className="max-h-[52vh] space-y-3 overflow-y-auto p-5">{messages.map((m, i) => <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${m.from === 'user' ? 'bg-madder text-white' : 'bg-white text-ink shadow-sm'}`}>{m.text}</div></div>)}{busy && <div className="text-xs text-inksoft">Thinking…</div>}<div className="flex flex-wrap gap-2 pt-1">{suggestions.map((s) => <button key={s} onClick={() => ask(s)} className="rounded-full border border-stoneline bg-white px-3 py-2 text-xs font-semibold text-inksoft hover:border-marigold hover:text-ink">{s}</button>)}</div></div>
        <form onSubmit={(e) => { e.preventDefault(); void ask(); }} className="flex gap-2 border-t border-stoneline bg-white p-4"><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about your trip..." className="min-w-0 flex-1 rounded-full border border-stoneline bg-sandstone px-4 py-3 text-sm outline-none focus:border-marigold" /><button disabled={busy} className="rounded-full bg-marigold px-5 py-3 text-sm font-bold text-white disabled:opacity-60">Ask</button></form>
      </div>
    </div>}
  </>;
}
