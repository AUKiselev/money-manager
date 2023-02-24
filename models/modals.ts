export interface IObjectModal {
  name: 'delete-modal' | 'change-modal' | '';
  objectType: 'BILL' | 'INCOME' | 'COST';
  objectId: string;
  objectName: string;
}

export interface IChangeModal extends IObjectModal {
  sum: number;
  limit?: number;
  icon: string;
}
