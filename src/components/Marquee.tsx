"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";

const workStories = [
  {
    title: "Events",
    label: "Live moments, built with precision",
    video: "/videos/Event.mp4",
    images: [
      "/images/Events/DSC_6200.JPG",
      "/images/Events/DSC_6212.JPG",
      "/images/Events/DSC_6283.JPG",
      "/images/Events/RMP_5670.JPG",
    ],
  },
  {
    title: "Activations",
    label: "Participation that brings brands closer",
    video: "/videos/Activation.mp4",
    images: [
      "/images/Activation/WhatsApp%20Image%202021-03-11%20at%2015.54.24.jpeg",
      "/images/Activation/WhatsApp%20Image%202021-04-02%20at%2012.15.18%20PM%20(1).jpeg",
      "/images/Activation/WhatsApp%20Image%202022-10-10%20at%2012.04.28%20AM.jpeg",
      "/images/Activation/WhatsApp%20Image%202023-07-20%20at%208.43.48%20PM.jpeg",
    ],
  },
  {
    title: "Branding",
    label: "Brand presence, built to be seen",
    video: "/videos/Branding.mp4",
    images: [
      "/images/Branding/WhatsApp%20Image%202021-08-27%20at%209.39.57%20PM.jpeg",
      "/images/Branding/WhatsApp%20Image%202021-08-31%20at%204.15.27%20PM%20(1).jpeg",
      "/images/Branding/WhatsApp%20Image%202022-05-17%20at%2012.06.51%20PM%20(1).jpeg",
      "/images/Branding/WhatsApp%20Image%202022-10-09%20at%2011.26.52%20PM%20(2).jpeg",
    ],
  },
  {
    title: "Exhibitions",
    label: "Spaces made to pull people in",
    video: "/videos/Exhibition.mp4",
    images: [
      "/images/Exhibition/DEB_3696.JPG",
      "/images/Exhibition/WhatsApp%20Image%202022-05-17%20at%2011.44.24%20AM.jpeg",
      "/images/Exhibition/WhatsApp%20Image%202022-05-17%20at%2012.09.09%20PM.jpeg",
      "/images/Exhibition/WhatsApp%20Image%202026-06-20%20at%206.55.00%20PM.jpeg",
    ],
  },
];

type WorkStoryData = (typeof workStories)[number];

export default function Marquee() {
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
            A first look at the real spaces, structures, and live brand moments built by Grey Promos on ground.
          </motion.p>
        </div>

        <div className="mt-10 space-y-14 md:mt-14 md:space-y-20">
          {workStories.map((story, index) => <WorkStory key={story.title} story={story} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function WorkStory({ story, index }: { story: WorkStoryData; index: number }) {
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
            <motion.figure key={image} whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-white/[0.1] bg-white/[0.03] lg:aspect-auto lg:min-h-0">
              <Image src={image} alt={`Grey Promos ${story.title.toLowerCase()} work, frame ${imageIndex + 1}`} fill sizes="(max-width: 1024px) 50vw, 24vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.figure>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
