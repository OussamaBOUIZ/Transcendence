/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'sdb-gradient': 'linear-gradient(360deg, #E72FD0 0%, #8B3DD9 100%)',
        'primary-color': '#3E186567',
        'border-color': '#F7BAF8',
        'primary-pink': '#E72FD0',
        'bar-background': '#350D5C',
        'messages': '#A15FE4',
        'my-messages': '#DF59E1',
        'chat-body': '#3B1662'
      },
      colors: {
        'primary-color': '#3E186567',
        'primary-pink': '#E72FD0',
      }
    },
  },
  plugins: [],
}

// A15FE4