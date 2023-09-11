/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'sdb-gradient': 'linear-gradient(360deg, #E72FD0 0%, #8B3DD9 100%)',
        'primary-color': '#38125E',
        'border-color': '#F7BAF8',
        'primary-pink': '#E72FD0',
        'bar-background': '#350D5C',
        'messages': '#A15FE4',
        'my-messages': '#DF59E1',
        'room-bar': '#3B1662',
        'chat-body': '#2C094E',
        'room-active-bar': '#531F8A',
        'input' : 'rgba(171, 171, 171, 0.28)'
      },
      colors: {
        'primary-color': '#38125E',
        'primary-pink': '#E72FD0',
      },
      screens: {
        big: { min:"1631px", max: "1752px" },
        desk:{max: "1631px"},
        des:{ min:  "1541px",max: "1600px"}, 
        de: { min:  "1280px",max: "1540px"},
        xlg: { min:  "1024px",max: "1279px" },
        lrg: { min:  "768px" ,max: "1023px" },
        med: { max: "767px" },
        sml: { max: "639px" },
        mxl: {max: "1024px"},
        smt: {min: '820px'}
      }
    },
  },
  plugins: [],
}
