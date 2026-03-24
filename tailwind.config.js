/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
              "primary": "#ee5f2b",
              "background-light": "#f8f6f6",
              "background-dark": "#221510",
              "brand-surface": "#EFEBE3",
              "brand-text": "#3B342F",
              "brand-muted": "#9F8D7F",
              "surface": "#EFEBE3",
              "text-dark": "#3B342F",
              "text-main": "#3B342F",
              "muted": "#9F8D7F",
              stone: {
                  50: "#F7F5F0",
              },
              clay: {
                  600: "#B47A65",
              }
          },
          fontFamily: {
              "display": ["Manrope", "sans-serif"],
              "headline": ["Fraunces", "serif"],
              "body": ["Albert Sans", "sans-serif"],
              "nav": ["Albert Sans", "sans-serif"],
              "heading": ["Fraunces", "serif"]
          },
          borderRadius: {
              "DEFAULT": "0.5rem",
              "lg": "1rem",
              "xl": "1.5rem",
              "full": "9999px"
          },
      },
  },
  plugins: [],
}
