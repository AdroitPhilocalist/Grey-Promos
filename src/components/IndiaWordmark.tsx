import { cn } from "@/lib/utils";

// Grey shades that echo the brand name "GREY PROMOS" — a light-to-dark
// gradient so the INDIA wordmark reads as a single grey wordmark.
const GREY_SHADES = [
  "text-[#EDEDED]", // I
  "text-[#C9C9C9]", // N
  "text-[#9B9B9B]", // D
  "text-[#777777]", // I
  "text-[#5A5A5A]", // A
];

/**
 * The "D" in the INDIA wordmark, kept in a neutral grey to match the brand.
 */
export function GreyD({ className }: { className?: string }) {
  return <span className={cn("text-[#9B9B9B]", className)}>D</span>;
}

/**
 * The INDIA portion of the wordmark rendered in a grey gradient
 * (light → dark), replacing the earlier flag-coloured treatment.
 */
export function IndiaWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex", className)}>
      {["I", "N", "D", "I", "A"].map((char, i) => (
        <span key={i} className={GREY_SHADES[i]}>
          {char}
        </span>
      ))}
    </span>
  );
}
