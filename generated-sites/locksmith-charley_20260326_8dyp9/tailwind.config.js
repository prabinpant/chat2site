/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#F3F0E8',
        surface: '#E6E1D6',
        brass: '#C69214',
        ink: '#131A20',
        steel: '#24313B',
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        machined: '0 18px 48px rgba(19, 26, 32, 0.12)',
      },
    },
  },
  plugins: [],
}
