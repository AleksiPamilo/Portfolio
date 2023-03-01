/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "glow-1": "0 0 1px 1px #ffffff",
        "glow-2": "0 0 2px 2px #ffffff",
        "glow-3": "0 0 3px 3px #ffffff",
        "glow-4": "0 0 4px 4px #ffffff",
        "glow-5": "0 0 5px 5px #ffffff",
      }
    },
  },
  plugins: [],
}