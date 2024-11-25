/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // fontFamily: {
    //   Montserrat: ['Montserrat', 'sans-serif'],
    //   Poppins: ['Poppins', 'sans-serif'],
    // },
    extend: {
      // colors: {},
      spacing: {
        'screen-header': 'calc(100vh - 62px)',
      },
      screens: {
        '1.5xl': '1440px',
      },
      // backgroundImage: {},
      // fontSize: {},
      // padding: {},
      // lineHeight: {},
      // gridTemplateColumns: {},
      boxShadow: {
        clean: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        'very-clean': '1px 2px 6px 2px rgba(100, 100, 111, 0.2)',
        mid: '0px 2px 8px 0px rgba(99, 99, 99, 0.2)',
        hight:
          'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
      },
    },
  },
  plugins: [],
}
