/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#141414",
        "green":"#05fB4B",
        "blue":"#1164F4",
        "cream":"#1164F4"
      },
      fontFamily:{
        "fonts":" Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
      }
    },
  },
  plugins: [],
}