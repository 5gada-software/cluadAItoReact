/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE7337',
        secondary: '#FDA400',
        darkbg: '#1C1A1A',
      },
    },
  },
  plugins: [],
}
