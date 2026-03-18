/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/View/**/*.php",
    "./public/**/*.php"
  ],
  theme: {
    extend: {
      colors: {
        custom: '#303030'
      }
    },
  },
  plugins: [],
}

