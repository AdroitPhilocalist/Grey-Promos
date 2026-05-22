"use client";

import React from "react";
import { motion } from "framer-motion";
import { operations } from "@/data/operations";
import { Globe, MapPin } from "lucide-react";

export default function Operations() {
  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
          >
            Regional & Global Reach
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight"
          >
            Scale Your Brand <br /> <span className="text-gradient">Without Borders</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg md:text-xl font-light tracking-wide leading-relaxed"
          >
            From local activations to large-format brand rollouts, we support campaigns across India and key international markets.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* India Operations */}
          <div className="glass-card p-12 lg:p-16 group hover:bg-white/[0.03] transition-all duration-500">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                <MapPin size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight">India Network</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {operations.india.map((region) => (
                <div key={region.region}>
                  <h4 className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border-b border-white/[0.05] pb-3">
                    {region.region} Zone
                  </h4>
                  <ul className="space-y-3">
                    {region.locations.map((loc) => (
                      <li key={loc} className="text-white/80 font-light tracking-wide text-sm md:text-base hover:text-white transition-colors">
                        {loc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* International Operations */}
          <div className="glass-card p-12 lg:p-16 group hover:bg-white/[0.03] transition-all duration-500">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                <Globe size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight">International</h3>
            </div>
            
            <div className="space-y-10">
              {operations.international.map((country) => (
                <div key={country.country} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/[0.05] pb-6 last:border-0">
                  <h4 className="text-xl md:text-2xl font-display font-bold tracking-tight">{country.country}</h4>
                  <div className="flex flex-wrap gap-3">
                    {country.locations.map((loc) => (
                      <span key={loc} className="px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-bold uppercase tracking-wider text-muted/80">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-[2rem] bg-accent/[0.03] border border-accent/[0.08] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/[0.05] blur-[40px] rounded-full" />
              <p className="text-accent text-sm md:text-base font-light italic leading-relaxed relative z-10">
                "Our global infrastructure ensures that your brand maintains quality and consistency, no matter where the activation happens."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
