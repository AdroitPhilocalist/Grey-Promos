"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardCheck,
  MonitorCog,
  Palette,
  Radio,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

type CrewMember = {
  name: string;
  role: string;
  image: string;
  line: string;
  story: string;
  props: string[];
  accent: string;
  icon: LucideIcon;
};

const crewMembers: CrewMember[] = [
  {
    name: "Suman Das",
    role: "2D Designer",
    image: "/images/Suman_Das-Designer.png",
    line: "Argues with pixels until the layout finally agrees.",
    story:
      "The visual thinker turning blank screens, brand briefs, and last-minute references into clean campaign-ready artwork.",
    props: ["Pen tool panic", "Color swatches", "Moodboard storm"],
    accent: "from-sky-300/30 via-white/10 to-cyan-400/20",
    icon: Palette,
  },
  {
    name: "Bijoya Mandal",
    role: "MIS",
    image: "/images/Bijoya-Mandal-MIS.png",
    line: "Calmly survives spreadsheet cyclones before tea.",
    story:
      "The report room anchor who keeps dashboards, data, and daily trackers from becoming a full corporate weather event.",
    props: ["Invoice orbit", "Dashboard queen", "Clean columns"],
    accent: "from-violet-300/30 via-white/10 to-slate-300/20",
    icon: BarChart3,
  },
  {
    name: "Subhra",
    role: "MIS",
    image: "/images/Subhra-MIS.png",
    line: "Finds the missing number hiding in row 947.",
    story:
      "The detail hunter who spots mismatches, follows the data trail, and brings order to even the most dramatic reports.",
    props: ["Data detective", "Error hunter", "Report control"],
    accent: "from-emerald-300/25 via-white/10 to-cyan-300/20",
    icon: MonitorCog,
  },
  {
    name: "Ranjit Roy",
    role: "Business Development",
    image: "/images/Ranjit-Roy-BD.png",
    line: "Turns follow-ups, calls, and chaos into handshakes.",
    story:
      "The opportunity maker who keeps conversations moving, proposals alive, and new brand relationships on the table.",
    props: ["Deal radar", "Proposal wings", "Always ringing"],
    accent: "from-amber-300/30 via-white/10 to-orange-400/20",
    icon: BriefcaseBusiness,
  },
  {
    name: "Rakesh Singh",
    role: "Operations Team",
    image: "/images/Rakesh_Singh-OPS.png",
    line: "Says work, work, work, then somehow makes it all work.",
    story:
      "The on-ground commander coordinating people, timelines, materials, and event surprises without losing the plot.",
    props: ["Walkie-talkie mode", "Deadline whisperer", "Site captain"],
    accent: "from-blue-300/30 via-white/10 to-indigo-400/20",
    icon: Radio,
  },
  {
    name: "Pratish Mandal",
    role: "Operations Team",
    image: "/images/Pratish-Mandal-OPS.png",
    line: "Fixes ten event problems before the checklist catches up.",
    story:
      "The field force keeping activations moving when routes change, panels shift, and everything is needed yesterday.",
    props: ["Route map runner", "Task tornado", "Setup fixer"],
    accent: "from-rose-300/25 via-white/10 to-red-400/20",
    icon: ClipboardCheck,
  },
];

export default function TeamHierarchy() {
  const [activeMember, setActiveMember] = useState<CrewMember | null>(null);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="polka-section-accent right" />
      <div className="container-custom">
        <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent"
          >
            <Sparkles size={13} strokeWidth={1.8} />
            The Grey Promos Crew
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl font-display font-bold leading-tight tracking-tight text-white md:text-6xl"
          >
            Serious work, <span className="text-gradient">funny workdays.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed tracking-wide text-muted md:text-lg"
          >
            A playful look at the people who keep ideas, data, deals, and operations moving behind every Grey Promos experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {crewMembers.map((member, index) => (
            <CrewCard
              key={member.name}
              member={member}
              index={index}
              onSelect={() => setActiveMember(member)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeMember && (
          <CrewModal member={activeMember} onClose={() => setActiveMember(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function CrewCard({
  member,
  index,
  onSelect,
}: {
  member: CrewMember;
  index: number;
  onSelect: () => void;
}) {
  const Icon = member.icon;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      onClick={onSelect}
      className="group relative min-h-[560px] overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] text-left shadow-2xl shadow-black/20 outline-none transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-accent/70"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${member.accent} opacity-70`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.16),transparent_24%),linear-gradient(180deg,transparent_48%,rgba(0,0,0,0.78)_100%)]" />

      <motion.div
        aria-hidden="true"
        className="absolute right-6 top-8 z-10 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: index * 0.25, ease: "easeInOut" }}
      >
        {member.props[0]}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute left-6 top-28 z-10 hidden rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/55 backdrop-blur-md sm:block"
        animate={{ y: [0, 7, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5.2, repeat: Infinity, delay: index * 0.18, ease: "easeInOut" }}
      >
        {member.props[1]}
      </motion.div>

      <div className="absolute left-7 top-7 z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-white/80 backdrop-blur-md transition-colors duration-500 group-hover:text-accent">
        <Icon size={23} strokeWidth={1.7} />
      </div>

      <div className="relative h-[380px] overflow-hidden">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.045]"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/54 to-transparent" />
      </div>

      <div className="relative z-10 -mt-5 p-7 md:p-8">
        <div className="mb-4 inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
          {member.role}
        </div>
        <h3 className="text-3xl font-display font-bold tracking-tight text-white">
          {member.name}
        </h3>
        <p className="mt-4 text-base font-light leading-relaxed tracking-wide text-white/72">
          {member.line}
        </p>
      </div>
    </motion.button>
  );
}

function CrewModal({ member, onClose }: { member: CrewMember; onClose: () => void }) {
  const Icon = member.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[220] flex items-center justify-center bg-black/74 p-4 backdrop-blur-xl md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#070707] shadow-2xl shadow-black md:grid-cols-[1.05fr_0.95fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${member.accent} opacity-40`} />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-colors hover:text-white"
          aria-label="Close team profile"
        >
          <X size={18} />
        </button>

        <div className="relative min-h-[420px] overflow-hidden md:min-h-[640px]">
          <Image
            src={member.image}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-transparent to-black/10" />
        </div>

        <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-14">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-accent">
            <Icon size={31} strokeWidth={1.5} />
          </div>
          <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
            {member.role}
          </div>
          <h3 className="text-4xl font-display font-bold tracking-tight text-white md:text-6xl">
            {member.name}
          </h3>
          <p className="mt-7 text-xl font-light leading-relaxed tracking-wide text-white/84">
            {member.line}
          </p>
          <p className="mt-5 text-base font-light leading-relaxed tracking-wide text-muted md:text-lg">
            {member.story}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {member.props.map((prop) => (
              <span
                key={prop}
                className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60"
              >
                {prop}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
