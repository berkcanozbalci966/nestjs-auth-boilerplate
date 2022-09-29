/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    theme: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },

      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      extend: {
        spacing: {
          128: "32rem",
          144: "36rem",
        },
        borderRadius: {
          "4xl": "2rem",
        },
        order: {
          1: "1",
          2: "2",
          3: "3",
          4: "4",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
