/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        prome: {
          green: '#059669',
          gold: '#f59e0b',
          dark: '#022c22',
        }
      }
    },
  },
  plugins: [],
}
