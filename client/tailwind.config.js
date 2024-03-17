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
      "light-white":"rgba(255,255,255,0.17)",
       "kyz":"#c0a7f2"
      },
      backgroundImage: theme => ({
        'sidebar-image': "url('/src/public/Images/sidebar.jpg')",
        'distance-sidebar':"url('/src/public/Images/DistanceSidebar.jpg')",
        'Login-image' : "url('/src/public/Images/Login.jpg')"
      }),  
      fontWeight: {
        hard: 900, // Define a custom font weight
      },
    },
  },
  plugins: [],
})