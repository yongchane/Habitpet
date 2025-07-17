/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4ECDC4",
        "primary-dark": "#3BA99C",
        secondary: "#FFD1DC",
        accent: "#FFA726",
        background: "#FEF7F0",
        "card-bg": "#FFFFFF",
        "text-primary": "#5D4037",
        "text-secondary": "#8D6E63",
      },
      fontFamily: {
        sans: ["System"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "30px",
        xl: "32px",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
    },
  },
  plugins: [],
};
