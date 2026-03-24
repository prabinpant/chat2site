/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        surface: '#f8fafc',
        accent: '#3b82f6',
        text: '#0f172a',
        vintage: {
          offwhite: '#f4f1ea',
          black: '#1a1a1a',
          sepia: '#704214',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cartoon: ['"Comic Sans MS"', '"Chalkboard SE"', 'sans-serif'],
      },
      animation: {
        'wobble-slow': 'wobble 3s ease-in-out infinite',
        'flicker': 'flicker 0.1s infinite',
        'bounce-squash': 'bounce-squash 0.5s ease-in-out infinite alternate',
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'rotate(-1deg) scale(1)' },
          '50%': { transform: 'rotate(1deg) scale(1.02)' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.97' },
          '50%': { opacity: '1' },
        },
        'bounce-squash': {
          '0%': { transform: 'translateY(0) scaleX(1) scaleY(1)' },
          '100%': { transform: 'translateY(-10px) scaleX(0.9) scaleY(1.1)' },
        }
      }
    },
  },
  plugins: [],
}