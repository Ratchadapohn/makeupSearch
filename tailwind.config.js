const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'opificio': ['"Opificio Bold Rounded"', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
};

module.exports = {
  ...tailwindConfig,
  theme: {
    extend: {
      ...tailwindConfig.theme.extend,
    },
  },
  variants: {
    ...tailwindConfig.variants,
  },
  plugins: [
    ...tailwindConfig.plugins,
  ],
};
