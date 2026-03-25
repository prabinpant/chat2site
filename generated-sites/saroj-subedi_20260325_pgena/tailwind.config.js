/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#120f32',
        panel: '#f4f0cf',
        accent: '#00d8ff',
        highlight: '#ff4fd8',
        text: '#15103a',
        soft: '#1c2f8c',
        muted: '#51418f',
        line: 'rgba(21, 16, 58, 0.32)',
      },
      fontFamily: {
        heading: ['"Press Start 2P"', 'cursive'],
        body: ['"VT323"', 'monospace'],
        mono: ['"VT323"', 'monospace'],
      },
      boxShadow: {
        lift: '8px 8px 0 rgba(21, 16, 58, 0.9)',
      },
      backgroundImage: {
        'circuit-grid':
          'linear-gradient(rgba(0,216,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,79,216,0.3) 1px, transparent 1px)',
        scanlines:
          'linear-gradient(180deg, rgba(255,255,255,0.14) 0, rgba(255,255,255,0.14) 1px, transparent 1px, transparent 5px)',
      },
    },
  },
  plugins: [],
}
