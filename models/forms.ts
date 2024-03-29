export interface IRegistrationForm {
  firstName?: string
  lastName?: string
  email: string
  password: string
  repeatPass: string
}

export interface IAuthForm {
  email: string
  password: string
}

export interface INewItemForm {
  name: string
  limit?: number | null
  sum?: number | null
}

export interface IChangeFrom {
  name: string
  limit?: number | null
  sum: number | null
  icon: string
}

export interface ITransactionForm {
  value: number | null
}
