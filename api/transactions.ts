import { ITransaction } from 'models/transaction';
import { useFetchWithToken } from '.';

export const createTransactionFetch = async (transaction: ITransaction): Promise<ITransaction | null> => {
  const {
    user,
    type,
    billFrom,
    billTo,
    incomeFrom,
    costTo,
    value,
  } = transaction;
  try {
    const { data } = await useFetchWithToken<ITransaction>(
      'transactions/',
      {
        method: 'POST',
        body: {
          user,
          type,
          value,
          billFrom: type !== 'INCOME' ? billFrom : undefined,
          billTo: type !== 'EXPENSE' ? billTo : undefined,
          incomeFrom: type === 'INCOME' ? incomeFrom : undefined,
          costTo: type === 'EXPENSE' ? costTo : undefined,
        },
      },
    );

    if (!data.value) {
      throw new Error('Ошибка запроса');
    }

    return data.value;
  } catch (e) {
    console.error(e);

    return null;
  }
};
