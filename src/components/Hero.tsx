"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const proofPoints = ["Since 2015", "360° Promotions", "Events + Branding", "Tech-Led Campaigns"];

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-0 pt-32 pb-20 md:pt-36 md:pb-24 lg:pt-28 lg:pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 polka-hero-field pointer-events-none" />
        <div className="polka-section-accent right" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl"
        >
          {/* <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent mb-7 md:mb-9">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Grey Promos India Pvt. Ltd. / Est. 2015
          </motion.div> */}

          <motion.h1 
            variants={itemVariants}
            className="text-[clamp(2.85rem,8.2vw,7.4rem)] font-display font-bold leading-[0.9] mb-11 md:mb-14 tracking-tight"
          >
            <span className="hero-glint-line" data-text="Turning Ideas">Turning Ideas</span> <br />
            <span className="hero-glint-line text-gradient" data-text="Into Experiences">Into Experiences</span> <br />
            <span className="hero-glint-line inline-block text-[0.82em] text-accent md:whitespace-nowrap" data-text="Brands Into Movements">Brands Into Movements</span>
          </motion.h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 lg:gap-12">
            <div className="max-w-3xl">
              <motion.p 
                variants={itemVariants}
                className="text-base md:text-xl lg:text-[1.35rem] text-white/78 leading-relaxed font-light tracking-wide"
              >
                For over a decade, Grey Promos has turned campaigns, events, retail branding, outdoor activations, digital media, and technology-led ideas into seamless real-world brand experiences.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-6 flex flex-wrap gap-2.5 md:gap-3"
              >
                {proofPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.16em] text-white/65 backdrop-blur-sm"
                  >
                    {point}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="flex items-center">
              <MagneticButton>
                <Link 
                  href="/work" 
                  className="group flex items-center gap-3 bg-white text-black px-8 py-4 md:px-10 md:py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
                >
                  Explore Work
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
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
        className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
        <div className="w-[1px] h-8 md:h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
