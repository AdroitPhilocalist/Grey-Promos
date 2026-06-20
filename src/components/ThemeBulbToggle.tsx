"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

type ThemeMode = "dark" | "light";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("light", mode === "light");
  root.classList.toggle("dark", mode === "dark");
  root.dataset.theme = mode;
  localStorage.setItem("grey-promos-theme", mode);
}

export default function ThemeBulbToggle() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isReady, setIsReady] = useState(false);
  const pullControls = useAnimationControls();

  useEffect(() => {
    const savedTheme = localStorage.getItem("grey-promos-theme") as ThemeMode | null;
    const initialTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsReady(true);
  }, []);

  const toggleTheme = async () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    await pullControls.start({
      y: [0, 34, 24, 0],
      transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
    });
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { y: number } }) => {
    if (info.offset.y > 16) {
      void toggleTheme();
    } else {
      void pullControls.start({ y: 0, transition: { type: "spring", stiffness: 420, damping: 22 } });
    }
  };

  return (
    <div
      className={`theme-bulb-toggle ${isReady ? "is-ready" : ""}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <div className="theme-bulb-cord" />
      <motion.button
        type="button"
        className="theme-bulb-control"
        animate={pullControls}
        drag="y"
        dragConstraints={{ top: 0, bottom: 46 }}
        dragElastic={0.18}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onClick={() => void toggleTheme()}
        whileTap={{ cursor: "grabbing" }}
        aria-pressed={theme === "light"}
        title="Pull to change theme"
      >
        <span className="theme-bulb-wire" />
        <span className="theme-bulb-glow" />
        <span className="theme-bulb-glass">
          <span className="theme-bulb-filament" />
          <span className="theme-bulb-shine" />
        </span>
        <span className="theme-bulb-cap" />
        <span className="theme-bulb-chain">
          <span />
          <span />
          <span />
        </span>
        <span className="theme-bulb-pull" />
      </motion.button>
    </div>
  );
}
