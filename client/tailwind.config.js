/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      "dark-purple" : "#081A51",
      "light-white":"rgba(255,255,255,0.17)"
      },
      backgroundImage: theme => ({
        'sidebar-image': "url('/src/public/Images/sidebar.jpg')",
      })
    },
  },
  plugins: [],
})