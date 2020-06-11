/* eslint-disable */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { handleGenericError } from 'utils/handleGenericError';
import service from 'services';
import {
  GET_STORE,
  ADD_STORE
} from './constants';
import {
  setAddStoreSucceed,
  getStoreSucceed
} from './actions';

export function* handleError(error) {
  yield call(handleGenericError, error);
}

export function* addStoreActionHandler(data) {
  try {
    const response = yield call(service.storeServices.createStore, data.data);
    yield put(setAddStoreSucceed())
    
  } catch(err) {
    console.log("===err===", err);
  }
}

export function* getStoresActionHandler() {
  try {
    const response = yield call(service.storeServices.getStore);
    if(response.status === 200 && response.data.docs.length){
      yield put(getStoreSucceed(response.data.docs))
    } else {
      console.log("===response===", response);
    }
  } catch(err) {
    console.log("===err===", err);
  }
}

export function* addStoreHandlerWatcher() {
  yield takeLatest(ADD_STORE, addStoreActionHandler);
}

export function* getStoreHandlerWatcher() {
  yield takeLatest(GET_STORE, getStoresActionHandler);
}

export default function* watchSaga() {
  yield all([
    fork(getStoreHandlerWatcher),
    fork(addStoreHandlerWatcher),
  ]);
}
