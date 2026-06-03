"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const firstPart = "GREY";
  const secondPart = "PROMOS";

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              animate={{ 
                y: ["-4%", "4%", "-4%"],
                opacity: [0.16, 0.28, 0.16] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,74,28,0.42)_1px,transparent_1.8px)] [background-size:26px_26px] [mask-image:linear-gradient(120deg,transparent,rgba(0,0,0,0.9),transparent)]" 
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Brand Name with Staggered Characters */}
            <div className="flex mb-6 overflow-hidden">
              <div className="flex">
                {firstPart.split("").map((char, i) => (
                  <motion.span
                    key={`first-${i}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.05,
                      ease: [0.33, 1, 0.68, 1] 
                    }}
                    className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="flex">
                {secondPart.split("").map((char, i) => (
                  <motion.span
                    key={`second-${i}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: (firstPart.length + i) * 0.05,
                      ease: [0.33, 1, 0.68, 1] 
                    }}
                    className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-accent"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>
            
            {/* Subtext with improved visibility */}
            <div className="overflow-hidden mb-12">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-white/60 font-bold"
              >
                Experience the Extraordinary
              </motion.p>
            </div>

            {/* Progress Indicator */}
            <div className="relative w-64 md:w-80 h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_rgba(255,74,28,0.5)]"
              />
            </div>
            
            {/* Numeric Counter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-[10px] font-display font-bold text-accent tracking-widest"
            >
              {progress}%
            </motion.div>
          </div>

          <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.16)_1px,transparent_1.7px)] [background-size:18px_18px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
