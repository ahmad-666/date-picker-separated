import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - date-picker-separated',
    title: 'date-picker-separated',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/dayjsJalali.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-moment-jalaali'
  ],
  moment: {
    defaultLocale: 'fa',
    locales: ['fa'],
  },

  dayjs: {
    locales: ['en', 'fa'],
    defaultLocale: 'en',
    plugins: [
      'customParseFormat',
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/dayjs'],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/vuetify.scss'],
    treeShake: true,
    // breakpoint: {
    //   thresholds: {
    //     xs: 500,
    //     sm: 750,
    //     md: 1100,
    //     lg: 1500,
    //   },
    //   mobileBreakpoint: 'sm',
    //   scrollBarWidth: 16,
    // },
    rtl: true,
    theme: {
      dark: true,
      themes: {
        light: {
          primary: colors.orange.base,
          secondary: colors.cyan.base,
          accent: colors.deepPurple.base,
          success: colors.teal.accent4,
          info: colors.lightBlue.darken2,
          error: colors.red.base,
          warning: colors.amber.accent3,
          backgroundColor: colors.blueGrey.lighten5,
          cardColor: colors.shades.white,
          titleColor: colors.blueGrey.darken4,
          textColor: colors.blueGrey.darken1,
        },
        dark: {
          primary: colors.orange.base,
          secondary: colors.cyan.base,
          accent: colors.deepPurple.base,
          success: colors.teal.accent4,
          info: colors.lightBlue.darken2,
          error: colors.red.base,
          warning: colors.amber.accent3,
          backgroundColor: '#1e1e2f',
          cardColor: '#27293d',
          titleColor: colors.shades.white,
          textColor: colors.blueGrey.lighten2,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
