"use client";

import { motion } from "framer-motion";

const stableNumber = (value: number) => Number(value.toFixed(4));

const DOTS = Array.from({ length: 176 }, (_, index) => {
  const col = index % 16;
  const row = Math.floor(index / 16);
  const centerPull = Math.hypot(col - 8, row - 5.2);
  const ribbon = Math.sin(col * 0.72 + row * 0.48);
  const x = 36 + col * 30 + Math.sin(row * 0.86) * 18 + ribbon * 5;
  const y = 52 + row * 34 + Math.sin(col * 0.58) * 20;
  const isAccent = [22, 39, 55, 72, 88, 103, 120, 137, 151].includes(index);
  const isCool = [18, 47, 65, 94, 116, 145, 160].includes(index);

  return {
    index,
    x: stableNumber(x),
    y: stableNumber(y),
    radius: stableNumber(isAccent ? 5.8 : Math.max(1.6, 4.8 - centerPull * 0.32 + ribbon * 0.9)),
    opacity: stableNumber(isAccent ? 0.95 : Math.max(0.18, 0.62 - centerPull * 0.055)),
    delay: stableNumber((col * 0.075 + row * 0.11) % 1.8),
    isAccent,
    isCool,
  };
});

const ACCENT_NODES = DOTS.filter((dot) => dot.isAccent || dot.isCool).slice(0, 12);

export default function PolkaKineticArt({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`polka-art ${compact ? "polka-art-compact" : ""}`} aria-hidden="true">
      <motion.svg
        viewBox="0 0 520 520"
        fill="none"
        className="polka-art-svg"
        initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <radialGradient id="polkaHalo" cx="50%" cy="50%" r="52%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="54%" stopColor="#ff4a1c" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#030303" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="polkaRibbon" x1="38" y1="420" x2="490" y2="84">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0" />
            <stop offset="28%" stopColor="#7dd3fc" stopOpacity="0.58" />
            <stop offset="58%" stopColor="#ff4a1c" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
          <filter id="polkaGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="268" cy="258" r="232" fill="url(#polkaHalo)" />
        <motion.path
          d="M34 395C112 304 172 456 244 338C313 223 371 303 492 82"
          stroke="url(#polkaRibbon)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="4 14"
          animate={{ strokeDashoffset: [0, -180] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M70 138C158 98 198 211 278 172C360 132 387 66 482 126"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
          strokeDasharray="2 12"
          animate={{ strokeDashoffset: [0, 140] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        <g filter="url(#polkaGlow)">
          {DOTS.map((dot) => (
            <motion.circle
              key={dot.index}
              cx={dot.x}
              cy={dot.y}
              r={dot.radius}
              fill={dot.isAccent ? "#ff4a1c" : dot.isCool ? "#7dd3fc" : "#ffffff"}
              opacity={dot.opacity}
              animate={{
                opacity: dot.isAccent
                  ? [0.72, 1, 0.72]
                  : [stableNumber(dot.opacity * 0.66), dot.opacity, stableNumber(dot.opacity * 0.66)],
                r: dot.isAccent
                  ? [
                      stableNumber(dot.radius * 0.82),
                      stableNumber(dot.radius * 1.18),
                      stableNumber(dot.radius * 0.82),
                    ]
                  : [
                      stableNumber(dot.radius * 0.9),
                      stableNumber(dot.radius * 1.08),
                      stableNumber(dot.radius * 0.9),
                    ],
              }}
              transition={{
                duration: dot.isAccent ? 2.4 : 4.8,
                delay: dot.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        <g>
          {ACCENT_NODES.map((node, index) => (
            <motion.circle
              key={`ring-${node.index}`}
              cx={node.x}
              cy={node.y}
              r={10 + index * 0.5}
              stroke={node.isAccent ? "rgba(255,74,28,0.55)" : "rgba(125,211,252,0.5)"}
              strokeWidth="1"
              fill="transparent"
              animate={{ r: [8, 24, 8], opacity: [0.48, 0, 0.48] }}
              transition={{
                duration: 3.8,
                delay: index * 0.22,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </g>
      </motion.svg>
      <div className="polka-art-vignette" />
    </div>
  );
}
