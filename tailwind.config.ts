import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#FAFAF8",
        elevated: "#F5F4F1",
        primary: "#111827",
        secondary: "#6B7280",
        snap: {
          highlight: "#5BEA86",
          top: "#47D16C",
          DEFAULT: "#2FB95C",
          dark: "#166534",
          ring: "#11502A",
          muted: "#ECFDF5",
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        breathe: "breathe 4s ease-in-out infinite",
        "card-in": "card-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "toast-in-out": "toast-in-out 1s ease forwards",
        "fade-in": "fade-in 0.35s ease forwards",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.018)" },
        },
        "card-in": {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.99)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "toast-in-out": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "18%": { opacity: "1", transform: "translateY(-8px)" },
          "75%": { opacity: "1", transform: "translateY(-8px)" },
          "100%": { opacity: "0", transform: "translateY(-14px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
