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
    async createTransaction(transactionValue: number | null) {
      const userStore = useUserStore();
      const { user } = storeToRefs(userStore);

      const layoutStore = useLayoutStore();
      const { modal } = storeToRefs(layoutStore) as {
        modal: Ref<ITransactionModal>
      };

      const transactionData = {
        user: user.value.id,
        type: modal.value.type,
        value: transactionValue,
        billFrom: modal.value.type !== 'INCOME' ? modal.value.from.id : undefined,
        billTo: modal.value.type !== 'EXPENSE' ? modal.value.to.id : undefined,
        incomeFrom: modal.value.type === 'INCOME' ? modal.value.from.id : undefined,
        costTo: modal.value.type === 'EXPENSE' ? modal.value.to.id : undefined,
      };

      const createdTransaction = await createTransactionFetch(transactionData);
      console.log(createdTransaction);
      if (createdTransaction) {
        const objectsStore = useObjectsStore();
        const { getOneObject } = objectsStore;

        if (createdTransaction.type === 'EXPENSE' && createdTransaction.billFrom && createdTransaction.costTo) {
          await getOneObject('BILL', createdTransaction.billFrom);
          await getOneObject('COST', createdTransaction.costTo);
        } else if (createdTransaction.type === 'INCOME' && createdTransaction.incomeFrom && createdTransaction.billTo) {
          await getOneObject('INCOME', createdTransaction.incomeFrom);
          await getOneObject('BILL', createdTransaction.billTo);
        } else if (createdTransaction.type === 'TRANSFER' && createdTransaction.billFrom && createdTransaction.billTo) {
          await getOneObject('BILL', createdTransaction.billFrom);
          await getOneObject('BILL', createdTransaction.billTo);
        }
      }
    },
  },
});
