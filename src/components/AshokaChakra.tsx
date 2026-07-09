import { cn } from "@/lib/utils";

// The Ashoka Chakra has 24 spokes, just like the wheel on the Indian flag.
const CHAKRA_SPOKES = Array.from({ length: 24 });

export function AshokaChakra({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Ashoka Chakra"
      className={className}
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4.5" />
      {CHAKRA_SPOKES.map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={50 + 9 * Math.cos(angle)}
            y1={50 + 9 * Math.sin(angle)}
            x2={50 + 46 * Math.cos(angle)}
            y2={50 + 46 * Math.sin(angle)}
            stroke="currentColor"
            strokeWidth="2.2"
          />
        );
      })}
      <circle cx="50" cy="50" r="7.5" fill="currentColor" />
    </svg>
  );
}

/**
 * The letter "D" from the INDIA wordmark, rendered white (matching the flag's
 * white band) with a navy-blue Ashoka Chakra nestled inside its counter — the
 * same blue wheel that sits in the white band of the Indian flag.
 *
 * The badge scales with the surrounding font size (em units) so it stays in
 * proportion everywhere the wordmark is used.
 */
export function ChakraD({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block text-white", className)}>
      D
      <span className="pointer-events-none absolute left-[55%] top-1/2 flex aspect-square h-[0.44em] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
        <AshokaChakra className="h-[84%] w-[84%] text-[#000080]" />
      </span>
    </span>
  );
}
