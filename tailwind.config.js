/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(min(17rem, 100%), 1fr))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
