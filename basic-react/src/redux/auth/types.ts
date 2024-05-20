import { User } from "../../types"

type LoginUserRequest = {
  email: string
  password: string
}

type LoginUserSuccess = {
  user: Pick<User, "email" | "password">
}

type LoginUserError = {
  error: unknown
}

type RegisterUserRequest = {
  name: string
  email: string
  password: string
}

type RegisterUserSuccess = {
  user: Pick<User, "email" | "password">
}

type RegisterUserError = {
  error: unknown
}

type LogoutUser = {
  navigate: (url: string) => void
}

export type {
  LoginUserRequest,
  LoginUserSuccess,
  LoginUserError,
  RegisterUserRequest,
  RegisterUserSuccess,
  RegisterUserError,
  LogoutUser,
}
