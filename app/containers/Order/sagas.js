/* eslint-disable */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { handleGenericError } from 'utils/handleGenericError';
import _ from 'lodash';
import service from 'services';
import {
  UPLOAD_CSV,
  SYCN_DATA_STORE,
  GET_ORDERS,
  GET_STORE,
  EXPORT_CSV,
  IMPORT_FILE_EXCEPTION
} from './constants';
import {
  uploadCsvSucceed,
  uploadCsvFailed,
  syncDataSucceed,
  syncDataFailed,
  getOrdersSucceed,
  getOrdersFailed,
  getStoreSucceed,
  getStoreFailed,
  exportCsvSucceed,
  exportCsvFailed
} from './actions';
import {
  setShowPopup
} from 'containers/App/actions';

export function* handleError(error) {
  yield call(handleGenericError, error);
}


export function* uploadCsvActionHandler(data) {
  try {
    const stores = yield call(service.storeServices.getStore);
    const storeApis = stores.data.docs;
    if(stores.status !== 200 && !storeApis.length){
      yield put(uploadCsvFailed(new Error("No store to update tracking number.")));
      yield put(setShowPopup());
      return;
    }
    const wooRs = yield call(service.wooServices.updateTrackingNumber, storeApis, data.data);
    if(wooRs.error.length){
      yield put(uploadCsvFailed(new Error("Some order update tracking was failed.")));
      yield put(setShowPopup());
    }

    const response = yield call(service.orderServices.updateOrder, wooRs.rs);

    if (response.status === 200 && response.data.success === true && !response.data.errors.length) {
      yield put(uploadCsvSucceed());
    } else {
      yield put(uploadCsvFailed(new Error(response.data.errors)));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(uploadCsvFailed(err));
    yield put(setShowPopup());
  }
}

export function* getOrderActionHandler(data) {
  try {
    const response = yield call(service.orderServices.getOrders, data.options);
    if (response.status === 200 && response.data.docs) {
      yield put(getOrdersSucceed({
        orders: response.data.docs,
        pages: response.data.pages,
        itemCount: response.data.total
      }));
    } else {
      yield put(getOrdersFailed(new Error("Some wrong occurred when get Orders.")));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(getOrdersFailed(err));
    yield put(setShowPopup());
  }
}

function extractHostname(url) {
  let hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname.split('.')[0];
}

function* requestStoreWoo(docs, maxPage) {
  try {
    const storeAPIs = docs;
    let i = 2;
    while (i <= maxPage) {
      const listOrder = yield call(service.wooServices.getListOrderFromWoo, storeAPIs, i);
      const orders = [];
      listOrder.forEach(os => {
        const orderContainStore = os.data.map(d => {
          return { ...d, store: extractHostname(os.config.url) }
        });
        orders.push(orderContainStore);
      });
      const newList = _.flatten(orders);
      yield call(service.orderServices.syncData, { listOrder: newList });
      i++;
    }
    yield put(syncDataSucceed())
  } catch (err) {
    yield put(syncDataFailed(new Error("Synchronize orders failed.")));
    yield put(setShowPopup());
  }
}

export function* syncDataActionHandler() {
  try {
    const response = yield call(service.storeServices.getStore);
    if (response.status === 200 && response.data.docs.length > 0) {
      const storeApis = response.data.docs;
      const listOrder = yield call(service.wooServices.getListOrderFromWoo, storeApis);
      const orders = [];
      const totalPage = [];
      listOrder.forEach(os => {
        totalPage.push(os.headers['x-wp-totalpages']);
        const orderContainStore = os.data.map(d => {
          return { ...d, store: extractHostname(os.config.url) }
        });
        orders.push(orderContainStore);
      });
      const newList = _.flatten(orders);
      const rs = yield call(service.orderServices.syncData, { listOrder: newList });
      const maxPage = _.max(totalPage);
      if (maxPage > 1) {
        yield call(requestStoreWoo, storeApis, maxPage);
      } else {
        if (rs.data.success) {
          yield put(syncDataSucceed())
        } else {
          yield put(syncDataFailed(new Error("Synchronize orders failed.")));
          yield put(setShowPopup());
        }
      }
    }
  } catch (err) {
    yield put(syncDataFailed(err));
    yield put(setShowPopup());
  }
}

function* exportCsvActionHandler(data) {
  try {
    const response = yield call(service.orderServices.getDataExport, data.options);
    if (response.status === 200 && response.data) {
      yield put(exportCsvSucceed(response.data));
    } else {
      yield put(exportCsvFailed(new Error("Export csv file failed.")));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(exportCsvFailed(err));
    yield put(setShowPopup());
  }
}

function* getStoreActionHandler() {

  try {
    const response = yield call(service.storeServices.getStore);
    if (response.status === 200 && response.data.docs) {
      yield put(getStoreSucceed(response.data.docs));
    } else {
      yield put(getStoreFailed(new Error("Get Store failed.")));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(getStoreFailed(err));
    yield put(setShowPopup());
  }
}

function* importFileExceptionActionHandler() {
  yield put(exceptionImportFileCancel(data.err));
  yield put(setShowPopup());
}

export function* syncDataStoreHandlerWatcher() {
  yield takeLatest(SYCN_DATA_STORE, syncDataActionHandler);
}

export function* uploadCsvHandlerWatcher() {
  yield takeLatest(UPLOAD_CSV, uploadCsvActionHandler);
}

export function* getOrderHandlerWatcher() {
  yield takeLatest(GET_ORDERS, getOrderActionHandler);
}

export function* getStoreHandlerWatcher() {
  yield takeLatest(GET_STORE, getStoreActionHandler);
}

export function* exportCsvHandlerWatcher() {
  yield takeLatest(EXPORT_CSV, exportCsvActionHandler);
}

export function* importFileExceptionHandlerWatcher() {
  yield takeLatest(IMPORT_FILE_EXCEPTION, importFileExceptionActionHandler);
}

export default function* watchSaga() {
  yield all([
    fork(uploadCsvHandlerWatcher),
    fork(syncDataStoreHandlerWatcher),
    fork(getOrderHandlerWatcher),
    fork(getStoreHandlerWatcher),
    fork(exportCsvHandlerWatcher),
    fork(importFileExceptionHandlerWatcher),
  ]);
}
