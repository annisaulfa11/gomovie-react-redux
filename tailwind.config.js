/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        's' : { 'max': '639px'}
      },
      fontSize: {
        s : '8px'
      },
      height: {
        '100' : '430px'
      },
      maxHeight: {
        '100' : '430px'
      }
      
    },
  },
  plugins: [],
}

