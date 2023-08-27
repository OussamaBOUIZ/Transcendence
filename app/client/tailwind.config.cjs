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
      }
    },
  },
  plugins: [],
}

// A15FE4