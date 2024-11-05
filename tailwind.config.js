/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#009F67'
        },
        gray: {
          400: '#E3E3E8',
          500: '#88888B',
          600: '#5B6161',
          700: '#55556D',
          1000: '#101413',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans'],
      },
    },
  },
  plugins: [],
}

