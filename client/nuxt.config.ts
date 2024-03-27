// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/src/assets/main.css'
  ],
  plugins: [
    '~/plugins/pinia.js'
  ],
})
