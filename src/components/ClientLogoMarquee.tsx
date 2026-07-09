"use client";

import React from "react";
import { motion } from "framer-motion";
import { clients } from "@/data/clients";

function ClientLogoTile({ client }: { client: string }) {
  return (
    <div className="client-marquee-tile group flex h-24 min-w-max items-center px-3 transition-all duration-500 hover:-translate-y-1 md:h-28 md:px-4">
      <span className="client-marquee-name whitespace-nowrap px-5 py-3 text-2xl font-bold transition-all duration-500 md:px-7 md:py-4 md:text-4xl">
        {client}
      </span>
    </div>
  );
}

function ClientLogoMarqueeRow({ row }: { row: string[] }) {
  return (
    <div className="flex overflow-hidden">
      {[...Array(2)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 items-center py-3"
        >
          {row.map((client) => (
            <ClientLogoTile key={`${client}-${index}`} client={client} />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export function ClientLogoMarqueeText() {
  return (
    <div className="container-custom relative z-10 mb-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-accent"
          >
            Client Spectrum
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl font-bold leading-tight tracking-tighter text-white md:text-6xl"
          >
            Brands We Have <span className="text-gradient">Served</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="max-w-md text-sm font-light leading-relaxed tracking-wide text-muted md:text-base"
        >
          A moving cross-section of automotive, technology, retail, entertainment, healthcare, and jewellery brands.
        </motion.p>
      </div>
    </div>
  );
}

export function ClientLogoRollingStrip() {
  return (
    <div className="client-marquee-stage relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-background to-transparent md:w-44" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-background to-transparent md:w-44" />
      <ClientLogoMarqueeRow row={clients} />
    </div>
  );
}

export default function ClientLogoMarquee() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="polka-section-accent right" />
      <div className="absolute left-8 top-16 hidden h-32 w-56 rotate-12 rounded-[2rem] opacity-50 md:block bg-[radial-gradient(circle,rgba(255,255,255,0.52)_1.5px,transparent_2.5px)] [background-size:15px_15px] [mask-image:linear-gradient(135deg,#000,transparent_78%)]" />
      <div className="absolute bottom-16 right-12 hidden h-40 w-64 -rotate-12 rounded-[2rem] opacity-60 md:block bg-[radial-gradient(circle,rgba(255,255,255,0.36)_1.6px,transparent_2.7px)] [background-size:42px_42px] [mask-image:linear-gradient(315deg,#000,transparent_76%)]" />

      <ClientLogoMarqueeText />
      <ClientLogoRollingStrip />
    </section>
  );
}
