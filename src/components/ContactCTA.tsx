"use client";

import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Send, Phone, Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-surface">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] rounded-full pointer-events-none" />
            
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
                  <select className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-accent transition-colors appearance-none text-muted font-light tracking-wide text-lg">
                    <option className="bg-surface">Select a service</option>
                    <option className="bg-surface">Retail Branding</option>
                    <option className="bg-surface">Event Production</option>
                    <option className="bg-surface">Exhibition Stalls</option>
                    <option className="bg-surface">Mall Activations</option>
                  </select>
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
