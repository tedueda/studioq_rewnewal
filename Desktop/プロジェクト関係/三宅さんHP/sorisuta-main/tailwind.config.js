/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'c-bg': '#f8fafc',
        'c-primary': '#4F81BD',
        'c-subtle': '#DCE6F1',
        'c-accent': '#EAF1DD',
        'c-text': '#262626',
        'c-line': '#B4BEC8',
        'c-cta': '#2f855a',
        'c-cta-contrast': '#ffffff',
      },
      fontFamily: {
        'noto': ['Noto Sans JP', 'sans-serif'],
      },
      maxWidth: {
        'container': '1200px',
      },
      lineHeight: {
        'relaxed': '1.8',
      }
    },
  },
  plugins: [],
};