"use client";

import React from "react";
import { motion } from "framer-motion";
import { clients } from "@/data/clients";

export default function Clients() {
  return (
    <section id="clients" className="section-padding relative overflow-hidden">
      <div className="container-custom text-center mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
        >
          Our Partnership Network
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight"
        >
          Trusted by <br /> <span className="text-gradient">Industry Leaders</span>
        </motion.h2>
      </div>

      <div className="flex overflow-hidden group mb-32">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex items-center"
          >
            {clients.map((client) => (
              <div 
                key={client} 
                className="mx-16 text-2xl md:text-5xl font-display font-bold text-white/[0.08] hover:text-accent transition-all duration-500 cursor-default whitespace-nowrap uppercase tracking-tighter"
              >
                {client}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 lg:gap-20">
          {clients.slice(0, 12).map((client, idx) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700 opacity-20 hover:opacity-100"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-center text-white/60">{client}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
