"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = ["All", "Events", "Branding", "Fabrication", "Promotions", "Outdoor"];

interface ServicesProps {
  limit?: number;
  showFilters?: boolean;
}

export default function Services({ limit, showFilters = true }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = services
    .filter((service) => activeCategory === "All" || service.category === activeCategory)
    .slice(0, limit);

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="polka-section-accent" />
      
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
            >
              Our Capabilities
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold leading-[1.1]"
            >
              Tailored Solutions for <br /> <span className="text-gradient">Impactful Brands</span>
            </motion.h2>
          </div>
          
          {showFilters && (
            <div className="flex flex-wrap gap-3">
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-8 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-500 border",
                    activeCategory === cat
                      ? "bg-white text-black border-white shadow-xl shadow-white/10"
                      : "bg-transparent text-muted border-white/[0.05] hover:border-white/20"
                  )}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="glass-card p-10 group hover:bg-white/[0.04] transition-all duration-500 flex flex-col items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-accent mb-10 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                
                <div className="mb-auto">
                  <div className="text-[10px] font-bold text-accent/40 uppercase tracking-[0.2em] mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-5 tracking-tight group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted leading-relaxed font-light tracking-wide text-sm md:text-base">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-10 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {limit && (
          <div className="mt-20 text-center">
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 mx-auto px-10 py-5 border border-white/[0.08] rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500"
              >
                View All Services
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
