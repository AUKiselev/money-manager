export interface ICost {
  _id: string;
  name: string;
  sum: number;
  limit: number;
  settings: {
    icon: string;
    color: string;
  }
}
