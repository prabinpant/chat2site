/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102733',
        'ink-2': '#132d3a',
        iron: '#435966',
        'iron-light': '#6b7e89',
        paper: '#efe9da',
        copper: '#c99a5b',
        'copper-light': '#dfba7f',
        'copper-deep': '#9f6e36',
        'copper-soft': '#eadfcb',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        copper: '0 18px 50px rgba(11, 28, 39, 0.24)',
      },
    },
  },
  plugins: [],
}
