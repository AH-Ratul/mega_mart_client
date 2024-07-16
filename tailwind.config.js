/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 1.5s linear infinite", // Slow spin
      },
      colors: {
        primary: "#ff8c42",
        secondary: "#F9A03F",
        babypowder: "#FFFFFA",
        gray1: "#7D7C7C",
        gray2: "#67696c",
        d1: "#232f3e",
        d2: "#4f5053",
      },
    },
  },
  plugins: [],
};
