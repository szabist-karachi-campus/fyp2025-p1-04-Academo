import { heroui } from "@heroui/react"

// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '195px'
      },
      backgroundColor: {
        'Backgrounds': 'hsl(0, 0%, 95%)',
        'Primary': 'HSL(0, 0%, 100%)'
      },
      colors: {
        primary: '#1f2937', // gray-800
        accent: '#3b82f6', // blue-500
        background: '#f9fafb', // gray-100
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

