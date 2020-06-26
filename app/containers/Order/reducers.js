/* eslint-disable */

import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  UPLOAD_CSV,
  UPLOAD_CSV_SUCCEED,
  UPLOAD_CSV_FAILED,
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
  PERFORM_EXPORT_CSV,
  PERFORM_EXPORT_CSV_SUCCEED,
  PERFORM_EXPORT_CSV_FAILED,
  IMPORT_FILE_EXCEPTION_CANCEL,
  REMOVE_TRACKING,
  REMOVE_TRACKING_SUCCEED,
  REMOVE_TRACKING_FAILED
} from './constants';

export const initialState = {
  loading: false,
  syncStatus: false,
  syncDataSucceed: false,
  listOrders: [],
  pages: 0,
  totalItems: 0,
  tableLoading: false,
  stores: [],
  getStoreStatus: false,
  exportStatus: false,
  exportData: [],
  exportError: '',
  getDataExportSucceed: false,
  msgErrors: [],
  updateOrder: false,
  removeTrackingStatus: false,
};

export const getErrorMessage = err => {
  const errors = [];
  if (err && err.message) {
    errors.push(err.message); // Summary
    const errObj = err.errors ? err.errors : {};
    Object.keys(errObj).forEach(key => {
      errors.push(errObj[key]);
    });
  } else {
    errors.push(`${err.status} ${err.statusText}`);
  }
  return errors;
};

const ordertContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case EXPORT_CSV:
        draft.getDataExportSucceed = false;
        draft.exportData = [];
        draft.msgErrors = [];
        break;
      case EXPORT_CSV_SUCCEED:
        draft.getDataExportSucceed = true;
        draft.exportData = action.order;
        break;
      case PERFORM_EXPORT_CSV:
        draft.exportStatus = true;
        break;
      case PERFORM_EXPORT_CSV_SUCCEED:
        draft.exportStatus = false;
        draft.exportData = [];
        draft.msgErrors = [];
        break;
      case EXPORT_CSV_FAILED:
        draft.getDataExportSucceed = false;
        draft.exportData = [];
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case GET_ORDERS:
        draft.loading = true;
        draft.tableLoading = true;
        // draft.msgErrors = [];
        break;
      case GET_ORDERS_SUCCEED:
        draft.loading = false;
        draft.tableLoading = false;
        draft.syncDataSucceed = false;
        draft.updateOrder = false;
        draft.removeTrackingStatus = false;
        draft.listOrders = action.listOrder.orders;
        draft.pages = action.listOrder.pages;
        draft.totalItems = action.listOrder.itemCount;
        // draft.msgErrors = [];
        break;
      case GET_ORDERS_FAILED:
        draft.loading = false;
        draft.tableLoading = false;
        draft.listOrders = [];
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case GET_STORE:
        draft.getStoreStatus = true;
        draft.stores = [];
        break;
      case GET_STORE_SUCCEED:
        draft.stores = action.stores;
        draft.getStoreStatus = false;
        break;
      case GET_STORE_FAILED:
        draft.stores = [];
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case UPLOAD_CSV:
        draft.loading = true;
        // draft.msgErrors = [];
        break;
      case UPLOAD_CSV_SUCCEED:
        draft.loading = false;
        draft.updateOrder = true;
        // draft.msgErrors = [];
        break;
      case UPLOAD_CSV_FAILED:
        draft.loading = false;
        draft.updateOrder = false;
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case SYCN_DATA_STORE:
        draft.syncStatus = true;
        // draft.msgErrors = [];
        break;
      case SYCN_DATA_STORE_SUCCEED:
        draft.syncStatus = false;
        draft.syncDataSucceed = true;
        draft.msgErrors = [];
        break;
      case SYCN_DATA_STORE_FAILED:
        draft.syncStatus = false;
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case IMPORT_FILE_EXCEPTION_CANCEL:
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case REMOVE_TRACKING_SUCCEED:
        draft.removeTrackingStatus = true;
        break;
      case REMOVE_TRACKING_FAILED:
        draft.removeTrackingStatus = false;
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case LOCATION_CHANGE:
        draft.exportData = [];
        draft.msgErrors = [];
        break;
    }
  });
export default ordertContainerReducer;
