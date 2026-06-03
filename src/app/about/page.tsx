"use client";

import React from "react";
import PageHero from "@/components/PageHero";
import AboutStory from "@/components/AboutStory";
import TeamHierarchy from "@/components/TeamHierarchy";
import { GridGlobe } from "@/components/ui/GridGlobe";
import ContactCTA from "@/components/ContactCTA";
import { motion } from "framer-motion";
import { operations } from "@/data/operations";
import { Globe, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHero 
        badge="Our Legacy"
        title="Extraordinary Origins"
        subtitle="Exploring the passion, the experts, and the national reach that define Grey Promos India Pvt. Ltd."
      />
      
      {/* The Company Story - Horizontal Path */}
      <AboutStory />

      {/* The Expert Collective - Visual Hierarchy */}
      <TeamHierarchy />

      {/* The National & Global Reach - Combined Cards & 3D Globe */}
      <section className="section-padding overflow-hidden relative">
        <div className="polka-section-accent right" />
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
            >
              Scale Without Borders
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter"
            >
              Our Global <br /> <span className="text-gradient">Infrastructure</span>
            </motion.h2>
          </div>

          {/* Restored Hub Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-32">
            {/* India Operations */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 lg:p-16 group hover:bg-white/[0.03] transition-all duration-500"
            >
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <MapPin size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">India Network</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {operations.india.map((region) => (
                  <div key={region.region}>
                    <h4 className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border-b border-white/[0.05] pb-3 text-white">
                      {region.region} Zone
                    </h4>
                    <ul className="space-y-3">
                      {region.locations.map((loc) => (
                        <li key={loc} className="text-muted font-light tracking-wide text-sm md:text-base hover:text-white transition-colors">
                          {loc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* International Operations */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 lg:p-16 group hover:bg-white/[0.03] transition-all duration-500"
            >
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                  <Globe size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">International</h3>
              </div>
              
              <div className="space-y-10">
                {operations.international.map((country) => (
                  <div key={country.country} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/[0.05] pb-6 last:border-0">
                    <h4 className="text-xl md:text-2xl font-display font-bold tracking-tight text-white">{country.country}</h4>
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
                <div className="absolute right-0 top-0 h-28 w-28 opacity-35 bg-[radial-gradient(circle,rgba(255,74,28,0.42)_1px,transparent_1.8px)] [background-size:16px_16px] [mask-image:linear-gradient(135deg,rgba(0,0,0,0.9),transparent_70%)]" />
                <p className="text-accent text-sm md:text-base font-light italic leading-relaxed relative z-10">
                  "Our global infrastructure ensures that your brand maintains quality and consistency, no matter where the activation happens."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Enhanced 3D Globe Visualization */}
          <div className="w-full h-[520px] sm:h-[600px] md:h-[720px] rounded-[2rem] bg-[#020817] relative overflow-hidden border border-white/[0.06] shadow-2xl shadow-sky-950/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(14,165,233,0.2),transparent_44%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.06] to-transparent" />
            <div className="absolute top-8 left-8 right-8 z-20 md:top-12 md:left-12 md:right-auto">
              <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold block mb-2">Interactive Explorer</span>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tighter">Presence <span className="text-gradient">Visualized</span></h3>
            </div>
            <GridGlobe />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
