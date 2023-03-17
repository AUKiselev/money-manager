export interface IObjectModal {
  name: 'delete-modal' | 'change-modal' | 'new-item-modal' | '';
  objectType: 'BILL' | 'INCOME' | 'COST';
  objectId: string;
  objectName: string;
}

export interface IChangeModal extends IObjectModal {
  sum: number;
  limit?: number | null;
  icon: string;
}

export interface INewItemModal {
  name: string;
  objectType: 'BILL' | 'INCOME' | 'COST';
  userId: string
}
