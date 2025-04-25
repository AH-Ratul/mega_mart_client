/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"]
      },
      animation: {
        "spin-slow": "spin 1.5s linear infinite", // Slow spin
      },
      colors: {
        primary: "#fb7701",
        secondary: "#F9A03F",
        b1: "#ddd",
        gray1: "#7D7C7C",
        gray2: "#67696c",
        d1: "#232f3e",
        d2: "#4f5053",
        cardinal: "#C52233",
        eerieblack: "#1e1e1e",
      },
    },
  },
  plugins: [],
};
