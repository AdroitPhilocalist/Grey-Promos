"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { operations } from "@/data/operations";

const World = dynamic(() => import("./Globe").then((m) => m.World), {
  ssr: false,
});

type PresenceLocation = {
  label: string;
  displayLabel?: string;
  lat: number;
  lng: number;
  scope: "india" | "global";
};

type ActivePresence = {
  label: string;
  scope?: "hub" | "india" | "global";
};

const hq = {
  label: "Kolkata",
  displayLabel: "Kolkata HQ",
  lat: 22.5726,
  lng: 88.3639,
};

const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Bangkok: { lat: 13.7563, lng: 100.5018 },
  Bihar: { lat: 25.5941, lng: 85.1376 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Coimbatore: { lat: 11.0168, lng: 76.9558 },
  Delhi: { lat: 28.6139, lng: 77.209 },
  Dubai: { lat: 25.2048, lng: 55.2708 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Jharkhand: { lat: 23.3441, lng: 85.3096 },
  Kochi: { lat: 9.9312, lng: 76.2673 },
  "Kuala Lumpur": { lat: 3.139, lng: 101.6869 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  "North East": { lat: 26.1445, lng: 91.7362 },
  Odisha: { lat: 20.2961, lng: 85.8245 },
  UP: { lat: 26.8467, lng: 80.9462 },
  "West Bengal": { lat: 23.2324, lng: 87.8615 },
};

const routeColors = {
  india: "#06b6d4",
  global: "#6366f1",
};

const arcAltitude = (location: PresenceLocation) =>
  location.scope === "global" ? 0.34 : Math.max(0.13, Math.min(0.22, Math.abs(location.lng - hq.lng) / 110));

const indiaLocations = operations.india.flatMap((region) =>
  region.locations.flatMap((location) => {
    const coordinates = locationCoordinates[location];

    if (!coordinates) return [];

    return [{
      label: location,
      displayLabel: location,
      scope: "india" as const,
      ...coordinates,
    }];
  })
);

const globalLocations = operations.international.flatMap((country) =>
  country.locations.flatMap((location) => {
    const coordinates = locationCoordinates[location];

    if (!coordinates) return [];

    return [{
      label: location,
      displayLabel: `${location}, ${country.country}`,
      scope: "global" as const,
      ...coordinates,
    }];
  })
);

const presenceRoutes = [...indiaLocations, ...globalLocations].map((location, index) => ({
  order: index + 1,
  startLat: hq.lat,
  startLng: hq.lng,
  startLabel: hq.displayLabel,
  startScope: "hub" as const,
  endLat: location.lat,
  endLng: location.lng,
  endLabel: location.displayLabel,
  endScope: location.scope,
  arcAlt: arcAltitude(location),
  color: location.scope === "global" ? routeColors.global : routeColors.india,
}));

export function GridGlobe() {
  const [activePresence, setActivePresence] = useState<ActivePresence | null>(null);

  const globeConfig = {
    pointSize: 4.4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#7dd3fc",
    atmosphereAltitude: 0.12,
    emissive: "#062056",
    emissiveIntensity: 0.12,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.48)",
    ambientLight: "#7dd3fc",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1800,
    arcLength: 0.72,
    rings: 1,
    maxRings: 3.6,
    initialPosition: { lat: 22.5726, lng: 88.3639 },
    autoRotate: true,
    autoRotateSpeed: 0.42,
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 z-40 h-44 pointer-events-none select-none bg-gradient-to-b from-transparent to-[#030303]" />
        <div className="pointer-events-none absolute bottom-8 left-8 right-8 z-50 md:bottom-auto md:left-auto md:right-10 md:top-10 md:w-[320px]">
          <div className="overflow-hidden rounded-[1.25rem] border border-white/[0.1] bg-[#050b16]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  activePresence?.scope === "global"
                    ? "bg-indigo-300 shadow-[0_0_18px_rgba(165,180,252,0.8)]"
                    : "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.75)]"
                }`}
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                {activePresence?.scope === "global"
                  ? "Global Presence"
                  : activePresence?.scope === "india"
                    ? "India Presence"
                    : activePresence?.scope === "hub"
                      ? "Headquarters"
                      : "Grey Promos Network"}
              </span>
            </div>
            <div className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              {activePresence?.label ?? "India + Global Reach"}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[7%] z-10 h-[86%] md:top-[3%] md:h-[96%]">
          <World
            data={presenceRoutes}
            globeConfig={globeConfig}
            onActivePoint={(point) => setActivePresence(point)}
          />
        </div>
      </div>
    </div>
  );
}
