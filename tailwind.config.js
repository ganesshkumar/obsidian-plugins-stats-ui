module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['"Noto sans"', 'system-ui', 'sans-serif'],
        'heading': ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: ["cupcake"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
