/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6500",
        secondary: "#F9A03F",
        earthyellow: "#f7b867",
        carrotorange: "#F9A03F",
        babypowder: "#FFFFFA",
        gray1: '#7D7C7C'
      },
    },
  },
  plugins: [],
};
