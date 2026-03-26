/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F3EBDD',
        surface: '#E6D9C5',
        accent: '#A65A3A',
        ink: '#1F2426',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
      },
      boxShadow: {
        plate: '0 24px 70px rgba(31, 36, 38, 0.14)',
      },
    },
  },
  plugins: [],
}
