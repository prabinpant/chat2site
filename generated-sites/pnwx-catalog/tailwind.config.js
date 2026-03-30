/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09141c',
        steel: '#103345',
        mist: '#d9e4ea',
        fog: '#eef4f7',
        signal: '#f4c15d',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(7, 20, 28, 0.18)',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
