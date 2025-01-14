/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          "01": "#2E42D1", // primary-01
          "02": "#244EF7", // primary-02
        },
        basic: {
          white: "#FFFFFF",
          black: "#030303",
        },
        bg: {
          light: "#F7F9FB",
          dark: "#17191a",
        },
        gray: {
          700: "#3A3A3A",
          600: "#767676",
          500: "#999999",
          400: "#CCCCCC",
          300: "#DDDDDD",
          200: "#EDEDED",
          100: "#F6F6F6",
        },
      },
      fontFamily: {
        pretendard: ["Pretendard", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["84px", { lineHeight: "120%" }],
        "heading-xl": ["54px", { lineHeight: "120%" }],
        "heading-lg": ["40px", { lineHeight: "120%" }],
        "heading-md": ["32px", { lineHeight: "120%" }],
        "heading-sm": ["24px", { lineHeight: "120%" }],
        "body-lg": ["20px", { lineHeight: "150%" }],
        "body-md": ["16px", { lineHeight: "150%" }],
        "body-sm": ["14px", { lineHeight: "150%" }],
      },
      spacing: {
        "section-y": "60px",
        "section-sm-y": "40px",
        "card-padding": "20px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // 이 부분 추가
  ],
};
