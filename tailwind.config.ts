/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores para o modo escuro
        dark: {
          navy: 'hsl(220, 25%, 15%)',
          background: 'hsl(220, 15%, 10%)',
        },
        // Cores para o modo claro
        light: {
          navy: 'hsl(220, 40%, 20%)',
          white: 'hsl(40, 20%, 98%)',
          gray: 'hsl(220, 10%, 95%)',
        },
        gold: {
          accent: 'hsl(45, 90%, 55%)', // dark mode
          light: 'hsl(45, 75%, 45%)', // light mode
        },
        content: {
          dark: 'hsl(220, 8%, 85%)',
          light: 'hsl(220, 30%, 25%)',
          muted: 'hsl(220, 5%, 60%)',
          link: 'hsl(210, 100%, 60%)',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'h1': '3.5rem',
        'h2': '2rem',
        'h3': '1.75rem',
        'body': '1.125rem',
        'metadata': '0.875rem',
      },
      lineHeight: {
        'h1': '4rem',
        'h2': '2.5rem',
        'body': '1.875',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '7xl': '80rem',
        '3xl': '48rem',
        '6xl': '72rem',
      },
    },
  },
  plugins: [],
}
