/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFFFF',
        'text-primary': '#444B59',
        'footer-bg': '#E68B8F',
        'banner-upper': '#B3B1A4',
        'banner-lower': '#91B2B4',
        'button-hover': '#E9908E'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif']
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
        slideInUp: 'slideInUp 0.6s ease-out forwards',
        quickBounce: 'quickBounce 0.4s ease-out forwards'
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        slideInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        quickBounce: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          '50%': {
            opacity: '1',
            transform: 'translateY(-12px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    }
  },
  plugins: [typography]
}
