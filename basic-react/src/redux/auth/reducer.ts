import { Reducer } from "redux"
import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
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

type AuthState = {
  user: any
  token: any
  isLoadingLoginUser: boolean
  isRegisteringUser: boolean
  error: any
}

type AuthAction = {
  type: string
  payload:
    | LoginUserRequest
    | LoginUserSuccess
    | LoginUserError
    | RegisterUserRequest
    | RegisterUserSuccess
    | RegisterUserError
    | LogoutUser
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoadingLoginUser: false,
  isRegisteringUser: false,
  error: null,
}

const AuthReducer: Reducer<AuthState, AuthAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        isLoadingLoginUser: true,
      }
    }

    case LOGIN_USER_SUCCESS: {
      const payload = action.payload as LoginUserSuccess
      return {
        ...state,
        user: payload.user,
        isLoadingLoginUser: false,
      }
    }

    case LOGIN_USER_ERROR: {
      const error = action.payload as LoginUserError
      return {
        ...state,
        isLoadingLoginUser: false,
        error: error,
      }
    }

    case REGISTER_USER: {
      return {
        ...state,
        isRegisteringUser: true,
      }
    }

    case REGISTER_USER_SUCCESS: {
      const payload = action.payload as RegisterUserSuccess
      return {
        ...state,
        user: payload.user,
        isRegisteringUser: false,
      }
    }

    case REGISTER_USER_ERROR: {
      const error = action.payload as RegisterUserError
      return {
        ...state,
        isRegisteringUser: false,
        error: error,
      }
    }

    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
      }
    }

    default:
      return state
  }
}

export default AuthReducer
