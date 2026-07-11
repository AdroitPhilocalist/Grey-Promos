"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

function BehanceIcon({ size = 20 }: { size?: number }) {
  return (
    <span className="flex items-center justify-center font-display font-bold text-[15px] leading-none">
      Bē
    </span>
  );
}

function WhatsAppIcon({ size = 20, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.69 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
      </svg>
  );
}

import { IndiaWordmark } from "./IndiaWordmark";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      Icon: Instagram,
      href: "https://www.instagram.com/greypromosindia?utm_source=qr",
      label: "Grey Promos India on Instagram",
      placeholder: false,
    },
    {
      Icon: WhatsAppIcon,
      href: "https://wa.me/919804303861",
      label: "Chat with Grey Promos India on WhatsApp",
      placeholder: false,
    },
    {
      Icon: Linkedin,
      href: "#",
      label: "Grey Promos India on LinkedIn",
      placeholder: true,
    },
    {
      Icon: BehanceIcon,
      href: "#",
      label: "Grey Promos India on Behance",
      placeholder: true,
    },
  ];

  return (
    <footer className="pt-32 pb-16 border-t border-white/[0.05]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-10">
              <span className="text-2xl font-display font-bold tracking-tighter">
                GREY<span className="text-accent">PROMOS</span> <IndiaWordmark />
              </span>
            </Link>
            <p className="text-muted text-base leading-relaxed mb-10 font-light tracking-wide">
              Pioneering Extraordinary Brand Experiences. Since 2015, Grey Promos India Pvt. Ltd. has been the preferred partner for premium activations and retail branding across India.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, href, label, placeholder }) => (
                <a
                  key={label}
                  href={href}
                  target={placeholder ? undefined : "_blank"}
                  rel={placeholder ? undefined : "noreferrer"}
                  aria-label={label}
                  title={placeholder ? `${label} (coming soon)` : label}
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
                <p className="mb-2">+91 98045 70253</p>
                <p>connect@greypromosindia.com</p>
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
