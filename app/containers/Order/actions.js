import {
  UPLOAD_CSV,
  UPLOAD_CSV_SUCCEED,
  SYCN_DATA_STORE,
  SYCN_DATA_STORE_SUCCEED,
  SYCN_DATA_STORE_FAILED,
  GET_ORDERS,
  GET_ORDERS_SUCCEED,
  GET_ORDERS_FAILED,
} from './constants';

export const uploadCsvFileAction = data => ({
  type: UPLOAD_CSV,
  data,
});

export const uploadCsvSucceed = () => ({
  type: UPLOAD_CSV_SUCCEED,
});

export const syncDataAction = () => ({
  type: SYCN_DATA_STORE,
});

export const syncDataSucceed = () => ({
  type: SYCN_DATA_STORE_SUCCEED,
});

export const syncDataFailed = err => ({
  type: SYCN_DATA_STORE_FAILED,
  err,
});

export const getOrders = (page, limit) => ({
  type: GET_ORDERS,
  options: { page, limit },
});

export const getOrdersSucceed = listOrder => ({
  type: GET_ORDERS_SUCCEED,
  listOrder,
});

export const getOrdersFailed = err => ({
  type: GET_ORDERS_FAILED,
  err,
});
