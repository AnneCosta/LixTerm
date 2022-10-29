/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        pBlue: {
          50: "#E4F2F6",
          100: "#BDDEEA",
          200: "#97C9DE",
          300: "#74B4D0",
          400: "#5AA5C9",
          500: "#4497C2",
          600: "#388AB6",
          700: "#2B79A5",
          800: "#226894", // primary option
          900: "#144C75"
        },
        pRed: {
          50: "#EAD9DE",
          100: "#CCA1AF", // primary option
          200: "#AF647D",
          300: "#95224F",
          400: "#840032",
          500: "#720017",
          600: "#660016",
          700: "#550013",
          800: "#44000C",
          900: "#33000B"
        },
        pPurple: {
          50: "#E8E7ED",
          100: "#C7C1D2",
          200: "#A29AB4",
          300: "#807495",
          400: "#695780",
          500: "#543B6C",
          600: "#4E3464",
          700: "#462C59",
          800: "#3D234D",
          900: "#2C1537" // primary option
        },
        pLavender: {
          50: "#E2F0F7",
          100: "#C3D8DF",
          200: "#A2BDC7", // primary option
          300: "#80A2AE",
          400: "#678E9C",
          500: "#4D7A8A",
          600: "#416B79",
          700: "#335763",
          800: "#26444F",
          900: "#162F38"
        },
        pOrange: {
          50: "#F8E9E6",
          100: "#F9CCBB",
          200: "#F5AB8F",
          300: "#F18B63",
          400: "#EF7341",
          500: "#EC5D1F",
          600: "#E2571B",
          700: "#D45017",
          800: "#C64A14",
          900: "#AD3E0E" // primary option
        }
      }
    },
  },
  plugins: [],
}
