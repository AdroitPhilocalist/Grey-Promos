"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function PolkaBackdrop() {
  const scrollDepth = useMotionValue(0);
  const smoothScrollDepth = useSpring(scrollDepth, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  useEffect(() => {
    let frame = 0;

    const updateScrollDepth = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollDepth.set(window.scrollY / maxScroll);
      frame = requestAnimationFrame(updateScrollDepth);
    };

    frame = requestAnimationFrame(updateScrollDepth);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [scrollDepth]);

  const primaryY = useTransform(smoothScrollDepth, [0, 1], [-45, 70]);
  const primaryX = useTransform(smoothScrollDepth, [0, 1], [28, -42]);
  const secondaryY = useTransform(smoothScrollDepth, [0, 1], [42, -76]);
  const secondaryX = useTransform(smoothScrollDepth, [0, 1], [-36, 48]);
  const fineY = useTransform(smoothScrollDepth, [0, 1], [0, 90]);
  const ribbonX = useTransform(smoothScrollDepth, [0, 1], [60, -70]);
  const ribbonY = useTransform(smoothScrollDepth, [0, 1], [-18, 42]);
  const ribbonRotate = useTransform(smoothScrollDepth, [0, 1], [-2.5, 2.5]);
  const nearX = useTransform(smoothScrollDepth, [0, 1], [90, -120]);
  const nearY = useTransform(smoothScrollDepth, [0, 1], [-110, 155]);
  const nearScale = useTransform(smoothScrollDepth, [0, 1], [1.04, 0.96]);
  const railScale = useTransform(smoothScrollDepth, [0, 1], [0.08, 1]);

  return (
    <div className="polka-backdrop" aria-hidden="true">
      <motion.div
        className="polka-layer polka-layer-primary"
        style={{ x: primaryX, y: primaryY }}
      />
      <motion.div
        className="polka-layer polka-layer-secondary"
        style={{ x: secondaryX, y: secondaryY }}
      />
      <motion.div
        className="polka-layer polka-layer-fine"
        style={{ y: fineY }}
      />
      <motion.div
        className="polka-layer-ribbon"
        style={{ x: ribbonX, y: ribbonY, rotate: ribbonRotate }}
      />
      <motion.div
        className="polka-layer-near"
        style={{ x: nearX, y: nearY, scale: nearScale }}
      />
      <div className="polka-scroll-rail">
        <motion.div className="polka-scroll-fill" style={{ scaleY: railScale }} />
      </div>
    </div>
  );
}
