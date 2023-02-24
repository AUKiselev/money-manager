import { useFetchWithToken } from '.';
import { IIncome } from '@/models/income';
import { ICost } from '@/models/cost';
import { IBill } from '@/models/bill';

export const deleteObject = async (
  objectType: string,
  objectId: string,
  userId: string,
): Promise<IIncome[] | ICost[] | IBill[] | null> => {
  try {
    const { data } = await useFetchWithToken<IIncome | ICost | IBill>(
      `${objectType.toLocaleLowerCase()}s/${objectId}`,
      {
        method: 'DELETE',
      },
    );

    if (!data.value) {
      throw new Error('Ошибка запроса');
    }

    const { data: newArray } = await useFetchWithToken<IIncome[] | ICost[] | IBill[]>(
      `${objectType.toLocaleLowerCase()}s/${userId}`,
      {
        method: 'GET',
      },
    );

    return newArray.value;
  } catch (e) {
    console.error(e);
    return null;
  }
};
