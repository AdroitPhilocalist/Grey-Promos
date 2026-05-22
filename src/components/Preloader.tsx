"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          <div className="overflow-hidden mb-4">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-4xl md:text-6xl font-display font-bold tracking-tighter"
            >
              GREY<span className="text-accent">PROMOS</span>
            </motion.div>
          </div>
          
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-xs uppercase tracking-[0.5em] text-muted-dark font-bold"
            >
              Experience the Extraordinary
            </motion.p>
          </div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-20 left-0 w-full h-[1px] bg-accent/20 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
