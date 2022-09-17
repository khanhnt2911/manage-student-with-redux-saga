import { PayloadAction } from "@reduxjs/toolkit"
import studentApi from "api/studentApi"
import { ListParams, ListResponse, Student } from "models"
import { call, debounce, put, takeLatest } from "redux-saga/effects"
import { studentActions } from "./StudentSlice"

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload)

    yield put(studentActions.fetchStudentSuccess(response))
  } catch (error) {
    console.log("Failed to fetch student list", error)

    yield put(studentActions.fetchStudentFailed())
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload))
}

export default function* studentSaga() {
  // watch fetch student action
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList)

  yield debounce(1000, studentActions.setFilterWithDebounce.type, handleSearchDebounce)
}
