module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    spacings: {
      margins: {
        h1: "0.75rem",
        h2: "0.5rem",
        h3: "0.5rem"
      }
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: "#68ACB5",
      primaryContent: "#FFFFFF",
      primaryInteract: "#5a949c",

      text: "#131516",
      secondaryText: "#555f61",

      borderPrimary: "#68ACB5"
    },
    sizes: {
      headers: {
        h1: "48px",
        h2: "38px",
        h3: "24px",
        h4: "18px"
      },
      container: "1200px"
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
