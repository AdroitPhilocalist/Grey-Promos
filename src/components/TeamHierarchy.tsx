"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, Zap, Sparkles } from "lucide-react";

const teamData = {
  leadership: [
    { name: "Executive Director", post: "Founder & Visionary", brief: "Driving the creative force and national expansion of Grey Promos since 2015.", icon: Shield },
  ],
  departments: [
    {
      name: "Strategic Planning",
      brief: "The architects behind our most successful national campaigns.",
      members: [
        { name: "Strategic Lead", post: "Creative Strategy", brief: "Transforming brand goals into actionable on-ground experiences.", icon: Sparkles },
      ]
    },
    {
      name: "Execution Excellence",
      brief: "Turning complex designs into flawless real-world installations.",
      members: [
        { name: "Operations Head", post: "Pan-India Execution", brief: "Managing the logistics and quality across our 15+ zone network.", icon: Zap },
        { name: "Production Lead", post: "Fabrication & Quality", brief: "Ensuring every exhibition stall and retail outlet meets world-class standards.", icon: User },
      ]
    }
  ]
};

export default function TeamHierarchy() {
  const [activeMember, setActiveMember] = useState<any>(null);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="polka-section-accent right" />
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
          >
            The Collective
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 tracking-tighter">
            An Expert <span className="text-gradient">Hierarchy</span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-20">
          {/* Leadership Hub */}
          <div className="relative">
            {teamData.leadership.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-12 text-center relative z-10 cursor-pointer border-accent/20"
                onClick={() => setActiveMember(member)}
              >
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 text-accent">
                  <member.icon size={48} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{member.post}</h3>
                <p className="text-accent text-sm font-bold uppercase tracking-widest">{member.name}</p>
              </motion.div>
            ))}
            
            {/* Connecting Radial Lines */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-accent/20 to-transparent" />
          </div>

          {/* Departments Orbit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {teamData.departments.map((dept, i) => (
              <div key={dept.name} className="space-y-12">
                <div className="text-center md:text-left">
                  <h4 className="text-white text-xl font-display font-bold mb-4">{dept.name}</h4>
                  <p className="text-muted text-sm max-w-sm">{dept.brief}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {dept.members.map((member) => (
                    <motion.div
                      key={member.name}
                      whileHover={{ x: 10 }}
                      className="glass-card p-8 flex items-center gap-6 cursor-pointer group hover:bg-white/[0.04]"
                      onClick={() => setActiveMember(member)}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-muted group-hover:text-accent transition-colors">
                        <member.icon size={32} strokeWidth={1} />
                      </div>
                      <div>
                        <h5 className="text-lg font-display font-bold text-white group-hover:text-accent transition-colors">{member.post}</h5>
                        <p className="text-muted text-xs uppercase tracking-widest">{member.name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Detail Overlay */}
        <AnimatePresence>
          {activeMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60"
              onClick={() => setActiveMember(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card max-w-2xl w-full p-12 md:p-20 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 right-0 p-12 text-[15rem] font-display font-black text-white/[0.02] pointer-events-none">
                  TEAM
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                  <div className="w-40 h-40 rounded-[2rem] bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <activeMember.icon size={80} strokeWidth={0.5} />
                  </div>
                  <div>
                    <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Position Detail</span>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tighter">{activeMember.post}</h3>
                    <p className="text-white text-xl mb-8 font-light tracking-wide">{activeMember.name}</p>
                    <p className="text-muted text-lg leading-relaxed font-light">
                      {activeMember.brief}
                    </p>
                  </div>
                </div>
                
                <button 
                  className="mt-12 text-muted hover:text-white transition-colors text-xs uppercase tracking-[0.3em] font-bold"
                  onClick={() => setActiveMember(null)}
                >
                  [ Close Explorer ]
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
