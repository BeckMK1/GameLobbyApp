// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@pinia/nuxt', {storesDirs: ['./stores/**']}]
  ],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/main.css'
    ],
    build: {
      transpile: ['@fortawesome/vue-fontawesome']
    },
});
