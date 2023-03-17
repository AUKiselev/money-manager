import { defineStore } from 'pinia';

import { IBill } from '@/models/bill';
import { ICost } from '@/models/cost';
import { IIncome } from '@/models/income';
import { deleteObject, createObject, updateObject } from '@/api/objects';

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

    // objectsUpdate(objectType: string, object: ICost | IBill | IIncome) {
    //   if (objectType === 'COST') {
    //     let updatedCost = this.costs?.find(el => el._id === object._id);
    //     if (updatedCost) {
    //       updatedCost = object as ICost;
    //     }
    //   }

    //   if (objectType === 'BILL') {
    //     let updatedBill = this.bills?.find(el => el._id === object._id);
    //     if (updatedBill) {
    //       updatedBill = object as IBill;
    //     }
    //   }

    //   if (objectType === 'INCOME') {
    //     let updatedIncome = this.incomes?.find(el => el._id === object._id);
    //     if (updatedIncome) {
    //       updatedIncome = object as IIncome;
    //     }
    //   }
    // },

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

    async updateObject(
      objectType: string,
      userId: string,
      objectId: string,
      name: string,
      sum?: number | null,
      limit?: number | null,
      icon?: string | null,
    ) {
      const updatedList = await updateObject(objectType, userId, objectId, name, sum, limit, icon);

      if (updatedList) {
        this.objectsInit(objectType, updatedList);
      }
    },
  },
});
