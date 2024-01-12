//** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'white-rgba': 'rgba(255, 255, 255, 0.10)',
        'light-blue':'rgba(0, 102, 255, 1)'
      },
      boxShadow:{
        '3xl':'0px 4px 30px 0px rgba(255, 255, 255, 0.10)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
  
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}



