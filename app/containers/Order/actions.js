import {
  UPLOAD_CSV,
  UPLOAD_CSV_SUCCEED,
  SYCN_DATA_STORE,
  SYCN_DATA_STORE_SUCCEED,
  SYCN_DATA_STORE_FAILED,
  GET_ORDERS,
  GET_ORDERS_SUCCEED,
  GET_ORDERS_FAILED,
  GET_STORE,
  GET_STORE_SUCCEED,
  GET_STORE_FAILED,
  EXPORT_CSV,
  EXPORT_CSV_SUCCEED,
  EXPORT_CSV_FAILED,
  EXPORT_CSV_DONE
} from './constants';

export const uploadCsvFileAction = data => ({
  type: UPLOAD_CSV,
  data,
});

export const exportCsv = filter => ({
  type: EXPORT_CSV,
  options: { filter },
});

export const exportCsvSucceed = order => ({
  type: EXPORT_CSV_SUCCEED,
  order,
});

export const exportCsvFailed = err => ({
  type: EXPORT_CSV_FAILED,
  err,
});

export const exportCsvDone = () => ({
  type: EXPORT_CSV_DONE
})

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

export const getOrders = (page, limit, filter) => ({
  type: GET_ORDERS,
  options: { page, limit, filter },
});

export const getOrdersSucceed = listOrder => ({
  type: GET_ORDERS_SUCCEED,
  listOrder,
});

export const getOrdersFailed = err => ({
  type: GET_ORDERS_FAILED,
  err,
});

export const getStore = () => ({
  type: GET_STORE,
});

export const getStoreSucceed = stores => ({
  type: GET_STORE_SUCCEED,
  stores,
});

export const getStoreFailed = err => ({
  type: GET_STORE_FAILED,
  err,
});
