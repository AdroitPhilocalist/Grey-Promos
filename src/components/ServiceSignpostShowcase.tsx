"use client";

import React, { Suspense, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { services } from "@/data/services";

const ServiceControlRoomScene = dynamic(() => import("./ServiceControlRoomScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

type ServiceItem = (typeof services)[number];

type SignpostZone = {
  slug: string;
  label: string;
  points: string;
};

const signpostZones: SignpostZone[] = [
  { slug: "corporate-dealer-meets", label: "Corporate Dealer Meets & Seminars", points: "290,98 784,150 784,216 282,165" },
  { slug: "retail-branding", label: "Retail Branding", points: "306,198 783,236 782,302 307,256" },
  { slug: "exhibition-stall-fabrication", label: "Exhibition Stall Fabrication", points: "292,288 783,332 782,390 293,349" },
  { slug: "mall-setup-activation", label: "Mall Setup & Activation", points: "304,367 784,404 783,466 304,430" },
  { slug: "modern-trade-promotions", label: "Modern Trade Promotions", points: "280,467 783,495 783,557 282,527" },
  { slug: "promotions-activities", label: "Promotions Activities", points: "281,530 783,560 783,620 281,590" },
  { slug: "road-shows", label: "Road Shows", points: "282,618 783,654 782,720 282,680" },
  { slug: "creative-designing", label: "Creative Designing", points: "282,700 783,730 782,790 282,780" },
  { slug: "mobile-led-van-advertising", label: "Mobile & LED Van Advertising", points: "858,151 1350,99 1344,161 858,214" },
  { slug: "payroll-manpower", label: "Payroll Manpower Supply & Management", points: "860,244 1392,196 1373,271 860,326" },
  { slug: "product-launching", label: "Product Launching", points: "859,336 1368,290 1372,365 860,415" },
  { slug: "audio-visual-setup", label: "Audio Visual Setup", points: "859,410 1374,380 1360,460 860,490" },
  { slug: "printing-flex-branding", label: "Printing & Flex Branding", points: "860,505 1373,482 1360,559 859,570" },
  { slug: "retail-activations", label: "Retail Activations", points: "860,590 1378,578 1361,661 859,660" },
  { slug: "store-decoration-interiors", label: "Store Decoration & Interiors", points: "860,675 1369,684 1357,763 860,750" },
];

function selectServiceFromKeyboard(
  event: React.KeyboardEvent<SVGPolygonElement>,
  slug: string,
  onSelect: (slug: string) => void
) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  onSelect(slug);
}

export default function ServiceSignpostShowcase() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const activeService = useMemo(
    () => services.find((service) => service.slug === activeSlug) ?? null,
    [activeSlug]
  );

  const handleServiceSelect = (slug: string) => {
    setActiveSlug(slug);
    window.setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <section className="relative overflow-hidden pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="polka-section-accent right" />
      <div className="container-custom">
        <div className="mx-auto mb-4 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-3 max-w-xl text-xs font-light leading-relaxed tracking-wide text-muted sm:text-sm md:text-base"
          >
            Select a waving service sign to reveal its details and 3D service simulation below.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black/20 shadow-2xl shadow-black/30"
        >
          <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative min-w-[920px] md:min-w-0">
              <Image
                src="/images/signpost.png"
                alt="Grey Promos services signpost"
                width={1632}
                height={918}
                priority
                className="signpost-theme-image signpost-theme-dark h-auto w-full select-none"
              />
              <Image
                src="/images/signpost-light.png"
                alt="Grey Promos services signpost"
                width={1632}
                height={918}
                priority
                className="signpost-theme-image signpost-theme-light h-auto w-full select-none"
              />
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1632 918"
                aria-label="Choose a Grey Promos service from the signpost"
              >
                {signpostZones.map((zone) => {
                  const isActive = activeSlug === zone.slug;

                  return (
                    <polygon
                      key={zone.slug}
                      points={zone.points}
                      role="button"
                      tabIndex={0}
                      aria-label={`Explore ${zone.label}`}
                      onClick={() => handleServiceSelect(zone.slug)}
                      onKeyDown={(event) => selectServiceFromKeyboard(event, zone.slug, handleServiceSelect)}
                      className={`cursor-pointer stroke-white transition-all duration-300 outline-none ${
                        isActive
                          ? "fill-white/20 stroke-[3]"
                          : "fill-white/0 stroke-[0] hover:fill-white/12 hover:stroke-[2] focus-visible:fill-white/16 focus-visible:stroke-[3]"
                      }`}
                    >
                      <title>{zone.label}</title>
                    </polygon>
                  );
                })}
              </svg>
            </div>
          </div>
          {/* {!activeService && (
            <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-center backdrop-blur-xl md:left-1/2 md:right-auto md:w-[390px] md:-translate-x-1/2">
              <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.24em] text-white/42">
                Start Here
              </div>
              <div className="font-display text-lg font-bold leading-tight tracking-tight text-white">
                Click any waving sign to explore a service
              </div>
            </div>
          )} */}
        </motion.div>

        <AnimatePresence>
          {activeService && (
            <motion.div
              ref={detailsRef}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid gap-6 xl:grid-cols-[minmax(360px,0.82fr)_minmax(0,1.18fr)]"
            >
              <SelectedServicePanel service={activeService} />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="service-canvas-shell relative min-h-[460px] overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.018] shadow-2xl shadow-black/20 backdrop-blur-sm"
              >
                <div className="absolute left-5 top-5 z-20 flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
                  <Sparkles size={13} />
                  Service Simulation
                </div>
                <Suspense fallback={<SceneFallback />}>
                  <ServiceControlRoomScene
                    key={activeService.slug}
                    activeSlug={activeService.slug}
                    activeTitle={activeService.title}
                  />
                </Suspense>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function SelectedServicePanel({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.22 }}
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
              {service.category}
            </span>
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

          <div className="mt-8 space-y-3">
            {service.deliverables.map((item) => (
              <div key={item} className="service-deliverable-row flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check size={13} strokeWidth={2} />
                </span>
                <span className="text-sm font-light tracking-wide text-white/75">{item}</span>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-black transition-all hover:bg-accent hover:text-white"
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
    <div className="flex h-full min-h-[360px] w-full items-center justify-center">
      <div className="h-12 w-12 animate-pulse rounded-full border border-white/15 bg-white/[0.04] shadow-[0_0_44px_rgba(255,255,255,0.16)]" />
    </div>
  );
}
