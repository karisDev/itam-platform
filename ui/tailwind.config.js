/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "512px",
      md: "768px",
      lg: "1024px",
      max: "1280px"
    },
    extend: {
      colors: {
        bg: {
          primary: "#000",
          secondary: "#121212",
          tetriary: "#333333"
        },
        text: {
          primary: "#EDEDED",
          secondary: "#888888",
          link: "#3291FF"
        },
        border: {
          primary: "#333333"
        },
        button: {
          disabled: "#888888",
          primary: {
            bg: "#EDEDED",
            text: "#0A0A0A",
            hover: "#D1D1D1"
          },
          secondary: {
            bg: "#0A0A0A",
            text: "#EDEDED",
            hover: "#1A1A1A"
          }
        },
        input: {
          bg: "#0A0A0A",
          hover: "#121212",
          disabled: "#2A2A2A"
        },
        status: {
          error: "#BF5552"
        }
      }
    }
  },
  plugins: []
};
