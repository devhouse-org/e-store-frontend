/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#FFF3ED",
          100: "#FFE1D5",
          200: "#FFC1AA",
          300: "#FF9F7F",
          400: "#FF7D54",
          500: "#EF5D2A",
          600: "#CC4D23",
          700: "#A33D1C",
          800: "#7A2D15",
          900: "#521D0E",
        },
        light: {
          50: "#FFFFFF",
          100: "#FCFCFC",
          200: "#FAFAFA",
          300: "#F7F7F7",
          400: "#F5F5F5",
          500: "#F4F4F4",
          600: "#E0E0E0",
          700: "#CCCCCC",
          800: "#B8B8B8",
          900: "#A4A4A4",
        },
        dark: {
          50: "#F2F2F2",
          100: "#DADADA",
          200: "#B3B3B3",
          300: "#8B8B8B",
          400: "#646464",
          500: "#1A202C",
          600: "#171C25",
          700: "#13171E",
          800: "#0F1217",
          900: "#0B0D10",
        },
        blue: {
          50: "#E5F2F8",
          100: "#CCE5F0",
          200: "#99CCE0",
          300: "#66B3D1",
          400: "#339AC1",
          500: "#0A2F4B",
          600: "#08273E",
          700: "#061F31",
          800: "#041725",
          900: "#020F18",
        },
      },
      fontFamily: {
        "tajawal-light": ["TajawalLight"],
        "tajawal-regular": ["TajawalRegular"],
        "tajawal-medium": ["TajawalMedium"],
        "tajawal-bold": ["TajawalBold"]
      }
    },
  },
  plugins: [],
};
