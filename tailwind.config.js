/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jkd-black': '#050505',
        'jkd-gray': '#121212',
        'jkd-gold': '#D4AF37',
        'jkd-amber': '#b45309',
        'jkd-red': '#991b1b',
        'jkd-crimson': '#7f1d1d',
        'jkd-deep': '#0a0a0a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cinematic: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        serif: ['"Playfair Display"', 'serif'],
        chinese: ['"Noto Serif SC"', 'serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'flicker': 'flicker 4s ease-in-out infinite',
        'water-ripple': 'waterRipple 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
          '75%': { opacity: '0.95' },
        },
        waterRipple: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.15)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
