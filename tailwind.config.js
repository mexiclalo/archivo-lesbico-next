/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.yellow, // Se mantiene por ahora
        gray: colors.neutral,

        // Tu paleta de colores personalizada
        'principal': '#291147',
        'acento': '#8C0DC2',
        'footer': '#2A1346',
        'oscuro': {
          '1': '#1a0a33',
          '2': '#0d051a',
        },
        'tabla': {
          'amarillo': '#F2A20C',
          'crema': '#F3E5D0',
          'marron': '#B49A7D',
        },

        // Colores extraídos del ejemplo
        'fondo': {
          'pagina': '#0d051a',
          'analisis': '#291147',
          'catalogo': '#1a0a33',
          'catalogo-header': '#0d051a',
          'libro-1': '#8C0DC2',
          'libro-2': '#A165C8',
          'libro-3': '#63009B',
          'toc-header': '#2A1346',
        },
        'box': {
            'rojo': '#D02128',
            'azul': '#002060',
        },
      },
    },
  },
  plugins: [],
}
