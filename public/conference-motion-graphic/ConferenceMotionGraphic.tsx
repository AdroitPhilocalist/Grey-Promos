"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * ConferenceMotionGraphic
 * A coded, cartoon/corporate motion-graphic version of a conference-room video.
 * Built for Next.js + Tailwind + GSAP. No MP4 required.
 *
 * Install: npm install gsap
 * Usage: <ConferenceMotionGraphic />
 */
export default function ConferenceMotionGraphic() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".scene-frame", { opacity: 0, scale: 1.08, duration: 1.1 })
        .from(".ceiling-glow", { opacity: 0, scaleX: 0.6, duration: 0.8 }, "-=0.6")
        .from(".wall-panel", { opacity: 0, y: -20, stagger: 0.08, duration: 0.7 }, "-=0.5")
        .from(".backdrop", { opacity: 0, y: 35, scale: 0.96, duration: 0.9 }, "-=0.45")
        .from(".table", { opacity: 0, y: 60, scale: 0.86, stagger: 0.12, duration: 0.8 }, "-=0.35")
        .from(".chair", { opacity: 0, y: 35, scale: 0.85, stagger: 0.025, duration: 0.55 }, "-=0.55")
        .from(".table-item", { opacity: 0, y: -10, stagger: 0.03, duration: 0.45 }, "-=0.45")
        .from(".phone-card", { opacity: 0, y: 25, rotate: -3, stagger: 0.12, duration: 0.8 }, "-=0.3")
        .from(".headline", { opacity: 0, y: 25, duration: 0.7 }, "-=0.25")
        .from(".subline", { opacity: 0, y: 16, duration: 0.6 }, "-=0.3")
        .from(".cta-pill", { opacity: 0, y: 18, scale: 0.9, duration: 0.6 }, "-=0.2");

      gsap.to(".camera-layer", {
        scale: 1.06,
        x: -18,
        y: 8,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".foreground-layer", {
        x: 28,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".spotlight", {
        opacity: 0.45,
        scale: 1.08,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
        ease: "sine.inOut",
      });

      gsap.to(".floating-dot", {
        y: -16,
        opacity: 0.25,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.22,
        ease: "sine.inOut",
      });

      gsap.to(".screen-shine", {
        x: 170,
        duration: 2.8,
        repeat: -1,
        repeatDelay: 1.2,
        ease: "power2.inOut",
      });

      gsap.to(".water-bottle", {
        y: -3,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d3b70_0%,#07111f_48%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.12)_45%,transparent_60%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-16 lg:px-8">
        <div className="mb-8 text-center">
          <div className="cta-pill mx-auto mb-4 w-fit rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-white/80 backdrop-blur-md">
            Corporate Event Experience
          </div>
          <h1 className="headline text-4xl font-bold tracking-tight md:text-6xl">
            Premium Conference Showcase
          </h1>
          <p className="subline mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            A coded motion-graphic version of your meeting event, made without using the original video file.
          </p>
        </div>

        <div className="scene-frame relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1525] shadow-2xl shadow-black/50">
          <svg viewBox="0 0 1400 800" className="h-full w-full" role="img" aria-label="Animated conference room illustration">
            <defs>
              <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f6e8c7" />
                <stop offset="100%" stopColor="#d8bd82" />
              </linearGradient>
              <linearGradient id="blueCloth" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1c6ef2" />
                <stop offset="100%" stopColor="#06338c" />
              </linearGradient>
              <radialGradient id="tableTop" cx="50%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#2f8cff" />
                <stop offset="100%" stopColor="#043388" />
              </radialGradient>
              <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000" floodOpacity="0.35" />
              </filter>
              <filter id="glow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g className="camera-layer">
              <rect width="1400" height="800" fill="#182133" />

              {/* Ceiling */}
              <polygon points="0,0 1400,0 1120,210 280,210" fill="#f4efe4" />
              <rect className="ceiling-glow" x="420" y="38" width="560" height="70" rx="14" fill="#f2c94c" opacity="0.9" filter="url(#glow)" />
              <rect x="505" y="42" width="390" height="48" rx="8" fill="#5b341b" opacity="0.75" />
              <path d="M520 64 C560 35, 605 95, 650 60 S730 35,780 66 S850 92,885 54" fill="none" stroke="#ffd27a" strokeWidth="9" opacity="0.75" />

              {/* Walls */}
              <polygon className="wall-panel" points="0,150 280,210 285,560 0,720" fill="#5a473d" />
              <polygon className="wall-panel" points="1400,150 1120,210 1115,560 1400,720" fill="#604c3d" />
              <rect className="wall-panel" x="280" y="210" width="840" height="350" fill="#f2eadc" />
              <rect x="270" y="198" width="860" height="22" fill="#30343b" />
              <g opacity="0.25">
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={i} x1={40 + i * 78} y1="185" x2={10 + i * 72} y2="680" stroke="#fff" strokeWidth="1" />
                ))}
              </g>
              <g opacity="0.3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <path key={i} d={`M${1140 + i * 24} 230 l38 40 l-38 40 l-38 -40z`} fill="#d7c8b0" />
                ))}
              </g>

              {/* Floor */}
              <polygon points="285,560 1115,560 1400,800 0,800" fill="url(#floor)" />
              <g opacity="0.25">
                <line x1="700" y1="560" x2="700" y2="800" stroke="#8a6d3d" />
                <line x1="470" y1="610" x2="250" y2="800" stroke="#8a6d3d" />
                <line x1="930" y1="610" x2="1150" y2="800" stroke="#8a6d3d" />
              </g>

              {/* Lights */}
              <ellipse className="spotlight" cx="340" cy="250" rx="90" ry="180" fill="#fff1bd" opacity="0.22" />
              <ellipse className="spotlight" cx="1060" cy="250" rx="90" ry="180" fill="#fff1bd" opacity="0.22" />
              <ellipse className="spotlight" cx="700" cy="270" rx="130" ry="190" fill="#fff1bd" opacity="0.18" />

              {/* Backdrop */}
              <g className="backdrop" filter="url(#softShadow)">
                <rect x="520" y="245" width="360" height="230" rx="10" fill="#fff5df" />
                <text x="700" y="295" textAnchor="middle" fill="#111827" fontSize="22" fontWeight="700">BRAND EVENT</text>
                <text x="700" y="324" textAnchor="middle" fill="#64748b" fontSize="14">Product Launch • Conference • Meet-up</text>
                <g className="phone-card">
                  <rect x="635" y="350" width="70" height="115" rx="12" fill="#111827" />
                  <rect x="642" y="358" width="56" height="100" rx="9" fill="#1d4ed8" />
                  <circle cx="690" cy="365" r="4" fill="#020617" />
                </g>
                <g className="phone-card">
                  <rect x="700" y="330" width="80" height="135" rx="14" fill="#0f172a" />
                  <rect x="708" y="339" width="64" height="118" rx="10" fill="#9333ea" />
                  <path className="screen-shine" d="M650 320 L700 320 L760 485 L710 485 Z" fill="white" opacity="0.22" />
                </g>
              </g>

              {/* Mid tables */}
              <Table cx={700} cy={555} s={0.75} />
              <Table cx={435} cy={590} s={0.68} />
              <Table cx={965} cy={590} s={0.68} />

              {/* Foreground tables */}
              <g className="foreground-layer">
                <Table cx={290} cy={700} s={1.05} />
                <Table cx={1110} cy={700} s={1.05} />
              </g>

              {/* Ambient floating details */}
              <circle className="floating-dot" cx="235" cy="180" r="4" fill="#ffffff" opacity="0.1" />
              <circle className="floating-dot" cx="960" cy="135" r="5" fill="#ffffff" opacity="0.1" />
              <circle className="floating-dot" cx="1210" cy="350" r="3" fill="#ffffff" opacity="0.1" />
              <circle className="floating-dot" cx="520" cy="175" r="3" fill="#ffffff" opacity="0.1" />
            </g>
          </svg>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent_20%,transparent_80%,rgba(255,255,255,0.06))]" />
        </div>
      </div>
    </section>
  );
}

function Chair({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g className="chair" transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-22" y="-52" width="44" height="70" rx="18" fill="#063aad" />
      <rect x="-25" y="0" width="50" height="50" rx="10" fill="#0755d8" />
      <path d="M-22 -32 C-8 -45 8 -45 22 -32" fill="none" stroke="#4aa3ff" strokeWidth="3" opacity="0.4" />
    </g>
  );
}

function Bottle({ x, y }: { x: number; y: number }) {
  return (
    <g className="water-bottle table-item" transform={`translate(${x} ${y})`}>
      <rect x="-5" y="-20" width="10" height="28" rx="4" fill="#dbeafe" opacity="0.9" />
      <rect x="-3" y="-25" width="6" height="7" rx="2" fill="#60a5fa" />
      <rect x="-5" y="-7" width="10" height="4" fill="#3b82f6" opacity="0.65" />
    </g>
  );
}

function Paper({ x, y, r = 0 }: { x: number; y: number; r?: number }) {
  return (
    <rect className="table-item" x={x} y={y} width="38" height="24" rx="3" fill="#f8fafc" transform={`rotate(${r} ${x + 19} ${y + 12})`} />
  );
}

function Table({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  return (
    <g className="table" transform={`translate(${cx} ${cy}) scale(${s})`} filter="url(#softShadow)">
      <Chair x={-95} y={-5} s={0.82} />
      <Chair x={95} y={-5} s={0.82} />
      <Chair x={-70} y={70} s={0.9} />
      <Chair x={70} y={70} s={0.9} />
      <Chair x={0} y={92} s={0.96} />

      <ellipse cx="0" cy="0" rx="118" ry="58" fill="url(#tableTop)" />
      <path d="M-118 0 C-110 82 110 82 118 0 L118 62 C110 132 -110 132 -118 62 Z" fill="url(#blueCloth)" />
      <ellipse cx="0" cy="0" rx="118" ry="58" fill="none" stroke="#76b7ff" strokeWidth="2" opacity="0.35" />

      <Bottle x={-45} y={-12} />
      <Bottle x={42} y={-8} />
      <Paper x={-80} y={10} r={-8} />
      <Paper x={45} y={14} r={11} />
      <ellipse className="table-item" cx="0" cy="18" rx="15" ry="8" fill="#e5e7eb" />
      <circle className="table-item" cx="5" cy="15" r="4" fill="#22c55e" />
    </g>
  );
}
