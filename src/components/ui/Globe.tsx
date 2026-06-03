"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Object3D, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, ThreeElement, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import countries from "@/data/globe.json";
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElement<typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const cameraZ = 300;
// Tune this if you want a different initial globe view.
// This controls the CAMERA view, so it will visibly change what continent starts in front.
const INDIA_CAMERA_AZIMUTH_DEGREES = -282;
const INDIA_CAMERA_POLAR_DEGREES = 78;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  startLabel?: string;
  startScope?: "hub" | "india" | "global";
  endLat: number;
  endLng: number;
  endLabel?: string;
  endScope?: "hub" | "india" | "global";
  arcAlt: number;
  color: string;
};

type GlobePoint = {
  size: number;
  order: number;
  color: (t: number) => string;
  lat: number;
  lng: number;
  label?: string;
  scope?: "hub" | "india" | "global";
};

type GlobeHighlight = GlobePoint & {
  highlightColor: string;
  dotRadius: number;
  altitude: number;
};

export type ActiveGlobePoint = {
  label: string;
  scope?: "hub" | "india" | "global";
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
  onActivePoint?: (point: ActiveGlobePoint | null) => void;
}

export function Globe({ globeConfig, data, onActivePoint }: WorldProps) {
  const [ringIndexes, setRingIndexes] = useState<number[]>([]);
  const [activePointKey, setActivePointKey] = useState<string | null>(null);

  const globeRef = useRef<ThreeGlobe | null>(null);

  const defaultProps = useMemo(() => ({
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  }), [globeConfig]);

  const globeData = useMemo(() => {
    const points = data.flatMap((arc) => {
      const rgb = hexToRgb(arc.color) || { r: 255, g: 255, b: 255 };
      const color = (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`;

      return [
        {
          size: defaultProps.pointSize,
          order: arc.order,
          color,
          lat: arc.startLat,
          lng: arc.startLng,
          label: arc.startLabel,
          scope: arc.startScope,
        },
        {
          size: defaultProps.pointSize,
          order: arc.order,
          color,
          lat: arc.endLat,
          lng: arc.endLng,
          label: arc.endLabel,
          scope: arc.endScope,
        },
      ];
    });

    return points.filter(
      (point, index, allPoints) =>
        allPoints.findIndex(
          (candidate) => candidate.lat === point.lat && candidate.lng === point.lng
        ) === index
    );
  }, [data, defaultProps.pointSize]);

  const highlightData = useMemo(() => {
    return globeData.map((point) => ({
      ...point,
      highlightColor:
        point.scope === "hub"
          ? "rgba(255,255,255,0.96)"
          : point.scope === "global"
            ? "rgba(165,180,252,0.92)"
            : "rgba(103,232,249,0.9)",
      dotRadius: point.scope === "hub" ? 0.62 : point.scope === "global" ? 0.46 : 0.36,
      altitude: point.scope === "hub" ? 0.024 : 0.018,
    }));
  }, [globeData]);

  useEffect(() => {
    if (!globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };

    globeMaterial.color = new Color(defaultProps.globeColor);
    globeMaterial.emissive = new Color(defaultProps.emissive);
    globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity;
    globeMaterial.shininess = defaultProps.shininess;

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.62)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e) => {
        return (e as { arcAlt: number }).arcAlt * 1;
      })
      .arcStroke((e) => {
        return (e as { order: number }).order % 3 === 0 ? 0.36 : 0.28;
      })
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime((e) => defaultProps.arcTime);

    globeRef.current
      .pointsData(globeData)
      .pointColor((e) => {
        const point = e as GlobePoint;
        const pointKey = getPointKey(point);

        if (pointKey === activePointKey) return "rgba(255,255,255,0.98)";

        return point.color(0.08);
      })
      .pointLat((d) => (d as { lat: number }).lat)
      .pointLng((d) => (d as { lng: number }).lng)
      .pointsMerge(false)
      .pointAltitude((d) => getPointKey(d as GlobePoint) === activePointKey ? 0.018 : 0.008)
      .pointRadius((d) => {
        const point = d as GlobePoint;
        const multiplier = getPointKey(point) === activePointKey ? 1.35 : 1;

        if (point.scope === "hub") return (defaultProps.pointSize / 2) * multiplier;
        if (point.scope === "global") return (defaultProps.pointSize / 2.45) * multiplier;

        return (defaultProps.pointSize / 2.9) * multiplier;
      });

    globeRef.current
      .labelsData(highlightData)
      .labelLat((d) => (d as { lat: number }).lat)
      .labelLng((d) => (d as { lng: number }).lng)
      .labelText(() => "")
      .labelColor((d) => (d as GlobeHighlight).highlightColor)
      .labelAltitude((d) => (d as GlobeHighlight).altitude)
      .labelSize(0)
      .labelIncludeDot(true)
      .labelDotRadius((d) => {
        const highlight = d as GlobeHighlight;
        const pointKey = getPointKey(highlight);
        const multiplier = pointKey === activePointKey ? 1.3 : 1;

        return highlight.dotRadius * multiplier;
      })
      .labelDotOrientation("right")
      .labelResolution(3);

    globeRef.current
      .ringsData([])
      .ringColor((e: any) => (t: any) => e.color(t))
      .ringLat((d) => (d as { lat: number }).lat)
      .ringLng((d) => (d as { lng: number }).lng)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
      );
  }, [data, defaultProps, globeData, highlightData, activePointKey]);

  useEffect(() => {
    const pulseCount = Math.max(2, Math.ceil(globeData.length / 3));

    setRingIndexes(genRandomNumbers(0, globeData.length, pulseCount));

    const interval = setInterval(() => {
      setRingIndexes(genRandomNumbers(
        0,
        globeData.length,
        pulseCount
      ));
    }, 2400);

    return () => {
      clearInterval(interval);
    };
  }, [globeData.length]);

  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.ringsData(
      globeData.filter((_, index) => ringIndexes.includes(index))
    );
  }, [globeData, ringIndexes]);

  return (
    <>
      <threeGlobe
        ref={globeRef}
        onPointerMove={(event: any) => {
          const point = getHoveredPoint(event);

          if (!point?.label) {
            setActivePointKey(null);
            onActivePoint?.(null);
            return;
          }

          const pointKey = getPointKey(point);
          setActivePointKey(pointKey);
          onActivePoint?.({ label: point.label, scope: point.scope });
        }}
        onPointerOut={() => {
          setActivePointKey(null);
          onActivePoint?.(null);
        }}
      />
    </>
  );
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x030303, 0);
  }, [gl, size.height, size.width]);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;

  return (
    <Canvas camera={{ fov: 48, near: 180, far: 1800, position: [0, 0, cameraZ] }}>
      <fog attach="fog" args={[0x030303, 420, 1200]} />
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe
        {...props}
        onActivePoint={(point) => {
          props.onActivePoint?.(point);
        }}
      />
      <ManualOrbitControls />
    </Canvas>
  );
}

function ManualOrbitControls() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    if (!controlsRef.current) return;

    controlsRef.current.setAzimuthalAngle(degreesToRadians(INDIA_CAMERA_AZIMUTH_DEGREES));
    controlsRef.current.setPolarAngle(degreesToRadians(INDIA_CAMERA_POLAR_DEGREES));
    controlsRef.current.update();
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={false}
      enableRotate
      minDistance={cameraZ}
      maxDistance={cameraZ}
      autoRotate={false}
      minPolarAngle={Math.PI / 3.5}
      maxPolarAngle={Math.PI - Math.PI / 3}
    />
  );
}

function getPointKey(point: Pick<GlobePoint, "lat" | "lng">) {
  return `${point.lat.toFixed(4)}:${point.lng.toFixed(4)}`;
}

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function getHoveredPoint(event: any): GlobePoint | null {
  const intersections = event.intersections ?? [];

  for (const intersection of intersections) {
    const point = getPointFromObject(intersection.object);

    if (point?.label) return point;
  }

  return null;
}

function getPointFromObject(object?: Object3D | null): GlobePoint | null {
  let current = object;

  while (current) {
    const data = (current as Object3D & { __data?: GlobePoint }).__data;

    if (data?.lat && data?.lng) return data;

    current = current.parent;
  }

  return null;
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  const cappedCount = Math.min(count, Math.max(max - min, 0));

  while (arr.length < cappedCount) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
