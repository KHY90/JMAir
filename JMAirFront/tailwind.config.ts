import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/(common)/**/*.{js,ts,jsx,tsx,mdx}",  
    "./src/styles/globals.css", 
  ],
  theme: { 
    extend: { 
      fontFamily: {
        sans: ["Geist", "sans-serif"],  
        mono: ["Geist Mono", "monospace"], 
        gowun: ['"Gowun Dodum"', 'sans-serif'],
      },
      colors: {
        primary: "#1D4ED8", // 확인 버튼
        danger: "#DC2626", // 취소 버튼
        grayLight: "#F3F4F6", // 연한 회색 배경 및 텍스트트
        white: "#FFFFFF", // 흰색 배경,
        black: "#000000", // 검은색 텍스트
        grayDark: "#4B5563", // 진한 회색 텍스트
      },
      fontSize: {
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
      },
      spacing: {
        headerPadding: "1rem 1.5rem",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
    },
  },
  plugins: [],
} satisfies Config;
