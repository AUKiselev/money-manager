import { ICost } from './cost';
import { IIncome } from './income';
import { IBill } from './bill';

export interface IUser {
  id: string
  email: string,
  firstName?: string,
  lastName?: string,
}
export interface IUserFullInfo {
  user: IUser
  bills: IBill[],
  incomes: IIncome[],
  costs: ICost[],
}

export interface IUserData {
  accessToken: string;
  refreshToken: string;
  userData: IUserFullInfo
}
