import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand colors
                ultimate: {
                    red: "#ff0000",
                    "red-strong": "#ff3030",
                    "red-soft": "rgba(255, 0, 0, 0.14)",
                },
                elite: {
                    gold: "#ffeb29",
                    "gold-soft": "rgba(255, 235, 41, 0.22)",
                },
                gear: {
                    gray: "#333333",
                    "gray-soft": "rgba(51, 51, 51, 0.82)",
                },
                ash: {
                    black: "#010101",
                    "black-soft": "#0b0b0b",
                },
            },
            fontFamily: {
                sans: ["var(--font-body)", "system-ui", "sans-serif"],
                display: [
                    "var(--font-display)",
                    "var(--font-body)",
                    "system-ui",
                    "sans-serif",
                ],
                mono: ["var(--font-mono)", "ui-monospace", "monospace"],
                "top-show": ["Top Show", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-in",
                "slide-up": "slideUp 0.6s ease-out",
                "slide-down": "slideDown 0.6s ease-out",
                "pulse-glow": "pulseGlow 2s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(255, 0, 0, 0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(255, 0, 0, 0.6)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
