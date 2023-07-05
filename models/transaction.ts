export interface ITransaction {
  user: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  billFrom?: string;
  billTo?: string;
  incomeFrom?: string;
  costTo?: string;
  value: number | null
}
