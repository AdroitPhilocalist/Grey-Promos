"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Play, X, ZoomIn } from "lucide-react";

const workStories = [
  {
    title: "Events",
    label: "Live moments, built with precision",
    video: "/videos/Event.mp4",
    images: [
      "/images/Events/AMD-1.jpg",
      "/images/Events/AMD-2.jpg",
      "/images/Events/AMD-3.jpg",
      "/images/Events/AMD-4.jpg",
    ],
  },
  {
    title: "Activations",
    label: "Participation that brings brands closer",
    video: "/videos/Activation.mp4",
    images: [
      "/images/Activation/charged-1.jpeg",
      "/images/Activation/charged-2.jpeg",
      "/images/Activation/charged-3.jpeg",
      "/images/Activation/charged-4.png",
    ],
  },
  {
    title: "Branding",
    label: "Brand presence, built to be seen",
    video: "/videos/Branding.mp4",
    images: [
      "/images/Branding/coffee-more-1.jpeg",
      "/images/Branding/coffee-more-2.jpeg",
      "/images/Branding/coffee-more-3.jpeg",
      "/images/Branding/coffee-more-4.png",
    ],
  },
  {
    title: "Exhibitions",
    label: "Spaces made to pull people in",
    video: "/videos/Exhibition.mp4",
    images: [
      "/images/Exhibition/santasalo-1.jpeg",
      "/images/Exhibition/santasalo-2.jpeg",
      "/images/Exhibition/santasalo-3.jpeg",
      "/images/Exhibition/santasalo-4.png",
    ],
  },
];

type WorkStoryData = (typeof workStories)[number];
type ActivePhoto = {
  story: WorkStoryData;
  imageIndex: number;
};

export default function Marquee() {
  const [activePhoto, setActivePhoto] = useState<ActivePhoto | null>(null);

  useEffect(() => {
    if (!activePhoto) return;

    document.documentElement.classList.add("modal-open");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowRight") {
        setActivePhoto((current) => current && ({
          ...current,
          imageIndex: (current.imageIndex + 1) % current.story.images.length,
        }));
      }
      if (event.key === "ArrowLeft") {
        setActivePhoto((current) => current && ({
          ...current,
          imageIndex: (current.imageIndex - 1 + current.story.images.length) % current.story.images.length,
        }));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activePhoto]);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="polka-section-accent" />
      <div className="polka-section-accent right" />

      <div className="container-custom relative">
        <div className="grid gap-7 border-b border-white/[0.08] pb-10 md:grid-cols-[1.05fr_0.95fr] md:items-end md:pb-14">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              Real work, in motion
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-5xl font-display font-bold leading-[0.96] tracking-tight md:text-7xl">
              Witness the <span className="text-gradient">Extraordinary</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="max-w-xl text-base font-light leading-relaxed tracking-wide text-muted md:justify-self-end md:text-lg">
            A first look at the real spaces, structures, and live brand moments built by Grey Promos India on ground.
          </motion.p>
        </div>

        <div className="mt-10 space-y-14 md:mt-14 md:space-y-20">
          {workStories.map((story, index) => <WorkStory key={story.title} story={story} index={index} onPhotoOpen={(imageIndex) => setActivePhoto({ story, imageIndex })} />)}
        </div>
      </div>

      <AnimatePresence>
        {activePhoto && (
          <PhotoLightbox
            activePhoto={activePhoto}
            onClose={() => setActivePhoto(null)}
            onNext={() => setActivePhoto((current) => current && ({ ...current, imageIndex: (current.imageIndex + 1) % current.story.images.length }))}
            onPrevious={() => setActivePhoto((current) => current && ({ ...current, imageIndex: (current.imageIndex - 1 + current.story.images.length) % current.story.images.length }))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function WorkStory({ story, index, onPhotoOpen }: { story: WorkStoryData; index: number; onPhotoOpen: (imageIndex: number) => void }) {
  const { ref, inView } = useInView({ rootMargin: "240px 0px", triggerOnce: false });

  return (
    <motion.article ref={ref} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
      <div className="mb-5 flex items-end justify-between gap-4 md:mb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent">0{index + 1} / {story.title}</p>
          <h3 className="mt-2 text-2xl font-display font-bold tracking-tight text-white md:text-3xl">{story.label}</h3>
        </div>
        <p className="hidden text-right text-[9px] font-bold uppercase tracking-[0.18em] text-muted/65 sm:block">Feature film + selected captures</p>
      </div>

      <div className={`grid gap-4 lg:grid-cols-[1.35fr_0.65fr] lg:gap-6 ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
        <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.4 }} className="relative aspect-video overflow-hidden rounded-lg border border-white/[0.12] bg-black shadow-2xl shadow-black/35 lg:[direction:ltr]">
          {inView && <video src={story.video} autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <span className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/20 text-white/90 backdrop-blur-md" aria-label="Featured video"><Play size={14} fill="currentColor" /></span>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 lg:grid-rows-2 lg:gap-4 lg:[direction:ltr]">
          {story.images.map((image, imageIndex) => (
            <motion.button key={image} type="button" onClick={() => onPhotoOpen(imageIndex)} whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-white/[0.1] bg-white/[0.03] text-left outline-none transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 lg:aspect-auto lg:min-h-0" aria-label={`View ${story.title} photo ${imageIndex + 1}`}>
              <Image src={image} alt={`Grey Promos India ${story.title.toLowerCase()} work, frame ${imageIndex + 1}`} fill sizes="(max-width: 1024px) 50vw, 24vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full border border-white/25 bg-black/35 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ZoomIn size={16} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function PhotoLightbox({
  activePhoto,
  onClose,
  onNext,
  onPrevious,
}: {
  activePhoto: ActivePhoto;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const image = activePhoto.story.images[activePhoto.imageIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/82 p-3 backdrop-blur-xl md:p-8"
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
        aria-label={`${activePhoto.story.title} image viewer`}
        data-lenis-prevent
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.985 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[86dvh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.14] bg-[#050505] shadow-2xl shadow-black/70"
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.1] px-4 py-3 md:px-5">
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-accent">{activePhoto.story.title}</p>
            <p className="mt-1 truncate text-sm text-white/72">{activePhoto.story.label}</p>
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
              <Image src={image} alt={`Expanded ${activePhoto.story.title} project photo ${activePhoto.imageIndex + 1}`} fill sizes="100vw" className="object-contain p-2 md:p-6" priority />
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
          <span>Selected capture</span>
          <span>{activePhoto.imageIndex + 1} / {activePhoto.story.images.length}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
