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
          DEFAULT: '#ff00ff', // Neon Pink
          dark: '#cc00cc',
          blue: '#00ffff', // Electric Blue
          green: '#ccff00', // Acid Green
        },
        pitch: {
          DEFAULT: '#050505', // Near Black
          deep: '#000000',
        },
        surface: {
          DEFAULT: '#f8fafc',
          dark: '#f1f5f9',
        }
      },
      fontFamily: {
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scan: {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        }
      }
    },
  },
  plugins: [],
}
