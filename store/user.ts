import { defineStore } from 'pinia';

import { IUser } from '@/models/user';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      firstName: 'Alehandro',
      lastName: 'Samoro',
    } as IUser,
  }),

  getters: {
    getFullName(): string {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
});
