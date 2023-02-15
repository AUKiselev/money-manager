import { defineStore } from 'pinia';

import { IUser } from '@/models/user';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      login: 'Flinn',
      email: 'test@test.com',
    } as IUser,
  }),
});
