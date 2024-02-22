import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(-20px)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        }
      },
      animation: {
        slideIn: "slideIn 0.5s linear"
      }
    },
  },
  plugins: [],
};

export default config;
