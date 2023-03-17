module.exports = {
  mode: "jit",
  content: ['./**/*.{svelte,html}'],
  plugins: [
    require('@tailwindcss/forms'),
    require("@tailwindcss/typography"),
    require('@tailwindcss/line-clamp'),
    require('daisyui')],
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
};
