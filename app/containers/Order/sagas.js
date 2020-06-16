/* eslint-disable */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { handleGenericError } from 'utils/handleGenericError';
import _ from 'lodash';
import service from 'services';
import {
  UPLOAD_CSV,
  SYCN_DATA_STORE,
  GET_ORDERS,
  GET_STORE
} from './constants';
import {
  uploadCsvSucceed,
  syncDataSucceed,
  syncDataFailed,
  getOrdersSucceed,
  getOrdersFailed,
  getStoreSucceed,
  getStoreFailed
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

export function* getOrderActionHandler(data){
  try{
    const response = yield call(service.orderServices.getOrders, data.options);
    console.log("===response===", response);
    if(response.status === 200 && response.data.docs.length > 0){
      // const stores = yield call(service.storeServices.getStore);
      // const storeApis = stores.data.docs;
      
      // response.data.docs.map(async st => {
      //   const customer = await service.wooServices.getCustomerInfo(storeApis, st.customer_id, st.store);
      //   console.log("====customer===", customer);
      // })
      yield put(getOrdersSucceed({
        orders: response.data.docs,
        pages: response.data.pages,
        itemCount: response.data.total
      }));
    } else {
      yield put(getOrdersSucceed({
        orders: response.data.docs,
        pages: response.data.pages,
        itemCount: response.data.total
      }));
    }
  }catch (err) {
    console.log("===err get order===", err);
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
    yield put(syncDataFailed(rs.data.err))
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
      console.log("===newlist===", newList);
      const rs = yield call(service.orderServices.syncData, { listOrder: newList });
      const maxPage = _.max(totalPage);
      if (maxPage > 1) {
        yield call(requestStoreWoo, storeApis, maxPage);
      } else {
        if (rs.data.success) {
          yield put(syncDataSucceed())
        } else {
          yield put(syncDataFailed(rs.data.err))
        }
      }
    }
  } catch (err) {
    yield put(syncDataFailed(err))
  }
}

function* getStoreActionHandler() {
   
  try{
    const response = yield call(service.storeServices.getStore);
    if(response.status === 200 && response.data.docs.length > 0){
      yield put(getStoreSucceed(response.data.docs));
    } else {
      yield put(getStoreSucceed(response.data));
    }
  }catch (err) {
    console.log("===err get order===", err);
  }
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
  yield takeLatest(GET_ORDERS, getStoreActionHandler);
}

export default function* watchSaga() {
  yield all([
    fork(uploadCsvHandlerWatcher),
    fork(syncDataStoreHandlerWatcher),
    fork(getOrderHandlerWatcher),
    fork(getStoreHandlerWatcher),
  ]);
}
