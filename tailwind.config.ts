import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        freelanzoGradientStart: "#fa7b64",
        freelanzoGradientMiddle: "#ffb199",
        freelanzoGradientEnd: "#ffd4d4",
      },
    },
  },
  plugins: [],
};

export default config;
