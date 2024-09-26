/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  useTabs: false,
  tabWidth: 4,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  printWidth: 10000,
  proseWrap: "never",
  endOfLine: "lf",
};

export default config;
