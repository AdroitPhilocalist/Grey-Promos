"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sun } from "lucide-react";

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

  useEffect(() => {
    const savedTheme = localStorage.getItem("grey-promos-theme") as ThemeMode | null;
    const initialTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsReady(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <div className={`theme-toggle ${isReady ? "is-ready" : ""}`}>
      <motion.button
        type="button"
        className={`theme-toggle-control ${isDark ? "is-dark" : "is-light"}`}
        onClick={toggleTheme}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-pressed={theme === "light"}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        title={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        <span className="theme-toggle-aura" aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              className="theme-sun-icon"
              initial={{ opacity: 0, rotate: -42, scale: 0.62 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 42, scale: 0.62 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Sun aria-hidden="true" strokeWidth={1.8} />
            </motion.span>
          ) : (
            <motion.span
              key="owl"
              className="theme-owl-icon"
              initial={{ opacity: 0, y: 5, scale: 0.62 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.62 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              <span className="theme-owl-ear theme-owl-ear-left" />
              <span className="theme-owl-ear theme-owl-ear-right" />
              <span className="theme-owl-eye theme-owl-eye-left" />
              <span className="theme-owl-eye theme-owl-eye-right" />
              <span className="theme-owl-beak" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
