export default {
  ssr: false,
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Outclass',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", type: "text/css", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" },
      { rel: "stylesheet", type: "text/css", href: "https://use.fontawesome.com/releases/v5.7.0/css/all.css" }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
      { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' },
      { src: 'https://cdn.ckeditor.com/4.15.1/standard/ckeditor.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js'}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/main.css',
    '@/assets/vendor/fontawesome-free/css/all.min.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/helpers',
    '~/plugins/vue-swal',
    '~/plugins/vue-circular-count-down-timer',
    '~/plugins/vuelidate',
    '~/plugins/ckeditor5',
    '~/plugins/vueformulate'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  axios: {
    // baseURL: 'http://localhost:9000/outclass/api'
  },

  primevue: {
    theme: 'saga-blue',
    // components: ['DataTable']
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/moment',
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
    'nuxt-vue-select', //https://vue-select.org/
    '@nuxtjs/toast',
    '@braid/vue-formulate/nuxt',
    'primevue/nuxt'
  ],

  auht: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/log_in', method: 'post', propertyName: 'data' }
        }
      }
    }
  },

  moment: {
    locales: ['id']
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.js'
      },
      {
        code: 'es',
        file: 'es-ES.js'
      },
      {
        code: 'id',
        file: 'id-ID.js'
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'id',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,  // this changed
    },
  },

  // router: {
  //   middleware: ['auth']
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
