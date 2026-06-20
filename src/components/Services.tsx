"use client";

import React, { Suspense, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Cpu, Layers3, Radar, Sparkles } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const ServiceControlRoomScene = dynamic(() => import("./ServiceControlRoomScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

type ServiceItem = (typeof services)[number];

interface ServicesProps {
  limit?: number;
  showFilters?: boolean;
}

const categoryLabels = ["All Systems", "Events", "Branding", "Promotions", "Fabrication", "Outdoor", "Management", "Production"];

export default function Services({ limit, showFilters = true }: ServicesProps) {
  const visibleServices = limit ? services.slice(0, limit) : services;
  const [activeCategory, setActiveCategory] = useState("All Systems");
  const [activeSlug, setActiveSlug] = useState(visibleServices[0]?.slug ?? services[0].slug);

  const filteredServices = useMemo(
    () =>
      visibleServices.filter((service) => activeCategory === "All Systems" || service.category === activeCategory),
    [activeCategory, visibleServices]
  );

  const activeService = visibleServices.find((service) => service.slug === activeSlug) ?? visibleServices[0];
  const activeIndex = visibleServices.findIndex((service) => service.slug === activeService.slug);

  return (
    <section id="services" className="relative min-h-screen overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="polka-section-accent" />
      <div className="container-custom">
        <div className="mb-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent"
            >
              <Radar size={13} strokeWidth={1.8} />
              Services Control Room
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-5xl font-display font-bold leading-[0.96] tracking-tight md:text-7xl lg:text-8xl"
            >
              The 360° <br />
              <span className="text-gradient">Brand Experience</span> <br />
              <span className="text-accent">Engine</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="max-w-2xl lg:justify-self-end"
          >
            <p className="text-base font-light leading-relaxed tracking-wide text-muted md:text-xl">
              Explore Grey Promos&apos; services like a live command center: select a capability, watch the central 3D simulation shift, and see what the team delivers on ground.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["15", "Service Systems"],
                ["360°", "Execution"],
                ["2015", "Since"],
              ].map(([value, label]) => (
                <div key={label} className="service-stat border-l border-white/10 pl-4">
                  <div className="font-display text-2xl font-bold text-white md:text-3xl">{value}</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-muted/70">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex gap-3 overflow-x-auto pb-3"
          >
            {categoryLabels.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  const next = visibleServices.find((service) => category === "All Systems" || service.category === category);
                  if (next) setActiveSlug(next.slug);
                }}
                className={cn(
                  "service-filter shrink-0 rounded-full border px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300",
                  activeCategory === category
                    ? "border-white bg-white text-black shadow-xl shadow-white/10"
                    : "border-white/10 text-muted hover:border-white/25 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_360px] xl:grid-cols-[320px_minmax(0,1fr)_400px]">
          <ServiceRail
            services={filteredServices}
            activeSlug={activeService.slug}
            onSelect={setActiveSlug}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="service-canvas-shell relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.018] shadow-2xl shadow-black/30 backdrop-blur-sm md:min-h-[660px]"
          >
            <div className="absolute left-5 top-5 z-20 flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
              <Cpu size={13} />
              Live Service Simulation
            </div>
            <Suspense fallback={<SceneFallback />}>
              <ServiceControlRoomScene activeSlug={activeService.slug} activeTitle={activeService.title} />
            </Suspense>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,transparent_28%,rgba(0,0,0,0.24)_100%)]" />
            <div className="service-active-strip pointer-events-none absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-xl md:left-auto md:w-[330px]">
              <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.24em] text-white/42">
                Active Simulation
              </div>
              <div className="font-display text-lg font-bold leading-tight tracking-tight text-white">
                {activeService.title}
              </div>
            </div>
          </motion.div>

          <ServiceDetailPanel service={activeService} index={activeIndex} />
        </div>

        {limit && (
          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] px-10 py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-white hover:text-black"
            >
              Open Control Room
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceRail({
  services: serviceItems,
  activeSlug,
  onSelect,
}: {
  services: ServiceItem[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="service-rail-panel max-h-[660px] overflow-y-auto rounded-[1.6rem] border border-white/[0.08] bg-white/[0.02] p-3 backdrop-blur-xl"
      data-lenis-prevent
    >
      <div className="mb-3 flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
        <Layers3 size={13} />
        Service Modules
      </div>
      <div className="space-y-2">
        {serviceItems.map((service, index) => {
          const Icon = service.icon;
          const isActive = service.slug === activeSlug;
          return (
            <button
              key={service.slug}
              type="button"
              onClick={() => onSelect(service.slug)}
              className={cn(
                "service-module-button group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300",
                isActive
                  ? "border-accent/35 bg-accent/10 text-white shadow-lg shadow-accent/5"
                  : "border-transparent text-muted hover:border-white/10 hover:bg-white/[0.035] hover:text-white"
              )}
            >
              <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors", isActive ? "border-accent/25 bg-accent text-white" : "border-white/10 bg-white/[0.02]")}>
                <Icon size={20} strokeWidth={1.6} />
              </span>
              <span className="min-w-0">
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-accent/70">
                  SYS {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-sm font-display font-bold leading-tight tracking-tight">
                  {service.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function ServiceDetailPanel({ service, index }: { service: ServiceItem; index: number }) {
  const Icon = service.icon;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="service-detail-shell rounded-[1.6rem] border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl md:p-7"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={service.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
              <Icon size={27} strokeWidth={1.5} />
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
              Module {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
            {service.category}
          </div>
          <h2 className="text-3xl font-display font-bold leading-tight tracking-tight text-white md:text-4xl">
            {service.title}
          </h2>
          <p className="mt-5 text-lg font-light leading-relaxed tracking-wide text-white/80">
            {service.tagline}
          </p>
          <p className="mt-5 text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">
            {service.description}
          </p>

          <div className="mt-9">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
              <Sparkles size={13} />
              What We Deliver
            </div>
            <div className="space-y-3">
              {service.deliverables.map((item) => (
                <div key={item} className="service-deliverable-row flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check size={13} strokeWidth={2} />
                  </span>
                  <span className="text-sm font-light tracking-wide text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-black transition-all hover:bg-accent hover:text-white"
          >
            Discuss This Service
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </AnimatePresence>
    </motion.aside>
  );
}

function SceneFallback() {
  return (
    <div className="flex h-full min-h-[420px] w-full items-center justify-center">
      <div className="h-12 w-12 animate-pulse rounded-full border border-white/15 bg-white/[0.04] shadow-[0_0_44px_rgba(255,255,255,0.16)]" />
    </div>
  );
}
