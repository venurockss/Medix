/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F4F7',
          100: '#CCE9EF',
          200: '#99D3DF',
          300: '#66BDCF',
          400: '#33A7BF',
          500: '#219EBC',  // Main primary color
          600: '#1A7E96',
          700: '#145F71',
          800: '#0D3F4B',
          900: '#072026',
        },
        secondary: {
          50: '#E6F0F3',
          100: '#CCE1E7',
          200: '#99C3CF',
          300: '#66A5B7',
          400: '#33879F',
          500: '#023047',  // Main secondary color
          600: '#022639',
          700: '#011D2B',
          800: '#01131C',
          900: '#000A0E',
        },
        accent: {
          50: '#FFF8E6',
          100: '#FFF1CC',
          200: '#FFE399',
          300: '#FFD566',
          400: '#FFC733',
          500: '#FFB703',  // Main accent color
          600: '#CC9202',
          700: '#996E02',
          800: '#664901',
          900: '#332501',
        },
        highlight: {
          50: '#FFF0E6',
          100: '#FFE1CC',
          200: '#FFC399',
          300: '#FFA566',
          400: '#FF8733',
          500: '#FB8500',  // Main highlight color
          600: '#C96A00',
          700: '#975000',
          800: '#643500',
          900: '#321B00',
        },
        sky: {
          50: '#F2F8FB',
          100: '#E6F1F7',
          200: '#CCE3EF',
          300: '#B3D5E7',
          400: '#99C7DF',
          500: '#8ECAE6',  // Main sky color
          600: '#72A2B8',
          700: '#55798A',
          800: '#39515C',
          900: '#1C282E',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        background: '#F8FAFC',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill,minmax(200px,1fr))'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}