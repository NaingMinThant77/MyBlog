/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Customize colors if needed
        lightBlue: '#e0f2ff',
        mediumBlue: '#93c5fd',
        darkBlue: '#1d4ed8',
      },
    },
  },
  plugins: [],
}

