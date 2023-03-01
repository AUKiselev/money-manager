import { defineStore, storeToRefs } from 'pinia';
import { useObjectsStore } from './objects';
import { useLayoutStore } from '@/store/layout';
import { IUser, IUserData } from '@/models/user';
import {
  userRegister, userLogin, refreshTokens, logout,
} from '@/api/auth';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
    } as IUser,
    accessToken: '',
    isAuth: false,
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
      const {
        id, email, firstName, lastName,
      } = userData.user;
      this.user = {
        id, email, firstName, lastName,
      };
      this.accessToken = userData.accessToken;
      localStorage.setItem('Authorization', `Bearer ${userData.accessToken}`);

      const { incomes, bills, costs } = userData.user;

      const objectsStore = useObjectsStore();
      const { bills: storeBills, costs: storeCosts, incomes: storeIncomes } = storeToRefs(objectsStore);
      storeBills.value = bills;
      storeCosts.value = costs;
      storeIncomes.value = incomes;
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
        this.isAuth = true;

        return true;
      } catch (e) {
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
        this.isAuth = true;

        return true;
      } catch (e) {
        return null;
      } finally {
        isLoading.value = false;
      }
    },

    async checkAuth(): Promise<boolean | null> {
      const layoutStore = useLayoutStore();
      const { isLoading } = storeToRefs(layoutStore);

      try {
        isLoading.value = true;
        const response = await refreshTokens();

        if (!response?.user || !response?.refreshToken || !response?.accessToken) {
          throw new Error('Ошибка запроса');
        }

        this.initData(response);
        this.isAuth = true;

        return true;
      } catch (e) {
        return null;
      } finally {
        isLoading.value = false;
      }
    },

    async logout() {
      await logout();
      this.user = {} as IUser;
      this.accessToken = '';
      this.isAuth = false;
      localStorage.removeItem('Authorization');
    },
  },
});
