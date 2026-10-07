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
      /* Everyday-style palette: white paper, soft stone panels, near-black
         ink and a warm grey for secondary text. Colour comes from imagery,
         not the UI. Token names are kept so every page re-themes. */
      colors: {
        cream: {
          DEFAULT: "#FFFFFF",
          dark: "#F6F5F2",
        },
        sand: "#EEECE7",
        line: "#E8E6E1",
        plum: {
          DEFAULT: "#212121",
          muted: "#7F7A76",
          light: "#D8D5CF",
        },
        yellow: {
          DEFAULT: "#F1EDE6",
          soft: "#F7F5F1",
        },
        sun: {
          DEFAULT: "#D9622B",
          light: "#E8A06A",
          deep: "#A8481C",
        },
        lilac: "#E9E4F5",
        ink: "#212121",
        gray: {
          50: "#FAFAF8",
          100: "#F6F5F2",
          200: "#E8E6E1",
          300: "#D8D5CF",
          400: "#B0ABA5",
          500: "#8E8984",
          600: "#7F7A76",
          700: "#55514D",
          800: "#363431",
          900: "#212121",
        },
      },
      borderRadius: {
        xl: "6px",
        "2xl": "8px",
        "3xl": "12px",
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
