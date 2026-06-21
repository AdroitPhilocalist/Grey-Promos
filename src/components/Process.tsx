"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Hammer, Lightbulb, Pencil } from "lucide-react";

const steps = [
  {
    number: "01",
    label: "The Brief",
    title: "Design the direction.",
    text: "We turn the opportunity into a clear creative route, with a campaign idea that gives every next decision purpose.",
    handoff: "Concept to strategy",
    icon: Pencil,
    accent: "#ff6a3d",
  },
  {
    number: "02",
    label: "The Blueprint",
    title: "Plan every move.",
    text: "Timelines, teams, permissions, material, and logistics are aligned before the work reaches the ground.",
    handoff: "Strategy to structure",
    icon: Lightbulb,
    accent: "#f1b34b",
  },
  {
    number: "03",
    label: "The Build",
    title: "Make it tangible.",
    text: "Ideas become objects, spaces, screens, and campaign assets through precise fabrication and production.",
    handoff: "Structure to reality",
    icon: Hammer,
    accent: "#54c2bc",
  },
  {
    number: "04",
    label: "The Moment",
    title: "Bring it to life.",
    text: "The final experience is installed, supervised, and delivered with the discipline a live brand moment demands.",
    handoff: "Reality to impact",
    icon: CheckCircle2,
    accent: "#8098ff",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      <div className="polka-section-accent" />

      <div className="container-custom relative">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              How the work moves
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="max-w-4xl text-5xl font-display font-bold leading-[0.96] tracking-tight md:text-7xl">
              From Vision to <span className="text-gradient">Flawless Execution</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="max-w-xl text-base font-light leading-relaxed tracking-wide text-muted md:justify-self-end md:text-lg">
            Not a handoff between departments. One connected Grey Promos workflow, carried from the first brief to the live brand moment.
          </motion.p>
        </div>

        <div className="relative mt-16 border-y border-white/[0.08] py-2 md:mt-20 md:py-0">
          <div className="process-flow-track" aria-hidden="true"><span className="process-flow-beam" /></div>

          <div className="relative grid md:grid-cols-4 md:gap-7 lg:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative min-h-[220px] border-b border-white/[0.08] py-8 pl-[4.5rem] last:border-b-0 md:min-h-[390px] md:border-b-0 md:pb-8 md:pl-0 md:pt-20"
                >
                  <div className="absolute left-0 top-8 grid h-10 w-10 place-items-center rounded-full border border-white/[0.16] bg-[var(--background)] transition-all duration-500 md:top-0" style={{ color: step.accent, boxShadow: `0 0 0 5px var(--background), 0 0 24px ${step.accent}22` }}>
                    <Icon size={18} strokeWidth={1.7} />
                  </div>

                  <div className="absolute -right-2 top-5 font-display text-7xl font-bold leading-none opacity-[0.06] md:right-0 md:top-16 md:text-8xl" style={{ color: step.accent }}>
                    {step.number}
                  </div>

                  <div className="relative">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: step.accent }}>{step.label}</p>
                    <h3 className="mt-3 max-w-[13rem] text-3xl font-display font-bold leading-[1.02] tracking-tight text-white md:text-4xl">{step.title}</h3>
                    <p className="mt-5 max-w-[16rem] text-sm font-light leading-relaxed tracking-wide text-muted">{step.text}</p>
                  </div>

                  <div className="relative mt-6 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/42 md:absolute md:bottom-8 md:left-0">
                    <span className="h-px w-6" style={{ background: step.accent }} />
                    {step.handoff}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }} className="mt-5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-muted/70">
          <span>One continuous process</span>
          <span className="text-white/40">One accountable partner</span>
        </motion.div>
      </div>
    </section>
  );
}
