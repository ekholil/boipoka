/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
      "3xl": "1600px",
      "4xl": "1800px",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1f6e87",

          secondary: "#1d91a5",

          accent: "#2a37c9",

          neutral: "#1f1a2d",

          "base-100": "#ebe9f2",

          info: "#6a9ae2",

          success: "#16ac81",

          warning: "#9d5c07",

          error: "#ef5770",
        },
      },
    ],
  },
};
