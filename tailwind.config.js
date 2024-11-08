/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#CCFFED',
          400: '#4DFFC1',
          500: '#009F67',
        },
        secondary: {},
        gray: {},
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
        danger: {},
      },
      fontFamily: {
        poppins: ['Poppins', 'sans'],
      },
    },
  },
  plugins: [],
};
