"use client";

import React from "react";
import { motion } from "framer-motion";

const roles = [
  {
    title: "Creative Strategy",
    description: "Conceptualizing unique brand experiences that resonate with target audiences."
  },
  {
    title: "Production & Fabrication",
    description: "Turning designs into physical reality with precision and quality materials."
  },
  {
    title: "On-Ground Execution",
    description: "Managing logistics, manpower, and real-time operations for flawless delivery."
  },
  {
    title: "Client Servicing",
    description: "Ensuring seamless communication and successful project outcomes for our partners."
  }
];

export default function Team() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container-custom">
        <div className="max-w-3xl mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
          >
            The Human Element
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-10 leading-[1.1] tracking-tight"
          >
            The Experts Behind <br /> <span className="text-gradient">the Execution</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg md:text-xl font-light tracking-wide leading-relaxed"
          >
            A dedicated collective of creative thinkers and specialists working in synergy to turn ideas into exceptional brand experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group pt-10 border-t border-white/[0.08] hover:border-accent transition-all duration-500"
            >
              <div className="text-[10px] font-bold text-accent/40 uppercase tracking-[0.2em] mb-6">
                Expertise 0{idx + 1}
              </div>
              <h3 className="text-2xl font-display font-bold mb-6 tracking-tight group-hover:text-accent transition-colors duration-300">
                {role.title}
              </h3>
              <p className="text-muted text-sm md:text-base font-light tracking-wide leading-relaxed">
                {role.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
