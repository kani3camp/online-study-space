export default {
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'オンライン作業部屋',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'オンラインの作業部屋で集中しよう。Googleアカウントでログインして、各科目・作業内容の自習室を選んで入室しましょう。サービスは全て無料です。',
      },

      {
        hid: 'keywords',
        name: 'keywords',
        content: 'オンライン作業部屋,オンライン自習室,オンライン勉強部屋,study with me,作業耐久',
      },
    ],
    script: [],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: [
    {
      src: '~/plugins/firebase.js',
      mode: 'client',
    },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify', '@nuxt/postcss8'],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Vuetify configuration
   */
  vuetify: {
    customVariables: [],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Roboto',
      },
      icons: 'mdi',
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  // router: {
  //   base: './'
  // },
  watchers: {
    webpack: {
      poll: true,
    },
  },
  build: {
    transpile: ['firebase', 'firebaseui'],
    extend(config, { isDev, isClient }) {
      // Add support for WebP images
      config.module.rules.push({
        test: /\.(webp)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },
  generate: {
    fallback: true,
  },
}
