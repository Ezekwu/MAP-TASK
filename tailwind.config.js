/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '516px'
      },
      colors: {
        primary: {
          500: '#009F67'
        },
        danger: {
          700: '#A10603'
        },
        gray: {
          300: '#F0F0F0',
          400: '#E3E3E8',
          450: '#8A8AA3',
          500: '#88888B',
          600: '#5B6161',
          700: '#55556D',
          950: '#121217',
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

