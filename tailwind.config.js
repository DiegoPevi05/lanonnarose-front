/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#c5948c",
        secondary: "#fbf1e2",
        tertiary: "#b7b4a0"
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        heading: ['BerkshireSwash-Regular','sans-serif'],
        body: ['Arcane Nine','serif'],
      },
      backgroundImage: {
        "body-pattern": "url('/src/assets/images/bgNonnaRose.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

