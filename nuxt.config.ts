// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/scss/_variables.scss" as *;
          `,
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    'nuxt-icon',
  ],

  components: {
    global: true,
    dirs: ['@/components/general'],
  },

  css: [
    '~/assets/scss/style.scss',
  ],
});
