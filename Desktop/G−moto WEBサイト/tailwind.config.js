/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F28C28',
        accent: '#FFE8CC',
        tertiary: '#C7E7C3',
        'primary-hover': '#E67A1A',
        orange: {
          50: '#FFF7ED',
          100: '#FFF3E0',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF9800',
          900: '#F57C00',
        },
      },
      fontFamily: {
        'noto': ['Noto Sans JP', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1440px',
      },
      boxShadow: {
        'soft': '0 2px 6px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 4px 12px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
};