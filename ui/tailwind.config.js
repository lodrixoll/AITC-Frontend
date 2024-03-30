/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customRed: '#ff0000', // red
        linkBlue: '#64b5f6', // new link color
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
