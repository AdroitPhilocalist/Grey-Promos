"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Play, Plus, X, ZoomIn } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

type ServiceItem = (typeof services)[number];

interface ServicesProps {
  limit?: number;
  showFilters?: boolean;
}

type ServiceMedia = {
  video: string;
  images?: string[];
};

type ActiveServicePhoto = {
  images: string[];
  imageIndex: number;
};

const eventImages = [
  "/images/Events/DSC_6195.JPG",
  "/images/Events/DSC_6200.JPG",
  "/images/Events/DSC_6212.JPG",
  "/images/Events/DSC_6283.JPG",
  "/images/Events/DSC_6318.JPG",
  "/images/Events/RMP_5670.JPG",
];

const activationImages = [
  "/images/Activation/WhatsApp%20Image%202021-03-11%20at%2015.54.24.jpeg",
  "/images/Activation/WhatsApp%20Image%202021-04-02%20at%2012.15.18%20PM%20(1).jpeg",
  "/images/Activation/WhatsApp%20Image%202022-10-10%20at%2012.04.28%20AM.jpeg",
  "/images/Activation/WhatsApp%20Image%202023-07-20%20at%208.43.48%20PM.jpeg",
  "/images/Activation/WhatsApp%20Image%202023-10-11%20at%202.51.49%20PM%20(1).jpeg",
  "/images/Activation/WhatsApp%20Image%202026-03-28%20at%203.07.08%20PM.jpeg",
];

const brandingImages = [
  "/images/Branding/WhatsApp%20Image%202021-08-27%20at%209.39.57%20PM.jpeg",
  "/images/Branding/WhatsApp%20Image%202021-08-31%20at%204.15.27%20PM%20(1).jpeg",
  "/images/Branding/WhatsApp%20Image%202021-08-31%20at%204.15.34%20PM.jpeg",
  "/images/Branding/WhatsApp%20Image%202022-05-17%20at%2012.06.51%20PM%20(1).jpeg",
  "/images/Branding/WhatsApp%20Image%202022-05-17%20at%2012.06.57%20PM%20(1).jpeg",
  "/images/Branding/WhatsApp%20Image%202022-10-09%20at%2011.26.52%20PM%20(2).jpeg",
];

const exhibitionImages = [
  "/images/Exhibition/DEB_3432.JPG",
  "/images/Exhibition/DEB_3569.JPG",
  "/images/Exhibition/DEB_3696.JPG",
  "/images/Exhibition/DSC_0023.JPG",
  "/images/Exhibition/WhatsApp%20Image%202022-05-17%20at%2011.44.24%20AM.jpeg",
  "/images/Exhibition/WhatsApp%20Image%202026-06-20%20at%206.55.00%20PM.jpeg",
];

const selectImages = (images: string[], start = 0) => Array.from({ length: 3 }, (_, index) => images[(start + index) % images.length]);

const serviceMedia: Record<string, ServiceMedia> = {
  "corporate-dealer-meets": { video: "/videos/Event.mp4", images: selectImages(eventImages, 0) },
  "retail-branding": { video: "/videos/Branding.mp4", images: selectImages(brandingImages, 0) },
  "exhibition-stall-fabrication": { video: "/videos/Exhibition.mp4", images: selectImages(exhibitionImages, 0) },
  "mall-setup-activation": { video: "/videos/Activation.mp4", images: selectImages(activationImages, 0) },
  "modern-trade-promotions": { video: "/videos/Activation.mp4", images: selectImages(activationImages, 2) },
  "promotions-activities": { video: "/videos/Activation.mp4", images: selectImages(activationImages, 3) },
  "road-shows": { video: "/videos/marquee/Road-shows.mp4" },
  "mobile-led-van-advertising": { video: "/videos/marquee/Led-Vans.mp4" },
  "payroll-manpower": { video: "/videos/marquee/Live-event.mp4" },
  "product-launching": { video: "/videos/Event.mp4", images: selectImages(eventImages, 2) },
  "audio-visual-setup": { video: "/videos/Event.mp4", images: selectImages(eventImages, 3) },
  "printing-flex-branding": { video: "/videos/Branding.mp4", images: selectImages(brandingImages, 2) },
  "retail-activations": { video: "/videos/Activation.mp4", images: selectImages(activationImages, 1) },
  "store-decoration-interiors": { video: "/videos/Branding.mp4", images: selectImages(brandingImages, 3) },
  "creative-designing": { video: "/videos/marquee/Retail-Branding.mp4" },
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
  Activations: {
    line: "#27b8c9",
    wash: "radial-gradient(circle at 8% 4%, rgba(39, 184, 201, 0.20), transparent 43%)",
    icon: "rgba(39, 184, 201, 0.12)",
  },
  Exhibitions: {
    line: "#f5af39",
    wash: "radial-gradient(circle at 8% 4%, rgba(245, 175, 57, 0.20), transparent 43%)",
    icon: "rgba(245, 175, 57, 0.12)",
  },
};

const serviceCategories = ["All", "Events", "Branding", "Activations", "Exhibitions"];

export default function Services({ limit, showFilters = true }: ServicesProps) {
  const visibleServices = limit ? services.slice(0, limit) : services;
  const categories = useMemo(
    () => serviceCategories.filter((category) => category === "All" || visibleServices.some((service) => service.category === category)),
    [visibleServices]
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  const filteredServices = useMemo(
    () => visibleServices.filter((service) => activeCategory === "All" || service.category === activeCategory),
    [activeCategory, visibleServices]
  );

  useEffect(() => {
    if (!activeService) return;

    document.documentElement.classList.add("modal-open");
    return () => {
      document.documentElement.classList.remove("modal-open");
    };
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
  const [activePhoto, setActivePhoto] = useState<ActiveServicePhoto | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activePhoto) {
          setActivePhoto(null);
        } else {
          onClose();
        }
      }
      if (event.key === "ArrowRight" && activePhoto) {
        setActivePhoto((current) => current && ({
          ...current,
          imageIndex: (current.imageIndex + 1) % current.images.length,
        }));
      }
      if (event.key === "ArrowLeft" && activePhoto) {
        setActivePhoto((current) => current && ({
          ...current,
          imageIndex: (current.imageIndex - 1 + current.images.length) % current.images.length,
        }));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePhoto, onClose]);

  return (
    <>
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
            <div className="flex min-h-[260px] flex-col overflow-hidden bg-black lg:min-h-full">
              <div className={cn("relative overflow-hidden", media.images ? "aspect-video" : "min-h-[260px] flex-1")}>
                <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" src={media.video} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/20 text-white/90 backdrop-blur-md" aria-label="Service video"><Play size={14} fill="currentColor" /></span>
              </div>

              {media.images && (
                <div className="grid grid-cols-3 gap-2 border-t border-white/[0.1] bg-black p-2.5">
                  {media.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActivePhoto({ images: media.images ?? [], imageIndex: index })}
                      className="group relative aspect-[4/3] overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.04] outline-none transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
                      aria-label={`View ${service.title} project photo ${index + 1}`}
                    >
                      <Image src={image} alt={`${service.title} real project frame ${index + 1}`} fill sizes="(max-width: 1024px) 33vw, 18vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="absolute bottom-2 right-2 grid h-7 w-7 translate-y-1 place-items-center rounded-full border border-white/25 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ZoomIn size={13} />
                      </span>
                    </button>
                  ))}
                </div>
              )}
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

      <AnimatePresence>
        {activePhoto && (
          <ServicePhotoLightbox
            title={service.title}
            category={service.category}
            activePhoto={activePhoto}
            onClose={() => setActivePhoto(null)}
            onNext={() => setActivePhoto((current) => current && ({ ...current, imageIndex: (current.imageIndex + 1) % current.images.length }))}
            onPrevious={() => setActivePhoto((current) => current && ({ ...current, imageIndex: (current.imageIndex - 1 + current.images.length) % current.images.length }))}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ServicePhotoLightbox({
  title,
  category,
  activePhoto,
  onClose,
  onNext,
  onPrevious,
}: {
  title: string;
  category: string;
  activePhoto: ActiveServicePhoto;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const image = activePhoto.images[activePhoto.imageIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/84 p-3 backdrop-blur-xl md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} image viewer`}
        data-lenis-prevent
        initial={{ opacity: 0, y: 22, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.985 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[86dvh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.14] bg-[#050505] shadow-2xl shadow-black/70"
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.1] px-4 py-3 md:px-5">
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-accent">{category}</p>
            <p className="mt-1 truncate text-sm text-white/72">{title}</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors hover:border-accent hover:bg-accent" aria-label="Close image viewer">
            <X size={18} />
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={image}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0"
            >
              <Image src={image} alt={`Expanded ${title} project photo ${activePhoto.imageIndex + 1}`} fill sizes="100vw" className="object-contain p-2 md:p-6" priority />
            </motion.div>
          </AnimatePresence>

          <button type="button" onClick={onPrevious} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-colors hover:border-accent hover:bg-accent md:left-5 md:h-12 md:w-12" aria-label="Previous image">
            <ChevronLeft size={22} />
          </button>
          <button type="button" onClick={onNext} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-colors hover:border-accent hover:bg-accent md:right-5 md:h-12 md:w-12" aria-label="Next image">
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.1] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55 md:px-5">
          <span>Project capture</span>
          <span>{activePhoto.imageIndex + 1} / {activePhoto.images.length}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
