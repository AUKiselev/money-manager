import { defineStore } from 'pinia';
import { defineNuxtPlugin } from '#app';
import { useUserStore } from '@/store/user';

export default defineNuxtPlugin(() => {
  const useStore = defineStore('initStore', {
    state: () => ({}),

    actions: {
      async nuxtServerInit() {
        const userStore = useUserStore();

        const refreshToken = useCookie('refreshToken');

        if (refreshToken.value) {
          const { refreshTokens } = userStore;
          refreshTokens();
        }
      },
    },
  });

  const store = useStore();
  store.nuxtServerInit();
});
