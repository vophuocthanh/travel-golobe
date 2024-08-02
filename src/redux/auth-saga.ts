import { authApi } from '@/apis/auth.api'
import { LoginResponse } from '@/apis/axios-client'
import { authActions } from '@/redux/auth-slice'
import { history } from '@/shared/utils/history'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/shared/utils/storage'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, takeLatest } from 'redux-saga/effects'

export interface Account {
  email: string
  password: string
  confirmPassword?: string
  name?: string
  phone?: string
}

function* handleLogin(action: PayloadAction<Account>) {
  try {
    const res: LoginResponse = yield call(authApi.login, action.payload)
    setAccessTokenToLS(res.access_token)
    setRefreshTokenToLS(res.refresh_token)
    // yield put(authActions.loginSuccess(res))
    yield call(history.push, `/`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message))
  }
}

function* watchLoginFlow() {
  yield takeLatest(authActions.login.type, handleLogin)
}

export default function* authSaga() {
  yield fork(watchLoginFlow)
}
