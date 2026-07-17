/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#059669',
          cyan: '#0891b2',
          violet: '#7c3aed',
        }
      }
    },
  },
  plugins: [],
}
