/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066cc',
          hover: '#0052a3',
          light: '#e8f4ff',
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#bdd9ff',
          300: '#84bbff',
          400: '#4194ff',
          500: '#0066cc',
          600: '#0052a3',
          700: '#003d7a',
          800: '#002a54',
          900: '#011629',
        },
        dark: {
          DEFAULT: '#020d1f',
          mid: '#041428',
          deep: '#011629',
        },
        success: '#059669',
        warning: '#d97706',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
      },
      animation: {
        'gradient-shift': 'gradientShift 12s ease infinite',
        'float-y': 'floatY 3s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'slide-in-blur': 'slideInBlur 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        slideInBlur: {
          '0%': { opacity: '0', transform: 'translateY(32px)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'primary-sm': '0 4px 12px rgba(0,102,204,0.2)',
        'primary-md': '0 8px 24px rgba(0,102,204,0.3)',
        'primary-lg': '0 16px 48px rgba(0,102,204,0.25)',
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.1), 0 16px 40px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};