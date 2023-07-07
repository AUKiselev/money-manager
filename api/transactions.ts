import { ITransaction } from 'models/transaction';
import { useFetchWithToken } from '.';

export const createTransactionFetch = async (transaction: ITransaction): Promise<ITransaction | null> => {
  try {
    const { data } = await useFetchWithToken<ITransaction>(
      'transactions/',
      {
        method: 'POST',
        body: { ...transaction },
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
