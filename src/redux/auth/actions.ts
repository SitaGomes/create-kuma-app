import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
} from "../actions"
import {
  LoginUserError,
  LoginUserRequest,
  LoginUserSuccess,
  LogoutUser,
  RegisterUserError,
  RegisterUserRequest,
  RegisterUserSuccess,
} from "./types"

export const loginUser = (props: LoginUserRequest) => ({
  type: LOGIN_USER,
  payload: props,
})

export const loginUserSuccess = (user: LoginUserSuccess) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
})

export const loginUserError = (error: LoginUserError) => ({
  type: LOGIN_USER_ERROR,
  payload: error,
})

export const registerUser = (props: RegisterUserRequest) => ({
  type: REGISTER_USER,
  payload: props,
})

export const registerUserSuccess = (user: RegisterUserSuccess) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
})

export const registerUserError = (error: RegisterUserError) => ({
  type: REGISTER_USER_ERROR,
  payload: error,
})

export const logoutUser = (props: LogoutUser) => ({
  type: LOGOUT_USER,
  payload: props,
})
