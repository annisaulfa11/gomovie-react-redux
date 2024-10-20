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
      fontFamily: {
        'manrope': "Manrope, sans-serif"
      },
      fontSize: {
        s : '8px'
      },
      height: {
        '100' : '430px'
      },
      maxHeight: {
        '100' : '430px'
      },
      colors:{
        'black-600' : '#1A1A1A',
        'black-200' : '#262626',
        'black-100' : '#141414'
      }
      
    },
  },
  plugins: [],
}

