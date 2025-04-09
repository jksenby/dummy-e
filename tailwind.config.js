/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      width: ["responsive"], // Ensures `md:w-8` and other breakpoints work
      order: ["responsive"], // Allows `md:flex-order-0` to function properly
    },
  },
  plugins: [PrimeUI],
}