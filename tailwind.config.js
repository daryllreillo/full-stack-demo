/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'icons8-checkmark-48-img': `url('/icons8-checkmark-48.svg')`,
        'icons-xmark-img': 'url("/red-x-10335.svg")',
        // 'cust-image-mainpage': 'linear-gradient(-45deg, #365314, #14532D, #064E3B, #115E59, #155E75, #1D4ED8)',
        'cust-image-mainpage': 'linear-gradient(-45deg, #365314, #14532D, #064E3B, #134E4A, #164E63, #0C4A6E, #1E3A8A, #312E81)',
        // #365314 #14532D #064E3B #134E4A #164E63 #0C4A6E #1E3A8A #312E81 #4C1D95
      },
      content: {
        'icons-xmark-img': 'url("/red-x-10335.svg")',
      },
      backgroundSize: {
        '20x20': '20px 20px',
        'cust-size-mainpage': '500% 500%',
      },
      height: {
        'cust-height-mainpage': '100vh',
      },
      transitionProperty: {
        'background-color': 'background-color',
      },
      boxShadow: {
        'y-md': '0 3px 5px rgba(0,0,0,0.3), 0 -3px 5px rgba(0,0,0,0.3)',
      },
      keyframes: {
        'slide-down': {
          from: {
            opacity: 0,
            transform: 'translateY(-100%)',
            'z-index': 100,
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'slide-up': {
          from: {
            opacity: 1,
            transform: 'translateY(0)',
            'z-index': 100,
          },
          to: {
            opacity: 0,
            transform: 'translateY(-100%)',
            'z-index': -1,
          },
        },
        'fade-in': {
          from: {
            opacity: 0,
            transform: 'translateX(100%)',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        'fade-out': {
          from: {
            opacity: 1,
            transform: 'translateX(0)',
          },
          to: {
            opacity: 0,
            transform: 'translateX(-100%)',
          },
        },
        'cust-keyframes-mainpage': {
          '0%': {
            'background-position': '100% 50%',
          },
          '50%': {
            'background-position': '0% 50%',
          },
          '100%': {
            'background-position': '100% 50%',
          },
        },
        loading: {
          from: {
            transform: 'rotate(0turn)',
          },
          to: {
            transform: 'rotate(2turn)',
          },
        },
        'shake-x': {
          '0%': {
            transform: 'translateX(0px)',
          },
          '25%': {
            transform: 'translateX(6px)',
          },
          '50%': {
            transform: 'translateX(-10px)',
          },
          '70%': {
            transform: 'translateX(6px)',
          },
          '100%': {
            transform: 'translateX(0px)',
          },
        },
        'flip-y': {
          '0%': {
            transform: 'rotateX(180deg)',
          },
          '50%': {
            transform: 'rotateX(270deg)',
          },
          '100%': {
            transform: 'rotateX(360deg)',
          },
        },
        pop: {
          '0%': {
            transform: 'scale(1)',
          },
          '25%': {
            transform: 'scale(1.05)',
          },
          '50%': {
            transform: 'scale(1.2)',
          },
          '75%': {
            transform: 'scale(1.05)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        'slide-down': 'slide-down 400ms ease-out',
        'slide-up': 'slide-up 300ms ease-out',
        'fade-in': 'fade-in 200ms linear',
        'fade-out': 'fade-out 200ms linear',
        'cust-animation-mainpage': 'cust-keyframes-mainpage 13s ease infinite',
        loading: 'loading 0.9s ease-in-out infinite',
        'shake-x': 'shake-x 300ms linear',
        'flip-y': 'flip-y 300ms linear',
        pop: 'pop 200ms linear',
      },
      colors: {
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        mainfg: 'rgb(var(--color-mainfg) / <alpha-value>)',
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        field: 'rgb(var(--color-field) / <alpha-value>)',
        mainfield: 'rgb(var(--color-mainfield) / <alpha-value>)',
        button: 'rgb(var(--color-button) / <alpha-value>)',
        shadow: 'rgb(var(--color-shadow) / <alpha-value>)',
        link: 'rgb(var(--color-link) / <alpha-value>)',
        placeholder: 'rgb(var(--color-placeholder) / <alpha-value>)',
        mainplaceholder: 'rgb(var(--color-mainplaceholder) / <alpha-value>)',
        'inputbg-invalid': 'rgb(var(--color-inputbg-invalid) / <alpha-value>)',
        'text-invalid': 'rgb(var(--color-text-invalid) / <alpha-value>)',
        'modal-fg': 'rgb(var(--color-modal-fg) / <alpha-value>)',
        'modal-bg': 'rgb(var(--color-modal-bg) / <alpha-value>)',
        'navbg-highlight': 'rgb(var(--color-navbg-highlight) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
