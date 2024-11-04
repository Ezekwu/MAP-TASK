/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danger: "#EB5757",
        "danger-10": "#EB575710",
        primary: "#009F67",
        "primary-05": "#007AFF05",
        "primary-10": "#007AFF10",
        "danger-100": "#EB575710",
        "gray-10": "#F8F8F8",
        "gray-25": "#F9F9F9",
        "gray-50": "#F2F2F2",
        "gray-100": "#e5e5e5",
        "gray-200": "#CCCCCC",
        "gray-300": "#B3B3B3",
        "gray-400": "#E3E3E8",
        "gray-700": "#33333370",
        "gray-900": "#333333",
        "gray": "#808080",
        "gray-1000": '#101413'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans'],
      },
    },
  },
  plugins: [],
}

