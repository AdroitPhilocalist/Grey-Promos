"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ceilingLines = Array.from({ length: 11 }, (_, index) => index);
const lightNodes = [
  { x: 290, y: 170, delay: 0 },
  { x: 500, y: 138, delay: 0.16 },
  { x: 700, y: 126, delay: 0.32 },
  { x: 900, y: 138, delay: 0.48 },
  { x: 1110, y: 170, delay: 0.64 },
];
const sparkleDots = [
  { x: 205, y: 220, r: 2.6 },
  { x: 322, y: 142, r: 1.8 },
  { x: 1060, y: 230, r: 2.3 },
  { x: 1218, y: 352, r: 1.9 },
  { x: 490, y: 188, r: 1.7 },
  { x: 925, y: 176, r: 1.9 },
];

export default function ConferenceMotionGraphic() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".event-shell", { opacity: 0, y: 24, scale: 0.98, duration: 1 })
        .from(".kicker", { opacity: 0, y: 12, duration: 0.45 }, "-=0.5")
        .from(".headline", { opacity: 0, y: 24, duration: 0.7 }, "-=0.35")
        .from(".subline", { opacity: 0, y: 16, duration: 0.55 }, "-=0.42")
        .from(".scene-frame", { opacity: 0, y: 38, scale: 0.96, duration: 0.9 }, "-=0.25")
        .from(".ceiling-line", { opacity: 0, scaleX: 0, stagger: 0.035, duration: 0.55 }, "-=0.55")
        .from(".stage-wall", { opacity: 0, y: 24, scale: 0.95, duration: 0.75 }, "-=0.35")
        .from(".screen-ui", { opacity: 0, y: 16, stagger: 0.06, duration: 0.55 }, "-=0.35")
        .from(".desk", { opacity: 0, y: 34, scale: 0.92, stagger: 0.08, duration: 0.6 }, "-=0.35")
        .from(".audience", { opacity: 0, y: 24, scale: 0.9, stagger: 0.025, duration: 0.42 }, "-=0.38");

      gsap.to(".camera-layer", {
        scale: 1.045,
        x: -16,
        y: 7,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".foreground-layer", {
        x: 24,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".light-beam", {
        opacity: 0.72,
        scaleY: 1.08,
        transformOrigin: "50% 0%",
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: "sine.inOut",
      });

      gsap.to(".pulse-ring", {
        opacity: 0,
        scale: 1.7,
        transformOrigin: "50% 50%",
        duration: 2.2,
        repeat: -1,
        stagger: 0.4,
        ease: "power2.out",
      });

      gsap.to(".screen-sheen", {
        x: 220,
        duration: 3.2,
        repeat: -1,
        repeatDelay: 1.1,
        ease: "power2.inOut",
      });

      gsap.to(".sparkle", {
        y: -12,
        opacity: 0.8,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: "sine.inOut",
      });

      gsap.to(".table-detail", {
        y: -3,
        duration: 1.9,
        repeat: -1,
        yoyo: true,
        stagger: 0.14,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden py-20 text-white md:py-28">
      <div className="polka-section-accent right" />
      <div className="container-custom relative z-10">
        <div className="event-shell">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="kicker mb-5 w-fit rounded-full border border-white/[0.08] bg-white/[0.025] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent backdrop-blur-md">
                Motion Showcase
              </div>
              <h2 className="headline max-w-3xl font-display text-4xl font-bold tracking-tighter md:text-6xl">
                Conference energy, <span className="text-gradient">visualized</span>
              </h2>
            </div>
            <p className="subline max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted md:text-base lg:justify-self-end">
              A cinematic event-room animation built from SVG, lighting layers, and coded motion to reflect premium conference production.
            </p>
          </div>

          <div className="scene-frame relative w-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.018] shadow-2xl shadow-black/30 backdrop-blur-sm">
            <svg viewBox="0 0 1400 800" className="h-full w-full" role="img" aria-label="Animated premium conference room illustration">
              <defs>
                <linearGradient id="roomBg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#08101e" />
                  <stop offset="48%" stopColor="#111827" />
                  <stop offset="100%" stopColor="#030712" />
                </linearGradient>
                <radialGradient id="stageGlow" cx="50%" cy="40%" r="62%">
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.7" />
                  <stop offset="52%" stopColor="#0f172a" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="screenGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="38%" stopColor="#8fb7ff" />
                  <stop offset="68%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#111827" />
                </linearGradient>
                <linearGradient id="tableSurface" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#155dfc" />
                  <stop offset="55%" stopColor="#0b3a9e" />
                  <stop offset="100%" stopColor="#031844" />
                </linearGradient>
                <linearGradient id="floorGrid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#111827" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <filter id="premiumShadow" x="-40%" y="-40%" width="180%" height="180%">
                  <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000" floodOpacity="0.38" />
                </filter>
                <filter id="premiumGlow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="1400" height="800" fill="url(#roomBg)" />
              <rect width="1400" height="800" fill="url(#stageGlow)" opacity="0.72" />

              <g className="camera-layer">
                <polygon points="0,0 1400,0 1108,210 292,210" fill="#0f172a" />
                <polygon points="292,210 1108,210 1220,585 180,585" fill="#111827" opacity="0.95" />
                <polygon points="180,585 1220,585 1400,800 0,800" fill="url(#floorGrid)" />

                {ceilingLines.map((line) => (
                  <line
                    key={line}
                    className="ceiling-line"
                    x1={210 + line * 85}
                    y1="32"
                    x2={320 + line * 56}
                    y2="210"
                    stroke="#ffffff"
                    strokeOpacity="0.08"
                    strokeWidth="1"
                  />
                ))}

                <g opacity="0.65">
                  <line x1="180" y1="585" x2="0" y2="800" stroke="#60a5fa" strokeOpacity="0.14" />
                  <line x1="410" y1="585" x2="300" y2="800" stroke="#ffffff" strokeOpacity="0.08" />
                  <line x1="700" y1="585" x2="700" y2="800" stroke="#ffffff" strokeOpacity="0.08" />
                  <line x1="990" y1="585" x2="1100" y2="800" stroke="#ffffff" strokeOpacity="0.08" />
                  <line x1="1220" y1="585" x2="1400" y2="800" stroke="#60a5fa" strokeOpacity="0.14" />
                </g>

                {lightNodes.map((node) => (
                  <g key={`${node.x}-${node.y}`}>
                    <polygon
                      className="light-beam"
                      points={`${node.x - 62},190 ${node.x + 62},190 ${node.x + 130},612 ${node.x - 130},612`}
                      fill="#93c5fd"
                      opacity="0.16"
                    />
                    <ellipse cx={node.x} cy={node.y} rx="52" ry="11" fill="#e2e8f0" opacity="0.8" filter="url(#premiumGlow)" />
                    <circle className="pulse-ring" cx={node.x} cy={node.y} r="22" fill="none" stroke="#93c5fd" strokeOpacity="0.45" strokeWidth="2" />
                  </g>
                ))}

                <g className="stage-wall" filter="url(#premiumShadow)">
                  <rect x="392" y="246" width="616" height="246" rx="22" fill="#020617" stroke="#ffffff" strokeOpacity="0.12" />
                  <rect x="416" y="268" width="568" height="202" rx="16" fill="url(#screenGradient)" opacity="0.98" />
                  <path className="screen-sheen" d="M320 250 L390 250 L475 490 L405 490 Z" fill="#ffffff" opacity="0.22" />
                  <g className="screen-ui">
                    <text x="700" y="326" textAnchor="middle" fill="#ffffff" fontSize="42" fontWeight="800" letterSpacing="-1">
                      LIVE BRAND SUMMIT
                    </text>
                    <text x="700" y="362" textAnchor="middle" fill="#dbeafe" fontSize="18" fontWeight="600" letterSpacing="3">
                      STAGE • AUDIENCE • ACTIVATION
                    </text>
                    <rect x="566" y="394" width="268" height="10" rx="5" fill="#ffffff" opacity="0.28" />
                    <rect x="624" y="420" width="152" height="8" rx="4" fill="#ffffff" opacity="0.18" />
                  </g>
                </g>

                <rect x="438" y="500" width="524" height="18" rx="9" fill="#60a5fa" opacity="0.32" filter="url(#premiumGlow)" />

                <PremiumDesk cx={700} cy={610} s={0.82} />
                <PremiumDesk cx={420} cy={650} s={0.72} />
                <PremiumDesk cx={980} cy={650} s={0.72} />

                <g className="foreground-layer">
                  <PremiumDesk cx={230} cy={750} s={1.05} />
                  <PremiumDesk cx={1170} cy={750} s={1.05} />
                  <AudienceRow y={692} />
                  <AudienceRow y={735} offset={48} opacity={0.72} />
                </g>

                {sparkleDots.map((dot) => (
                  <circle key={`${dot.x}-${dot.y}`} className="sparkle" cx={dot.x} cy={dot.y} r={dot.r} fill="#ffffff" opacity="0.22" />
                ))}
              </g>
            </svg>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.62)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent_16%,transparent_84%,rgba(255,255,255,0.06))]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceRow({ y, offset = 0, opacity = 0.9 }: { y: number; offset?: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: 9 }).map((_, index) => {
        const x = 166 + offset + index * 136;
        return (
          <g key={`${x}-${y}`} className="audience" transform={`translate(${x} ${y})`}>
            <circle cx="0" cy="-22" r="17" fill="#0f172a" stroke="#93c5fd" strokeOpacity="0.18" />
            <path d="M-38 28 C-20 -18 20 -18 38 28 Z" fill="#111827" stroke="#ffffff" strokeOpacity="0.08" />
          </g>
        );
      })}
    </g>
  );
}

function PremiumDesk({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  return (
    <g className="desk" transform={`translate(${cx} ${cy}) scale(${s})`} filter="url(#premiumShadow)">
      <ellipse cx="0" cy="0" rx="112" ry="44" fill="url(#tableSurface)" />
      <path d="M-112 0 C-104 72 104 72 112 0 L112 50 C102 112 -102 112 -112 50 Z" fill="#061d5f" />
      <ellipse cx="0" cy="0" rx="112" ry="44" fill="none" stroke="#bfdbfe" strokeOpacity="0.28" strokeWidth="2" />
      <rect className="table-detail" x="-62" y="-16" width="38" height="24" rx="5" fill="#f8fafc" opacity="0.92" transform="rotate(-8 -43 -4)" />
      <rect className="table-detail" x="28" y="-12" width="42" height="24" rx="5" fill="#e0f2fe" opacity="0.86" transform="rotate(10 49 0)" />
      <rect className="table-detail" x="-7" y="-30" width="14" height="42" rx="6" fill="#dbeafe" opacity="0.9" />
      <rect className="table-detail" x="-5" y="-36" width="10" height="7" rx="3" fill="#38bdf8" />
      <circle className="table-detail" cx="42" cy="10" r="7" fill="#22c55e" opacity="0.82" />
    </g>
  );
}
