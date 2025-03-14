/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
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
          800: "#051C2D",
          900: "#111723",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        "tajawal-light": ["tajawal-light", "sans-serif"],
        "tajawal-regular": ["tajawal-regular", "sans-serif"],
        "tajawal-medium": ["tajawal-medium", "sans-serif"],
        "tajawal-bold": ["tajawal-bold", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  plugins: [require("tailwind-scrollbar")],
};
