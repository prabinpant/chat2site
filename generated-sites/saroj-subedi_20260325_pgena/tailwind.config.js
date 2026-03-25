/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#070B14',
        panel: '#0F1729',
        accent: '#00F5D4',
        highlight: '#FF4D6D',
        text: '#F4F7FB',
        soft: '#B7C2D7',
        muted: '#7D8AA5',
        line: 'rgba(183, 194, 215, 0.18)',
      },
      fontFamily: {
        heading: ['"Chakra Petch"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Sans"', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 30px 80px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'circuit-grid':
          'linear-gradient(rgba(0,245,212,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.12) 1px, transparent 1px)',
        scanlines:
          'linear-gradient(180deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 6px)',
      },
    },
  },
  plugins: [],
}
