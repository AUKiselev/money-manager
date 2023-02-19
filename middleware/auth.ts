import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const { $store } = useNuxtApp();
    const userStore = useUserStore($store);
    const { isAuth } = storeToRefs(userStore);

    if (isAuth.value && from.fullPath !== '/') {
      return navigateTo('/');
    }
  }
});
