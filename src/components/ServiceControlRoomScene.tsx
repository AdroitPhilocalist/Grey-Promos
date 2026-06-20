"use client";

import { Environment, Float, MeshReflectorMaterial, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Group } from "three";

type ServiceSceneProps = {
  activeSlug: string;
  activeTitle: string;
};

export default function ServiceControlRoomScene({ activeSlug, activeTitle }: ServiceSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.55]}
      camera={{ position: [5.4, 4.1, 7.2], fov: 43, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#030303", 12, 27]} />
      <ControlRoomExperience activeSlug={activeSlug} activeTitle={activeTitle} />
    </Canvas>
  );
}

function ControlRoomExperience({ activeSlug, activeTitle }: ServiceSceneProps) {
  const rootRef = useRef<Group>(null);
  const startTimeRef = useRef<number | null>(null);

  useFrame(({ clock }) => {
    startTimeRef.current ??= clock.elapsedTime;
    if (!rootRef.current) return;
    const localTime = clock.elapsedTime - startTimeRef.current;
    rootRef.current.rotation.y = Math.sin(localTime * 0.22) * 0.035;
  });

  return (
    <>
      <ambientLight intensity={0.32} color="#e5edff" />
      <hemisphereLight args={["#ffffff", "#10131d", 0.38]} />
      <spotLight position={[0, 7.5, 1.7]} angle={0.52} penumbra={0.85} intensity={90} color="#fff0cf" castShadow />
      <spotLight position={[-6, 4.8, -1.8]} angle={0.42} penumbra={0.72} intensity={38} color="#c7d2fe" />
      <spotLight position={[5.6, 5.2, -2.8]} angle={0.38} penumbra={0.7} intensity={34} color="#bae6fd" />
      <pointLight position={[0, 1.35, 0]} intensity={22} color="#60a5fa" />

      <group ref={rootRef}>
        <CommandRoomShell />
        <CommandTable />
        <ServiceHologram slug={activeSlug} title={activeTitle} />
        <OrbitingServiceNodes />
        <ControlParticles />
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3.7}
        maxPolarAngle={Math.PI / 2.25}
        autoRotate
        autoRotateSpeed={0.34}
        target={[0, 1.08, 0]}
      />
      <Environment preset="city" environmentIntensity={0.28} />
    </>
  );
}

function CommandRoomShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <MeshReflectorMaterial
          blur={[360, 90]}
          resolution={640}
          mixBlur={0.7}
          mixStrength={0.36}
          roughness={0.56}
          depthScale={0.34}
          minDepthThreshold={0.2}
          maxDepthThreshold={1.1}
          color="#05070d"
          metalness={0.22}
        />
      </mesh>

      {[-6.2, 6.2].map((x) => (
        <RoundedBox key={x} args={[0.12, 4.2, 8.8]} radius={0.06} smoothness={8} position={[x, 2.05, -1.25]} castShadow>
          <meshStandardMaterial color="#090b12" roughness={0.74} metalness={0.18} />
        </RoundedBox>
      ))}

      <RoundedBox args={[12.4, 4.3, 0.14]} radius={0.08} smoothness={8} position={[0, 2.05, -5.7]} receiveShadow>
        <meshStandardMaterial color="#080b13" roughness={0.7} metalness={0.14} />
      </RoundedBox>

      {[-3.6, 0, 3.6].map((x) => (
        <group key={x} position={[x, 3.85, -3.1]}>
          <RoundedBox args={[2.35, 0.08, 4.3]} radius={0.05} smoothness={8}>
            <meshStandardMaterial color="#fff3ce" emissive="#f4c878" emissiveIntensity={0.32} roughness={0.36} />
          </RoundedBox>
          <mesh position={[0, -0.08, 0]}>
            <boxGeometry args={[2.8, 0.04, 4.9]} />
            <meshBasicMaterial color="#ffe6a8" transparent opacity={0.07} />
          </mesh>
        </group>
      ))}

      {[-4.1, 0, 4.1].map((x, index) => (
        <Float key={x} speed={1.1 + index * 0.12} floatIntensity={0.08} rotationIntensity={0.035}>
          <RoundedBox args={[2.15, 1.02, 0.08]} radius={0.08} smoothness={8} position={[x, 2.65, -5.54]}>
            <meshStandardMaterial color="#0f1e34" emissive="#1d4ed8" emissiveIntensity={0.28} roughness={0.32} metalness={0.16} />
          </RoundedBox>
        </Float>
      ))}
    </group>
  );
}

function CommandTable() {
  return (
    <group position={[0, 0.22, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.5, 2.9, 0.28, 96]} />
        <meshStandardMaterial color="#080d16" roughness={0.32} metalness={0.56} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[2.3, 2.3, 0.055, 96]} />
        <meshStandardMaterial color="#0b2a4a" emissive="#1d4ed8" emissiveIntensity={0.18} roughness={0.18} metalness={0.45} />
      </mesh>
      <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 2.25, 128]} />
        <meshBasicMaterial color="#dbeafe" transparent opacity={0.16} side={2} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => (
        <mesh key={angle} position={[Math.sin(angle) * 1.7, 0.28, Math.cos(angle) * 1.7]} rotation={[0, angle, 0]}>
          <boxGeometry args={[0.62, 0.035, 0.035]} />
          <meshBasicMaterial color="#93c5fd" transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  );
}

function ServiceHologram({ slug, title }: { slug: string; title: string }) {
  const dioramaRef = useRef<Group>(null);

  useEffect(() => {
    if (!dioramaRef.current) return;
    gsap.fromTo(
      dioramaRef.current.scale,
      { x: 0.72, y: 0.72, z: 0.72 },
      { x: 1, y: 1, z: 1, duration: 0.58, ease: "back.out(1.8)" }
    );
    gsap.fromTo(dioramaRef.current.rotation, { y: -0.32 }, { y: 0, duration: 0.66, ease: "power3.out" });
    gsap.fromTo(dioramaRef.current.position, { y: -0.18 }, { y: 0, duration: 0.58, ease: "power3.out" });
  }, [slug]);

  return (
    <group position={[0, 0.7, 0]}>
      <Float speed={1.6} floatIntensity={0.12} rotationIntensity={0.06}>
        <group ref={dioramaRef}>
          {renderDiorama(slug)}
          <Text
            position={[0, 1.92, 0]}
            fontSize={0.16}
            letterSpacing={0.02}
            maxWidth={3.2}
            textAlign="center"
            anchorX="center"
            color="#f8fafc"
            outlineWidth={0.004}
            outlineColor="#0f172a"
          >
            {title.toUpperCase()}
          </Text>
        </group>
      </Float>
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.72, 96]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.76, 1.82, 128]} />
        <meshBasicMaterial color="#e0f2fe" transparent opacity={0.42} />
      </mesh>
      <mesh position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.58, 0.6, 96]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.28} />
      </mesh>
      {[0, Math.PI / 3, (Math.PI * 2) / 3].map((angle) => (
        <mesh key={angle} position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, angle]}>
          <planeGeometry args={[0.012, 3.5]} />
          <meshBasicMaterial color="#dbeafe" transparent opacity={0.13} />
        </mesh>
      ))}
    </group>
  );
}

function renderDiorama(slug: string) {
  if (slug.includes("corporate")) return <CorporateDiorama />;
  if (slug.includes("product")) return <ProductLaunchDiorama />;
  if (slug.includes("audio")) return <AudioVisualDiorama />;
  if (slug.includes("retail-branding")) return <RetailDiorama />;
  if (slug.includes("modern")) return <ModernTradeDiorama />;
  if (slug.includes("store")) return <StoreInteriorDiorama />;
  if (slug.includes("retail-activations")) return <RetailActivationDiorama />;
  if (slug.includes("exhibition")) return <ExhibitionDiorama />;
  if (slug.includes("mall")) return <MallActivationDiorama />;
  if (slug.includes("road")) return <RoadshowDiorama />;
  if (slug.includes("van")) return <LedVanDiorama />;
  if (slug.includes("printing")) return <PrintingDiorama />;
  if (slug.includes("creative")) return <CreativeDesignDiorama />;
  if (slug.includes("payroll")) return <ManpowerDiorama />;
  return <ActivationDiorama />;
}

function CorporateDiorama() {
  return (
    <group>
      <RoundedBox args={[2.95, 0.14, 1.72]} radius={0.06} smoothness={10} position={[0, 0.16, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#080d16" roughness={0.34} metalness={0.44} />
      </RoundedBox>
      <RoundedBox args={[2.45, 0.24, 0.88]} radius={0.06} smoothness={8} position={[0, 0.32, -0.58]} castShadow>
        <meshStandardMaterial color="#08111f" roughness={0.36} metalness={0.42} />
      </RoundedBox>
      <RoundedBox args={[2.52, 1.26, 0.08]} radius={0.08} smoothness={8} position={[0, 1.08, -0.94]}>
        <meshStandardMaterial color="#153caa" emissive="#2563eb" emissiveIntensity={0.72} roughness={0.2} metalness={0.12} />
      </RoundedBox>
      <mesh position={[0, 1.1, -0.88]}>
        <planeGeometry args={[2.18, 0.82]} />
        <meshStandardMaterial color="#0f4fd8" emissive="#2563eb" emissiveIntensity={0.42} roughness={0.18} />
      </mesh>
      {[-0.78, 0, 0.78].map((x) => (
        <mesh key={x} position={[x, 0.4, 0.3]} castShadow>
          <cylinderGeometry args={[0.24, 0.31, 0.14, 36]} />
          <meshStandardMaterial color="#1555d8" roughness={0.38} metalness={0.12} />
        </mesh>
      ))}
      {[-1.05, -0.55, 0, 0.55, 1.05].map((x, index) => (
        <RoundedBox key={x} args={[0.22, 0.34, 0.2]} radius={0.04} smoothness={6} position={[x, 0.42, index % 2 ? 0.82 : 0.72]}>
          <meshStandardMaterial color="#172554" roughness={0.5} metalness={0.08} />
        </RoundedBox>
      ))}
      {[-1.08, 1.08].map((x) => (
        <mesh key={x} position={[x, 1.56, -0.78]} rotation={[0.86, 0, 0]}>
          <coneGeometry args={[0.1, 0.36, 24]} />
          <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={0.78} roughness={0.28} />
        </mesh>
      ))}
      <RoundedBox args={[0.58, 0.32, 0.28]} radius={0.04} smoothness={6} position={[0, 0.6, -0.22]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.18} />
      </RoundedBox>
      <mesh position={[0, 0.28, 0.16]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.62, 1.34, 96]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

function ProductLaunchDiorama() {
  return (
    <group>
      <RoundedBox args={[2.65, 0.16, 1.5]} radius={0.07} smoothness={10} position={[0, 0.16, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#080d16" roughness={0.32} metalness={0.48} />
      </RoundedBox>
      <RoundedBox args={[2.3, 1.25, 0.1]} radius={0.08} smoothness={10} position={[0, 1.02, -0.72]}>
        <meshStandardMaterial color="#101827" roughness={0.3} metalness={0.24} />
      </RoundedBox>
      <mesh position={[0, 1.14, -0.65]}>
        <planeGeometry args={[1.78, 0.82]} />
        <meshStandardMaterial color="#111827" emissive="#f97316" emissiveIntensity={0.28} roughness={0.24} metalness={0.14} />
      </mesh>
      {[-1.18, 1.18].map((x) => (
        <mesh key={x} position={[x, 0.98, -0.62]}>
          <boxGeometry args={[0.06, 1.4, 0.06]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.26} metalness={0.74} />
        </mesh>
      ))}
      <mesh position={[0, 0.43, 0.14]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.78, 0.34, 64]} />
        <meshStandardMaterial color="#141b2a" roughness={0.24} metalness={0.56} />
      </mesh>
      <Float speed={1.1} floatIntensity={0.12} rotationIntensity={0.08}>
        <RoundedBox args={[0.42, 0.58, 0.42]} radius={0.08} smoothness={12} position={[0, 0.98, 0.14]}>
          <meshStandardMaterial color="#ffffff" emissive="#f8fafc" emissiveIntensity={0.26} roughness={0.2} metalness={0.26} />
        </RoundedBox>
      </Float>
      {[-0.72, 0.72].map((x) => (
        <mesh key={x} position={[x, 1.42, -0.48]} rotation={[0.75, 0, 0]}>
          <coneGeometry args={[0.14, 0.48, 24]} />
          <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={0.95} roughness={0.26} />
        </mesh>
      ))}
      {[-0.95, -0.5, 0.5, 0.95].map((x) => (
        <RoundedBox key={x} args={[0.2, 0.3, 0.16]} radius={0.04} smoothness={6} position={[x, 0.36, 0.84]}>
          <meshStandardMaterial color="#172554" roughness={0.45} metalness={0.08} />
        </RoundedBox>
      ))}
      <mesh position={[0, 1.34, 0.14]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.68, 0.72, 96]} />
        <meshBasicMaterial color="#fed7aa" transparent opacity={0.58} />
      </mesh>
      <mesh position={[0, 0.7, 0.14]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.1, 96]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.24} />
      </mesh>
    </group>
  );
}

function AudioVisualDiorama() {
  return (
    <group>
      <RoundedBox args={[2.85, 0.14, 1.6]} radius={0.06} smoothness={10} position={[0, 0.16, 0]} receiveShadow>
        <meshStandardMaterial color="#080d16" roughness={0.34} metalness={0.42} />
      </RoundedBox>
      <RoundedBox args={[2.65, 1.22, 0.08]} radius={0.08} smoothness={8} position={[0, 1.08, -0.78]}>
        <meshStandardMaterial color="#0b2f6f" emissive="#2563eb" emissiveIntensity={0.62} roughness={0.2} metalness={0.16} />
      </RoundedBox>
      <mesh position={[0, 1.08, -0.72]}>
        <planeGeometry args={[2.28, 0.72]} />
        <meshStandardMaterial color="#111827" emissive="#60a5fa" emissiveIntensity={0.34} roughness={0.18} metalness={0.14} />
      </mesh>
      {[-1.36, 1.36].map((x) => (
        <group key={x} position={[x, 0.67, 0.08]}>
          <RoundedBox args={[0.38, 1.06, 0.34]} radius={0.05} smoothness={8}>
            <meshStandardMaterial color="#030712" roughness={0.34} metalness={0.32} />
          </RoundedBox>
          {[0.22, -0.18].map((y) => (
            <mesh key={y} position={[0, y, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.105, 0.105, 0.025, 28]} />
              <meshStandardMaterial color="#111827" emissive="#64748b" emissiveIntensity={0.2} />
            </mesh>
          ))}
        </group>
      ))}
      {[-0.76, 0, 0.76].map((x) => (
        <mesh key={x} position={[x, 1.86, -0.62]} rotation={[0.96, 0, 0]}>
          <coneGeometry args={[0.14, 0.46, 24]} />
          <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={0.85} roughness={0.3} />
        </mesh>
      ))}
      <RoundedBox args={[1.08, 0.32, 0.52]} radius={0.05} smoothness={8} position={[0, 0.34, 0.68]}>
        <meshStandardMaterial color="#111827" roughness={0.34} metalness={0.42} />
      </RoundedBox>
      {[-0.32, 0, 0.32].map((x) => (
        <mesh key={x} position={[x, 0.55, 0.66]}>
          <boxGeometry args={[0.16, 0.055, 0.05]} />
          <meshStandardMaterial color="#60a5fa" emissive="#38bdf8" emissiveIntensity={0.32} />
        </mesh>
      ))}
      <mesh position={[0, 0.58, 0.7]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.22, 1.2, 96]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function RetailDiorama() {
  return (
    <group>
      <RoundedBox args={[2.85, 1.72, 0.12]} radius={0.08} smoothness={10} position={[0, 0.98, -0.82]}>
        <meshStandardMaterial color="#111827" roughness={0.38} metalness={0.22} />
      </RoundedBox>
      <RoundedBox args={[0.12, 1.66, 1.82]} radius={0.06} smoothness={8} position={[-1.43, 0.98, 0.02]}>
        <meshStandardMaterial color="#0b1220" roughness={0.44} metalness={0.16} />
      </RoundedBox>
      <mesh position={[0, 1.45, -0.72]}>
        <planeGeometry args={[2.25, 0.38]} />
        <meshStandardMaterial color="#ffffff" emissive="#f8fafc" emissiveIntensity={0.42} roughness={0.28} />
      </mesh>
      {[-0.84, 0, 0.84].map((x, shelfIndex) => (
        <group key={x} position={[x, 0.72, -0.22]}>
          <RoundedBox args={[0.48, 1.02, 0.38]} radius={0.04} smoothness={8}>
            <meshStandardMaterial color="#13223a" roughness={0.42} metalness={0.18} />
          </RoundedBox>
          {[-0.28, 0.05, 0.38].map((y, packIndex) => (
            <mesh key={y} position={[packIndex % 2 ? -0.08 : 0.09, y, 0.22]}>
              <boxGeometry args={[0.18, 0.12, 0.08]} />
              <meshStandardMaterial color={["#f97316", "#60a5fa", "#f8fafc"][(shelfIndex + packIndex) % 3]} roughness={0.3} metalness={0.12} />
            </mesh>
          ))}
          <mesh position={[0, 0.56, 0.02]}>
            <boxGeometry args={[0.4, 0.035, 0.44]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.38} />
          </mesh>
        </group>
      ))}
      <RoundedBox args={[1.25, 0.42, 0.58]} radius={0.06} smoothness={8} position={[0.25, 0.32, 0.76]}>
        <meshStandardMaterial color="#0f172a" roughness={0.36} metalness={0.34} />
      </RoundedBox>
      <RoundedBox args={[0.34, 0.72, 0.3]} radius={0.05} smoothness={8} position={[-0.92, 0.58, 0.82]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.18} />
      </RoundedBox>
      <mesh position={[-1.36, 1.02, 0.42]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.7, 0.46]} />
        <meshStandardMaterial color="#1d4ed8" emissive="#2563eb" emissiveIntensity={0.35} roughness={0.22} />
      </mesh>
    </group>
  );
}

function ModernTradeDiorama() {
  return (
    <group>
      <RoundedBox args={[2.9, 0.12, 1.75]} radius={0.06} smoothness={8} position={[0, 0.16, 0]} receiveShadow>
        <meshStandardMaterial color="#0b101a" roughness={0.38} metalness={0.38} />
      </RoundedBox>
      {[-0.9, 0.9].map((x) => (
        <group key={x} position={[x, 0.76, -0.18]}>
          <RoundedBox args={[0.58, 1.22, 0.58]} radius={0.045} smoothness={8}>
            <meshStandardMaterial color="#101827" roughness={0.38} metalness={0.18} />
          </RoundedBox>
          {[-0.38, -0.1, 0.18, 0.46].map((y, row) => (
            <mesh key={y} position={[0, y, 0.32]}>
              <boxGeometry args={[0.5, 0.035, 0.045]} />
              <meshStandardMaterial color="#e5e7eb" emissive="#dbeafe" emissiveIntensity={0.08} roughness={0.3} />
            </mesh>
          ))}
          {[-0.2, 0, 0.2].map((px, packIndex) => (
            <mesh key={px} position={[px, 0.14 + packIndex * 0.18, 0.36]}>
              <boxGeometry args={[0.12, 0.14, 0.08]} />
              <meshStandardMaterial color={["#f97316", "#3b82f6", "#f8fafc"][packIndex]} roughness={0.34} metalness={0.08} />
            </mesh>
          ))}
        </group>
      ))}
      <RoundedBox args={[0.84, 1.15, 0.58]} radius={0.06} smoothness={8} position={[0, 0.72, 0.46]}>
        <meshStandardMaterial color="#1d4ed8" emissive="#1d4ed8" emissiveIntensity={0.18} roughness={0.34} metalness={0.18} />
      </RoundedBox>
      <RoundedBox args={[2.55, 0.46, 0.08]} radius={0.06} smoothness={8} position={[0, 1.52, -0.55]}>
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.45} roughness={0.26} />
      </RoundedBox>
      <mesh position={[0, 1.06, 0.78]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.68, 0.4]} />
        <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.2} roughness={0.28} />
      </mesh>
      {[-1.28, 1.28].map((x) => (
        <mesh key={x} position={[x, 0.42, 0.76]}>
          <sphereGeometry args={[0.08, 20, 20]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.36} />
        </mesh>
      ))}
    </group>
  );
}

function StoreInteriorDiorama() {
  return (
    <group>
      <RoundedBox args={[2.85, 0.14, 1.7]} radius={0.06} smoothness={8} position={[0, 0.16, 0]} receiveShadow>
        <meshStandardMaterial color="#0b101a" roughness={0.36} metalness={0.34} />
      </RoundedBox>
      <RoundedBox args={[2.65, 1.66, 0.1]} radius={0.08} smoothness={8} position={[0, 0.98, -0.85]}>
        <meshStandardMaterial color="#17120d" roughness={0.5} metalness={0.12} />
      </RoundedBox>
      <RoundedBox args={[0.1, 1.55, 1.75]} radius={0.05} smoothness={8} position={[-1.35, 0.92, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.48} metalness={0.14} />
      </RoundedBox>
      <RoundedBox args={[1.72, 0.76, 0.44]} radius={0.08} smoothness={8} position={[0.28, 0.44, 0.38]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.32} metalness={0.18} />
      </RoundedBox>
      <RoundedBox args={[0.54, 1.02, 0.2]} radius={0.06} smoothness={8} position={[1.05, 0.74, -0.48]}>
        <meshStandardMaterial color="#111827" roughness={0.34} metalness={0.2} />
      </RoundedBox>
      {[0.12, 0.72, -0.48].map((x) => (
        <mesh key={x} position={[x, 1.42, -0.78]}>
          <boxGeometry args={[0.42, 0.05, 0.05]} />
          <meshStandardMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={0.48} />
        </mesh>
      ))}
      <mesh position={[-0.82, 0.72, -0.78]}>
        <planeGeometry args={[0.48, 0.72]} />
        <meshStandardMaterial color="#1d4ed8" emissive="#2563eb" emissiveIntensity={0.34} roughness={0.22} />
      </mesh>
      {[-0.6, 0.1, 0.78].map((x, i) => (
        <RoundedBox key={x} args={[0.28, 0.4, 0.18]} radius={0.04} smoothness={6} position={[x, 0.76, 0.35]}>
          <meshStandardMaterial color={["#f97316", "#172554", "#e5e7eb"][i]} roughness={0.3} metalness={0.14} />
        </RoundedBox>
      ))}
      <mesh position={[0.3, 0.22, 0.34]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.48, 1.08, 96]} />
        <meshBasicMaterial color="#fed7aa" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function ExhibitionDiorama() {
  return (
    <group>
      <RoundedBox args={[2.85, 0.14, 1.65]} radius={0.06} smoothness={10} position={[0, 0.18, 0]} castShadow>
        <meshStandardMaterial color="#0b101a" roughness={0.34} metalness={0.46} />
      </RoundedBox>
      <RoundedBox args={[2.55, 1.42, 0.08]} radius={0.06} smoothness={8} position={[0, 1.02, -0.76]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.12} />
      </RoundedBox>
      <RoundedBox args={[0.08, 1.42, 1.35]} radius={0.04} smoothness={8} position={[-1.28, 1.02, -0.08]}>
        <meshStandardMaterial color="#111827" roughness={0.36} metalness={0.18} />
      </RoundedBox>
      {[-1.18, 1.18, -0.3, 0.3].map((x, index) => (
        <mesh key={`${x}-${index}`} position={[x, 1.05, index < 2 ? -0.5 : -1.02]}>
          <boxGeometry args={[0.055, 1.65, 0.055]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.28} metalness={0.68} />
        </mesh>
      ))}
      <RoundedBox args={[2.7, 0.22, 0.12]} radius={0.04} smoothness={8} position={[0, 1.82, -0.5]}>
        <meshStandardMaterial color="#1d4ed8" emissive="#2563eb" emissiveIntensity={0.42} roughness={0.24} />
      </RoundedBox>
      <RoundedBox args={[1.05, 0.55, 0.46]} radius={0.05} smoothness={8} position={[0.18, 0.48, 0.42]}>
        <meshStandardMaterial color="#1e3a8a" emissive="#2563eb" emissiveIntensity={0.2} roughness={0.36} metalness={0.18} />
      </RoundedBox>
      <RoundedBox args={[0.48, 0.42, 0.34]} radius={0.05} smoothness={8} position={[-0.82, 0.42, 0.48]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.32} metalness={0.16} />
      </RoundedBox>
      {[[-0.78, 1.22], [0.78, 1.22], [0, 1.46]].map(([x, y]) => (
        <mesh key={`${x}-${y}`} position={[x, y, -0.7]} rotation={[0.95, 0, 0]}>
          <coneGeometry args={[0.09, 0.32, 22]} />
          <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={0.75} roughness={0.26} />
        </mesh>
      ))}
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.5, 0.82]}>
          <sphereGeometry args={[0.07, 20, 20]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.36} />
        </mesh>
      ))}
    </group>
  );
}

function MallActivationDiorama() {
  return (
    <group>
      <RoundedBox args={[2.9, 0.14, 1.85]} radius={0.06} smoothness={10} position={[0, 0.16, 0]} castShadow>
        <meshStandardMaterial color="#0c1220" roughness={0.36} metalness={0.38} />
      </RoundedBox>
      <RoundedBox args={[1.28, 0.72, 0.78]} radius={0.1} smoothness={10} position={[0, 0.55, 0.1]}>
        <meshStandardMaterial color="#1d4ed8" roughness={0.3} metalness={0.2} emissive="#1d4ed8" emissiveIntensity={0.15} />
      </RoundedBox>
      <RoundedBox args={[2.1, 0.58, 0.08]} radius={0.06} smoothness={8} position={[0, 1.28, -0.66]}>
        <meshStandardMaterial color="#f8fafc" emissive="#e0f2fe" emissiveIntensity={0.22} roughness={0.28} />
      </RoundedBox>
      <RoundedBox args={[0.62, 1.25, 0.16]} radius={0.06} smoothness={8} position={[-1.08, 0.86, -0.3]}>
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.22} roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.62, 1.25, 0.16]} radius={0.06} smoothness={8} position={[1.08, 0.86, -0.3]}>
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.22} roughness={0.3} />
      </RoundedBox>
      {[[-1.22, 0.86], [-0.62, 0.86], [0.62, 0.86], [1.22, 0.86], [-1.22, -0.86], [1.22, -0.86]].map(([x, z], i) => (
        <mesh key={`${x}-${z}-${i}`} position={[x, 0.42, z]}>
          <cylinderGeometry args={[0.045, 0.045, 0.54, 16]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {[[-0.95, 0.38], [0.95, 0.38], [-0.42, 0.78], [0.42, 0.78]].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.45, z]}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.35} />
        </mesh>
      ))}
      <mesh position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.72, 1.35, 96]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function RoadshowDiorama() {
  return (
    <group>
      <RoundedBox args={[2.9, 0.12, 1.75]} radius={0.06} smoothness={8} position={[0, 0.14, 0]} receiveShadow>
        <meshStandardMaterial color="#0b101a" roughness={0.38} metalness={0.34} />
      </RoundedBox>
      <mesh rotation={[-Math.PI / 2, 0, -0.12]} position={[0, 0.24, 0]}>
        <ringGeometry args={[0.82, 1.42, 96, 1, 0.34, Math.PI * 1.55]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.48} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, -0.12]} position={[0, 0.255, 0]}>
        <ringGeometry args={[1.43, 1.48, 96, 1, 0.34, Math.PI * 1.55]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.35} />
      </mesh>
      <group position={[0.2, 0.48, 0.05]} rotation={[0, -0.48, 0]}>
        <RoundedBox args={[1.28, 0.42, 0.58]} radius={0.08} smoothness={8}>
          <meshStandardMaterial color="#f8fafc" roughness={0.32} metalness={0.18} />
        </RoundedBox>
        <RoundedBox args={[0.72, 0.44, 0.5]} radius={0.07} smoothness={8} position={[0.08, 0.34, 0]}>
          <meshStandardMaterial color="#1d4ed8" emissive="#2563eb" emissiveIntensity={0.28} roughness={0.28} />
        </RoundedBox>
        <mesh position={[0.08, 0.43, -0.31]}>
          <planeGeometry args={[0.62, 0.28]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.35} roughness={0.24} />
        </mesh>
        {[-0.42, 0.42].map((x) => (
          <mesh key={x} position={[x, -0.23, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.06, 24]} />
            <meshStandardMaterial color="#030712" roughness={0.45} metalness={0.2} />
          </mesh>
        ))}
      </group>
      {[[-1.12, -0.76], [-0.35, 0.9], [0.86, -0.74]].map(([x, z], i) => (
        <group key={`${x}-${z}`}>
          <mesh position={[x, 0.52, z]}>
            <sphereGeometry args={[0.075, 24, 24]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.9} />
          </mesh>
          <mesh position={[x, 0.3, z]}>
            <cylinderGeometry args={[0.025, 0.025, 0.34, 12]} />
            <meshStandardMaterial color="#fed7aa" emissive="#f59e0b" emissiveIntensity={0.3} />
          </mesh>
          <RoundedBox args={[0.34, 0.18, 0.05]} radius={0.02} smoothness={4} position={[x, 0.72, z]}>
            <meshStandardMaterial color={i === 1 ? "#1d4ed8" : "#f8fafc"} roughness={0.32} metalness={0.12} />
          </RoundedBox>
        </group>
      ))}
      {[-0.98, 1.02].map((x) => (
        <mesh key={x} position={[x, 0.38, 0.58]}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.36} />
        </mesh>
      ))}
    </group>
  );
}

function LedVanDiorama() {
  return (
    <group>
      <RoundedBox args={[2.95, 0.12, 1.72]} radius={0.06} smoothness={8} position={[0, 0.14, 0.08]}>
        <meshStandardMaterial color="#0f172a" roughness={0.42} metalness={0.24} />
      </RoundedBox>
      <group position={[0, 0.56, 0]} rotation={[0, -0.24, 0]}>
        <RoundedBox args={[1.7, 0.58, 0.68]} radius={0.08} smoothness={10}>
          <meshStandardMaterial color="#f8fafc" roughness={0.28} metalness={0.2} />
        </RoundedBox>
        <RoundedBox args={[0.56, 0.5, 0.62]} radius={0.08} smoothness={8} position={[-0.64, 0.1, 0]}>
          <meshStandardMaterial color="#dbeafe" roughness={0.26} metalness={0.16} />
        </RoundedBox>
        <RoundedBox args={[1.02, 0.66, 0.08]} radius={0.05} smoothness={8} position={[0.28, 0.12, -0.39]}>
          <meshStandardMaterial color="#0f4fd8" emissive="#2563eb" emissiveIntensity={0.75} roughness={0.18} />
        </RoundedBox>
        <mesh position={[0.28, 0.13, -0.345]}>
          <planeGeometry args={[0.82, 0.48]} />
          <meshStandardMaterial color="#60a5fa" emissive="#38bdf8" emissiveIntensity={0.55} roughness={0.18} />
        </mesh>
        <mesh position={[-0.64, 0.18, -0.36]}>
          <planeGeometry args={[0.32, 0.24]} />
          <meshStandardMaterial color="#111827" emissive="#1e293b" emissiveIntensity={0.2} roughness={0.22} />
        </mesh>
        {[[-0.54, 0.36], [0.54, 0.36], [-0.54, -0.36], [0.54, -0.36]].map(([x, z]) => (
          <mesh key={`${x}-${z}`} position={[x, -0.32, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.065, 24]} />
            <meshStandardMaterial color="#030712" roughness={0.4} metalness={0.22} />
          </mesh>
        ))}
      </group>
      <mesh position={[0.18, 1.02, -0.58]}>
        <boxGeometry args={[1.38, 0.04, 0.04]} />
        <meshStandardMaterial color="#fed7aa" emissive="#f97316" emissiveIntensity={0.8} />
      </mesh>
      {[-0.7, 0, 0.7].map((x) => (
        <mesh key={x} position={[x, 1.24, -0.54]} rotation={[0.86, 0, 0]}>
          <coneGeometry args={[0.085, 0.28, 20]} />
          <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={0.82} roughness={0.26} />
        </mesh>
      ))}
      <mesh position={[0.08, 0.22, 0.04]} rotation={[-Math.PI / 2, 0, -0.08]}>
        <ringGeometry args={[0.7, 1.28, 96, 1, 0.2, Math.PI * 1.7]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function PrintDesignDiorama() {
  return (
    <group>
      <RoundedBox args={[2.75, 0.18, 1.5]} radius={0.06} smoothness={8} position={[0, 0.16, 0.08]} receiveShadow>
        <meshStandardMaterial color="#0b101a" roughness={0.38} metalness={0.32} />
      </RoundedBox>
      <RoundedBox args={[2.2, 0.52, 0.86]} radius={0.06} smoothness={8} position={[0, 0.45, -0.22]}>
        <meshStandardMaterial color="#0f172a" roughness={0.36} metalness={0.4} />
      </RoundedBox>
      {[-0.72, 0.72].map((x, i) => (
        <mesh key={x} position={[x, 0.75, -0.22]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.98, 40]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.24} metalness={0.48} />
        </mesh>
      ))}
      <mesh position={[0, 0.68, 0.36]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[1.82, 0.86]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.42} side={2} />
      </mesh>
      <mesh position={[0, 0.7, 0.35]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[1.72, 0.12]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.25} roughness={0.35} side={2} />
      </mesh>
      <mesh position={[-1.18, 0.7, -0.22]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.24, 0.3, 40]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.28} metalness={0.2} />
      </mesh>
      <mesh position={[1.18, 0.7, -0.22]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.24, 0.3, 40]} />
        <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.18} roughness={0.28} metalness={0.2} />
      </mesh>
      <Float speed={1.4} floatIntensity={0.14}>
        <RoundedBox args={[0.45, 0.3, 0.025]} radius={0.025} smoothness={6} position={[-0.78, 1.28, 0.28]}>
          <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.2} />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.34, 0.025]} radius={0.025} smoothness={6} position={[0.68, 1.36, 0.12]}>
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.2} />
        </RoundedBox>
      </Float>
      {[[-0.6, -0.74], [0, -0.78], [0.6, -0.74]].map(([x, z], i) => (
        <mesh key={`${x}-${z}`} position={[x, 0.47, z]}>
          <boxGeometry args={[0.28, 0.08, 0.12]} />
          <meshStandardMaterial color={["#ef4444", "#f59e0b", "#3b82f6"][i]} emissive={["#ef4444", "#f59e0b", "#3b82f6"][i]} emissiveIntensity={0.16} />
        </mesh>
      ))}
    </group>
  );
}

function PrintingDiorama() {
  return <PrintDesignDiorama />;
}

function CreativeDesignDiorama() {
  return (
    <group>
      <RoundedBox args={[2.6, 0.16, 1.42]} radius={0.06} smoothness={8} position={[0, 0.16, 0.08]} receiveShadow>
        <meshStandardMaterial color="#0b101a" roughness={0.38} metalness={0.32} />
      </RoundedBox>
      <RoundedBox args={[1.8, 0.22, 0.9]} radius={0.07} smoothness={8} position={[0, 0.34, 0.2]}>
        <meshStandardMaterial color="#111827" roughness={0.34} metalness={0.34} />
      </RoundedBox>
      <Float speed={1.2} floatIntensity={0.18} rotationIntensity={0.06}>
        {[[-0.78, 1.06, -0.18, "#f8fafc"], [0.02, 1.26, 0.05, "#38bdf8"], [0.82, 0.96, -0.12, "#fb7185"]].map(([x, y, z, color], index) => (
          <RoundedBox key={index} args={[0.62, 0.82, 0.025]} radius={0.04} smoothness={8} position={[x as number, y as number, z as number]} rotation={[0.05, index * 0.16 - 0.15, 0.03]}>
            <meshStandardMaterial color={color as string} emissive={color as string} emissiveIntensity={0.12} roughness={0.34} />
          </RoundedBox>
        ))}
      </Float>
      <mesh position={[0, 0.47, 0.42]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.52, 0.012, 8, 80]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.45} />
      </mesh>
      {[-0.58, -0.18, 0.22, 0.62].map((x, i) => (
        <mesh key={x} position={[x, 0.5, -0.36]}>
          <boxGeometry args={[0.26, 0.08, 0.08]} />
          <meshStandardMaterial color={["#ef4444", "#f59e0b", "#22c55e", "#3b82f6"][i]} emissive={["#ef4444", "#f59e0b", "#22c55e", "#3b82f6"][i]} emissiveIntensity={0.18} />
        </mesh>
      ))}
      <mesh position={[-0.72, 0.58, 0.32]} rotation={[-0.28, 0.15, 0]}>
        <planeGeometry args={[0.62, 0.42]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.36} side={2} />
      </mesh>
      <mesh position={[0.72, 0.58, 0.28]} rotation={[-0.24, -0.12, 0]}>
        <planeGeometry args={[0.54, 0.34]} />
        <meshStandardMaterial color="#111827" emissive="#60a5fa" emissiveIntensity={0.14} roughness={0.3} side={2} />
      </mesh>
    </group>
  );
}

function RetailActivationDiorama() {
  return (
    <group>
      <RoundedBox args={[2.55, 0.12, 1.5]} radius={0.06} smoothness={8} position={[0, 0.16, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.38} metalness={0.34} />
      </RoundedBox>
      <RoundedBox args={[1.42, 0.62, 0.76]} radius={0.08} smoothness={10} position={[0, 0.48, 0.18]}>
        <meshStandardMaterial color="#1d4ed8" roughness={0.3} metalness={0.2} emissive="#1d4ed8" emissiveIntensity={0.18} />
      </RoundedBox>
      <RoundedBox args={[1.95, 0.78, 0.08]} radius={0.06} smoothness={8} position={[0, 1.24, -0.52]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.28} metalness={0.16} />
      </RoundedBox>
      <mesh position={[0, 0.88, 0.62]}>
        <cylinderGeometry args={[0.23, 0.28, 0.34, 32]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.36} roughness={0.32} />
      </mesh>
      {[-0.54, 0, 0.54].map((x, i) => (
        <mesh key={x} position={[x, 0.72, 0.58]}>
          <boxGeometry args={[0.16, 0.18, 0.12]} />
          <meshStandardMaterial color={["#f8fafc", "#60a5fa", "#f97316"][i]} roughness={0.32} metalness={0.12} />
        </mesh>
      ))}
      {[-1.02, 1.02, -0.62, 0.62].map((x, index) => (
        <group key={`${x}-${index}`} position={[x, 0.42, index < 2 ? 0.76 : -0.72]}>
          <mesh>
            <sphereGeometry args={[0.08, 20, 20]} />
            <meshStandardMaterial color="#e5e7eb" />
          </mesh>
          <RoundedBox args={[0.16, 0.28, 0.08]} radius={0.04} smoothness={6} position={[0, -0.22, 0]}>
            <meshStandardMaterial color="#111827" />
          </RoundedBox>
        </group>
      ))}
      <RoundedBox args={[0.44, 0.85, 0.12]} radius={0.05} smoothness={8} position={[-1.06, 0.82, -0.36]}>
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.25} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.28, 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 1.16, 96]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function ManpowerDiorama() {
  return (
    <group>
      <RoundedBox args={[2.75, 0.13, 1.55]} radius={0.06} smoothness={8} position={[0, 0.15, 0]} receiveShadow>
        <meshStandardMaterial color="#0b101a" roughness={0.38} metalness={0.34} />
      </RoundedBox>
      <RoundedBox args={[2.2, 1.05, 0.08]} radius={0.06} smoothness={8} position={[0, 1.05, -0.72]}>
        <meshStandardMaterial color="#111827" emissive="#1d4ed8" emissiveIntensity={0.2} roughness={0.3} metalness={0.18} />
      </RoundedBox>
      {[-0.7, 0, 0.7].map((x, i) => (
        <group key={x} position={[x, 0.52, i === 1 ? -0.02 : 0.34]}>
          <mesh>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial color={i === 1 ? "#f97316" : "#cbd5e1"} roughness={0.36} metalness={0.12} />
          </mesh>
          <RoundedBox args={[0.34, 0.52, 0.14]} radius={0.07} smoothness={8} position={[0, -0.38, 0]}>
            <meshStandardMaterial color="#172554" roughness={0.44} metalness={0.12} />
          </RoundedBox>
        </group>
      ))}
      {[-0.72, 0, 0.72].map((x, i) => (
        <RoundedBox key={x} args={[0.46, 0.24, 0.035]} radius={0.025} smoothness={6} position={[x, 1.16, -0.66]}>
          <meshStandardMaterial color={i === 1 ? "#f97316" : "#f8fafc"} emissive={i === 1 ? "#f97316" : "#dbeafe"} emissiveIntensity={0.24} roughness={0.28} />
        </RoundedBox>
      ))}
      {[-1.05, -0.35, 0.35, 1.05].map((x) => (
        <mesh key={x} position={[x, 0.88, -0.68]}>
          <boxGeometry args={[0.34, 0.035, 0.035]} />
          <meshStandardMaterial color="#60a5fa" emissive="#38bdf8" emissiveIntensity={0.28} />
        </mesh>
      ))}
      <mesh position={[0, 0.26, 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.52, 1.24, 96]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function ActivationDiorama() {
  return (
    <group>
      <RoundedBox args={[2.85, 0.13, 1.72]} radius={0.06} smoothness={8} position={[0, 0.15, 0]} receiveShadow>
        <meshStandardMaterial color="#0b101a" roughness={0.38} metalness={0.34} />
      </RoundedBox>
      <RoundedBox args={[1.45, 0.68, 0.72]} radius={0.08} smoothness={8} position={[0, 0.5, 0.08]}>
        <meshStandardMaterial color="#1d4ed8" roughness={0.34} metalness={0.18} emissive="#1d4ed8" emissiveIntensity={0.18} />
      </RoundedBox>
      <RoundedBox args={[2.15, 0.86, 0.08]} radius={0.06} smoothness={8} position={[0, 1.2, -0.58]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.32} metalness={0.12} />
      </RoundedBox>
      <mesh position={[0, 1.2, -0.52]}>
        <planeGeometry args={[1.72, 0.52]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.32} roughness={0.26} />
      </mesh>
      {[-1.08, 1.08, -0.62, 0.62].map((x, index) => (
        <mesh key={`${x}-${index}`} position={[x, 0.5, index < 2 ? 0.76 : -0.78]}>
          <cylinderGeometry args={[0.08, 0.08, 0.58, 18]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.35} />
        </mesh>
      ))}
      {[-0.46, 0, 0.46].map((x, i) => (
        <mesh key={x} position={[x, 0.78, 0.54]}>
          <boxGeometry args={[0.14, 0.18, 0.1]} />
          <meshStandardMaterial color={["#f8fafc", "#60a5fa", "#f97316"][i]} roughness={0.32} metalness={0.12} />
        </mesh>
      ))}
      {[[-0.95, 0.42], [0.95, 0.42], [-0.34, 0.86], [0.34, 0.86]].map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x, 0.42, z]}>
          <mesh>
            <sphereGeometry args={[0.075, 20, 20]} />
            <meshStandardMaterial color="#e5e7eb" roughness={0.34} />
          </mesh>
          <RoundedBox args={[0.15, 0.26, 0.08]} radius={0.035} smoothness={6} position={[0, -0.2, 0]}>
            <meshStandardMaterial color="#111827" roughness={0.4} />
          </RoundedBox>
        </group>
      ))}
      <mesh position={[0, 0.28, 0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.52, 1.28, 96]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function OrbitingServiceNodes() {
  const nodeRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!nodeRef.current) return;
    nodeRef.current.rotation.y = clock.elapsedTime * 0.09;
  });

  return (
    <group ref={nodeRef} position={[0, 0.72, 0]}>
      {Array.from({ length: 14 }).map((_, index) => {
        const angle = (index / 14) * Math.PI * 2;
        return (
          <mesh key={index} position={[Math.sin(angle) * 2.55, 0.32 + Math.sin(index) * 0.08, Math.cos(angle) * 2.55]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color={index % 3 === 0 ? "#f97316" : "#bfdbfe"} emissive={index % 3 === 0 ? "#f97316" : "#60a5fa"} emissiveIntensity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

function ControlParticles() {
  const points = useMemo(() => {
    const geometry = new BufferGeometry();
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 4.5 + 0.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    return geometry;
  }, []);

  return (
    <points geometry={points}>
      <pointsMaterial size={0.018} color="#e5e7eb" transparent opacity={0.34} blending={AdditiveBlending} depthWrite={false} />
    </points>
  );
}
