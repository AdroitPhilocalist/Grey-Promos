"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    { label: "Founded in", value: "2015" },
    { label: "Network", value: "PAN INDIA" },
    { label: "Expertise", value: "10+ YEARS" },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
            >
              Who We Are
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-10 tracking-tight">
              Built for Brands That Need <br /> <span className="text-gradient">Real-World Impact</span>
            </h2>
            <div className="space-y-8 max-w-xl">
              <p className="text-lg md:text-xl text-muted leading-relaxed font-light tracking-wide">
                Grey Promos India Pvt. Ltd. is a marketing and brand activation agency delivering creative, professional, and execution-ready solutions since 2015. 
              </p>
              <p className="text-lg md:text-xl text-muted leading-relaxed font-light tracking-wide">
                From corporate events and retail branding to exhibition stalls, we transform ideas into memorable customer experiences that drive tangible results.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="glass-card p-10 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left group hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="flex flex-col">
                  <span className="text-5xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold">
                    {stat.label}
                  </span>
                </div>
                <div className="hidden lg:block w-12 h-[1px] bg-white/10 group-hover:bg-accent/40 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
