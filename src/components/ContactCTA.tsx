"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Send, Phone, Mail, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const servicesList = [
  "Retail Branding",
  "Event Production",
  "Exhibition Stalls",
  "Mall Activations",
  "Mobile Van Campaigns",
  "Product Launches",
];

export default function ContactCTA() {
  const [selectedService, setSelectedService] = useState("Select a service");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="polka-section-accent right" />
      
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
            >
              Get In Touch
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-display font-bold mb-10 leading-[0.9] tracking-tight"
            >
              Ready to Build <br /> <span className="text-gradient">Impactful</span> <br /> <span className="text-accent">Experiences?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted text-xl leading-relaxed mb-16 max-w-lg font-light tracking-wide"
            >
              Tell us about your requirement. Grey Promos will help you bring it to life from concept to completion.
            </motion.p>

            <div className="space-y-10">
              <a href="tel:+919804303861" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500 shadow-xl">
                  <Phone size={24} strokeWidth={1.5} className="group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold mb-2">Call Us</p>
                  <p className="text-2xl font-display font-bold tracking-tight">+91 98043 03861</p>
                </div>
              </a>
              <a href="mailto:inquiries@greypromos.com" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500 shadow-xl">
                  <Mail size={24} strokeWidth={1.5} className="group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold mb-2">Email Us</p>
                  <p className="text-2xl font-display font-bold tracking-tight">inquiries@greypromos.com</p>
                </div>
              </a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 md:p-16 relative"
          >
            <div className="absolute right-0 top-0 h-40 w-40 opacity-30 pointer-events-none bg-[radial-gradient(circle,rgba(255,74,28,0.42)_1px,transparent_1.8px)] [background-size:18px_18px] [mask-image:linear-gradient(135deg,rgba(0,0,0,0.9),transparent_68%)]" />
            
            <form className="space-y-10 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted/60">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-accent transition-colors font-light tracking-wide text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted/60">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-accent transition-colors font-light tracking-wide text-lg"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted/60">Service Required</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-transparent border-b border-white/10 py-3 flex items-center justify-between group focus:outline-none focus:border-accent transition-colors"
                  >
                    <span className={cn(
                      "text-lg font-light tracking-wide transition-colors",
                      selectedService === "Select a service" ? "text-muted/40" : "text-white"
                    )}>
                      {selectedService}
                    </span>
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "circOut" }}
                    >
                      <ChevronDown size={20} className="text-muted group-hover:text-accent transition-colors" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-[100] left-0 right-0 mt-2 p-2 bg-[#0A0A0A] border border-white/[0.1] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
                      >
                        <div 
                          className="max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar py-1"
                          data-lenis-prevent
                        >
                          {servicesList.map((service) => (
                            <motion.button
                              key={service}
                              type="button"
                              whileHover={{ x: 5 }}
                              onClick={() => {
                                setSelectedService(service);
                                setIsDropdownOpen(false);
                              }}
                              className={cn(
                                "w-full text-left px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300",
                                selectedService === service 
                                  ? "bg-accent text-white" 
                                  : "text-white/90 hover:bg-white/[0.08] hover:text-white"
                              )}
                            >
                              {service}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted/60">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-accent transition-colors resize-none font-light tracking-wide text-lg"
                />
              </div>

              <MagneticButton className="w-full">
                <button className="w-full bg-white text-black py-5 rounded-full font-bold flex items-center justify-center gap-3 transition-all hover:bg-accent hover:text-white shadow-xl shadow-white/5 hover:shadow-accent/20">
                  Send Inquiry
                  <Send size={20} strokeWidth={2} />
                </button>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
