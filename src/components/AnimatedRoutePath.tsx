type Stop = { name: string };

export default function AnimatedRoutePath({ stops, activeStop = 0 }: { stops: Stop[]; activeStop?: number }) {
  const shown = stops.slice(0, 8);
  const width = 920;
  const pad = 45;
  const usable = width - pad * 2;
  const points = shown.map((stop, i) => ({ stop, x: pad + (usable / Math.max(shown.length - 1, 1)) * i, y: i % 2 === 0 ? 135 : 135 }));
  const path = points.length < 2 ? `M${pad} 135 L${width-pad} 135` : `M${points[0].x} 135 ` + points.slice(1).map((p, i) => { const prev = points[i]; const mid = (prev.x + p.x) / 2; const bend = i % 2 === 0 ? 65 : -65; return `C${mid-35} ${135+bend} ${mid+35} ${135+bend} ${p.x} 135`; }).join(' ');
  return <div className="overflow-x-auto rounded-3xl bg-ink p-4 sm:p-6"><div className="min-w-[760px]"><svg viewBox={`0 0 ${width} 270`} className="h-[260px] w-full" role="img" aria-label="Animated trip route">
    <path d={path} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="18" strokeLinecap="round" />
    <path d={path} fill="none" stroke="rgba(255,255,255,.92)" strokeWidth="4" strokeDasharray="11 13" strokeLinecap="round" className="route-dash" />
    {points.map(({ stop, x }, i) => <g key={`${stop.name}-${i}`} className={i === activeStop ? 'route-active-node' : ''}><circle cx={x} cy={135} r={i === activeStop ? 20 : 16} fill={i === activeStop ? '#E57B28' : '#247C70'} className="route-node-pulse"/><circle cx={x} cy={135} r="11" fill={i === activeStop ? '#E57B28' : '#247C70'} stroke="white" strokeWidth="3"/><text x={x} y="140" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">{i+1}</text><text x={x} y={i%2===0?95:185} textAnchor="middle" fill="white" fontSize="13" fontWeight="600">{stop.name.length > 22 ? stop.name.slice(0,20)+'…' : stop.name}</text></g>)}
  </svg></div></div>;
}
