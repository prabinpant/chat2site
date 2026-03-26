/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F4F0E8',
        surface: '#E6DED1',
        accent: '#B07A3B',
        text: '#1F1A17',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['"Source Serif 4"', 'serif'],
      },
      boxShadow: {
        dry: '0 18px 60px rgba(31, 26, 23, 0.08)',
      },
      backgroundImage: {
        patina:
          'radial-gradient(circle at top left, rgba(176, 122, 59, 0.18), transparent 36%), radial-gradient(circle at bottom right, rgba(31, 26, 23, 0.12), transparent 28%)',
      },
    },
  },
  plugins: [],
}
