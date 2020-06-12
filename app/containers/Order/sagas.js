/* eslint-disable */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { handleGenericError } from 'utils/handleGenericError';
import service from 'services';
import {
  UPLOAD_CSV,
  SYCN_DATA_STORE
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

export function* syncDataActionHandler() {
  try {
    const response = yield call(service.storeServices.getStore);
    if (response.status === 200 && response.data.docs.length > 0) {
      const listOrder = yield call(service.wooServices.getListOrderFromWoo, response.data.docs);
      console.log("===response= syncDataActionHandler==", listOrder);
    }
    // if(response.status === 200 && response.data.docs.length){
    //   yield put(getStoreSucceed(response.data.docs))
    // } else {
    //   console.log("===response= getStoresActionHandler==", response);
    // }
  } catch (err) {
    console.log("===err===", err);
  }
}

export function* syncDataStoreHandlerWatcher() {
  yield takeLatest(SYCN_DATA_STORE, syncDataActionHandler);
}

export function* uploadCsvHandlerWatcher() {
  yield takeLatest(UPLOAD_CSV, uploadCsvActionHandler);
}

export default function* watchSaga() {
  yield all([
    fork(uploadCsvHandlerWatcher),
    fork(syncDataStoreHandlerWatcher),
  ]);
}
