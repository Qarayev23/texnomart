/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'mb': '425px',
        'lg': '991px',
        ...defaultTheme.screens
      },
    },
  },
  plugins: [],
}

