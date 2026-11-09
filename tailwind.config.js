/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Identity Specification
        // Forest Green: #1F3D28 — primary brand color (60%)
        // Sand Beige: #E8DCC4 — secondary color (30%)
        // Electric Purple: #8B5CF6 — accent color (max 10%)
        // Neutral: #F8F6F0
        brand: {
          forest: '#1F3D28',
          forestDark: '#152B1C',
          forestDeep: '#0D1B12',
          sand: '#E8DCC4',
          sandLight: '#F3EDE0',
          sandMuted: '#D8C9AA',
          purple: '#8B5CF6',
          purpleHover: '#7C3AED',
          purpleLight: '#DDD6FE',
          purpleDark: '#6D28D9',
          neutral: '#F8F6F0',
          dark: '#121C15',
        },
        forest: {
          950: '#0B170F',
          900: '#152B1C',
          800: '#1F3D28', // Primary brand 60%
          700: '#2A5237',
          600: '#356645',
          500: '#427D56',
          400: '#5A9670',
          300: '#84B497',
          200: '#B6D4C3',
          100: '#E2EFE7',
          50: '#F2F8F5',
        },
        sand: {
          900: '#6E5C3D',
          800: '#8C7750',
          700: '#A99266',
          600: '#C5AE80',
          500: '#D8C9AA',
          400: '#E1D5BD',
          300: '#E8DCC4', // Secondary color 30%
          200: '#F0E7D6',
          100: '#F6F1E7',
          50: '#FAF8F3',
        },
        electric: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6', // Accent color (max 10%)
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        // Mapping aliases to retain compatibility while driving new brand palette
        navy: {
          950: '#0B170F',
          900: '#152B1C',
          800: '#1F3D28',
          700: '#2A5237',
          600: '#356645',
          100: '#E8DCC4',
          50: '#F8F6F0',
        },
        gold: {
          900: '#6D28D9',
          800: '#7C3AED',
          700: '#8B5CF6',
          600: '#8B5CF6',
          500: '#8B5CF6',
          400: '#A78BFA',
          100: '#EDE9FE',
          50: '#F5F3FF',
        },
        ivory: {
          200: '#E8DCC4',
          100: '#F3EDE0',
          50: '#F8F6F0',
        },
        charcoal: {
          900: '#121C15',
          800: '#1C261F',
          700: '#2E3932',
          600: '#48544C',
          100: '#E5E7EB',
          50: '#F9FAFB',
        },
        teal: {
          900: '#152B1C',
          800: '#1F3D28',
          700: '#1F3D28',
          600: '#2A5237',
          500: '#1F3D28',
          400: '#356645',
          300: '#84B497',
          200: '#B6D4C3',
          100: '#E2EFE7',
          50: '#F2F8F5',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-right': 'slideRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-left': 'slideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}
