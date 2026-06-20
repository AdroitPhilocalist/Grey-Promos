"use client";

import { Environment, MeshReflectorMaterial, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  Mesh,
} from "three";
import { services } from "@/data/services";

type SignpostSceneProps = {
  activeSlug: string | null;
  onSelect: (slug: string) => void;
};

type SignConfig = {
  slug: string;
  title: string;
  angle: number;
  height: number;
  length: number;
  boardHeight: number;
  accent: string;
  side: 1 | -1;
};

const flagColors = ["#1e40af", "#f97316", "#111827", "#2563eb", "#475569"];

const compactServiceLabels: Record<string, string> = {
  "corporate-dealer-meets": "Dealer Meets",
  "retail-branding": "Retail Branding",
  "exhibition-stall-fabrication": "Expo Stalls",
  "mall-setup-activation": "Mall Activation",
  "modern-trade-promotions": "Modern Trade",
  "promotions-activities": "Promotions",
  "road-shows": "Road Shows",
  "mobile-led-van-advertising": "LED Van Ads",
  "payroll-manpower": "Manpower",
  "product-launching": "Product Launch",
  "audio-visual-setup": "AV Setup",
  "printing-flex-branding": "Print + Flex",
  "retail-activations": "Retail Activation",
  "store-decoration-interiors": "Store Interiors",
  "creative-designing": "Creative Design",
};

export default function ServiceSignpostScene({ activeSlug, onSelect }: SignpostSceneProps) {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      shadows
      dpr={[1, 1.55]}
      camera={{ position: [0, 4.28, 18.4], fov: 36, near: 0.1, far: 70 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#030303", 18, 52]} />
      <SignpostExperience activeSlug={activeSlug} onSelect={onSelect} />
    </Canvas>
  );
}

function SignpostExperience({ activeSlug, onSelect }: SignpostSceneProps) {
  const { size } = useThree();
  const isMobile = size.width < 640;

  const signs = useMemo<SignConfig[]>(
    () =>
      services.map((service, index) => {
        const side = (index % 2 === 0 ? 1 : -1) as 1 | -1;
        const row = Math.floor(index / 2);
        const length = isMobile
          ? index % 3 === 0
            ? 2.62
            : index % 3 === 1
              ? 2.44
              : 2.52
          : index % 3 === 0
            ? 3.12
            : index % 3 === 1
              ? 2.88
              : 3;

        return {
          slug: service.slug,
          title: compactServiceLabels[service.slug] ?? service.title,
          angle: side * (isMobile ? 0.026 : 0.065 + (row % 3) * 0.014),
          height: 7.25 - row * 0.88 - (side === -1 ? 0.26 : 0),
          length,
          boardHeight: 0.68,
          accent: flagColors[index % flagColors.length],
          side,
        };
      }),
    [isMobile]
  );

  return (
    <>
      <CameraPose />
      <ambientLight intensity={0.38} color="#e5edff" />
      <hemisphereLight args={["#ffffff", "#10131d", 0.42]} />
      <spotLight position={[0, 7.2, 4.3]} angle={0.48} penumbra={0.86} intensity={90} color="#fff0cf" castShadow />
      <spotLight position={[-4.5, 4.5, -1.8]} angle={0.46} penumbra={0.76} intensity={36} color="#bfdbfe" />
      <pointLight position={[0, 2.2, 0]} intensity={16} color="#f97316" />

      <group>
        <SceneFloor />
        <CentralPole />
        {signs.map((sign, index) => (
          <ServiceFlag
            key={sign.slug}
            sign={sign}
            index={index}
            active={activeSlug === sign.slug}
            onSelect={() => onSelect(sign.slug)}
          />
        ))}
        <CompassRings />
        <WindParticles />
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        minPolarAngle={Math.PI / 3.8}
        maxPolarAngle={Math.PI / 2.15}
        target={[0, 4.08, 0]}
      />
      <Environment preset="city" environmentIntensity={0.28} />
    </>
  );
}

function CameraPose() {
  const { camera, size } = useThree();

  useEffect(() => {
    const isMobile = size.width < 640;
    camera.position.set(0, isMobile ? 4.45 : 4.28, isMobile ? 25.2 : 18.4);
    camera.lookAt(0, 4.08, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

function SceneFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
      <circleGeometry args={[5.6, 96]} />
      <MeshReflectorMaterial
        blur={[360, 90]}
        resolution={512}
        mixBlur={0.7}
        mixStrength={0.36}
        roughness={0.56}
        depthScale={0.28}
        minDepthThreshold={0.2}
        maxDepthThreshold={1.1}
        color="#05070d"
        metalness={0.24}
      />
    </mesh>
  );
}

function CentralPole() {
  return (
    <group>
      <mesh castShadow position={[0, 4.12, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 8.4, 40]} />
        <meshStandardMaterial color="#a8afb8" roughness={0.3} metalness={0.78} />
      </mesh>
      <mesh castShadow position={[0, 8.4, 0]}>
        <sphereGeometry args={[0.23, 32, 32]} />
        <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.18} roughness={0.22} metalness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.58, 0.72, 0.18, 64]} />
        <meshStandardMaterial color="#111827" roughness={0.34} metalness={0.46} />
      </mesh>
      <mesh position={[0, 4.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.24, 48]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

function ServiceFlag({
  sign,
  index,
  active,
  onSelect,
}: {
  sign: SignConfig;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const groupRef = useRef<Group>(null);
  const flagRef = useRef<Mesh<BufferGeometry>>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 1.6 + index) * 0.018;
    }

    const flag = flagRef.current;
    if (!flag) return;
    const position = flag.geometry.attributes.position as BufferAttribute;
    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const y = position.getY(i);
      const wave = Math.sin(clock.elapsedTime * 2.4 + index * 0.7 + x * 4.4 + y * 1.8) * 0.055;
      position.setZ(i, wave * Math.max(x + 0.92, 0));
    }
    position.needsUpdate = true;
    flag.geometry.computeVertexNormals();
  });

  const direction = sign.side;
  const textX = direction * (sign.length * 0.52 + 0.32);
  const flagX = direction * (sign.length * 0.5 + 0.34);
  const armX = direction * (sign.length * 0.35 + 0.24);
  const color = active ? "#f97316" : sign.accent;
  const text = sign.title.replace(" & ", " + ");

  return (
    <group rotation={[0, sign.angle, 0]} position={[0, sign.height, 0]}>
      <group
        ref={groupRef}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        scale={active ? 1.07 : hovered ? 1.035 : 1}
      >
        <mesh castShadow position={[armX, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, Math.abs(armX) * 2, 14]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.28} metalness={0.72} />
        </mesh>

        <RoundedBox
          args={[sign.length + 0.22, sign.boardHeight + 0.16, 0.052]}
          radius={0.045}
          smoothness={5}
          position={[flagX, 0, -0.045]}
          castShadow
        >
          <meshStandardMaterial
            color="#020617"
            emissive={new Color(color)}
            emissiveIntensity={active ? 0.22 : hovered ? 0.14 : 0.06}
            roughness={0.42}
            metalness={0.2}
            transparent
            opacity={0.92}
          />
        </RoundedBox>

        <mesh ref={flagRef} castShadow position={[flagX, 0, 0]} scale={[direction, 1, 1]}>
          <planeGeometry args={[sign.length, sign.boardHeight, 28, 5]} />
          <meshStandardMaterial
            color={color}
            emissive={new Color(color)}
            emissiveIntensity={active ? 0.32 : hovered ? 0.22 : 0.1}
            roughness={0.44}
            metalness={0.08}
            side={DoubleSide}
            transparent
            opacity={0.92}
          />
        </mesh>

        <mesh position={[flagX, sign.boardHeight * 0.5 + 0.08, 0.035]}>
          <boxGeometry args={[sign.length + 0.12, 0.028, 0.035]} />
          <meshStandardMaterial color="#f8fafc" emissive="#ffffff" emissiveIntensity={active ? 0.18 : 0.06} roughness={0.28} metalness={0.68} />
        </mesh>
        <mesh position={[flagX, -sign.boardHeight * 0.5 - 0.08, 0.035]}>
          <boxGeometry args={[sign.length + 0.12, 0.028, 0.035]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.32} metalness={0.72} />
        </mesh>

        <mesh position={[direction * (sign.length + 0.25), 0, 0]} scale={[direction, 1, 1]}>
          <coneGeometry args={[0.3, sign.boardHeight, 3]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.28 : 0.12} side={DoubleSide} />
        </mesh>

        <Text
          position={[textX, 0.012, 0.16]}
          rotation={[0, 0, 0]}
          fontSize={0.16}
          maxWidth={sign.length * 0.72}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          outlineWidth={0.012}
          outlineColor="#000000"
        >
          {text.toUpperCase()}
        </Text>

        {active && (
          <mesh position={[flagX, -0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.08, 0.13, 32]} />
            <meshBasicMaterial color="#fed7aa" transparent opacity={0.78} />
          </mesh>
        )}
      </group>
    </group>
  );
}

function CompassRings() {
  return (
    <group position={[0, 0.02, 0]}>
      {[1.35, 2.45, 3.5].map((radius, index) => (
        <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.012, 96]} />
          <meshBasicMaterial color={index === 1 ? "#f97316" : "#dbeafe"} transparent opacity={index === 1 ? 0.18 : 0.1} />
        </mesh>
      ))}
      {[0, Math.PI / 4, Math.PI / 2, (Math.PI * 3) / 4].map((angle) => (
        <mesh key={angle} rotation={[-Math.PI / 2, 0, angle]}>
          <planeGeometry args={[0.012, 7.2]} />
          <meshBasicMaterial color="#dbeafe" transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

function WindParticles() {
  const points = useMemo(() => {
    const geometry = new BufferGeometry();
    const positions = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = Math.random() * 6 + 0.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    return geometry;
  }, []);

  return (
    <points geometry={points}>
      <pointsMaterial size={0.018} color="#e5e7eb" transparent opacity={0.32} blending={AdditiveBlending} depthWrite={false} />
    </points>
  );
}
