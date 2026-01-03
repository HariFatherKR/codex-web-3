import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-press)', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#f4f8ff',
          100: '#e6edff',
          200: '#c8d7ff',
          300: '#9bb5ff',
          400: '#6c8dff',
          500: '#4769f2',
          600: '#2f4fd6',
          700: '#243da6',
          800: '#1f327f',
          900: '#1b2c65'
        }
      },
      boxShadow: {
        pixel: '6px 6px 0 #0f172a'
      }
    }
  },
  plugins: []
};

export default config;
