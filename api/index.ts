import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

export const useFetchWithToken = <T>(request: string, options: any) => {
  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);
  const { baseUrl } = useRuntimeConfig().public;

  return useFetch<T>(request, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
    baseURL: baseUrl,
    credentials: 'include',
    ...options,
  });
};
