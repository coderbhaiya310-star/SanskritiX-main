import { useEffect, useRef, useState } from 'react';

export default function InteractiveCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${event.clientX - 20}px, ${event.clientY - 20}px, 0) rotate(${angle}deg)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX - 3}px, ${event.clientY - 3}px, 0)`;
      }
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(!!target?.closest('a,button,[data-cursor]'));
    };
    const leave = () => setActive(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', leave);
    };
  }, [angle]);

  useEffect(() => {
    const timer = window.setInterval(() => setAngle((v) => (v + 8) % 360), 160);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div ref={ringRef} className={`sx-cursor-ring ${active ? 'sx-cursor-active' : ''}`} aria-hidden="true" />
      <div ref={dotRef} className="sx-cursor-dot" aria-hidden="true" />
    </>
  );
}
