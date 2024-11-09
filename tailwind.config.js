/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '516px'
      },
      screens: {
        xs: '516px'
      },
      colors: {
        primary: {
          300: '#CCFFED',
          400: '#4DFFC1',
          500: '#009F67',
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
        },
        secondary: {},
        neutral: {
          100: '',
          200: '',
          300: '',
          400: '',
          500: '#FAF1E5',
          600: '#F5E3CC',
          700: '#EFD1A9',
          800: '',
          900: '',
        },
        navigation: {
          background: '#FAF1E5',
          active: '#EFD1A9',
          highlight: '#F5E3CC',
          'active-border': '#101413',
        },
        typography: {
          inactive: '#585755',
          base: '#101413',
          'highlight-soft': '#AFD7C9',
          light: '#FFFFFF',
          success: '#426C5D',
          'dark-accent': '#272932',
          secondary: '#52545B',
          muted: '#A3988A',
          disabled: '#88888B',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans'],
      },
    },
  },
  plugins: [],
};
