import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // adding next-ui components
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "500px",
        tab: "1200px",
        pc: "1600px",
      },
      colors: {
        instaGradient: "linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
