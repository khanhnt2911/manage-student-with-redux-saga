import authSaga from "features/auth/authSaga"
import citySaga from "features/city/citySaga"
import dashboardSaga from "features/dashboard/dashboardSaga"
import studentSaga from "features/student/studentSaga"
import { all } from "redux-saga/effects"

export default function* rootSaga() {
  // console.log("root saga");
  yield all([authSaga(), dashboardSaga(), studentSaga(), citySaga()])
}
