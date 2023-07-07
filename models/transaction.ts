export interface ITransaction {
  user: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  createDate: number,
  billFrom?: string;
  billTo?: string;
  incomeFrom?: string;
  costTo?: string;
  value: number
}
