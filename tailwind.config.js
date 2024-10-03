/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        's' : { 'max': '654px'}
      },
      fontSize: {
        s : '8px'
      }
      
    },
  },
  plugins: [],
}

