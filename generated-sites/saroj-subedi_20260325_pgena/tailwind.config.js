/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0D1117',
        surface: '#161B22',
        accent: '#2DA44E',
        text: '#E6EDF3',
        muted: '#8B949E',
        line: 'rgba(230, 237, 243, 0.12)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        lift: '0 18px 40px rgba(0, 0, 0, 0.18)',
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at top, rgba(45, 164, 78, 0.18), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))',
      },
    },
  },
  plugins: [],
}
