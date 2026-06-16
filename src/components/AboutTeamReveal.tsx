"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Sparkles, UsersRound } from "lucide-react";
import TeamHierarchy from "./TeamHierarchy";

export default function AboutTeamReveal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="polka-section-accent right" />
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.025] px-6 py-8 backdrop-blur-xl md:px-10 md:py-10 lg:px-14"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_12%_86%,rgba(255,74,28,0.08),transparent_32%)]" />
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.26em] text-accent">
                <Sparkles size={13} strokeWidth={1.8} />
                The People Behind the Work
              </div>
              <h2 className="text-3xl font-display font-bold leading-tight tracking-tight text-white md:text-5xl">
                Meet the crew behind the beautiful chaos.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-light leading-relaxed tracking-wide text-muted md:text-lg">
                A playful portrait gallery of the people who keep designs, reports, deals, and on-ground execution moving with precision, pressure, and personality.
              </p>
            </div>

            <motion.button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-expanded={isOpen}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-2xl shadow-white/10 transition-colors hover:bg-accent hover:text-white md:w-auto"
            >
              <UsersRound size={18} strokeWidth={1.8} />
              {isOpen ? "Hide Team" : "View Team"}
              <ChevronDown
                size={18}
                strokeWidth={1.8}
                className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <TeamHierarchy />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
