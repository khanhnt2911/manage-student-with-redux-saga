/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from "@reduxjs/toolkit"
import { call, delay, put, take } from "redux-saga/effects"
import { authActions, LoginPayload, LogoutPayload } from "./authSlice"

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(500)
    localStorage.setItem("access_token", "fakeTaxi")

    yield put(
      authActions.loginSuccess({
        id: 1,
        name: "tien Khanh",
      })
    )
    // Redirect to admin page
    yield call(function () {
      payload.navigate("/admin/dashboard")
    })
  } catch (error) {
    yield put(authActions.loginFailed("Failed"))
    console.log(error)
  }
}

function* handleLogout(payload: LogoutPayload) {
  yield delay(500)
  localStorage.removeItem("access_token")

  // Redirect to login page
  yield call(function () {
    payload.navigate("/login")
  })
}

function* watchLoginFlow() {
  while (true) {
    let isLoggedIn = Boolean(localStorage.getItem("access_token"))
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type)
      yield call(handleLogin, action.payload)
    } else {
      const action: PayloadAction<LogoutPayload> = yield take(authActions.logout.type)
      yield call(handleLogout, action.payload)
    }
  }
}

export default function* authSaga() {
  yield call(watchLoginFlow)
}
