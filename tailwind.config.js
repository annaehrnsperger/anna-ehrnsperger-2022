// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '900px',
      lg: '1280px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      black: 'var(--black)',
      white: 'var(--white)',
      gray: 'var(--gray)',
      lightgray: 'var(--lightgray)',
    },
    fontFamily: {
      sans: ['Suisse', ...defaultTheme.fontFamily.sans],
      italic: ['Suisse Italic', ...defaultTheme.fontFamily.sans],
      bold: ['Suisse Bold', ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      sm: '1.4rem',
      base: 'clamp(1.6rem, 3vw, 1.8rem)',
      lg: 'clamp(3rem, 4vw, 4.5rem)',
      xl: 'clamp(3rem, 7vw, 12rem)',
      '2xl': 'clamp(4.6rem, 9vw, 15rem)',
    },
    lineHeight: {
      none: '0.98',
      tighter: '1.075',
      tight: '1.325',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    extend: {
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-21': 'span 21 / span 21',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
      },
      gridColumnStart: {
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
      },
    },
  },
  variants: {
    extend: {},
  },
  mode: 'jit',
  plugins: [],
  purge: ['./public/**/*.html', './src/**/*.{html,njk}'],
};
