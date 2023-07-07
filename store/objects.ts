import { defineStore } from 'pinia';

import { IBill } from '@/models/bill';
import { ICost } from '@/models/cost';
import { IIncome } from '@/models/income';
import {
  deleteObject, createObject, updateObject, getOneBillById, getOneCostById, getOneIncomeById,
} from '@/api/objects';

export const useObjectsStore = defineStore('objectsStore', {
  state: () => ({
    bills: [] as IBill[],
    costs: [] as ICost[],
    incomes: [] as IIncome[],
  }),

  actions: {
    objectsInit(objectType: 'COST' | 'BILL' | 'INCOME', objectList: ICost[] | IBill[] | IIncome[]) {
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
      objectType: 'COST' | 'BILL' | 'INCOME',
      objectId: string,
      userId: string,
    ) {
      const newObjectList = await deleteObject(objectType, objectId, userId);

      if (newObjectList) {
        this.objectsInit(objectType, newObjectList);
      }
    },

    async createNewObject(
      objectType: 'COST' | 'BILL' | 'INCOME',
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
      objectType: 'COST' | 'BILL' | 'INCOME',
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

    updateOneObjectSumInStore(
      objectType: 'COST' | 'BILL' | 'INCOME',
      objectId: string,
      differenceValue: number,
      operator: 'sum' | 'subtraction',
    ) {
      // if (objectType === 'BILL') {
      //   this.bills.forEach(el => {
      //     if (el._id === objectId) {
      //       // eslint-disable-next-line
      //       el.sum = newSum;
      //     }
      //   });
      // } else if (objectType === 'COST') {
      //   this.costs.forEach(el => {
      //     if ()
      //   })
      // }
      const lowerCaseType = objectType.toLocaleLowerCase() as 'cost' | 'bill' | 'income';

      this[`${lowerCaseType}s`].forEach(el => {
        if (el._id === objectId) {
          // eslint-disable-next-line
          if (operator === 'sum') el.sum += differenceValue;
          // eslint-disable-next-line
          if (operator === 'subtraction') el.sum -= differenceValue;
        }
      });
    },

    async getOneObject(objectType: 'COST' | 'BILL' | 'INCOME', objectId: string) {
      if (objectType === 'BILL') {
        const newBill = await getOneBillById(objectId);
        if (!newBill) return;

        this.bills.forEach(el => {
          if (el._id === newBill._id) {
            // eslint-disable-next-line
            el.sum = newBill.sum;
          }
        });
      } else if (objectType === 'COST') {
        const newCost = await getOneCostById(objectId);
        if (!newCost) return;

        this.costs.forEach(el => {
          if (el._id === newCost._id) {
            // eslint-disable-next-line
            el.sum = newCost.sum;
          }
        });
      } else if (objectType === 'INCOME') {
        const newIncome = await getOneIncomeById(objectId);
        if (!newIncome) return;

        this.incomes.forEach(el => {
          if (el._id === newIncome._id) {
            // eslint-disable-next-line
            el.sum = newIncome.sum;
          }
        });
      }
    },
  },
});
