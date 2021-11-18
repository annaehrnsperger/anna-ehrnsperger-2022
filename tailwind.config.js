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
      primary: 'var(--text)',
      secondary: 'var(--bg)',
      transparent: 'transparent',
      black: 'var(--black)',
      white: 'var(--white)',
      gray: 'var(--gray)',
    },
    fontFamily: {
      sans: ['"Helvetica Neue"', ...defaultTheme.fontFamily.sans],
      serif: ['Georgia', ...defaultTheme.fontFamily.serif],
      mono: ['"Courier New"', ...defaultTheme.fontFamily.mono],
      // someName: []
    },
    fontSize: {
      xs: 'clamp(1.2rem, 2vw, 1.6rem)',
      sm: 'clamp(1.2rem, 2vw, 1.8rem)',
      base: 'clamp(1.6rem, 3vw, 2.4rem)',
      lg: 'clamp(2rem, 4vw, 3.2rem)',
      xl: 'clamp(3rem, 5vw, 4.2rem)',
      '2xl': 'clamp(2.7rem, 7vw, 4.8rem)',
      '3xl': 'clamp(2.7rem, 8vw, 5.6rem)',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    // padding: {
    //   0: '0px',
    //   sm: '20px',
    //   md: '25px',
    //   lg: '30px',
    // },
    // inset: {
    //   0: '0px',
    //   sm: '20px',
    //   md: '25px',
    //   lg: '30px',
    // },
    // gap: {
    //   sm: '20px',
    //   md: '25px',
    //   lg: '30px',
    // },
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
