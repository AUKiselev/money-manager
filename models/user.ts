export interface IUser {
  id: string
  email: string,
  firstName?: string,
  lastName?: string
}

export interface IUserData {
  accessToken: string;
  refreshToken: string;
  user: IUser
}
