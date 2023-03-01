import { defineStore } from 'pinia';

import { IBill } from '@/models/bill';
import { ICost } from '@/models/cost';
import { IIncome } from '@/models/income';
import { deleteObject, createObject } from '@/api/objects';

export const useObjectsStore = defineStore('objectsStore', {
  state: () => ({
    bills: [] as IBill[] | null,
    costs: [] as ICost[] | null,
    incomes: [] as IIncome[] | null,
  }),

  actions: {
    objectsInit(objectType: string, objectList: ICost[] | IBill[] | IIncome[]) {
      if (objectType === 'COST') {
        this.costs = objectList as ICost[];
      }

      if (objectType === 'BILL') {
        this.bills = objectList as IBill[];
      }

      if (objectType === 'INCOME') {
        this.incomes = objectList as IIncome[];
      }
    },

    async deleteObjectAndUpdateList(
      objectType: string,
      objectId: string,
      userId: string,
    ) {
      const newObjectList = await deleteObject(objectType, objectId, userId);

      if (newObjectList) {
        this.objectsInit(objectType, newObjectList);
      }
    },

    async createNewObject(
      objectType: string,
      userId: string,
      name: string,
      sum?: number | null,
      limit?: number | null,
    ) {
      const newObjectList = await createObject(objectType, userId, name, sum, limit);

      if (newObjectList) {
        this.objectsInit(objectType, newObjectList);
      }
    },
  },
});
