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
          100: '#F7F9FC',
          200: '#CCFFED',
          300: '#E3EAFB',
          400: '#4DFFC1',
          500: '#175CFF',
          600: '#026412',
          700: '#006642',
          1000: '#1D2739', 
        },
        danger: {
          100: '#FFE6E6',
          200: '#D42620',
        },
        tertiary: {
          50: '#F7F9FC', 
          100: '#F7F7F8', 
          200: '#D9D9D9',
          300: '#E4E7EC', 
          350: '#98A2B3',
          400: '#667185',
          500: '#555E68',
          600: '#475367', 
          700: '#344054', 
          800: '#E1E1E2',
          900: '#101928',
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
          1600: '#585B5A', // Extra color added here
          1700: '#F2F2FF', // Extra color added here
          1800: '#CECED4', // Extra color added here
        },
        neutral: {
          100: '#FFECE5',
          200: '',
          300: '',
          400: '',
          500: '#F56630',
          600: '#F5E3CC',
          700: '#EFD1A9',
          800: '',
          900: '',
        },
        success: {
          100: '#E7F6EC',
          500: '#0F973D'
        },
        warning: {
          100: '#FFF4E5', // Lightest warning
          200: '#FFE6CC',
          300: '#FFD1A3',
          400: '#FFB973',
          500: '#FF9E40', // Primary warning color
          600: '#CC7D33',
          700: '#995C26',
          800: '#663D19',
          900: '#33200D', // Darkest warning
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
          label: '#55556D',
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
