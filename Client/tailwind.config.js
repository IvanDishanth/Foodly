/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Consider a more modern, slightly playful sans-serif for body text
        // and a bold, statement font for headings/logo.
        sans: ['"Poppins"', 'sans-serif'], // Poppins is popular and versatile
        display: ['"Lobster Two"', 'cursive'], // A good option for a unique logo/headline
      },
      colors: {
        // Refined color palette for a premium food app feel
        'primary-gold': '#FFD700', // Brighter, more appealing gold
        'dark-charcoal': '#1A1A1A', // A soft black for backgrounds
        'accent-red': '#E53E3E', // A subtle accent red
        'light-cream': '#FDFBF6', // For backgrounds or cards
        'text-light': '#E0E0E0', // For light text on dark backgrounds
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'rotate-slow': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0)',
          },
          '50%': {
            transform: 'translateY(-10px) translateX(10px)',
          },
        },
        'wave-slow': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        'bounce-custom': {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-fade': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.7s ease-out forwards',
        'rotate-slow': 'rotate-slow 60s linear infinite', // Slower rotation
        'float': 'float 15s ease-in-out infinite',
        'wave-slow': 'wave-slow 30s linear infinite', // Adjust speed as needed
        'bounce-custom': 'bounce-custom 1.5s infinite',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'pulse-fade': 'pulse-fade 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}