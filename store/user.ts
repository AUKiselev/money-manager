import { defineStore, storeToRefs } from 'pinia';
import { useLayoutStore } from '@/store/layout';
import { IUser, IUserData } from '@/models/user';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
    } as IUser,
    accessToken: '',
  }),

  getters: {
    getFullName(): string {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },

  actions: {
    async registerUser(
      email: string,
      password: string,
      firstName?: string,
      lastName?: string,
    ): Promise<boolean | null> {
      const layoutStore = useLayoutStore();
      const { isLoading } = storeToRefs(layoutStore);

      try {
        isLoading.value = true;
        const { user, accessToken } = await $fetch<IUserData>('http://localhost:5010/api/users/registration/', {
          method: 'POST',
          body: {
            email,
            password,
            firstName,
            lastName,
          },
        });

        this.user = { ...user };
        this.accessToken = accessToken;

        return true;
      } catch (e) {
        console.error(e);
        return null;
      } finally {
        isLoading.value = false;
      }
    },

    async authUser(email: string, password: string): Promise<boolean | null> {
      const layoutStore = useLayoutStore();
      const { isLoading } = storeToRefs(layoutStore);

      try {
        isLoading.value = true;
        const { user, accessToken } = await $fetch<IUserData>('http://localhost:5010/api/users/login/', {
          method: 'POST',
          body: {
            email,
            password,
          },
        });

        this.user = { ...user };
        this.accessToken = accessToken;

        return true;
      } catch (e) {
        console.error(e);
        return null;
      } finally {
        isLoading.value = false;
      }
    },
  },
});
