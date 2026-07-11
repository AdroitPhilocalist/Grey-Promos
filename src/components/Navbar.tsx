"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { IndiaWordmark } from "./IndiaWordmark";
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("mobile-menu-open", isMobileMenuOpen);
    return () => document.documentElement.classList.remove("mobile-menu-open");
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "site-navbar fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled ? "pt-4" : "pt-8"
      )}
    >
      <div className={cn(
        "container-custom flex items-center justify-between transition-all duration-500",
        isScrolled ? "max-w-[95%] md:max-w-5xl py-3 px-10 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-2xl shadow-black/50" : "bg-transparent py-2"
      )}>
        <Link 
          href="/" 
          className={cn(
            "flex items-center gap-2 transition-all duration-500",
            isScrolled ? "md:mr-8" : "md:mr-12"
          )}
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl md:text-2xl font-display font-bold tracking-tighter"
          >
            GREY<span className="text-accent">PROMOS</span> <IndiaWordmark />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className={cn(
          "hidden md:flex items-center transition-all duration-500",
          isScrolled ? "gap-6" : "gap-10"
        )}>
          <div 
            className={cn(
              "flex items-center relative transition-all duration-500",
              isScrolled ? "gap-4" : "gap-10"
            )}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.href)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "inline-block py-4 px-5 text-[11px] uppercase tracking-[0.2em] font-bold transition-colors duration-300 relative z-10",
                    pathname === link.href || hoveredLink === link.href ? "text-white" : "text-muted"
                  )}
                >
                  {link.name}
                </Link>
                
                {/* Magnetic Hover/Active Indicator */}
                {(hoveredLink === link.href || (!hoveredLink && pathname === link.href)) && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute inset-2 bg-accent/10 rounded-full z-0 blur-[4px]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                {(hoveredLink === link.href || (!hoveredLink && pathname === link.href)) && (
                  <motion.div 
                    layoutId="nav-line"
                    className="absolute bottom-3 left-5 right-5 h-[1px] bg-accent z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <MagneticButton>
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-full text-[12px] font-bold transition-all hover:shadow-lg hover:shadow-accent/20"
              >
                Connect
              </Link>
            </MagneticButton>
          </motion.div>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          className={cn(
            "md:hidden grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition-all duration-300",
            isMobileMenuOpen ? "mr-0" : "mr-14"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black md:hidden"
          >
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute right-8 top-8 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition-colors hover:border-accent hover:bg-accent"
              aria-label="Close navigation menu"
            >
              <X size={24} />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-3xl font-display font-bold transition-colors",
                  pathname === link.href ? "text-accent" : "text-white hover:text-accent"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 bg-accent text-white px-8 py-4 rounded-full text-lg font-bold"
            >
              Connect
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
