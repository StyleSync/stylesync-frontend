/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82ef',
          light: '#d8e6fc',
        },
        accent: {
          DEFAULT: '#0252cc',
        },
        dark: {
          DEFAULT: '#323e4a',
        },
        black: {
          DEFAULT: '#1F2026',
        },
        gray: {
          DEFAULT: '#939daa',
          light: '#ECEDEE',
          accent: '#767A85',
        },
        destructive: {
          DEFAULT: '#ff62a5',
          light: '#ffdbeb',
        },
        green: {
          DEFAULT: '#4bb543',
        },
        orange: {
          DEFAULT: '#FA714E',
        },
      },
      boxShadow: {
        DEFAULT: '0px 4px 15px 0px rgba(37, 74, 165, 0.1)',
        accentShadow: '0 18px 30px 0 rgba(37, 74, 165, 0.15)',
        colour: '0 6px 16px rgba(252, 133, 140, 0.3)',
      },
    },
    backgroundImage: {
      'service-card':
        'linear-gradient(270deg, rgba(205, 160, 160, 0) 0%, #675050 100%)',
      'intro-button': 'linear-gradient(90deg, #FA719A 0%, #FDA571 100%)',
    },
  },
  plugins: [],
};
