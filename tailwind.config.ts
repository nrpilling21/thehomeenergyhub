import type { Config } from "tailwindcss";

/* Palette: warm daylight. Cream paper, sand panels, a deep warm ink, and a
   sunrise orange used sparingly for the moments that matter (hero, primary
   accents, footer). Token names (cream / plum / yellow / ink) are kept from
   the previous palette so every existing page re-themes without edits. */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FFF7E9",
          dark: "#F3E9D6",
        },
        sand: "#EDE1CA",
        line: "#E3D5BE",
        plum: {
          DEFAULT: "#1C130B",
          muted: "#7A6553",
          light: "#D9C9B2",
        },
        /* Was a lemon yellow; now a soft apricot so chips, tags and
           highlight cards sit inside the warm palette. */
        yellow: {
          DEFAULT: "#FFD9AE",
          soft: "#FFEBD3",
        },
        sun: {
          DEFAULT: "#F0600A",
          light: "#F7931E",
          deep: "#B8430A",
        },
        lilac: "#CBB8FF",
        ink: "#1C130B",
        /* Warm the neutral greys used inside calculators and pillar pages. */
        gray: {
          50: "#FBF6EE",
          100: "#F3EBDF",
          200: "#E6DACA",
          300: "#D2C3AF",
          400: "#AD9B86",
          500: "#857360",
          600: "#665646",
          700: "#4B3E32",
          800: "#33291F",
          900: "#1C130B",
        },
      },
      borderRadius: {
        xl: "6px",
        "2xl": "10px",
        "3xl": "16px",
      },
      /* One family for everything, Everyday-style: Figtree as the closest
         free match to their custom grotesk. `serif` and `mono` are aliased
         to it so older pages that ask for them stay consistent. */
      fontFamily: {
        display: ['"Figtree Variable"', "system-ui", "sans-serif"],
        sans: ['"Figtree Variable"', "system-ui", "sans-serif"],
        serif: ['"Figtree Variable"', "system-ui", "sans-serif"],
        mono: ['"Figtree Variable"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
