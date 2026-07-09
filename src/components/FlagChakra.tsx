export function FlagChakra({ className = "" }: { className?: string }) {
  const spokes = Array.from({ length: 24 });

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9.4" strokeWidth="1" />
      <circle cx="12" cy="12" r="2.4" strokeWidth="1" />
      {spokes.map((_, index) => (
        <line
          key={index}
          x1="12"
          y1="3.1"
          x2="12"
          y2="9.3"
          strokeWidth="0.55"
          transform={`rotate(${(index * 360) / 24} 12 12)`}
        />
      ))}
    </svg>
  );
}
