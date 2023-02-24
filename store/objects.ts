import { defineStore } from 'pinia';

import { IBill } from '@/models/bill';
import { ICost } from '@/models/cost';
import { IIncome } from '@/models/income';
import { deleteObject } from '@/api/objects';

export const useObjectsStore = defineStore('objectsStore', {
  state: () => ({
    bills: [] as IBill[] | null,
    costs: [] as ICost[] | null,
    incomes: [] as IIncome[] | null,
  }),

  actions: {
    setBills(bills: IBill[]) {
      this.bills = bills;
    },

    setCosts(costs: ICost[]) {
      this.costs = costs;
    },

    setIncomes(incomes: IIncome[]) {
      this.incomes = incomes;
    },

    async deleteObjectAndUpdateList(
      objectType: string,
      objectId: string,
      userId: string,
    ) {
      const newObjectList = await deleteObject(objectType, objectId, userId);

      if (objectType === 'COST') {
        this.costs = newObjectList as ICost[];
      }

      if (objectType === 'BILL') {
        this.bills = newObjectList as IBill[];
      }

      if (objectType === 'INCOME') {
        this.incomes = newObjectList as IIncome[];
      }
    },
  },
});
