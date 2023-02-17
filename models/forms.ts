export interface IRegistrationForm {
  firstName?: string;
  lastName?: string;
  email: string,
  password: string,
  repeatPass: string,
}

export interface IAuthForm {
  email: string,
  password: string,
}
