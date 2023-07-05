export interface IObjectModal {
  name: 'delete-modal' | 'change-modal' | '';
  objectType: 'BILL' | 'INCOME' | 'COST';
  objectId: string;
  objectName: string;
}

export interface IChangeModal extends IObjectModal {
  sum: number;
  limit?: number | null;
  settings: {
    icon: string;
    color: string;
  };
}

export interface INewItemModal {
  name: 'new-item-modal'
  itemName: string;
  objectType: 'BILL' | 'INCOME' | 'COST';
  userId: string;
}

export interface ITransactionModal {
  name: 'transaction-modal'
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
}
