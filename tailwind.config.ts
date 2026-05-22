import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        foreground: "#ffffff",
        accent: {
          DEFAULT: "#FF4A1C",
          hover: "#F05A28",
        },
        muted: {
          DEFAULT: "#A3A3A3",
          dark: "#181818",
          soft: "#1A1A1A",
        },
        surface: {
          DEFAULT: "#0A0A0A",
          light: "#121212",
        }
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.02em",
        wider: "0.05em",
      },
      backgroundImage: {
        "noise": "url('/images/noise.png')",
      },
    },
  },
  plugins: [],
};
export default config;
