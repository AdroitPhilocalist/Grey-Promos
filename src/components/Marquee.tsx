"use client";

import React from "react";
import { motion } from "framer-motion";

const marqueeItems = [
  { title: "Roadshows", video: "/videos/marquee/Road-shows.mp4" },
  { title: "Retail Branding", video: "/videos/marquee/Retail-Branding.mp4" },
  { title: "Event Production", video: "/videos/marquee/Live-event.mp4" },
  { title: "LED Van Campaigns", video: "/videos/marquee/Led-Vans.mp4" },
  { title: "Exhibition Stalls", video: "/videos/marquee/Exhibition.mp4" },
  { title: "Brand Activation", video: "/videos/marquee/Brand-Activation.mp4" },
  { title: "Outdoor Advertising", video: "/videos/marquee/Outdoor-Advertising.mp4" },
  { title: "Corporate Events", video: "/videos/marquee/Corporate_event.mp4" },
  { title: "Store Interiors", video: "/videos/marquee/Store-Interior.mp4" },
];

export default function Marquee() {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <section 
      className="relative overflow-hidden py-20 md:py-28"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="polka-section-accent" />
      <div className="polka-section-accent right" />
      
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-6"
          >
            <div className="w-16 h-[1px] bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-accent/80">Premium Field Captures</span>
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-none"
            >
              Witness the <span className="text-gradient">Extraordinary</span>
            </motion.h2>
          </div>
        </div>

        {/* Marquee Container with Edge Fading */}
        <div 
          className="flex group pt-2 md:pt-4 perspective-2000"
          style={{ 
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
          }}
        >
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ 
                duration: isHovered ? 100 : 60, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex items-center gap-6 pr-6 md:gap-9 md:pr-9"
              style={{ transformStyle: "preserve-3d" }}
            >
              {marqueeItems.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="relative flex-shrink-0 w-[240px] sm:w-[310px] md:w-[420px] lg:w-[480px] aspect-video group/card"
                  whileHover={{ 
                    scale: 1.04, 
                    rotateY: 8, 
                    rotateX: 3,
                    z: 100 
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Advanced Glass Border Glow */}
                  <div className="absolute -inset-[2px] bg-gradient-to-tr from-white/18 via-white/20 to-white/5 rounded-[1.4rem] md:rounded-[1.75rem] blur-[2px] opacity-25 group-hover/card:opacity-75 transition-all duration-700" />
                  
                  {/* Main Video Container */}
                  <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-white/[0.015] shadow-[0_16px_36px_rgba(0,0,0,0.4)] backdrop-blur-sm md:rounded-[1.75rem]">
                    <motion.video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover/card:grayscale-0 transition-all duration-1000 scale-125 origin-center"
                      animate={{ 
                        x: ["-5%", "5%", "-5%"],
                        y: ["-2%", "2%", "-2%"]
                      }}
                      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Atmospheric Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover/card:opacity-40 transition-all duration-700" />
                    
                    {/* Light Leak Flare */}
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 rotate-12 pointer-events-none" />
                    
                    <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[radial-gradient(circle,rgba(255,255,255,0.22)_1px,transparent_1.8px)] [background-size:18px_18px]" />

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-5 transform transition-all duration-700 group-hover/card:translate-y-[-6px] md:p-7 lg:p-8">
                      <div className="flex flex-col gap-3 md:gap-4">
                        <div className="flex items-center gap-4 opacity-0 group-hover/card:opacity-100 transition-all duration-500 translate-y-4 group-hover/card:translate-y-0">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                            <span className="w-1.5 h-1.5 absolute rounded-full bg-accent" />
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Active Reel</span>
                          
                          {/* Mini Progress Bar for Hovered State */}
                          <div className="w-16 h-[1px] bg-white/10 relative overflow-hidden md:w-20">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="absolute h-full bg-accent" 
                            />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-display font-bold leading-none tracking-tighter text-white drop-shadow-2xl md:text-3xl lg:text-4xl">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -inset-6 opacity-0 transition-opacity duration-1000 pointer-events-none group-hover/card:opacity-25 bg-[radial-gradient(circle,rgba(226,232,240,0.42)_1px,transparent_1.9px)] [background-size:28px_28px] [mask-image:linear-gradient(135deg,transparent,rgba(0,0,0,0.8),transparent)]" />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modern Scanline & Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,4px_100%]" />
    </section>
  );
}
