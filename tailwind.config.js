/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#ECDFCC",
        main: "#697565",
        sec: "#3C3D37",
        third: "#1E201E",
      },
    },
  },
  plugins: [],
};
