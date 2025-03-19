/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          100: "#F5E8D8",
          200: "#E8D9C6",
        },
        orange: {
          500: "#F97316",
          600: "#EA580C",
        },
        green: {
          700: "#4A5E3F",
          600: "#5E7551",
          300: "#A9C47F",
        },
        gray: {
          800: "#333333",
          600: "#666666",
          300: "#D1D5DB",
        },
        red: {
          500: "#E63946",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}