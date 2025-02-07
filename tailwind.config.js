/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          100: "#FFF5B7",
          200: "#FFEB5C",
          300: "#FFD700",
          400: "#E6C100",
          500: "#CC9C00",
          600: "#B38A00",
          700: "#996600",
          800: "#804D00",
          900: "#663D00",
        },
      },
    },
  },
  plugins: [],
};
