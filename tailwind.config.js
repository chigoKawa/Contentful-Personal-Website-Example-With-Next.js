import { nextui } from "@nextui-org/theme";
import themes from "./json/themes.json";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    nextui({
      addCommonColors: false,
      defaultTheme: "light",
      // defaultExtendTheme: "light",
      layout: {},
      themes: themes,
    }),
  ],
};
