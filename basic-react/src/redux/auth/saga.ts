import { all, fork, put, takeEvery } from "redux-saga/effects"
import { LoginUserRequest } from "./types"
import { loginUserError, loginUserSuccess } from "./actions"
import { LOGIN_USER, REGISTER_USER } from "../actions"

type loginWithEmailAndPasswordProps = {
  type: string
  payload: LoginUserRequest
}

function* loginWithEmailAndPassword(
  action: loginWithEmailAndPasswordProps
): Generator {
  const { email, password } = action.payload

  try {
    //TODO: Implementar chamada ao servidor com os dados e retornar o usuário logado
    yield put(loginUserSuccess({ user: { email, password } }))
  } catch (error) {
    yield put(loginUserError({ error }))
  }
}

function* registerWithEmailAndPassword() {
  //TODO: Implementar chamada ao servidor com os dados e retornar o usuário logado
}

function* watchGetAuth() {
  yield takeEvery(LOGIN_USER, loginWithEmailAndPassword)
  yield takeEvery(REGISTER_USER, registerWithEmailAndPassword)
}

export default function* rootSaga() {
  yield all([fork(watchGetAuth)])
}
