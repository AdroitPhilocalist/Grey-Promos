"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Play, Plus, X } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

type ServiceItem = (typeof services)[number];

interface ServicesProps {
  limit?: number;
  showFilters?: boolean;
}

const serviceMedia: Record<string, string> = {
  "corporate-dealer-meets": "/videos/marquee/Corporate_event.mp4",
  "retail-branding": "/videos/marquee/Retail-Branding.mp4",
  "exhibition-stall-fabrication": "/videos/marquee/Exhibition.mp4",
  "mall-setup-activation": "/videos/marquee/Brand-Activation.mp4",
  "modern-trade-promotions": "/videos/marquee/Brand-Activation.mp4",
  "promotions-activities": "/videos/marquee/Brand-Activation.mp4",
  "road-shows": "/videos/marquee/Road-shows.mp4",
  "mobile-led-van-advertising": "/videos/marquee/Led-Vans.mp4",
  "payroll-manpower": "/videos/marquee/Live-event.mp4",
  "product-launching": "/videos/marquee/Live-event.mp4",
  "audio-visual-setup": "/videos/marquee/Live-event.mp4",
  "printing-flex-branding": "/videos/marquee/Outdoor-Advertising.mp4",
  "retail-activations": "/videos/marquee/Brand-Activation.mp4",
  "store-decoration-interiors": "/videos/marquee/Store-Interior.mp4",
  "creative-designing": "/videos/marquee/Retail-Branding.mp4",
};

const categoryPalette: Record<string, { line: string; wash: string; icon: string }> = {
  Events: {
    line: "#f97352",
    wash: "radial-gradient(circle at 8% 4%, rgba(249, 115, 82, 0.22), transparent 43%)",
    icon: "rgba(249, 115, 82, 0.13)",
  },
  Branding: {
    line: "#d45dec",
    wash: "radial-gradient(circle at 8% 4%, rgba(212, 93, 236, 0.20), transparent 43%)",
    icon: "rgba(212, 93, 236, 0.12)",
  },
  Promotions: {
    line: "#27b8c9",
    wash: "radial-gradient(circle at 8% 4%, rgba(39, 184, 201, 0.20), transparent 43%)",
    icon: "rgba(39, 184, 201, 0.12)",
  },
  Fabrication: {
    line: "#f5af39",
    wash: "radial-gradient(circle at 8% 4%, rgba(245, 175, 57, 0.20), transparent 43%)",
    icon: "rgba(245, 175, 57, 0.12)",
  },
  Outdoor: {
    line: "#5b91ff",
    wash: "radial-gradient(circle at 8% 4%, rgba(91, 145, 255, 0.22), transparent 43%)",
    icon: "rgba(91, 145, 255, 0.13)",
  },
  Management: {
    line: "#71bd82",
    wash: "radial-gradient(circle at 8% 4%, rgba(113, 189, 130, 0.20), transparent 43%)",
    icon: "rgba(113, 189, 130, 0.12)",
  },
  Production: {
    line: "#9d7ced",
    wash: "radial-gradient(circle at 8% 4%, rgba(157, 124, 237, 0.22), transparent 43%)",
    icon: "rgba(157, 124, 237, 0.13)",
  },
};

export default function Services({ limit, showFilters = true }: ServicesProps) {
  const visibleServices = limit ? services.slice(0, limit) : services;
  const categories = useMemo(() => ["All", ...Array.from(new Set(visibleServices.map((service) => service.category)))], [visibleServices]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  const filteredServices = useMemo(
    () => visibleServices.filter((service) => activeCategory === "All" || service.category === activeCategory),
    [activeCategory, visibleServices]
  );

  useEffect(() => {
    if (!activeService) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveService(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeService]);

  return (
    <section id="services" className="relative overflow-hidden pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="polka-section-accent" />
      <div className="container-custom">
        <div className="grid gap-8 border-b border-white/[0.08] pb-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:pb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-accent"
            >
              What we do
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="max-w-4xl text-5xl font-display font-bold leading-[0.96] tracking-tight md:text-7xl"
            >
              Services built for <span className="text-gradient">real-world impact.</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-xl text-base font-light leading-relaxed tracking-wide text-muted md:justify-self-end md:text-lg"
          >
            From a first campaign idea to the final on-ground detail, Grey Promos brings planning, production, people, and presence together.
          </motion.p>
        </div>

        {showFilters && (
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300",
                  activeCategory === category
                    ? "border-accent bg-accent text-white shadow-lg shadow-accent/20"
                    : "border-white/10 bg-white/[0.02] text-muted hover:border-white/25 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              const palette = categoryPalette[service.category] ?? categoryPalette.Branding;
              return (
                <motion.button
                  layout
                  key={service.slug}
                  type="button"
                  onClick={() => setActiveService(service)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, delay: Math.min(index * 0.025, 0.18) }}
                  className="group relative min-h-[268px] overflow-hidden bg-[var(--background)] p-6 text-left transition-colors duration-500 hover:bg-white/[0.035] md:p-7"
                >
                  <span className="absolute inset-0 pointer-events-none" style={{ background: palette.wash }} />
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: palette.line, boxShadow: `0 0 18px ${palette.line}` }} />
                  <Icon aria-hidden="true" size={168} strokeWidth={0.65} className="pointer-events-none absolute -bottom-8 -right-8 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6" style={{ color: palette.icon }} />
                  <span className="absolute right-6 top-6 font-display text-3xl font-bold text-white/[0.08] transition-colors duration-300" style={{ color: palette.icon }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.025] transition-all duration-300 group-hover:scale-110 group-hover:text-white" style={{ color: palette.line, boxShadow: `inset 0 0 0 1px ${palette.icon}` }}>
                    <Icon size={21} strokeWidth={1.6} />
                  </span>
                  <span className="relative mt-8 block text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: palette.line }}>{service.category}</span>
                  <span className="relative mt-3 block max-w-[15rem] text-2xl font-display font-bold leading-[1.06] tracking-tight text-white">
                    {service.title}
                  </span>
                  <span className="relative mt-4 block max-w-[15rem] text-sm font-light leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/70">
                    {service.tagline}
                  </span>
                  <span className="absolute bottom-6 left-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55 transition-all duration-300 group-hover:text-white">
                    Explore <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute bottom-6 right-6 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white">
                    <Plus size={17} className="transition-transform duration-300 group-hover:rotate-90" />
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {limit && (
          <div className="mt-12 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-accent hover:text-accent">
              View all services <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeService && <ServiceDialog service={activeService} onClose={() => setActiveService(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ServiceDialog({ service, onClose }: { service: ServiceItem; onClose: () => void }) {
  const Icon = service.icon;
  const media = serviceMedia[service.slug];

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/70 p-3 pt-20 backdrop-blur-md md:items-center md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-dialog-title"
        data-lenis-prevent
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.985 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[calc(100dvh-6rem)] w-full max-w-5xl touch-pan-y overflow-y-auto overscroll-contain rounded-[1.5rem] border border-white/[0.12] bg-[var(--background)] shadow-2xl shadow-black/60"
      >
        <button type="button" onClick={onClose} className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/35 text-white/80 backdrop-blur-md transition-colors hover:border-accent hover:bg-accent hover:text-white" aria-label="Close service details">
          <X size={18} />
        </button>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[260px] overflow-hidden bg-black lg:min-h-full">
            {media ? (
              <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline src={media} />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-black/25 backdrop-blur-md"><Icon size={22} /></span>
              <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80"><Play size={12} fill="currentColor" /> A glimpse of our work</span>
            </div>
          </div>

          <div className="p-6 sm:p-9 md:p-11">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{service.category}</p>
            <h2 id="service-dialog-title" className="mt-4 text-4xl font-display font-bold leading-[1.02] tracking-tight text-white md:text-5xl">{service.title}</h2>
            <p className="mt-5 text-lg font-light leading-relaxed text-white/80">{service.tagline}</p>
            <p className="mt-5 text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">{service.description}</p>

            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">What&apos;s included</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-3 border-b border-white/[0.08] py-3 text-sm text-white/80">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent"><Check size={12} strokeWidth={2.5} /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/contact" onClick={onClose} className="mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-black transition-colors hover:bg-accent hover:text-white">
              Discuss this service <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
