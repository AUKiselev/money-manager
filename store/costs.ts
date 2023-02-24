import { defineStore } from 'pinia';

import { ICost } from '@/models/cost';

export const useCostsStore = defineStore('costsStore', {
  state: () => ({
    costs: [] as ICost[] | null,
  }),

  actions: {
    setCosts(costs: ICost[]) {
      this.costs = costs;
    },
  },
});
