/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ye line dhyan se check karein
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite', // Sidebar ke icon ke liye smooth rotation
      }
    },
  },
  plugins: [],
}