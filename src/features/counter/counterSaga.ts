import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { fetchCount } from "./counterAPI";
import { incrementSaga, incrementSuccess } from "./counterSlice";

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log("waiting 1");

  yield delay(1000);

  console.log("waiting done");

  yield put(incrementSuccess(action.payload));
}

function* test() {
  yield fetchCount(2);
  // and
  yield call(fetchCount, 2);
}

export default function* counterSaga() {
  // console.log("counter saga");

  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}
