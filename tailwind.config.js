/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx","./src/*.js","./src/*.jsx"],
  theme: {
    extend: {
      colors: {
        "violet-300":"#13101D",
        "primary":"#853BCE"
      },
      fontFamily: {
        "nova":"Nova Square, sans-serif",
        "qualy":"Qualy, sans-serif"
      }
    },
  }, 
  plugins: [],
}

