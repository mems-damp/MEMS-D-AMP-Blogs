/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md}",
    "./src/_includes/**/*.{html,js,njk,md}",
    "./src/_layouts/**/*.{html,js,njk,md}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#ffffea',
        accent: '#0453f1',
        'accent-hover': '#0341c7',
        'text-primary': '#1f2937',
        'text-secondary': '#6b7280'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'lato': ['Lato', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
} 