"use client";

import React from "react";
import { motion } from "framer-motion";

const items = [
  "Retail Branding",
  "Event Production",
  "Exhibition Stalls",
  "Mall Activations",
  "Roadshows",
  "LED Van Campaigns",
  "Product Launches",
  "Creative Designing",
  "Hoardings",
  "Store Interiors",
];

export default function Marquee() {
  return (
    <section className="py-20 bg-muted-dark overflow-hidden whitespace-nowrap border-y border-white/5">
      <div className="flex">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center"
          >
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center mx-12">
                <span className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter text-white/20 hover:text-white transition-colors cursor-default">
                  {item}
                </span>
                <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent ml-12" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
