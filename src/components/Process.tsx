"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pencil, Lightbulb, Hammer, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Design",
    text: "We translate your vision into creative concepts, campaign ideas, layouts, branding directions, and visual experiences.",
    icon: Pencil,
  },
  {
    title: "Plan",
    text: "We map the strategy, logistics, manpower, materials, production timeline, and execution flow before work begins.",
    icon: Lightbulb,
  },
  {
    title: "Create",
    text: "We fabricate, print, build, produce, and prepare every brand asset with precision and attention to detail.",
    icon: Hammer,
  },
  {
    title: "Install",
    text: "We complete the journey with professional on-ground installation, activation, supervision, and final delivery.",
    icon: CheckCircle,
  },
];

export default function Process() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="polka-section-accent" />
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
          >
            The Methodology
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight"
          >
            From Vision to <br /> <span className="text-gradient">Flawless Execution</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg md:text-xl font-light tracking-wide leading-relaxed"
          >
            A seamless process designed for brands that demand creativity, speed, and precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-12 hover:bg-white/[0.03] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 text-7xl font-display font-black text-white/[0.02] group-hover:text-accent/[0.08] transition-all duration-700">
                0{idx + 1}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-accent mb-10 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500 shadow-xl">
                <step.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-5 tracking-tight group-hover:text-accent transition-colors duration-300">{step.title}</h3>
              <p className="text-muted text-sm md:text-base font-light tracking-wide leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
