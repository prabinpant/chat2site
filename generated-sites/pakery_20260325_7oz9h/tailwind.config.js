/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pakery': {
          'bg': '#FAF9F6',
          'surface': '#F3EFE0',
          'accent': '#BC6C25',
          'text': '#2C1810',
          'soft': '#DDA15E',
        }
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Instrument Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
