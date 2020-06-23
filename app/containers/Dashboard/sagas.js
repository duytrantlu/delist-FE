/* eslint-disable */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import service from 'services';
import {
  GET_DASHBOARD
} from './constants';
import {
  getDashboardSucceed,
  getDashboardFailed
} from './actions';
import {
  setShowPopup
} from 'containers/App/actions';

export function* getDashboarHandler(data) {
  console.log("==data==", data);
  // try {
  //   const response = yield call(service.dashboard.getDashboard, data.time);
  //   if (response.status === 200 && response.data.success === true) {
  //     yield put(getDashboardSucceed(response.data));
  //   } else {
  //     yield put(getDashboardFailed(new Error("Dashboard was Failed.")));
  //     yield put(setShowPopup());
  //   }
  // } catch (err) {
  //   yield put(getDashboardFailed(err));
  //   yield put(setShowPopup());
  // }
}

export function* getDashboardHandlerWatcher() {
  yield takeLatest(GET_DASHBOARD, getDashboarHandler);
}

export default function* watchSaga() {
  yield all([
    fork(getDashboardHandlerWatcher),
  ]);
}
