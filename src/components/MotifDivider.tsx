interface Props {
  variant?: 'ink' | 'sandstone';
}

/**
 * A restrained motif element inspired by jaali lattice screens.
 * Used once per page at most, as a section transition rather than decoration.
 */
export default function MotifDivider({ variant = 'ink' }: Props) {
  const color = variant === 'ink' ? '#161A24' : '#F3ECDD';
  return (
    <div className="flex items-center justify-center py-6" aria-hidden="true">
      <svg width="120" height="16" viewBox="0 0 120 16" fill="none">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle key={i} cx={8 + i * 17.3} cy="8" r={i === 3 ? 3 : 1.6} fill={color} opacity={i === 3 ? 0.9 : 0.35} />
        ))}
      </svg>
    </div>
  );
}
