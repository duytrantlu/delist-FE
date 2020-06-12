/* eslint-disable */

import produce from 'immer';
import {
  GET_STORE,
  GET_STORE_SUCCEED,
  GET_STORE_FAILED,
  ADD_STORE,
  ADD_STORE_SUCCEED,
  REMOVE_STORE,
  REMOVE_STORE_SUCCEED,
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
};

const storeManagementContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_STORE_SUCCEED:
        draft.stores = action.store;
        draft.addStoreSucceed = false;
        draft.removeStoreSucceed = false;
        draft.editStoreSucceed = false;
        draft.loading = false;
        break;
      case GET_STORE_FAILED:
        draft.users = [];
        break;
      case ADD_STORE:
        draft.loading = true;
        break;
      case ADD_STORE_SUCCEED:
        draft.addStoreSucceed = true;
        draft.loading = false;
        break;
      case REMOVE_STORE:
        draft.loading = true;
        break;
      case REMOVE_STORE_SUCCEED:
        draft.removeStoreSucceed = true;
        break;
      case EDIT_STORE:
        draft.loading = true;
        break;
      case EDIT_STORE_SUCCEED:
        draft.loading = false;
        draft.editStoreSucceed = true;
        break;
    }
  });
export default storeManagementContainerReducer;
