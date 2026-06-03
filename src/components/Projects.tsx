"use client";

import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProjectsProps {
  limit?: number;
  showTitle?: boolean;
}

export default function Projects({ limit, showTitle = true }: ProjectsProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="work" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="polka-section-accent right" />
      
      <div className="container-custom">
        {showTitle && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
              >
                Selected Work
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-display font-bold leading-[1.1]"
              >
                Featured <br /> <span className="text-gradient">Case Studies</span>
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted text-lg max-w-sm font-light tracking-wide leading-relaxed"
            >
              From high-energy events to precision-built brand installations, we design for lasting impression.
            </motion.p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {displayedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-surface aspect-[4/5] md:aspect-[16/11] border border-white/[0.05] shadow-2xl transition-all duration-700 hover:border-white/10">
                {/* Fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black transition-transform duration-1000 group-hover:scale-105" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                
                <div className="absolute inset-0 flex items-center justify-center text-white/5 font-display font-bold text-5xl text-center px-10 pointer-events-none uppercase tracking-tighter">
                  {project.title}
                </div>

                <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="px-5 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl text-[10px] uppercase tracking-widest font-bold text-white/80">
                      {project.category}
                    </span>
                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 shadow-2xl">
                      <ArrowUpRight size={28} strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight leading-none group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100">
                    <p className="text-muted/80 text-sm md:text-base font-light tracking-wide line-clamp-2 max-w-md">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {limit && (
          <div className="mt-24 text-center">
            <Link href="/work">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 mx-auto px-12 py-5 border border-white/[0.08] rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-500"
              >
                Explore All Work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
