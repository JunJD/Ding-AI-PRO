/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: ["class", ".dark-theme"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        default: ["var(--font-default)", "system-ui", "sans-serif"],
      },
      colors: {
        white: "var(--dingai-white)",
        stone: {
          50: "var(--dingai-stone-50)",
          100: "var(--dingai-stone-100)",
          200: "var(--dingai-stone-200)",
          300: "var(--dingai-stone-300)",
          400: "var(--dingai-stone-400)",
          500: "var(--dingai-stone-500)",
          600: "var(--dingai-stone-600)",
          700: "var(--dingai-stone-700)",
          800: "var(--dingai-stone-800)",
          900: "var(--dingai-stone-900)",
        },
      },
      boxShadow: {
        'DEFAULT': 'var(--dingai-stone-boxShadow-default)',
        'active': 'var(--dingai-stone-boxShadow-active)',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

