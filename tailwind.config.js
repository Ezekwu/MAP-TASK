/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {},
        secondary: {},
        gray: {},
        navigation: {
          background: '#FAF1E5',
          active: '#EFD1A9',
          highlight: '#F5E3CC',
          'active-border': '#101413',
        },
        typography: {
          inactive: '#585755',
          base: '#101413',
          "highlight-soft": '#AFD7C9',
          light: '#FFFFFF',
          success: '#426C5D',
          "dark-accent": '#272932',
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
