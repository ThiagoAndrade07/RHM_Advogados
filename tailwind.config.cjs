module.exports = {
  content: ['./index.html', './assets/app.js'],
  theme: {
    extend: {
      colors: {
        brand: { orange: '#d86017', 'orange-light': '#f39200', navy: '#0b141b', 'navy-dark': '#060f16', 'card-bg': '#141d24', 'card-hover': '#1d2731', border: '#25323d' }
      },
      fontFamily: { sans: ['Hanken Grotesk', 'sans-serif'], serif: ['Libre Caslon Text', 'serif'] }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
