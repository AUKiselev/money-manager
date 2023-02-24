import { defineStore } from 'pinia';

import { IIncome } from '@/models/income';

export const useIncomesStore = defineStore('incomesStore', {
  state: () => ({
    incomes: [] as IIncome[] | null,
  }),

  actions: {
    setIncomes(incomes: IIncome[]) {
      this.incomes = incomes;
    },
  },
});
