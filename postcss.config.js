/* eslint-disable import/no-extraneous-dependencies */
const tailwindcss = require('tailwindcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [tailwindcss('tailwind.config.js'), postcssImport, autoprefixer],
};
