/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F9A03F",
        babypowder: "#FFFFFA",
        gray1: "#7D7C7C",
        d1: "#232f3e",
      },
    },
  },
  plugins: [],
};
