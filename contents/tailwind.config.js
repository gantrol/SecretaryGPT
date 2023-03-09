// /** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ['./**/*.{svelte,html}'],
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
  daisyui: {
    styled: true,
    themes: ["light", "dark"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
