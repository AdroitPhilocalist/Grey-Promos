"use client";

import { Environment, Float, MeshReflectorMaterial, RoundedBox, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Mesh,
  Points,
  Vector3,
} from "three";

const tablePositions = [
  [0, 0, 1.2, 0.9],
  [-3.2, 0, 2.4, 0.78],
  [3.2, 0, 2.4, 0.78],
  [-5.2, 0, 4.2, 0.72],
  [5.2, 0, 4.2, 0.72],
  [-1.7, 0, 4.65, 0.68],
  [1.7, 0, 4.65, 0.68],
] as const;

const chairAngles = [0, Math.PI / 3, (Math.PI * 2) / 3, Math.PI, (Math.PI * 4) / 3, (Math.PI * 5) / 3];

export default function Conference3DScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.65]}
      camera={{ position: [0, 4.1, 8.8], fov: 43, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#050815", 13, 28]} />
      <ConferenceExperience />
    </Canvas>
  );
}

function ConferenceExperience() {
  const roomRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!roomRef.current) return;
    roomRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.24) * 0.018;
  });

  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.36} color="#b9d5ff" />
      <hemisphereLight args={["#ffffff", "#0b1120", 0.38]} />
      <spotLight
        position={[0, 7.2, -5.8]}
        angle={0.56}
        penumbra={0.88}
        intensity={95}
        color="#ffe4b5"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-4.6, 6.1, -2.2]} angle={0.36} penumbra={0.7} intensity={34} color="#93c5fd" />
      <spotLight position={[4.6, 6.1, -2.2]} angle={0.36} penumbra={0.7} intensity={34} color="#c4b5fd" />
      <pointLight position={[0, 2.1, -5.58]} intensity={16} color="#60a5fa" />

      <group ref={roomRef}>
        <RoomShell />
        <Stage />
        {tablePositions.map(([x, y, z, scale], index) => (
          <ConferenceTable key={`${x}-${z}`} position={[x, y, z]} scale={scale} delay={index * 0.08} />
        ))}
        <FloatingCards />
        <DustParticles />
      </group>
      <Environment preset="city" environmentIntensity={0.32} />
    </>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const lookAt = useRef(new Vector3(0, 1.08, -2.3));

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

    tl.to(camera.position, { x: 0, y: 4.05, z: 8.9, duration: 0.01 })
      .to(lookAt.current, { x: 0, y: 1.08, z: -2.3, duration: 0.01 }, 0)
      .to(camera.position, { x: 0.35, y: 3.25, z: 4.7, duration: 3.2 })
      .to(lookAt.current, { x: 0, y: 1.28, z: -3.8, duration: 3.2 }, "<")
      .to(camera.position, { x: 2.45, y: 2.85, z: 3.05, duration: 2.35 })
      .to(lookAt.current, { x: -0.15, y: 1.2, z: -4.7, duration: 2.35 }, "<")
      .to(camera.position, { x: 0, y: 2.72, z: 2.35, duration: 2.65 })
      .to(lookAt.current, { x: 0, y: 1.35, z: -5.25, duration: 2.65 }, "<")
      .to(camera.position, { x: 0, y: 4.05, z: 8.9, duration: 2.2, ease: "sine.inOut" })
      .to(lookAt.current, { x: 0, y: 1.08, z: -2.3, duration: 2.2, ease: "sine.inOut" }, "<");

    return () => {
      tl.kill();
    };
  }, [camera]);

  useFrame(() => {
    camera.lookAt(lookAt.current);
  });

  return null;
}

function RoomShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
        <planeGeometry args={[16, 19]} />
        <MeshReflectorMaterial
          blur={[450, 95]}
          resolution={768}
          mixBlur={0.7}
          mixStrength={0.44}
          roughness={0.52}
          depthScale={0.42}
          minDepthThreshold={0.25}
          maxDepthThreshold={1.2}
          color="#07101e"
          metalness={0.26}
        />
      </mesh>

      <mesh position={[0, 2.7, -7.1]} receiveShadow>
        <boxGeometry args={[16, 5.5, 0.22]} />
        <meshStandardMaterial color="#111827" roughness={0.72} metalness={0.08} />
      </mesh>
      <mesh position={[-8.05, 2.35, -0.1]} rotation={[0, 0.24, 0]}>
        <boxGeometry args={[0.2, 5.1, 14.8]} />
        <meshStandardMaterial color="#15110d" roughness={0.86} metalness={0.1} />
      </mesh>
      <mesh position={[8.05, 2.35, -0.1]} rotation={[0, -0.24, 0]}>
        <boxGeometry args={[0.2, 5.1, 14.8]} />
        <meshStandardMaterial color="#17120d" roughness={0.86} metalness={0.1} />
      </mesh>

      {[-5.7, -2.85, 0, 2.85, 5.7].map((x) => (
        <group key={x} position={[x, 5.08, -1.4]}>
          <RoundedBox args={[1.8, 0.08, 7.8]} radius={0.05} smoothness={8} castShadow>
            <meshStandardMaterial color="#f7dfb4" emissive="#f0b35a" emissiveIntensity={0.38} roughness={0.34} />
          </RoundedBox>
          <mesh position={[0, -0.08, 0]}>
            <boxGeometry args={[2.3, 0.05, 8.4]} />
            <meshBasicMaterial color="#ffd28a" transparent opacity={0.08} />
          </mesh>
        </group>
      ))}

      {[-6, -3, 0, 3, 6].map((x) => (
        <mesh key={x} position={[x, 0.012, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.015, 17]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
        </mesh>
      ))}
    </group>
  );
}

function Stage() {
  return (
    <group position={[0, 0, -5.95]}>
      <RoundedBox args={[7.9, 0.38, 1.28]} radius={0.08} smoothness={10} position={[0, 0.18, 0.18]} castShadow receiveShadow>
        <meshStandardMaterial color="#070b14" roughness={0.38} metalness={0.45} />
      </RoundedBox>
      <RoundedBox args={[7.15, 2.7, 0.18]} radius={0.18} smoothness={14} position={[0, 2.05, -0.35]} castShadow>
        <meshStandardMaterial color="#030712" roughness={0.28} metalness={0.32} />
      </RoundedBox>
      <mesh position={[0, 2.08, -0.24]}>
        <planeGeometry args={[6.55, 2.25]} />
        <meshStandardMaterial color="#1746d0" emissive="#2563eb" emissiveIntensity={1.08} roughness={0.18} metalness={0.15} />
      </mesh>
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
        <Text
          position={[0, 2.37, -0.1]}
          fontSize={0.34}
          letterSpacing={-0.035}
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          outlineWidth={0.006}
          outlineColor="#93c5fd"
        >
          BRAND EXPERIENCE SUMMIT
        </Text>
        <Text position={[0, 1.96, -0.08]} fontSize={0.115} letterSpacing={0.11} anchorX="center" color="#dbeafe">
          STAGE • CONFERENCE • ACTIVATION
        </Text>
      </Float>
      <mesh position={[0, 0.55, 0.86]}>
        <boxGeometry args={[5.7, 0.08, 0.08]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function ConferenceTable({
  position,
  scale,
  delay,
}: {
  position: readonly [number, number, number];
  scale: number;
  delay: number;
}) {
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0.82, y: 0.82, z: 0.82 },
      { x: scale, y: scale, z: scale, delay, duration: 0.85, ease: "back.out(1.5)" }
    );
    gsap.fromTo(groupRef.current.position, { y: -0.25 }, { y: position[1], delay, duration: 0.85, ease: "power3.out" });
  }, [delay, position, scale]);

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]} scale={scale}>
      <mesh castShadow receiveShadow position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.88, 1.05, 0.32, 64]} />
        <meshStandardMaterial color="#1555d8" roughness={0.48} metalness={0.1} />
      </mesh>
      <mesh castShadow position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.05, 64]} />
        <meshStandardMaterial color="#2778ff" roughness={0.34} metalness={0.16} />
      </mesh>
      <mesh position={[0, 0.66, 0]}>
        <torusGeometry args={[0.64, 0.012, 8, 64]} />
        <meshStandardMaterial color="#dbeafe" roughness={0.28} metalness={0.5} />
      </mesh>
      <mesh position={[-0.28, 0.72, 0.18]} castShadow>
        <boxGeometry args={[0.26, 0.025, 0.18]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.45} />
      </mesh>
      <mesh position={[0.33, 0.74, -0.12]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.22, 16]} />
        <meshPhysicalMaterial color="#dbeafe" roughness={0.22} transmission={0.2} transparent opacity={0.86} />
      </mesh>

      {chairAngles.map((angle) => (
        <Chair key={angle} angle={angle} radius={1.45} />
      ))}
    </group>
  );
}

function Chair({ angle, radius }: { angle: number; radius: number }) {
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const rotation = angle;

  return (
    <group position={[x, 0.33, z]} rotation={[0, rotation, 0]}>
      <RoundedBox args={[0.46, 0.18, 0.48]} radius={0.08} smoothness={10} castShadow receiveShadow>
        <meshStandardMaterial color="#0b4ecb" roughness={0.56} metalness={0.08} />
      </RoundedBox>
      <RoundedBox args={[0.48, 0.62, 0.15]} radius={0.09} smoothness={10} position={[0, 0.36, 0.27]} castShadow>
        <meshStandardMaterial color="#075bd8" roughness={0.52} metalness={0.08} />
      </RoundedBox>
      <mesh position={[0, 0.11, -0.18]}>
        <cylinderGeometry args={[0.018, 0.018, 0.34, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function FloatingCards() {
  return (
    <group>
      {[
        [-3.8, 2.55, -3.6, "LIVE OPS"],
        [3.75, 2.38, -3.25, "BRAND LAUNCH"],
        [0, 3.15, -2.65, "AUDIENCE"],
      ].map(([x, y, z, label]) => (
        <Float key={String(label)} speed={1.35} rotationIntensity={0.08} floatIntensity={0.22}>
          <group position={[Number(x), Number(y), Number(z)]}>
            <RoundedBox args={[1.45, 0.52, 0.04]} radius={0.08} smoothness={8}>
              <meshStandardMaterial color="#0f172a" roughness={0.28} metalness={0.38} transparent opacity={0.82} />
            </RoundedBox>
            <Text position={[0, 0.01, 0.04]} fontSize={0.1} letterSpacing={0.08} anchorX="center" color="#e2e8f0">
              {String(label)}
            </Text>
          </group>
        </Float>
      ))}
    </group>
  );
}

function DustParticles() {
  const pointsRef = useRef<Points>(null);
  const geometry = useMemo(() => {
    const count = 170;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 13;
      positions[index * 3 + 1] = Math.random() * 4.6 + 0.5;
      positions[index * 3 + 2] = Math.random() * 10 - 5.4;
    }

    const buffer = new BufferGeometry();
    buffer.setAttribute("position", new BufferAttribute(positions, 3));
    return buffer;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.16) * 0.08;
    pointsRef.current.position.y = Math.sin(clock.elapsedTime * 0.35) * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color={new Color("#ffffff")}
        transparent
        opacity={0.34}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
