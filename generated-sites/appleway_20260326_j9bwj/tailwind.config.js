/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F6F1E8',
        surface: '#FFF9F2',
        accent: '#C97C6D',
        text: '#2E2A26',
        leaf: '#6B8066',
        soil: '#5E473F',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 18px 48px rgba(46, 42, 38, 0.08)',
      },
    },
  },
  plugins: [],
}
