import { defineStore, storeToRefs } from 'pinia';
import { useLayoutStore } from '@/store/layout';
import { IUser, IUserData } from '@/models/user';
import { userRegister, userLogin, refreshTokens } from '@/api/auth';

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
      if (this.user.firstName && this.user.lastName) {
        return `${this.user.firstName} ${this.user.lastName}`;
      }
      return '';
    },
  },

  actions: {
    initData(userData: IUserData) {
      this.user = { ...userData.user };
      this.accessToken = userData.accessToken;
      localStorage.setItem('Authorization', `Bearer ${userData.accessToken}`);
      const tokenCookie = useCookie('refreshToken', { maxAge: 30 * 24 * 60 * 60 * 1000 });
      tokenCookie.value = userData.refreshToken;
    },

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

        const response = await userRegister(email, password, firstName, lastName);

        if (!response) {
          throw new Error('Ошибка запроса');
        }

        this.initData(response);

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

        const response = await userLogin(email, password);

        if (!response) {
          throw new Error('Ошибка запроса');
        }

        this.initData(response);

        return true;
      } catch (e) {
        console.error(e);
        return null;
      } finally {
        isLoading.value = false;
      }
    },

    async refreshTokens() {
      try {
        const response = await refreshTokens();

        if (!response) {
          throw new Error('Ошибка запроса');
        }

        this.initData(response);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
