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
  setAddStoreFailed,
  getStoreSucceed,
  getStoreFailed,
  removeStoreSucceed,
  removeStoreFailed,
  editStoreSucceed,
  editStoreFailed
} from './actions';

import {
  setShowPopup
} from 'containers/App/actions';

export function* handleError(error) {
  yield call(handleGenericError, error);
}

export function* addStoreActionHandler(data) {
  try {
    const response = yield call(service.storeServices.createStore, data.data);
    if (response.status === 200 && response.data.success === true) {
      yield put(setAddStoreSucceed());
    } else {
      yield put(setAddStoreFailed(new Error("Add store failed.")));
      yield put(setShowPopup());
    }

  } catch (err) {
    yield put(setAddStoreFailed(err));
    yield put(setShowPopup());
  }
}

export function* getStoresActionHandler() {
  try {
    const response = yield call(service.storeServices.getStore);
    if (response.status === 200 && response.data.docs) {
      yield put(getStoreSucceed(response.data.docs));
    } else {
      yield put(getStoreFailed(new Error("Some wrong occurred when get Stores.")));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(getStoreFailed(err));
    yield put(setShowPopup());
  }
}

export function* removeStoreActionHandler(data) {
  try {
    const response = yield call(service.storeServices.removeStore, data.ids);
    if (response.status === 200 && response.data.success === true) {
      yield put(removeStoreSucceed());
    } else {
      yield put(removeStoreFailed(new Error("Remove store failed.")));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(removeStoreFailed(err));
    yield put(setShowPopup());
  }
}

export function* editStoreActionHandler(data) {
  try {
    const response = yield call(service.storeServices.updateStore, data.newStore);
    if (response.status === 200 && response.data.success === true) {
      yield put(editStoreSucceed())
    } else {
      yield put(editStoreFailed(new Error("Edit store failed.")));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(editStoreFailed(err));
      yield put(setShowPopup());
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
