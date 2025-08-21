/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007AFF',
          light: '#EAF4FF',
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
          DEFAULT: '#FF3B30',
          light: '#FFECEC',
        },
        green: {
          DEFAULT: '#34C759',
          light: '#E6F8EC',
        },
        orange: {
          DEFAULT: '#FF9500',
          light: '#FFF3E0',
        },
        cyan: {
          DEFAULT: '#32ADE6',
          light: '#E1F6FD',
        },
        purple: {
          DEFAULT: '#AF52DE',
          light: '#F3E8FB',
        },
        yellow: {
          DEFAULT: '#FFCC00',
          light: '#FFF9E5',
        },
      },
      boxShadow: {
        DEFAULT: '0px 4px 15px 0px rgba(37, 74, 165, 0.1)',
        accentShadow: '0 18px 30px 0 rgba(37, 74, 165, 0.15)',
        colour: '0 6px 16px rgba(252, 133, 140, 0.3)',
      },
    },
  },
  plugins: [],
};
