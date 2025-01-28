import type { Config } from "tailwindcss";

import plugin from "tailwindcss/plugin";

const config: Config = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./markdown/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          1: "var(--gray-1)",
          2: "var(--gray-2)",
          3: "var(--gray-3)",
          4: "var(--gray-4)",
          5: "var(--gray-5)",
          6: "var(--gray-6)",
          7: "var(--gray-7)",
          8: "var(--gray-8)",
          9: "var(--gray-9)",
          10: "var(--gray-10)",
          11: "var(--gray-11)",
          12: "var(--gray-12)",
          a1: "var(--gray-a1)",
          a2: "var(--gray-a2)",
          a3: "var(--gray-a3)",
          a4: "var(--gray-a4)",
          a5: "var(--gray-a5)",
          a6: "var(--gray-a6)",
          a7: "var(--gray-a7)",
          a8: "var(--gray-a8)",
          a9: "var(--gray-a9)",
          a10: "var(--gray-a10)",
          a11: "var(--gray-a11)",
          a12: "var(--gray-a12)",
        },

        pink: {
          1: "var(--pink-1)",
          2: "var(--pink-2)",
          3: "var(--pink-3)",
          4: "var(--pink-4)",
          5: "var(--pink-5)",
          6: "var(--pink-6)",
          7: "var(--pink-7)",
          8: "var(--pink-8)",
          9: "var(--pink-9)",
          10: "var(--pink-10)",
          11: "var(--pink-11)",
          12: "var(--pink-12)",
          a1: "var(--pink-a1)",
          a2: "var(--pink-a2)",
          a3: "var(--pink-a3)",
          a4: "var(--pink-a4)",
          a5: "var(--pink-a5)",
          a6: "var(--pink-a6)",
          a7: "var(--pink-a7)",
          a8: "var(--pink-a8)",
          a9: "var(--pink-a9)",
          a10: "var(--pink-a10)",
          a11: "var(--pink-a11)",
          a12: "var(--pink-a12)",
        },
        yellow: {
          1: "var(--yellow-1)",
          2: "var(--yellow-2)",
          3: "var(--yellow-3)",
          4: "var(--yellow-4)",
          5: "var(--yellow-5)",
          6: "var(--yellow-6)",
          7: "var(--yellow-7)",
          8: "var(--yellow-8)",
          9: "var(--yellow-9)",
          10: "var(--yellow-10)",
          11: "var(--yellow-11)",
          12: "var(--yellow-12)",
          a1: "var(--yellow-a1)",
          a2: "var(--yellow-a2)",
          a3: "var(--yellow-a3)",
          a4: "var(--yellow-a4)",
          a5: "var(--yellow-a5)",
          a6: "var(--yellow-a6)",
          a7: "var(--yellow-a7)",
          a8: "var(--yellow-a8)",
          a9: "var(--yellow-a9)",
          a10: "var(--yellow-a10)",
          a11: "var(--yellow-a11)",
          a12: "var(--yellow-a12)",
        },
        primary: "#000000",
        secondary: "var(--secondary)",
        background: "var(--bg)",
        foreground: "var(--fg)",
        muted: "var(--muted)",
        hover: "var(--hover)",
        link: "var(--secondary)",
        border: "var(--border)",
        scrollbar: {
          thumb: "var(--scrollbar-thumb)",
          track: "var(--scrollbar-track)",
        },
        selection: {
          background: "var(--selection-background)",
          foreground: "var(--selection-foreground)",
        },
        highlight: {
          background: "var(--highlight-background)",
          foreground: "var(--highlight-foreground)",
        },
        kbd: {
          background: "var(--kbd-background)",
          foreground: "var(--kbd-foreground)",
          border: "var(--kbd-border)",
        },
      },
      fontFamily: {
        zimula: ["var(--font-zimula)"],
        apple: ["var(--font-apple)"],
      },
      borderRadius: {
        small: "var(--radius-small)",
        base: "var(--radius-base)",
        large: "var(--radius-large)",
      },
      screens: {
        "3xl": "1920px",
      },
      fontSize: {
        "fluid-base": [
          "clamp(1rem, 0.9375rem + 0.4vw, 1.3125rem)",
          { lineHeight: "clamp(1.5rem, 1.24rem + 0.4vw, 1.53rem)" },
        ],
        "fluid-lg": [
          "clamp(1.5rem, 1.125rem + 0.8vw, 1.75rem)",
          { lineHeight: "1.5" },
        ],
        "fluid-xl": [
          "clamp(2rem, 1.5rem + 1.5vw, 2.5rem)",
          { lineHeight: "1.3" },
        ],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".font-outline-1-secondary": {
          "-webkit-text-stroke": "1px var(--secondary)",
        },
        ".font-outline-1-black": {
          "-webkit-text-stroke": "1px black",
        },
        // ".font-outline-0": {
        //   "-webkit-text-stroke": "0px #adadad",
        // },
      });
    }),
  ],
};

export default config;
