/* eslint-disable */

import produce from 'immer';
import {
  GET_STORE,
  GET_STORE_SUCCEED,
  GET_STORE_FAILED,
  ADD_STORE,
  ADD_STORE_SUCCEED
} from './constants';

export const initialState = {
  stores: [],
  skipPageReset: false,
  addStoreSucceed: false,
  loading: false,
};

const storeManagementContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_STORE_SUCCEED:
        draft.stores = action.store;
        draft.addStoreSucceed = false;
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
    }
  });
export default storeManagementContainerReducer;
