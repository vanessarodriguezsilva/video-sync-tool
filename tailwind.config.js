/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          background: '#FAF4ED',
          primary: '#9A3412',
          secondary: '#D97706',
          text: '#2D3748',
          accent: '#F3E5AB',
        },
      },
    },
    plugins: [],
  }
  