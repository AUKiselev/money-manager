import { defineStore } from 'pinia';

import { IIncome } from '@/models/income';

export const useIncomesStore = defineStore('incomesStore', {
  state: () => ({
    incomes: [] as IIncome[] | null,
  }),

  actions: {
    async getAllIncomes(): Promise<IIncome[] | null | Error> {
      const { data } = await useFetch<IIncome[]>('http://localhost:5010/api/incomes/');

      this.incomes = data.value;
      return this.incomes;
    },

    async createNewIncome(name: string) {
      const response = await useFetch('http://localhost:5010/api/incomes/', {
        method: 'POST',
        body: {
          name,
        },
      });

      return response;
    },
  },
});
