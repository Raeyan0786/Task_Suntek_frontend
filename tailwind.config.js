/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
delete colors?.lightBlue;
delete colors?.warmGray;
delete colors?.trueGray;
delete colors?.coolGray;
delete colors?.blueGray;
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        // xxl: "1320px",
      },
    },
    colors: {
      brand: {
        DEFAULT: '#FF2800',
      },
      darkGreen:'#13484E',
      graniteGray: '#696767',
      light_yellow:"#FCAA47",
      scarlet: '#ff280017',
      crimson: '#E50F0F',
      caramel: '#FFD88D',
      palePink: '#F8D7DA',
      light_black:"#5C5C5C",
      bloodOrange: '#D70014',
      lightGray: '#D6CFCF',
      cultured: '#F6F6F6',
      islamicGreen: '#029A11',
      magicMint: '#B6FFBD',
      mistyRose: '#FDE3DE',
      doctorPale: '#F9F9F9',
      broadGray: '#EBEAEA',
      brandColor: '#FFF2F0',
      successBackground: '#B6FFBD',
      successText: '#029A11',
      skeletonColor: '#00000013',
      ...colors,
    },
    extend: {
    
    boxShadow: {
      socialLinks: '0px 5px 15px rgba(0, 0, 0, 0.35) ',
      filters: '0px 0px 9px 0px #FFD4CC',
      bookProperty: '0px 2px 8px 0px rgba(0, 0, 0, 0.12);',
    },
  },
  },
}