"use client";

import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] -left-[10%] w-[60%] h-[60%] bg-accent/[0.03] rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-blue-500/[0.02] rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Pioneering Brand Experiences
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-9xl lg:text-[11rem] font-display font-bold leading-[0.85] mb-16 tracking-tight"
          >
            Brand <br />
            <span className="text-gradient">Experiences</span> <br />
            <span className="text-accent">That Move</span>
          </motion.h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted leading-relaxed max-w-lg font-light tracking-wide"
            >
              Grey Promos India Pvt. Ltd. creates extraordinary brand experiences through events, retail branding, exhibitions, and on-ground activations.
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center">
              <MagneticButton>
                <a 
                  href="#work" 
                  className="group flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
                >
                  Explore Work
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
