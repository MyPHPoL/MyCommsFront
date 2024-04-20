/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#152238",
        secondary: "#192841",
        tertiary: "#1c2e4a",
        main: '#141a31',
        second: '#252b41',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
      backgroundColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    },
  },
  plugins: [],
}

