/* eslint-disable */

import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
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
  GET_STORE_FAILED
} from './constants';

export const initialState = {
  loading: false,
  syncStatus: false,
  syncDataFailed: [],
  syncDataSucceed: false,
  listOrders: [],
  pages: 0,
  totalItems: 0,
  tableLoading: false,
  stores: [],
  getStoreStatus: false,
};

const ordertContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ORDERS:
        draft.tableLoading = true;
        break;
      case GET_ORDERS_SUCCEED:
        draft.tableLoading = false;
        draft.syncDataSucceed = false;
        draft.listOrders = action.listOrder.orders;
        draft.pages = action.listOrder.pages;
        draft.totalItems = action.listOrder.itemCount;
        break;
      case GET_ORDERS_FAILED:
        draft.tableLoading = false;
        draft.listOrders = [];
        draft.pages = 0;
        draft.totalItems = 0;
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
        break;
      case UPLOAD_CSV:
        draft.loading = true;
        break;
      case UPLOAD_CSV_SUCCEED:
        draft.loading = false;
        break;
      case SYCN_DATA_STORE:
        draft.syncStatus = true;
        draft.syncDataFailed = [];
        break;
      case SYCN_DATA_STORE_SUCCEED:
        draft.syncStatus = false;
        draft.syncDataSucceed = true;
        draft.syncDataFailed = [];
        break;
      case SYCN_DATA_STORE_FAILED:
        draft.syncStatus = false;
        draft.syncDataFailed = action.err;
        break;
      case LOCATION_CHANGE:
        draft.syncStatus = false;
        draft.syncDataFailed = [];
        break;
    }
  });
export default ordertContainerReducer;
