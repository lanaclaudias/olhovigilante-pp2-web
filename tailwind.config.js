/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora'],
        rubik: ['Rubik'],
      },
      container: {
        center: true,
        screens: {
          xl: '1084px',
        },
      },
    },
  },
  plugins: [],
};
