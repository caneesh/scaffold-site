import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["DM Mono", "SFMono-Regular", "Consolas", "monospace"]
      },
      colors: {
        "surface-1": "rgba(255,255,255,0.04)",
        "surface-2": "rgba(255,255,255,0.08)",
        accent: "#73f3d2",
        "accent-2": "#7ab8ff",
        muted: "#9ba3b5",
        danger: "#f28b82"
      },
      borderRadius: {
        xl: "18px"
      },
      boxShadow: {
        brand: "0 20px 80px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
