/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#00729e',
        'main-light': '#0092cc',
        'main-extra-light': '#DBF9FF'
      },
      boxShadow: {
        blue: 'rgba(0, 181, 214, 0.4) 0px 0px 2px 2px'
      }
    },
  },
  plugins: [],
}