import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import createSagaMiddleware from "@redux-saga/core"
import rootSaga from "./rootSaga"
import authReducer from "features/auth/authSlice"
import dashboardReducer from "features/dashboard/dashboardSlice"
import studentReducer from "features/student/StudentSlice"
import cityReducer from "features/city/citySlice"

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

// phai chay sau khi store duoc khoi tao
sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
