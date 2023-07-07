import { defineStore, storeToRefs } from 'pinia';
import { useObjectsStore } from './objects';
import { ITransactionModal } from '@/models/modals';
import { ITransaction } from '@/models/transaction';
import { createTransactionFetch } from '@/api/transactions';
import { useUserStore } from './user';
import { useLayoutStore } from './layout';

export const useTransactionsStore = defineStore('transactionsStore', {
  state: () => ({
    transactions: [] as ITransaction[],
  }),

  actions: {
    async createTransaction(transactionValue: number) {
      const userStore = useUserStore();
      const { user } = storeToRefs(userStore);

      const layoutStore = useLayoutStore();
      const { modal } = storeToRefs(layoutStore) as {
        modal: Ref<ITransactionModal>
      };

      const transactionData = {
        user: user.value.id,
        type: modal.value.type,
        createDate: Date.now(),
        value: transactionValue,
        billFrom: modal.value.type !== 'INCOME' ? modal.value.from.id : undefined,
        billTo: modal.value.type !== 'EXPENSE' ? modal.value.to.id : undefined,
        incomeFrom: modal.value.type === 'INCOME' ? modal.value.from.id : undefined,
        costTo: modal.value.type === 'EXPENSE' ? modal.value.to.id : undefined,
      };

      const createdTransaction = await createTransactionFetch(transactionData);
      if (createdTransaction) {
        const objectsStore = useObjectsStore();
        const { updateOneObjectSumInStore } = objectsStore;

        if (createdTransaction.type === 'EXPENSE' && createdTransaction.billFrom && createdTransaction.costTo) {
          updateOneObjectSumInStore('BILL', createdTransaction.billFrom, createdTransaction.value, 'subtraction');
          updateOneObjectSumInStore('COST', createdTransaction.costTo, createdTransaction.value, 'sum');
        } else if (createdTransaction.type === 'INCOME' && createdTransaction.incomeFrom && createdTransaction.billTo) {
          updateOneObjectSumInStore('INCOME', createdTransaction.incomeFrom, createdTransaction.value, 'sum');
          updateOneObjectSumInStore('BILL', createdTransaction.billTo, createdTransaction.value, 'sum');
        } else if (createdTransaction.type === 'TRANSFER' && createdTransaction.billFrom && createdTransaction.billTo) {
          updateOneObjectSumInStore('BILL', createdTransaction.billFrom, createdTransaction.value, 'subtraction');
          updateOneObjectSumInStore('BILL', createdTransaction.billTo, createdTransaction.value, 'sum');
        }
      }
    },
  },
});
