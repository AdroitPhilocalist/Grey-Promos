"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface pt-32 pb-16 border-t border-white/[0.05]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-10">
              <span className="text-2xl font-display font-bold tracking-tighter">
                GREY<span className="text-accent">PROMOS</span>
              </span>
            </Link>
            <p className="text-muted text-base leading-relaxed mb-10 font-light tracking-wide">
              Pioneering Extraordinary Brand Experiences. Since 2015, Grey Promos India Pvt. Ltd. has been the preferred partner for premium activations and retail branding across India.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-12 h-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-muted hover:text-white hover:border-white transition-all duration-500 shadow-lg"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.2em] text-[10px]">Expertise</h4>
            <ul className="space-y-5">
              {["Retail Branding", "Exhibition Stalls", "Mall Activations", "Mobile Van Campaigns", "Events"].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-muted text-sm hover:text-accent transition-colors duration-300 font-light tracking-wide">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.2em] text-[10px]">Navigation</h4>
            <ul className="space-y-5">
              <li><Link href="/about" className="text-muted text-sm hover:text-accent transition-colors duration-300 font-light tracking-wide">About Us</Link></li>
              <li><Link href="/services" className="text-muted text-sm hover:text-accent transition-colors duration-300 font-light tracking-wide">Our Services</Link></li>
              <li><Link href="/work" className="text-muted text-sm hover:text-accent transition-colors duration-300 font-light tracking-wide">Featured Work</Link></li>
              <li><Link href="/insights" className="text-muted text-sm hover:text-accent transition-colors duration-300 font-light tracking-wide">Insights</Link></li>
              <li><Link href="/contact" className="text-muted text-sm hover:text-accent transition-colors duration-300 font-light tracking-wide">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.2em] text-[10px]">Global Office</h4>
            <div className="space-y-6 text-sm text-muted font-light tracking-wide">
              <p className="leading-relaxed">
                4, Purna Chandra Mitra Lane,<br />
                Badam Talla, Tollygunge,<br />
                Kolkata, West Bengal 700033
              </p>
              <div className="pt-2">
                <p className="mb-2">+91 98043 03861</p>
                <p>inquiries@greypromos.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/[0.05] text-[10px] uppercase tracking-[0.3em] text-muted/40 font-bold">
          <p>© {currentYear} Grey Promos India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-10">
            <Link href="#" className="hover:text-white transition-colors duration-300">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
