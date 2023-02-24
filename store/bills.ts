import { defineStore } from 'pinia';

import { IBill } from '@/models/bill';

export const useBillsStore = defineStore('billsStore', {
  state: () => ({
    bills: [] as IBill[] | null,
  }),

  actions: {
    setBills(bills: IBill[]) {
      this.bills = bills;
    },
  },
});
