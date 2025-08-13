/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'refinance-blue': '#4A90E2',
        'terracotta': {
          50: '#FDF8F6',
          100: '#F2E8E5',
          200: '#EADDCA',
          300: '#E0C3A7',
          400: '#D4A574',
          500: '#C68E5A',
          600: '#B76E3F',
          700: '#8B5A3F',
          800: '#6F4E37',
          900: '#5A3E2E',
        }
      }
    },
  },
  plugins: [],
} 