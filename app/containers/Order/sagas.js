/* eslint-disable */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { handleGenericError } from 'utils/handleGenericError';
import service from 'services';
import {
  UPLOAD_CSV
} from './constants';
import {
  uploadCsvSucceed
} from './actions';

export function* handleError(error) {
  yield call(handleGenericError, error);
}


export function* uploadCsvActionHandler(data) {
   console.log("===data==", data);
   data.data.forEach(v => {
     console.log("==v===", v);
   })
   yield put(uploadCsvSucceed());
}

export function* uploadCsvHandlerWatcher() {
  yield takeLatest(UPLOAD_CSV, uploadCsvActionHandler);
}

export default function* watchSaga() {
  yield all([
    fork(uploadCsvHandlerWatcher),
  ]);
}
