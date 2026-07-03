"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Crown,
  Headset,
  Palette,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  group: "Leadership" | "Business" | "Operations" | "Systems" | "Creative";
  tier: "director" | "lead" | "team";
  writeup?: string;
};

type TeamGroup = {
  title: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  members: TeamMember[];
};

const imagePath = (file: string) => `/images/Team-members/${encodeURIComponent(file)}`;

const teamMembers: TeamMember[] = [
  {
    name: "Aditya Shaw",
    role: "Founder & Director",
    image: imagePath("ADITYA SHAW.jpg"),
    group: "Leadership",
    tier: "director",
    writeup:
      "A business leader with over 16 years of experience in advertising, branding, and event management. As Founder & Director of Grey Promos India Private Limited, he leads the company’s branding, advertising, events, and promotional solutions with a focus on creativity, strategy, and excellence.",
  },
  {
    name: "Anil Shaw",
    role: "Founder & Director",
    image: imagePath("ANIL SHAW.jpg"),
    group: "Leadership",
    tier: "director",
    writeup:
      "With over 10 years of experience across marketing, brand management, and digital strategy, Anil brings a hands-on growth mindset to Grey Promos. His belief in making stars out of scratches reflects the journey, resilience, and ambition behind the brand.",
  },
  {
    name: "Mita Dutta",
    role: "Director (HR)",
    image: imagePath("MITA DUTTA.jpg"),
    group: "Leadership",
    tier: "director",
    writeup:
      "Mita leads human resources, talent strategy, and workforce logistics with strength in communication, recruitment, employee relations, conflict resolution, and HR policy. She helps keep the people system behind large-scale execution organized and reliable.",
  },
  {
    name: "Susmita Panda",
    role: "Creative Director",
    image: imagePath("SUSMITA PANDA.jpg"),
    group: "Leadership",
    tier: "director",
    writeup:
      "Susmita transforms ideas into visual experiences that align with business goals. Her work blends creativity with strategy, helping teams deliver solutions that are visually engaging, brand-focused, and results-driven.",
  },
  { name: "Goloke Ganguly", role: "Commercial Head", image: imagePath("GOLOKE GANGULLY.jpg"), group: "Business", tier: "lead" },
  { name: "Koushik Mullick", role: "Account Head", image: imagePath("KOUSHIK MULLICK.jpg"), group: "Business", tier: "lead" },
  { name: "Pankaj Jaiswal", role: "Accountant", image: imagePath("PANKAJ JAISWAL.jpg"), group: "Business", tier: "team" },
  { name: "Sanjeeb Roy", role: "Business Development", image: imagePath("SANJEEB ROY.jpg"), group: "Business", tier: "team" },
  { name: "Ranjit Roy", role: "Business Development", image: imagePath("RANJIT ROY.jpg"), group: "Business", tier: "team" },
  { name: "Taniya Maity", role: "Client Service", image: imagePath("TANIYA MAITY.jpg"), group: "Business", tier: "team" },
  { name: "Soumen Dasgupta", role: "Client Service (MICE)", image: imagePath("SOUMEN DASGUPTA.jpg"), group: "Business", tier: "team" },
  { name: "Rakesh Singh", role: "Operations (Activation)", image: imagePath("RAKESH SINGH.jpg"), group: "Operations", tier: "lead" },
  { name: "Pratish Mandal", role: "Operations (Activation)", image: imagePath("PRATISH MANDAL.jpg"), group: "Operations", tier: "team" },
  { name: "Ashish Sharma", role: "Operations (Activation)", image: imagePath("ASHISH SHARMA.jpg"), group: "Operations", tier: "team" },
  { name: "Aman Shaw", role: "Operations (Events)", image: imagePath("AMAN SHAW.jpg"), group: "Operations", tier: "team" },
  { name: "Tanmay Mitra", role: "Operations (Activation)", image: imagePath("TANMAY MITRA.jpg"), group: "Operations", tier: "team" },
  { name: "Dhiraj Jha", role: "Operations (Activation)", image: imagePath("DHIRAJ JHA.jpg"), group: "Operations", tier: "team" },
  { name: "Subhra Nath", role: "MIS", image: imagePath("SUBHRA NATH.jpg"), group: "Systems", tier: "team" },
  { name: "Bijoya Mondal", role: "MIS", image: imagePath("BIJOYA MONDAL.jpg"), group: "Systems", tier: "team" },
  { name: "Ankit Paul", role: "Designer (3D)", image: imagePath("ANKIT PAUL.jpg"), group: "Creative", tier: "team" },
  { name: "Suman Das", role: "Designer (2D)", image: imagePath("SUMAN DAS.jpg"), group: "Creative", tier: "team" },
];

const groupMeta = {
  Business: {
    title: "Commercial, Accounts & Client Relations",
    eyebrow: "Business layer",
    description: "The team that keeps relationships, accounts, commercials, and client coordination moving with clarity.",
    icon: BriefcaseBusiness,
  },
  Operations: {
    title: "Operations Execution",
    eyebrow: "On-ground layer",
    description: "Activation and events specialists who translate plans into live execution across venues, stores, and public spaces.",
    icon: ShieldCheck,
  },
  Systems: {
    title: "MIS & Reporting",
    eyebrow: "Control layer",
    description: "The reporting backbone that keeps data, trackers, and operational visibility aligned.",
    icon: BarChart3,
  },
  Creative: {
    title: "Design Studio",
    eyebrow: "Visual layer",
    description: "2D and 3D design support for campaign visuals, spatial ideas, and brand presentation.",
    icon: Palette,
  },
} satisfies Record<Exclude<TeamMember["group"], "Leadership">, Omit<TeamGroup, "members">>;

export default function TeamHierarchy() {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const directors = teamMembers.filter((member) => member.group === "Leadership");
  const groups = useMemo<TeamGroup[]>(
    () =>
      (Object.keys(groupMeta) as Array<keyof typeof groupMeta>).map((key) => ({
        ...groupMeta[key],
        members: teamMembers.filter((member) => member.group === key),
      })),
    []
  );

  useEffect(() => {
    if (!activeMember) return;

    document.documentElement.classList.add("modal-open");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMember(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeMember]);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="polka-section-accent right" />
      <div className="container-custom">
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent"
          >
            <Building2 size={13} strokeWidth={1.8} />
            Official Team Structure
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl font-display font-bold leading-tight tracking-tight text-[var(--foreground)] md:text-6xl"
          >
            Leadership at the top. <span className="text-gradient">Execution at every level.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed tracking-wide text-muted md:text-lg"
          >
            A clear view of the people behind Grey Promos, arranged by responsibility so clients can understand the depth behind every project.
          </motion.p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-accent/50 via-white/10 to-transparent lg:block" />

          <div className="relative rounded-[1.75rem] border border-white/[0.1] bg-white/[0.025] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Board & Direction</p>
                <h3 className="mt-2 text-2xl font-display font-bold tracking-tight text-[var(--foreground)] md:text-3xl">Directors</h3>
              </div>
              <Crown className="text-accent" size={28} strokeWidth={1.5} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {directors.map((member, index) => (
                <DirectorCard key={member.name} member={member} index={index} onSelect={() => setActiveMember(member)} />
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {groups.map((group, index) => (
              <TeamGroupBlock key={group.title} group={group} index={index} onSelect={setActiveMember} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeMember && <MemberModal member={activeMember} onClose={() => setActiveMember(null)} />}
      </AnimatePresence>
    </section>
  );
}

function DirectorCard({ member, index, onSelect }: { member: TeamMember; index: number; onSelect: () => void }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      onClick={onSelect}
      className="group relative overflow-hidden rounded-[1.35rem] border border-white/[0.1] bg-black/20 text-left outline-none transition-colors duration-500 hover:border-accent/45 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-accent/70"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,74,28,0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
      <div className="relative aspect-[4/4.7] overflow-hidden bg-black">
        <Image src={member.image} alt={`${member.name}, ${member.role}`} fill sizes="(min-width: 1280px) 22vw, (min-width: 768px) 44vw, 92vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.045]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/55 to-transparent" />
      </div>
      <div className="relative p-5">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-accent">
          <BadgeCheck size={12} />
          {member.role}
        </div>
        <h4 className="text-2xl font-display font-bold tracking-tight text-white">{member.name}</h4>
        <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-white/64">{member.writeup}</p>
      </div>
    </motion.button>
  );
}

function TeamGroupBlock({ group, index, onSelect }: { group: TeamGroup; index: number; onSelect: (member: TeamMember) => void }) {
  const Icon = group.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.022] p-4 backdrop-blur-xl md:p-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_90%_12%,rgba(255,74,28,0.08),transparent_32%)]" />
      <div className="relative mb-5 flex items-start gap-4 border-b border-white/[0.08] pb-5">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/25 text-accent">
          <Icon size={22} strokeWidth={1.7} />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-accent">{group.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-display font-bold leading-tight tracking-tight text-[var(--foreground)]">{group.title}</h3>
          <p className="mt-2 text-sm font-light leading-relaxed text-muted">{group.description}</p>
        </div>
      </div>

      <div className="relative grid gap-3 sm:grid-cols-2">
        {group.members.map((member, memberIndex) => (
          <MemberTile key={member.name} member={member} index={memberIndex} onSelect={() => onSelect(member)} />
        ))}
      </div>
    </motion.div>
  );
}

function MemberTile({ member, index, onSelect }: { member: TeamMember; index: number; onSelect: () => void }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.035 }}
      onClick={onSelect}
      className="group grid grid-cols-[5.5rem_1fr] items-center gap-4 rounded-2xl border border-white/[0.08] bg-black/15 p-3 text-left outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-accent/70"
    >
      <div className="relative h-24 overflow-hidden rounded-xl bg-black">
        <Image src={member.image} alt={`${member.name}, ${member.role}`} fill sizes="112px" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-lg font-display font-bold tracking-tight text-[var(--foreground)]">{member.name}</p>
        <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-muted">{member.role}</p>
      </div>
    </motion.button>
  );
}

function MemberModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const defaultText =
    "A key member of the Grey Promos team, contributing to the planning, coordination, and execution systems that help every brand experience move with discipline and care.";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[220] flex items-end justify-center bg-black/74 p-3 backdrop-blur-xl md:items-center md:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name} profile`}
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid max-h-[88dvh] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-[1.5rem] border border-white/[0.1] bg-[#070707] shadow-2xl shadow-black md:grid-cols-[1.25fr_0.95fr]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/75 backdrop-blur-md transition-colors hover:border-accent hover:bg-accent hover:text-white"
          aria-label="Close team profile"
        >
          <X size={18} />
        </button>

        <div className="relative min-h-[420px] overflow-hidden bg-black md:min-h-[640px]">
          <Image src={member.image} alt={`${member.name}, ${member.role}`} fill sizes="(min-width: 1280px) 58vw, (min-width: 768px) 54vw, 100vw" className="object-cover object-top" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
        </div>

        <div className="relative z-10 flex flex-col justify-center p-7 md:p-10">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-accent">
            {member.tier === "director" ? <Crown size={13} /> : <UsersRound size={13} />}
            {member.group}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/50">{member.role}</p>
          <h3 className="mt-3 text-4xl font-display font-bold tracking-tight text-white md:text-5xl">{member.name}</h3>
          <p className="mt-6 text-base font-light leading-relaxed tracking-wide text-white/72 md:text-lg">
            {member.writeup ?? defaultText}
          </p>

          <div className="mt-8 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">Designation</p>
              <p className="mt-2 text-sm text-white/78">{member.role}</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">Team Layer</p>
              <p className="mt-2 text-sm text-white/78">{member.group}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
