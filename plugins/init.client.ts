import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

export default defineNuxtPlugin(async () => {
  const { $store } = useNuxtApp();
  const userStore = useUserStore($store);

  const { checkAuth } = userStore;
  const { isAuth } = storeToRefs(userStore);
  await checkAuth();
  if (isAuth.value) {
    const router = useRouter();
    router.push({ path: '/' });
  }
});
