import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f9e8e2',
          200: '#f5d0c5',
          300: '#e9a89a',
          400: '#d97b6a',
          500: '#c75d4a',
          600: '#b44a3a',
          700: '#953d30',
          800: '#7a352b',
          900: '#652f28',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7d8f7d',
          500: '#627462',
          600: '#4d5c4d',
          700: '#404b40',
          800: '#363e36',
          900: '#2f352f',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf3e7',
          300: '#f5e8d5',
          400: '#edd8bc',
          500: '#e3c4a0',
        },
        gold: {
          50: '#fdfcf7',
          100: '#faf6e8',
          200: '#f4ead0',
          300: '#ecd9ad',
          400: '#e2c385',
          500: '#d4a857',
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
