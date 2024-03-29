/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/**/*.{ts,tsx}",
    "./layouts/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  daisyui: {
    themes: ["bumblebee"],
  },
  plugins: [require("daisyui")],
};
