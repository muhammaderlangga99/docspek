/** @type {import('tailwindcss').Config} */
module.exports = { // <-- UBAH DI SINI
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
    "./docusaurus.config.ts",
  ],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], 
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Ini penting untuk menghindari konflik dengan style bawaan Docusaurus
    preflight: false,
  },
};
