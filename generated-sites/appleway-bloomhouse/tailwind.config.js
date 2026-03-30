/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5efe5',
        moss: '#20352a',
        forest: '#14241d',
        sage: '#819476',
        blush: '#f1d4cf',
        petal: '#d46f6c',
        gold: '#b98a4a',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(20, 36, 29, 0.14)',
      },
    },
  },
  plugins: [],
}
