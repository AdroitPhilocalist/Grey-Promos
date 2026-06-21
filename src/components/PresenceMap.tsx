"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Crosshair, ExternalLink, MapPin, Network } from "lucide-react";
import { operations } from "@/data/operations";
import { cn } from "@/lib/utils";

type MapPoint = { id: string; kind: "office" | "zone"; title: string; eyebrow: string; detail: string; lat: number; lng: number; mapUrl?: string };
type GeoFeature = { properties?: { name?: string; admin?: string }; geometry?: { type: "Polygon" | "MultiPolygon"; coordinates: number[][][] | number[][][][] } };
type WorldMap = { features: GeoFeature[] };

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
const INDIA_VIEWBOX = "620 120 210 145";

function project([lng, lat]: number[]) {
  return [((lng + 180) / 360) * MAP_WIDTH, ((90 - lat) / 180) * MAP_HEIGHT];
}

function ringPath(ring: number[][]) {
  return `${ring.map((coordinate, index) => {
    const [x, y] = project(coordinate);
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ")} Z`;
}

function geometryPath(feature: GeoFeature) {
  if (!feature.geometry) return "";
  const polygons = feature.geometry.type === "Polygon"
    ? [feature.geometry.coordinates as number[][][]]
    : feature.geometry.coordinates as number[][][][];
  return polygons.flatMap((polygon) => polygon.map(ringPath)).join(" ");
}

const officePoints: MapPoint[] = operations.offices.map((office) => ({
  id: office.id,
  kind: "office",
  title: office.city,
  eyebrow: office.type,
  detail: office.address.join(", "),
  lat: office.lat,
  lng: office.lng,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.address.join(", ")}, India`)}`,
}));

const operationalPoints: MapPoint[] = [
  { id: "north-india", kind: "zone", title: "North India", eyebrow: "Operational zone", detail: "Delhi and Uttar Pradesh", lat: 30.8, lng: 76.2 },
  { id: "east-india", kind: "zone", title: "East India", eyebrow: "Operational zone", detail: "West Bengal, North East, Bihar, Jharkhand, and Odisha", lat: 24.8, lng: 85.3 },
  { id: "west-india", kind: "zone", title: "West India", eyebrow: "Operational zone", detail: "Mumbai and surrounding western markets", lat: 20.5, lng: 69.8 },
  { id: "south-india", kind: "zone", title: "South India", eyebrow: "Operational zone", detail: "Chennai, Bangalore, Hyderabad, Kochi, and Coimbatore", lat: 13.7, lng: 80.7 },
  { id: "dubai", kind: "zone", title: "Dubai, UAE", eyebrow: "International operations", detail: "Middle East campaign support", lat: 25.2048, lng: 55.2708 },
  { id: "bangkok", kind: "zone", title: "Bangkok, Thailand", eyebrow: "International operations", detail: "South East Asia campaign support", lat: 13.7563, lng: 100.5018 },
  { id: "kuala-lumpur", kind: "zone", title: "Kuala Lumpur, Malaysia", eyebrow: "International operations", detail: "South East Asia campaign support", lat: 3.139, lng: 101.6869 },
];

const allPoints = [...officePoints, ...operationalPoints];

export default function PresenceMap() {
  const [activeKind, setActiveKind] = useState<MapPoint["kind"]>("office");
  const [activeId, setActiveId] = useState(officePoints[0].id);
  const [countryPaths, setCountryPaths] = useState<Array<{ name: string; path: string }>>([]);
  const [isCompactMap, setIsCompactMap] = useState(false);
  const activePoint = useMemo(() => allPoints.find((point) => point.id === activeId) ?? officePoints[0], [activeId]);
  const visiblePoints = activeKind === "office" ? officePoints : operationalPoints;

  useEffect(() => {
    let isCurrent = true;

    fetch("/world-map.json")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Map data unavailable")))
      .then((data: WorldMap) => {
        if (!isCurrent) return;
        setCountryPaths(data.features.map((feature) => ({
          name: feature.properties?.name || feature.properties?.admin || "",
          path: geometryPath(feature),
        })));
      })
      .catch(() => {
        // The location list remains usable even if the decorative map data cannot load.
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMapViewport = () => setIsCompactMap(mediaQuery.matches);

    updateMapViewport();
    mediaQuery.addEventListener("change", updateMapViewport);
    return () => mediaQuery.removeEventListener("change", updateMapViewport);
  }, []);

  const selectPoint = (point: MapPoint) => {
    setActiveKind(point.kind);
    setActiveId(point.id);
  };

  const selectKind = (kind: MapPoint["kind"]) => {
    setActiveKind(kind);
    setActiveId((kind === "office" ? officePoints : operationalPoints)[0].id);
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="polka-section-accent right" />
      <div className="container-custom relative">
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Presence, mapped</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-5xl font-display font-bold leading-[0.97] tracking-tight md:text-7xl">Local offices. <span className="text-gradient">Wider operational reach.</span></motion.h2>
          <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="mt-6 max-w-2xl text-base font-light leading-relaxed tracking-wide text-muted md:text-lg">Three Indian offices anchor a campaign network spanning key Indian regions and selected international markets.</motion.p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] lg:gap-7">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-black/20 shadow-2xl shadow-black/20">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 backdrop-blur-md md:left-6 md:top-6"><Crosshair size={12} /> Interactive network map</div>
            <div className="absolute bottom-4 left-4 z-10 flex gap-3 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.17em] text-white/65 backdrop-blur-md md:bottom-6 md:left-6"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(255,74,28,0.8)]" /> Offices</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]" /> Operations</span></div>
            <svg viewBox={isCompactMap ? INDIA_VIEWBOX : `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="block aspect-[1.45/1] w-full min-h-[270px]" aria-label={isCompactMap ? "India map showing Grey Promos offices and operational zones" : "World map showing Grey Promos offices and operational zones"}>
              <rect width={MAP_WIDTH} height={MAP_HEIGHT} className="presence-map-ocean" />
              <g className="presence-map-countries">{countryPaths.map(({ name, path }) => <path key={name} d={path} className={name === "India" ? "presence-map-india" : "presence-map-country"} />)}</g>
              <g className="pointer-events-none opacity-35">{[0.2, 0.4, 0.6, 0.8].map((ratio) => <path key={`v-${ratio}`} d={`M${MAP_WIDTH * ratio} 0 V${MAP_HEIGHT}`} className="presence-map-grid" />)}{[0.25, 0.5, 0.75].map((ratio) => <path key={`h-${ratio}`} d={`M0 ${MAP_HEIGHT * ratio} H${MAP_WIDTH}`} className="presence-map-grid" />)}</g>
              {allPoints.map((point) => {
                const [x, y] = project([point.lng, point.lat]);
                const isSelected = activePoint.id === point.id;
                const isOffice = point.kind === "office";
                return <g key={point.id} transform={`translate(${x} ${y})`} role="button" tabIndex={0} aria-label={`${point.eyebrow}: ${point.title}`} onClick={() => selectPoint(point)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectPoint(point); } }} className="cursor-pointer outline-none transition-opacity duration-300" opacity={isSelected ? 1 : 0.2}>
                  {isSelected && <circle r="17" className={isOffice ? "presence-map-office-pulse" : "presence-map-zone-pulse"} />}
                  <circle r={isSelected ? (isOffice ? 8 : 7) : (isOffice ? 6 : 5)} className={isOffice ? "presence-map-office" : "presence-map-zone"} />
                  {isOffice && <circle r="2" fill="white" />}
                </g>;
              })}
            </svg>
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4 backdrop-blur-xl sm:p-5">
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/[0.08] bg-black/15 p-1.5">
              <button type="button" onClick={() => selectKind("office")} className={cn("flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors", activeKind === "office" ? "bg-white text-black" : "text-muted hover:text-white")}><Building2 size={14} /> Offices</button>
              <button type="button" onClick={() => selectKind("zone")} className={cn("flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors", activeKind === "zone" ? "bg-white text-black" : "text-muted hover:text-white")}><Network size={14} /> Operations</button>
            </div>
            <div className="mt-4 max-h-[16rem] space-y-1 overflow-y-auto pr-1" data-lenis-prevent>
              {visiblePoints.map((point) => {
                const isSelected = activePoint.id === point.id;
                return <button key={point.id} type="button" onClick={() => selectPoint(point)} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors", isSelected ? "bg-accent/10 text-white" : "text-muted hover:bg-white/[0.045] hover:text-white")}>
                  <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border", point.kind === "office" ? "border-accent/30 bg-accent/10 text-accent" : "border-cyan-300/25 bg-cyan-300/10 text-cyan-200")}>{point.kind === "office" ? <MapPin size={15} /> : <Network size={15} />}</span>
                  <span className="min-w-0"><span className="block truncate text-sm font-display font-bold">{point.title}</span><span className="mt-0.5 block truncate text-[9px] font-bold uppercase tracking-[0.15em] text-muted/70">{point.eyebrow}</span></span>
                </button>;
              })}
            </div>
            <motion.div key={activePoint.id} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} className="mt-4 border-t border-white/[0.08] px-2 pb-2 pt-5">
              <p className={cn("text-[9px] font-bold uppercase tracking-[0.22em]", activePoint.kind === "office" ? "text-accent" : "text-cyan-200")}>{activePoint.eyebrow}</p>
              <h3 className="mt-2 text-2xl font-display font-bold tracking-tight text-white">{activePoint.title}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-muted">{activePoint.detail}</p>
              {activePoint.kind === "office" && activePoint.mapUrl && (
                <a href={activePoint.mapUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-accent transition-colors hover:bg-accent hover:text-white">
                  Open in Google Maps <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
