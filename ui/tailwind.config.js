/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#000",
          secondary: "#121212",
          tetriary: "#333333"
        },
        text: {
          primary: "#EDEDED",
          secondary: "#888888"
        },
        border: {
          primary: "#333333"
        },
        button: {
          primary: {
            bg: "#EDEDED",
            text: "#0A0A0A"
          },
          secondary: {
            bg: "#0A0A0A",
            text: "#EDEDED"
          }
        }
      }
    }
  },
  plugins: []
};
