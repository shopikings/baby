/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#EFECDA',
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
        scroll: 'scroll 30s linear infinite'
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    }
  },
  plugins: []
}
