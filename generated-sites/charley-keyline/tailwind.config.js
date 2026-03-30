/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brass: '#b99552',
        coal: '#111316',
        stone: '#d8cfbe',
        rust: '#7d5134',
      },
      fontFamily: {
        sans: ['"Manrope"', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        glow: '0 30px 80px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
}
