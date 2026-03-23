/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'card-deal': 'card-deal 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'card-fan-1': 'card-fan-1 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'card-fan-2': 'card-fan-2 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'card-fan-3': 'card-fan-3 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'card-fan-4': 'card-fan-4 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'card-settle': 'card-settle 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(24px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        // 主卡从下方升起
        'card-deal': {
          '0%': { transform: 'translateY(60px) scale(0.92)', opacity: 0 },
          '100%': { transform: 'translateY(0) scale(1)', opacity: 1 },
        },
        // 扇形展开：左侧第一张
        'card-fan-1': {
          '0%': { transform: 'translateY(40px) rotate(0deg)', opacity: 0 },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        },
        'card-fan-2': {
          '0%': { transform: 'translateY(40px) rotate(0deg)', opacity: 0 },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        },
        'card-fan-3': {
          '0%': { transform: 'translateY(40px) rotate(0deg)', opacity: 0 },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        },
        'card-fan-4': {
          '0%': { transform: 'translateY(40px) rotate(0deg)', opacity: 0 },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        },
        'card-settle': {
          '0%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.10), 0 12px 32px rgba(0,0,0,0.08)',
        'card-lift': '0 8px 24px rgba(0,0,0,0.12), 0 20px 48px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
