/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '516px',
      },
      screens: {
        xs: '516px',
      },
      colors: {
        light: '#ffffff',
        primary: {
          100: '#E0FFF4',
          200: '#CCFFED',
          300: '#DBFAE0',
          400: '#4DFFC1',
          500: '#009F67',
          600: '#026412',
          700: '#006642',
        },
        danger: {
          100: '#FFE6E6',
          200: '#A10603',
        },
        tertiary: {
          50: '#F8F8F8', // moved to the top (lightest)
          100: '#F7F7F8',
          200: '#F6F6F7',
          300: '#F0F0F0',
          400: '#EEEEEE',
          500: '#EBEBEB',
          600: '#E4E4E7',
          700: '#E3E3E8',
          800: '#E1E1E2',
          900: '#C3C3C3',
          1000: '#696969',
        },
        secondary: {
          100: '#F7F7F8',
          200: '#F6F6F7',
          300: '#F0F0F0',
          400: '#EEEEEE',
          500: '#EBEBEB',
          600: '#E4E4E7',
          700: '#E3E3E8',
          800: '#E1E1E2',
          900: '#C3C3C3',
          1000: '#696969',
          1100: '#272932', // Extra color added here
          1200: '#A10603', // Extra color added here
          1300: '#141414', // Extra color added here
          1400: '#121217', // Extra color added here
          1500: '#101413', // Extra color added here
          1600: '#585B5A',
        },
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
          subtitle: '#404342',
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
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.border-b-dashed': {
          borderBottom: '1px dashed #EBEBEB',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
