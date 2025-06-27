/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example: Use a modern sans-serif font
        serif: ['Georgia', 'serif'], // Example: For Foodly logo
      },
      colors: {
        // If you need very specific shades
        'foodly-yellow': '#FFD700', // Example
      }
    },
  },
  plugins: [],
}
