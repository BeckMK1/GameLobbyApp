// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@pinia/nuxt', {storesDirs: ['./stores/**']}]
  ],
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    build: {
      transpile: ['@fortawesome/vue-fontawesome']
    },
});
