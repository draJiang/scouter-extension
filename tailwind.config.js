module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          100: 'FFF9F7',
          900: '#F08A24'
        }
      },
    },
  },
  plugins: [],
  variants: {},
  corePlugins: {
    preflight: true,
  },
};