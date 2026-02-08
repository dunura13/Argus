/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "cyber-cyan": "#00D9FF",
        "cyber-blue": "#0A1929",
        "matrix-green": "#00FF41",
        "warning-amber": "#FFB800"
      },
      boxShadow: {
        glass: "0 0 30px rgba(0, 217, 255, 0.15)"
      }
    }
  },
  plugins: []
};
