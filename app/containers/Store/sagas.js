/* eslint-disable */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { handleGenericError } from 'utils/handleGenericError';
import service from 'services';
import {
  GET_STORE,
  ADD_STORE,
  REMOVE_STORE,
  EDIT_STORE
} from './constants';
import {
  setAddStoreSucceed,
  getStoreSucceed,
  removeStoreSucceed,
  removeStoreFailed,
  editStoreSucceed,
  editStoreFailed
} from './actions';

export function* handleError(error) {
  yield call(handleGenericError, error);
}

export function* addStoreActionHandler(data) {
  try {
    const response = yield call(service.storeServices.createStore, data.data);
    yield put(setAddStoreSucceed())

  } catch (err) {
    console.log("===err===", err);
  }
}

export function* getStoresActionHandler() {
  try {
    const response = yield call(service.storeServices.getStore);
    if (response.status === 200 && response.data.docs.length) {
      yield put(getStoreSucceed(response.data.docs))
    } else {
      console.log("===response= getStoresActionHandler==", response);
    }
  } catch (err) {
    console.log("===err===", err);
  }
}

export function* removeStoreActionHandler(data) {
  try {
    const response = yield call(service.storeServices.removeStore, data.ids);
    if (response.status === 200 && response.data.success === true) {
      yield put(removeStoreSucceed())
    } else {
      console.log("===response= removeStoreActionHandlerremoveStoreActionHandler==", response);
    }
  } catch (err) {
    console.log("===err===", err);
  }
}

export function* editStoreActionHandler(data) {
  try {
    const response = yield call(service.storeServices.updateStore, data.newStore);
    if (response.status === 200 && response.data.success === true) {
      yield put(editStoreSucceed())
    } else {
      console.log("===response= editStoreActionHandler==", response);
    }
  } catch (err) {
    console.log("===err===", err);
  }
}

export function* editStoreHandlerWatcher() {
  yield takeLatest(EDIT_STORE, editStoreActionHandler);
}

export function* addStoreHandlerWatcher() {
  yield takeLatest(ADD_STORE, addStoreActionHandler);
}

export function* getStoreHandlerWatcher() {
  yield takeLatest(GET_STORE, getStoresActionHandler);
}

export function* removeStoreHandlerWatcher() {
  yield takeLatest(REMOVE_STORE, removeStoreActionHandler);
}

export default function* watchSaga() {
  yield all([
    fork(getStoreHandlerWatcher),
    fork(addStoreHandlerWatcher),
    fork(removeStoreHandlerWatcher),
    fork(editStoreHandlerWatcher),
  ]);
}
