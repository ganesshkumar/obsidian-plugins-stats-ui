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
       keyframes: {
        wave: {
          '0%': { backgroundPositionX: '0px' },
          '100%': { backgroundPositionX: '1000px' },
        },
        wave2: {
          '0%': { backgroundPositionX: '0px' },
          '100%': { backgroundPositionX: '-1000px' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        morph: {
          '0%': { borderRadius: '40% 60% 60% 40% / 70% 30% 70% 30%' },
          '100%': { borderRadius: '40% 60%' },
        },
        spin: {
          to: { transform: 'rotate(1turn)' },
        },
      },
      animation: {
        wave: 'wave 30s linear infinite', // wave animated
        wave2: 'wave2 15s linear infinite', // wave animated
        'wave2-fast': 'wave2 5s linear infinite', // wave animated
        gradient: 'gradient 15s ease infinite', // animated background
        'morph-spin': 'morph 15s linear infinite alternate, spin 20s linear infinite', // animated background
        'morph-spin-reverse': 'morph 10s linear infinite alternate, spin 26s linear infinite reverse', // animated background
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
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
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-animate'),
  ],
};
