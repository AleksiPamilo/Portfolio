module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "wide": { "raw": "(max-width: 600px)" },
        "wider": { "raw": "(max-width: 1000px)" }
      }
    },
  },
  plugins: [],
}