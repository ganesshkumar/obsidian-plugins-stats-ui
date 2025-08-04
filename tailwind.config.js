const flowbite = require('flowbite-react/tailwind');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Noto sans"', 'system-ui', 'sans-serif'],
        heading: ['Lato', 'system-ui', 'sans-serif'],
        pre: ['monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      typography: {
        DEFAULT: {
          css: {
            'h3 a': { // for weekly update post ### h3
              color: 'rgb(200 30 30 / var(--tw-text-opacity))', // text-red-700
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    flowbite.plugin(),
    require('tailwindcss-animate'),
  ],
};
