"use client";

import React from "react";
import { motion } from "framer-motion";
import { insights } from "@/data/insights";
import { ArrowRight } from "lucide-react";

export default function Insights() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
            >
              Industry Perspective
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight"
            >
              Insights from the <br /> <span className="text-gradient">Brand World</span>
            </motion.h2>
          </div>
          
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-all duration-500 border border-white/[0.08] px-8 py-4 rounded-full hover:border-accent"
          >
            Explore Articles
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {insights.map((article, idx) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-10 bg-surface border border-white/[0.05] group-hover:border-white/10 transition-all duration-700 shadow-2xl">
                {/* Placeholder gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-10 font-display font-bold text-3xl pointer-events-none group-hover:opacity-20 transition-opacity duration-700">
                  INSIGHT
                </div>
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em]">
                  {article.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-muted/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {article.date}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 group-hover:text-accent transition-colors duration-300 tracking-tight leading-snug">
                {article.title}
              </h3>
              
              <p className="text-muted/80 text-sm md:text-base font-light tracking-wide leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent/0 group-hover:text-accent transition-all duration-500">
                Read More <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
