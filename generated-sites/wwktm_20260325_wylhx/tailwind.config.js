/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
        surface: {
          DEFAULT: '#f8fafc',
          dark: '#f1f5f9',
        }
      }
    },
  },
  plugins: [],
}
