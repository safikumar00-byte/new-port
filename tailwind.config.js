/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        'background-secondary': '#0D0D0D',
        surface: '#111111',
        'surface-elevated': '#151515',
        'text-primary': '#EAEAEA',
        'text-secondary': '#929292',
        'text-muted': '#555555',
        border: '#242424',
        'accent-blue': '#398BFF',
        'accent-green': '#21C78A',
        'accent-orange': '#F0A34A',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
        hand: ['Caveat', 'cursive'],
      },
      maxWidth: {
        'portfolio': '760px',
      }
    },
  },
  plugins: [],
}

