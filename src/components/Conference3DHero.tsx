"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";

const Conference3DScene = dynamic(() => import("./Conference3DScene"), {
  ssr: false,
  loading: () => <ConferenceSceneFallback />,
});

export default function Conference3DHero() {
  return (
    <section className="relative overflow-hidden py-20 text-white md:py-28">
      <div className="polka-section-accent right" />
      <div className="container-custom relative z-10">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-5 w-fit rounded-full border border-white/[0.08] bg-white/[0.025] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent backdrop-blur-md"
            >
              3D Event Showcase
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="max-w-3xl font-display text-4xl font-bold tracking-tighter md:text-6xl"
            >
              Conference energy, <span className="text-gradient">staged in 3D</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted md:text-base lg:justify-self-end"
          >
            A coded cinematic hotel conference room with premium lighting, reflective floors, blue banquet seating, stage branding, and a looping camera move.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[520px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.018] shadow-2xl shadow-black/30 backdrop-blur-sm md:h-[680px]"
        >
          <Suspense fallback={<ConferenceSceneFallback />}>
            <Conference3DScene />
          </Suspense>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.42)_100%)]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-black/25 px-5 py-4 text-xs text-white/70 backdrop-blur-md md:left-auto md:w-[310px]">
            <span className="font-bold uppercase tracking-[0.22em] text-white/45">Interactive Scene</span>
            <span>Drag to explore the room. The camera loops through a cinematic event-promo path.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ConferenceSceneFallback() {
  return (
    <div className="flex h-full min-h-[420px] w-full items-center justify-center bg-white/[0.015]">
      <div className="h-10 w-10 animate-pulse rounded-full border border-white/15 bg-white/[0.04] shadow-[0_0_40px_rgba(255,255,255,0.12)]" />
    </div>
  );
}
