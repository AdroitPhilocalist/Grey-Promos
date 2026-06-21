"use client";

import React from "react";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "2015",
    title: "The Genesis",
    description: "Born with one belief: great ideas deserve flawless execution.",
  },
  {
    year: "2018",
    title: "Scaling Heights",
    description: "From regional rollouts to national campaigns, every touchpoint began to count.",
  },
  {
    year: "2021",
    title: "Physical Fusion",
    description: "We connected on-ground experiences with digital thinking to keep brands in motion.",
  },
  {
    year: "Today",
    title: "Innovation Leader",
    description: "A world-class agency partner for extraordinary brand experiences.",
  },
];

export default function AboutStory() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
      <div className="polka-section-accent" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="mb-5 text-accent text-[10px] uppercase tracking-[0.4em] font-bold">
            The Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-tight mb-6">
            A Legacy of <span className="text-gradient">Creation</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted text-sm md:text-base font-light tracking-wide leading-relaxed">
            Explore our evolution from a bold vision into an industry leader.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm" />

          <div className="relative grid gap-8 md:grid-cols-4 md:gap-5 lg:gap-7">
            {milestones.map((milestone, i) => {
              const isTop = i % 2 === 0;

              return (
                <motion.article
                  key={milestone.year}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="group relative min-h-[260px] md:min-h-[600px]"
                >
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/70 via-white/[0.14] to-blue-400/40 md:hidden" />

                  <div className="absolute left-4 top-6 z-20 h-8 w-8 -translate-x-1/2 rounded-full border border-accent/60 bg-[#070707] shadow-[0_0_24px_rgba(255,74,28,0.35)] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <div className="absolute inset-1 rounded-full border border-white/[0.08]" />
                    <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
                  </div>

                  <div
                    className={`relative ml-10 rounded-[1.4rem] border border-white/[0.08] bg-[#080808]/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/35 group-hover:bg-white/[0.035] md:absolute md:left-0 md:ml-0 md:w-full ${
                      isTop ? "md:bottom-[calc(50%+52px)]" : "md:top-[calc(50%+52px)]"
                    }`}
                  >
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.2] to-transparent" />
                    <span className="mb-4 block font-display text-4xl font-black tracking-tighter text-accent/20 transition-colors duration-500 group-hover:text-accent/35 lg:text-5xl">
                      {milestone.year}
                    </span>
                    <h3 className="mb-3 text-xl font-display font-bold tracking-tight text-white transition-colors duration-500 group-hover:text-accent">
                      {milestone.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed tracking-wide text-muted/75">
                      {milestone.description}
                    </p>
                  </div>

                  <div
                    className={`hidden md:block absolute left-1/2 h-12 w-px -translate-x-1/2 bg-gradient-to-b ${
                      isTop
                        ? "bottom-1/2 from-accent/60 to-transparent"
                        : "top-1/2 from-transparent to-accent/60"
                    }`}
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
