/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ['Georgia', 'serif'],
          sans: ['Helvetica', 'Arial', 'sans-serif'],
          pacifico: ['"Pacifico"', 'cursive'],
        },
      },
    },
    plugins: [],
  };
  