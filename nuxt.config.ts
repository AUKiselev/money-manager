// import ElementPlus from 'unplugin-element-plus/vite';

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

  devServer: {
    port: 3001,
  },

  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
    'nuxt-icon',
  ],

  components: {
    global: true,
    dirs: ['@/components/general'],
  },

  build: {
    transpile: ['element-plus/es'],
  },

  css: [
    'element-plus/dist/index.css',
    '~/assets/scss/style.scss',
  ],
});
