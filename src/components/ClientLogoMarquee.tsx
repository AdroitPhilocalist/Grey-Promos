"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { clients } from "@/data/clients";

const clientLogos: Record<string, { src: string; fit?: "contain" | "cover"; padded?: boolean }> = {
  AMD: { src: "/logos/AMD.png" },
  Bosch: { src: "/logos/bosch.png" },
  BookMyShow: { src: "/logos/bms.png" },
  Chevrolet: { src: "/logos/chevrolet.jpeg", padded: true },
  "Harley-Davidson": { src: "/logos/Harley-Davidson.png" },
  Hyundai: { src: "/logos/hyundai.png" },
  IBM: { src: "/logos/IBM.png" },
  Intel: { src: "/logos/intel.png" },
  Jeep: { src: "/logos/Jeep.jpeg", padded: true },
  Kia: { src: "/logos/KIA.png" },
  KTM: { src: "/logos/KTM.jpeg", padded: true },
  Lenovo: { src: "/logos/Lenovo.png" },
  "Mitsubishi Electric": { src: "/logos/mitshubishi_electric.png" },
  Netmeds: { src: "/logos/netmeds.png" },
  "P.C. Chandra Jewellers": { src: "/logos/pc-chandra.png" },
  Ryzen: { src: "/logos/Ryzen.jpeg", padded: true },
  "Senco Gold": { src: "/logos/senco.jpeg", padded: true },
  "Tata Motors": { src: "/logos/tata-motors.png" },
  Tanishq: { src: "/logos/Tanishq.jpeg", padded: true },
  TBZ: { src: "/logos/TBZ.png" },
  Triumph: { src: "/logos/Triumph.png" },
  Vivo: { src: "/logos/vivo.png" },
  Volkswagen: { src: "/logos/volkswagen.jpeg", padded: true },
};

const marqueeRows = [
  clients.slice(0, Math.ceil(clients.length / 2)),
  clients.slice(Math.ceil(clients.length / 2)),
];

function ClientLogoTile({ client }: { client: string }) {
  const logo = clientLogos[client];

  return (
    <div className="group mx-3 flex h-28 min-w-[300px] items-center gap-5 rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] px-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/35 hover:bg-white/[0.045] md:h-32 md:min-w-[360px] md:px-6">
      <div className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.92] p-3 shadow-2xl shadow-black/20 transition-all duration-500 group-hover:bg-white md:h-20 md:w-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_42%)]" />
        {logo ? (
          <Image
            src={logo.src}
            alt={`${client} logo`}
            fill
            sizes="112px"
            className={`${logo.fit === "cover" ? "object-cover" : "object-contain"} ${logo.padded ? "p-2" : "p-3"}`}
          />
        ) : (
          <span className="relative font-display text-sm font-black tracking-tight text-black md:text-base">
            {client.slice(0, 3).toUpperCase()}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
          Client Partner
        </div>
        <div className="mt-1 truncate font-display text-xl font-bold tracking-tight text-white/80 transition-colors duration-500 group-hover:text-white md:text-2xl">
          {client}
        </div>
      </div>
    </div>
  );
}

function ClientLogoMarqueeRow({
  row,
  reverse = false,
}: {
  row: string[];
  reverse?: boolean;
}) {
  return (
    <div className="flex overflow-hidden">
      {[...Array(2)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ x: reverse ? "-100%" : "0%" }}
          animate={{ x: reverse ? "0%" : "-100%" }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 items-center py-2"
        >
          {row.map((client) => (
            <ClientLogoTile key={`${client}-${index}`} client={client} />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export function ClientLogoMarqueeText() {
  return (
    <div className="container-custom relative z-10 mb-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-accent"
          >
            Client Spectrum
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl font-bold leading-tight tracking-tighter text-white md:text-6xl"
          >
            Brands We Have <span className="text-gradient">Served</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="max-w-md text-sm font-light leading-relaxed tracking-wide text-muted md:text-base"
        >
          A moving cross-section of automotive, technology, retail, entertainment, healthcare, and jewellery brands.
        </motion.p>
      </div>
    </div>
  );
}

export function ClientLogoRollingStrip() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-background to-transparent md:w-44" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-background to-transparent md:w-44" />
      <ClientLogoMarqueeRow row={marqueeRows[0]} />
      <ClientLogoMarqueeRow row={marqueeRows[1]} reverse />
    </div>
  );
}

export default function ClientLogoMarquee() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="polka-section-accent right" />
      <div className="absolute left-8 top-16 hidden h-32 w-56 rotate-12 rounded-[2rem] opacity-50 md:block bg-[radial-gradient(circle,rgba(255,255,255,0.52)_1.5px,transparent_2.5px)] [background-size:15px_15px] [mask-image:linear-gradient(135deg,#000,transparent_78%)]" />
      <div className="absolute bottom-16 right-12 hidden h-40 w-64 -rotate-12 rounded-[2rem] opacity-60 md:block bg-[radial-gradient(circle,rgba(255,255,255,0.36)_1.6px,transparent_2.7px)] [background-size:42px_42px] [mask-image:linear-gradient(315deg,#000,transparent_76%)]" />

      <ClientLogoMarqueeText />
      <ClientLogoRollingStrip />
    </section>
  );
}
