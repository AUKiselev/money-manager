export interface IBill {
  _id: string;
  name: string;
  sum: number;
  settings: {
    icon: string,
    color: string,
  }
}
