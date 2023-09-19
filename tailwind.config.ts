import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    entend: {}
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    require('tailwind-scrollbar')({
      nocompatible: true
    }),
  ],
}
export default config
