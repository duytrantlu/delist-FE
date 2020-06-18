/* eslint-disable */

import produce from 'immer';
import {
  GET_STORE,
  GET_STORE_SUCCEED,
  GET_STORE_FAILED,
  ADD_STORE,
  ADD_STORE_SUCCEED,
  ADD_STORE_FAILED,
  REMOVE_STORE,
  REMOVE_STORE_SUCCEED,
  REMOVE_STORE_FAILED,
  EDIT_STORE,
  EDIT_STORE_SUCCEED,
  EDIT_STORE_FAILED
} from './constants';

export const initialState = {
  stores: [],
  skipPageReset: false,
  addStoreSucceed: false,
  loading: false,
  removeStoreSucceed: false,
  editStoreSucceed: false,
  msgErrors: [],
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

const storeManagementContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_STORE:
        draft.loading = true;
        break;
      case GET_STORE_SUCCEED:
        draft.stores = action.store || [];
        draft.addStoreSucceed = false;
        draft.removeStoreSucceed = false;
        draft.editStoreSucceed = false;
        draft.loading = false;
        break;
      case GET_STORE_FAILED:
        draft.stores = [];
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case ADD_STORE:
        draft.loading = true;
        break;
      case ADD_STORE_SUCCEED:
        draft.addStoreSucceed = true;
        draft.loading = false;
        break;
      case ADD_STORE_FAILED:
        draft.addStoreSucceed = false;
        draft.loading = false;
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case REMOVE_STORE:
        draft.loading = true;
        break;
      case REMOVE_STORE_SUCCEED:
        draft.removeStoreSucceed = true;
        draft.loading = false;
        break;
      case REMOVE_STORE_FAILED:
        draft.removeStoreSucceed = false;
        draft.loading = false;
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case EDIT_STORE:
        draft.loading = true;
        break;
      case EDIT_STORE_SUCCEED:
        draft.loading = false;
        draft.editStoreSucceed = true;
        break;
      case EDIT_STORE_FAILED:
        draft.loading = false;
        draft.editStoreSucceed = true;
        draft.msgErrors = getErrorMessage(action.err);
        break;
    }
  });
export default storeManagementContainerReducer;
