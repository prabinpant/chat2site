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
          'bg': '#ffffff',
          'surface': '#f8fafc',
          'accent': '#3b82f6',
          'text': '#0f172a',
        }
      },
    },
  },
  plugins: [],
}
