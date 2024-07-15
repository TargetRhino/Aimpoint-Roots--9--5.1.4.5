/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/stores/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './server/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem',
          xl: '3.5rem'
        }
      },
      maxWidth: {
        '1/4': '25%',
        '1/3': '33%',
        '1/2': '50%',
        '2/3': '66%',
        '3/4': '75%'
      },
      spacing: {
        0.5: '0.13rem',
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        22: '6.5rem',
        35: '8.75rem',
        header: 'var(--header-height)'
      },
      padding: {
        'component-padding': 'var(--component-padding)'
      },
      letterSpacing: {
        base: 'var(--letter-spacing)'
      },
      lineHeight: {
        base: 'var(--line-height-base)'
      }
    },
    fontFamily: {
      base: ['var(--font-family-base)'],
      heading: ['var(--headings-font-family)']
    },
    screens: {
      xs: { max: '639px' },
      sm: '640px',
      'sm-max': { max: '767px' },
      'sm-only': {
        min: '640px',
        max: '767px'
      },
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      qhd: '1920px'
    },
    colors: {
      // Primary colors
      primary: {
        DEFAULT: 'var(--color-primary-10)',
        20: 'var(--color-primary-20)',
        30: 'var(--color-primary-30)',
        40: 'var(--color-primary-40)',
        50: 'var(--color-primary-50)'
      },
      // Secondary colors - Gray
      gray: {
        DEFAULT: 'var(--color-gray-10)',
        15: 'var(--color-gray-15)',
        20: 'var(--color-gray-20)',
        30: 'var(--color-gray-30)',
        40: 'var(--color-gray-40)',
        50: 'var(--color-gray-50)'
      },
      // Secondary colors - Green
      green: {
        DEFAULT: 'var(--color-green-10)',
        20: 'var(--color-green-20)',
        30: 'var(--color-green-30)',
        40: 'var(--color-green-40)',
        50: 'var(--color-green-50)'
      },
      // Secondary colors - Orange
      orange: {
        DEFAULT: 'var(--color-orange-10)',
        20: 'var(--color-orange-20)',
        30: 'var(--color-orange-30)',
        40: 'var(--color-orange-40)',
        50: 'var(--color-orange-50)'
      },
      // Secondary colors - Blue
      blue: {
        DEFAULT: 'var(--color-blue-10)',
        20: 'var(--color-blue-20)',
        30: 'var(--color-blue-30)',
        40: 'var(--color-blue-40)',
        50: 'var(--color-blue-50)'
      },
      // Secondary colors - Brown
      brown: {
        DEFAULT: 'var(--color-brown-10)',
        20: 'var(--color-brown-20)',
        30: 'var(--color-brown-30)',
        40: 'var(--color-brown-40)',
        50: 'var(--color-brown-50)'
      },
      // Neutral colors / grayscale
      main: 'var(--color-text)',
      white: 'rgb(var(--color-white-rgb) / <alpha-value>)',
      'gray-10': 'var(--color-gray-10)',
      'gray-20': 'var(--color-gray-20)',
      'gray-30': 'var(--color-gray-30)',
      'gray-40': 'var(--color-gray-40)',
      black: 'rgb(var(--color-black-rgb) / <alpha-value>)',
      // Success colors
      success: {
        DEFAULT: 'var(--color-success)',
        dark: 'var(--color-success-dark)',
        darker: 'var(--color-success-darker)'
      },
      // Warning colors
      warning: {
        DEFAULT: 'var(--color-warning)',
        dark: 'var(--color-warning-dark)',
        darker: 'var(--color-warning-darker)'
      },
      // Danger colors
      danger: {
        DEFAULT: 'var(--color-danger)',
        dark: 'var(--color-danger-dark)',
        darker: 'var(--color-danger-darker)'
      },
      transparent: 'transparent'
    },
    dropShadow: {
      sm: 'var(--css-utils-box-shadow-sm)',
      md: 'var(--css-utils-box-shadow)',
      lg: 'var(--css-utils-box-shadow-lg)'
    },
    boxShadow: {
      4: 'var(--css-box-shadow-4)',
      5: 'var(--css-box-shadow-5)'
    },
    fontSize: {
      xs: ['var(--font-size-extra-small)', {
        lineHeight: '16px'
      }],
      smaller: 'var(--font-size-smaller)',
      sm: 'var(--font-size-small)',
      'md-sm': 'var(--font-size-medium-small)',
      md: 'var(--font-size-medium)',
      base: 'var(--font-size-base)',
      'md-lg': 'var(--font-size-medium-large)',
      lg: 'var(--font-size-large)',
      xl: 'var(--font-size-xl)',
      'xl-2xl': '--font-size-xl-2xl',
      icon: 'var(--icon-size)',
      'icon-sm': 'var(--icon-size-small)',
      'icon-lg': 'var(--icon-size-large)',
      display: 'var(--display-font-size)',
      subheading: 'var(--subheading-font-size)',
      h1: [
        'var(--h1-font-size)',
        {
          lineHeight: 'var(--h1-line-height)',
          letterSpacing: 'var(--letter-spacing)',
          fontWeight: 'var(--headings-font-weight-base)'
        }
      ],
      h2: [
        'var(--h2-font-size)',
        {
          lineHeight: 'var(--headings-line-height)',
          letterSpacing: 'var(--letter-spacing)',
          fontWeight: 'var(--headings-font-weight-base)'
        }
      ],
      h3: [
        'var(--h3-font-size)',
        {
          lineHeight: 'var(--headings-line-height)',
          letterSpacing: 'var(--letter-spacing)',
          fontWeight: 'var(--headings-font-weight-base)'
        }
      ],
      h4: [
        'var(--h4-font-size)',
        {
          lineHeight: 'var(--headings-line-height)',
          letterSpacing: 'var(--letter-spacing)',
          fontWeight: 'var(--headings-font-weight-base)'
        }
      ],
      h5: [
        'var(--h5-font-size)',
        {
          lineHeight: 'var(--headings-line-height)',
          letterSpacing: 'var(--letter-spacing)',
          fontWeight: 'var(--headings-font-weight-base)'
        }
      ],
      h6: [
        'var(--h6-font-size)',
        {
          lineHeight: 'var(--headings-line-height)',
          letterSpacing: 'var(--letter-spacing)',
          fontWeight: 'var(--headings-font-weight-base)'
        }
      ]

    }
  },
  safelist: [
    {
      pattern: /grid-cols-(2|3|4|5|6|7|8|9|10|11|12)/
    },
    {
      pattern: /col-span-(2|3|4|5|6|7|8|9|10|11|12)/
    }
  ],
  plugins: []
};
