module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: "#68ACB5",

      primaryText: "#131516",
      secondaryText: "#555f61"
    },
    sizes: {
      headers: {
        h1: "42px",
        h2: "38px",
        h3: "24px",
        h4: "18px"
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
